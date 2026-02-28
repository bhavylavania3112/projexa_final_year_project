/**
 * SmartReception — GSAP Parallax Orb Movement
 *
 * Uses ScrollTrigger to create depth via parallax
 * on the background gradient orbs.
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

        // Floating idle animation
        gsap.to(orb, {
            x: `random(-40, 40)`,
            y: `random(-30, 30)`,
            scale: `random(0.9, 1.1)`,
            duration: `random(15, 25)`,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: i * 2,
        });

        // Scroll-based parallax
        gsap.to(orb, {
            yPercent: speed * 100,
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5,
            },
        });
    });

    // ---- Mouse-reactive parallax (subtle) ----
    let mouseX = 0;
    let mouseY = 0;
    let currentMX = 0;
    let currentMY = 0;

    window.addEventListener('mousemove', (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animateMouseParallax(): void {
        currentMX += (mouseX - currentMX) * 0.05;
        currentMY += (mouseY - currentMY) * 0.05;

        orbs.forEach((orb, i) => {
            const intensity = 15 + i * 5;
            gsap.set(orb, {
                x: `+=${currentMX * intensity * 0.01}`,
                y: `+=${currentMY * intensity * 0.01}`,
            });
        });

        requestAnimationFrame(animateMouseParallax);
    }

    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
        animateMouseParallax();
    }
}
