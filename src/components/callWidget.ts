/**
 * SmartReception — Vapi Call Widget
 *
 * A floating call button that lets visitors talk to the
 * SmartReception AI agent directly from the browser using
 * the Vapi Web SDK.
 */

import Vapi from '@vapi-ai/web';
import gsap from 'gsap';

const PUBLIC_KEY = '5f704c75-6d38-4826-94d3-afd81c639c1a';
const ASSISTANT_ID = '53ff5e9a-14a3-49fe-a010-84fcef97d7ca';

type CallState = 'idle' | 'connecting' | 'active' | 'ending';

export function initCallWidget(): void {
    const btn = document.getElementById('callBtn') as HTMLButtonElement | null;
    const statusEl = document.getElementById('callStatus');
    const timerEl = document.getElementById('callTimer');
    const ripple = document.querySelector('.call-widget__ripple') as HTMLElement | null;
    const pulseRings = document.querySelectorAll<HTMLElement>('.call-widget__pulse');

    if (!btn) return;

    const vapi = new Vapi(PUBLIC_KEY);
    let state: CallState = 'idle';
    let timerInterval: ReturnType<typeof setInterval> | null = null;
    let seconds = 0;

    // ── UI state helpers ──────────────────────────────
    function setState(newState: CallState): void {
        state = newState;
        btn!.dataset.state = newState;

        // Update icon
        const icon = btn!.querySelector('.call-widget__icon') as HTMLElement;
        if (icon) {
            icon.textContent = newState === 'active' || newState === 'connecting'
                ? 'call_end'
                : 'call';
        }

        // Update status text
        if (statusEl) {
            const labels: Record<CallState, string> = {
                idle: 'Talk to AI Agent',
                connecting: 'Connecting…',
                active: 'Call Active',
                ending: 'Ending…',
            };
            statusEl.textContent = labels[newState];
        }

        // Pulse rings animation
        if (newState === 'active') {
            pulseRings.forEach((ring) => ring.classList.add('active'));
        } else {
            pulseRings.forEach((ring) => ring.classList.remove('active'));
        }
    }

    // ── Timer ─────────────────────────────────────────
    function startTimer(): void {
        seconds = 0;
        updateTimerDisplay();
        if (timerEl) timerEl.style.display = 'block';
        timerInterval = setInterval(() => {
            seconds++;
            updateTimerDisplay();
        }, 1000);
    }

    function stopTimer(): void {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        if (timerEl) timerEl.style.display = 'none';
    }

    function updateTimerDisplay(): void {
        if (!timerEl) return;
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        timerEl.textContent = `${m}:${s}`;
    }

    // ── Vapi event handlers ───────────────────────────
    vapi.on('call-start', () => {
        setState('active');
        startTimer();
    });

    vapi.on('call-end', () => {
        setState('idle');
        stopTimer();
    });

    vapi.on('error', (err: any) => {
        console.error('Vapi error:', err);
        setState('idle');
        stopTimer();
    });

    // ── Click handler ─────────────────────────────────
    btn.addEventListener('click', async () => {
        // Ripple effect
        if (ripple) {
            gsap.fromTo(
                ripple,
                { scale: 0, opacity: 0.5 },
                { scale: 2.5, opacity: 0, duration: 0.6, ease: 'power2.out' }
            );
        }

        if (state === 'idle') {
            setState('connecting');
            try {
                await vapi.start(ASSISTANT_ID);
            } catch (err) {
                console.error('Failed to start call:', err);
                setState('idle');
            }
        } else if (state === 'active' || state === 'connecting') {
            setState('ending');
            vapi.stop();
        }
    });

    // ── Entrance animation — wait for shutter intro to finish ──
    const widget = document.querySelector('.call-widget') as HTMLElement;
    if (widget) {
        const revealWidget = () => {
            gsap.fromTo(
                widget,
                { opacity: 0, y: 30, scale: 0.8 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: 'back.out(1.7)',
                }
            );
        };

        // If the shutter canvas is still present, wait for it to finish
        const canvas = document.getElementById('frameCanvas');
        if (canvas) {
            window.addEventListener('shutter-opened', revealWidget, { once: true });
        } else {
            // Shutter already gone (e.g. page reloaded mid-session)
            revealWidget();
        }
    }
}
