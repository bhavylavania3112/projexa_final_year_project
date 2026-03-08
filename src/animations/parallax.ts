/**
 * SmartReception — GSAP Parallax Orb Movement
 *
 * Uses ScrollTrigger for depth via parallax on background orbs.
 * Optimized: removed per-frame gsap.set() mouse loop,
 * uses lightweight CSS transforms instead.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initParallax(): void {
    const orbs = document.querySelectorAll<HTMLElement>('.glow-orb');
    if (orbs.length === 0) return;

    // Parallax speeds — different for each orb to create depth
    const speeds = [0.15, -0.1, 0.2, -0.12, 0.08, -0.18];

    orbs.forEach((orb, i) => {
        const speed = speeds[i] || 0.1;

        // Floating idle animation — slower, GPU-composited
        gsap.to(orb, {
            x: `random(-20, 20)`,
            y: `random(-15, 15)`,
            duration: `random(20, 35)`,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: i * 3,
        });

        // Scroll-based parallax
        gsap.to(orb, {
            yPercent: speed * 100,
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 2,
            },
        });
    });

    // Mouse-reactive parallax — uses a single gsap.quickTo per orb
    // which is far cheaper than creating new tweens every frame
    if (window.matchMedia('(pointer: fine)').matches) {
        const quickOrbs = Array.from(orbs).map((orb, i) => {
            const intensity = (10 + i * 3) * 0.3;
            return {
                qx: gsap.quickTo(orb, 'x', { duration: 0.8, ease: 'power2.out' }),
                qy: gsap.quickTo(orb, 'y', { duration: 0.8, ease: 'power2.out' }),
                intensity,
            };
        });

        window.addEventListener('mousemove', (e: MouseEvent) => {
            const mx = (e.clientX / window.innerWidth - 0.5) * 2;
            const my = (e.clientY / window.innerHeight - 0.5) * 2;

            quickOrbs.forEach(({ qx, qy, intensity }) => {
                qx(mx * intensity);
                qy(my * intensity);
            });
        }, { passive: true });
    }
}
