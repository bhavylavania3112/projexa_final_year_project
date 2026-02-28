/**
 * SmartReception — Lenis Smooth Scroll
 *
 * Initializes Lenis for butter-smooth scrolling
 * and integrates with GSAP's ScrollTrigger for synced animations.
 */

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll(): Lenis {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // ---- Smooth scroll for hash links ----
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e: Event) => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector<HTMLElement>(href);
            if (target) {
                e.preventDefault();

                // If shutter hasn't opened, open it first
                const shutterOpened = (window as any).__shutterOpened?.();
                if (!shutterOpened) {
                    const openShutter = (window as any).__openShutter;
                    if (openShutter) {
                        openShutter();
                        setTimeout(() => {
                            lenis.scrollTo(target, { offset: -80 });
                        }, 1500);
                        return;
                    }
                }

                lenis.scrollTo(target, { offset: -80 });
            }
        });
    });

    return lenis;
}
