/**
 * SmartReception — Magnetic Button Effect
 *
 * Buttons subtly follow the cursor when hovered,
 * creating a magnetic feel like premium agency sites.
 */

import gsap from 'gsap';

export function initMagneticButtons(): void {
    const buttons = document.querySelectorAll<HTMLElement>('.btn');

    buttons.forEach((btn) => {
        btn.classList.add('btn--magnetic');

        btn.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.4,
                ease: 'power2.out',
            });

            // Radial highlight follows cursor
            const px = ((e.clientX - rect.left) / rect.width) * 100;
            const py = ((e.clientY - rect.top) / rect.height) * 100;
            btn.style.setProperty('--mouse-x', `${px}%`);
            btn.style.setProperty('--mouse-y', `${py}%`);
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.3)',
            });
        });
    });
}
