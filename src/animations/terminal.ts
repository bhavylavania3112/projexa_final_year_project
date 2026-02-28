/**
 * SmartReception — GSAP Terminal Typing Animation
 *
 * Orchestrated timeline that types out terminal lines
 * with realistic delays, cursor blinks, and tag reveals.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initTerminal(): void {
    const terminalBody = document.getElementById('terminalBody');
    if (!terminalBody) return;

    const lines = terminalBody.querySelectorAll<HTMLElement>('.terminal__line');
    if (lines.length === 0) return;

    // Set initial state
    gsap.set(lines, { opacity: 0, y: 12 });

    // Create the master timeline
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: terminalBody,
            start: 'top 75%',
            toggleActions: 'play none none none',
        },
    });

    lines.forEach((line, i) => {
        const tag = line.querySelector('.terminal__tag');
        const content = line.querySelector('.terminal__content');
        const time = line.querySelector('.terminal__time');

        // Add line entrance
        tl.to(
            line,
            {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out',
            },
            i === 0 ? 0 : `+=${0.3 + Math.random() * 0.2}`
        );

        // Animate the time stamp
        if (time) {
            tl.fromTo(
                time,
                { opacity: 0 },
                { opacity: 1, duration: 0.2 },
                '<'
            );
        }

        // Typing effect on content using text reveal
        if (content) {
            tl.fromTo(
                content,
                { clipPath: 'inset(0 100% 0 0)' },
                {
                    clipPath: 'inset(0 0% 0 0)',
                    duration: 0.8,
                    ease: 'power1.out',
                },
                '<0.1'
            );
        }

        // Pop in the tag
        if (tag) {
            tl.fromTo(
                tag,
                { opacity: 0, scale: 0.8, x: -5 },
                {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    duration: 0.3,
                    ease: 'back.out(2)',
                },
                '>-0.1'
            );
        }
    });

    // Final cursor blink emphasis
    const cursor = terminalBody.querySelector('.terminal__cursor');
    if (cursor) {
        tl.fromTo(
            cursor,
            { opacity: 0 },
            {
                opacity: 0.5,
                duration: 0.3,
                ease: 'power1.inOut',
            }
        );
    }
}
