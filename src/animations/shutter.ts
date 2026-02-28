/**
 * SmartReception — GSAP Shutter Intro Animation
 *
 * Premium shutter-opening effect that reveals the site on scroll/click.
 * Uses GSAP timeline for smooth, orchestrated animation.
 */

import gsap from 'gsap';

export function initShutter(): void {
    const shutterOverlay = document.getElementById('shutterOverlay');
    const shutterGradient = document.getElementById('shutterGradient');
    const shutterCta = document.getElementById('shutterCta');

    if (!shutterOverlay || !shutterGradient || !shutterCta) return;

    let shutterOpened = false;

    function openShutter(): void {
        if (shutterOpened) return;
        shutterOpened = true;

        const slats = shutterOverlay!.querySelectorAll<HTMLElement>('.shutter-slat');
        const tl = gsap.timeline({
            onComplete: () => {
                // Clean up DOM
                shutterOverlay!.remove();
                shutterGradient!.remove();
                shutterCta!.remove();
            },
        });

        // Fade out the CTA
        tl.to(shutterCta, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: 'power2.in',
        });

        // Animate top slats upward, bottom slats downward with stagger
        const topSlats = Array.from(slats).slice(0, 4);
        const bottomSlats = Array.from(slats).slice(4);

        tl.to(
            topSlats,
            {
                yPercent: -120,
                duration: 1.2,
                stagger: 0.05,
                ease: 'expo.inOut',
            },
            '-=0.1'
        );

        tl.to(
            bottomSlats,
            {
                yPercent: 120,
                duration: 1.2,
                stagger: { each: 0.05, from: 'end' },
                ease: 'expo.inOut',
            },
            '<' // Start at the same time as top slats
        );

        // Fade out gradient backdrop
        tl.to(
            shutterGradient,
            {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
            },
            '-=0.6'
        );

        // Trigger a reveal pulse on main content
        tl.fromTo(
            'main',
            { opacity: 0.8, scale: 0.98 },
            { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
            '-=0.4'
        );
    }

    // Trigger on scroll
    window.addEventListener(
        'wheel',
        (e: WheelEvent) => {
            if (!shutterOpened && e.deltaY > 0) openShutter();
        },
        { passive: true }
    );

    // Trigger on touch swipe up
    let touchStartY = 0;
    window.addEventListener(
        'touchstart',
        (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        },
        { passive: true }
    );

    window.addEventListener(
        'touchmove',
        (e: TouchEvent) => {
            const delta = touchStartY - e.touches[0].clientY;
            if (!shutterOpened && delta > 30) openShutter();
        },
        { passive: true }
    );

    // Trigger on CTA click
    shutterCta.addEventListener('click', openShutter);

    // Trigger on keyboard
    window.addEventListener('keydown', (e: KeyboardEvent) => {
        if (!shutterOpened && (e.key === 'ArrowDown' || e.key === ' ')) {
            e.preventDefault();
            openShutter();
        }
    });

    // Expose for smooth scroll integration
    (window as any).__shutterOpened = () => shutterOpened;
    (window as any).__openShutter = openShutter;
}
