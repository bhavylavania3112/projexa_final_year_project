/**
 * SmartReception — Custom Cursor
 *
 * Premium custom cursor with dot + ring that reacts
 * to hoverable elements with scale animations.
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

    let mouseX = 0;
    let mouseY = 0;

    // Track mouse
    window.addEventListener('mousemove', (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Show cursor after first move
        dot.classList.add('visible');
        ring.classList.add('visible');
    });

    // Smooth follow with GSAP
    gsap.ticker.add(() => {
        gsap.to(dot, {
            x: mouseX - 4,
            y: mouseY - 4,
            duration: 0.1,
            ease: 'power2.out',
        });
        gsap.to(ring, {
            x: mouseX - 18,
            y: mouseY - 18,
            duration: 0.25,
            ease: 'power2.out',
        });
    });

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
