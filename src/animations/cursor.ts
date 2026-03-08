/**
 * SmartReception — Custom Cursor
 *
 * Premium custom cursor with dot + ring that reacts
 * to hoverable elements. Optimized with gsap.quickTo
 * instead of creating new tweens every tick.
 */

import gsap from 'gsap';

export function initCustomCursor(): void {
    // Only on non-touch devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    // Create cursor elements
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);

    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(ring);

    // Use quickTo — creates a reusable setter that's ~50x faster
    // than creating a new gsap.to() on every frame
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    // Track mouse — single passive listener, no rAF loop
    window.addEventListener('mousemove', (e: MouseEvent) => {
        dotX(e.clientX - 4);
        dotY(e.clientY - 4);
        ringX(e.clientX - 18);
        ringY(e.clientY - 18);

        // Show cursor after first move
        if (!dot.classList.contains('visible')) {
            dot.classList.add('visible');
            ring.classList.add('visible');
        }
    }, { passive: true });

    // Hover detection
    const hoverTargets = document.querySelectorAll<HTMLElement>(
        'a, button, .btn, .pipeline__card, .header__nav-link'
    );

    hoverTargets.forEach((target) => {
        target.addEventListener('mouseenter', () => {
            dot.classList.add('hovering');
            ring.classList.add('hovering');
        });
        target.addEventListener('mouseleave', () => {
            dot.classList.remove('hovering');
            ring.classList.remove('hovering');
        });
    });

    // Hide on mouse leave window
    document.addEventListener('mouseleave', () => {
        dot.classList.remove('visible');
        ring.classList.remove('visible');
    });

    document.addEventListener('mouseenter', () => {
        dot.classList.add('visible');
        ring.classList.add('visible');
    });
}
