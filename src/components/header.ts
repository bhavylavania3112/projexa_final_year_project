/**
 * SmartReception — Header Component
 *
 * Handles mobile nav toggle, scroll-based header
 * background changes, and smooth scroll navigation.
 */

import gsap from 'gsap';

export function initHeader(): void {
    const menuOpen = document.getElementById('menuOpen');
    const menuClose = document.getElementById('menuClose');
    const mobileNav = document.getElementById('mobileNav');
    const header = document.getElementById('header');

    // ---- Mobile Nav Toggle ----
    if (menuOpen && mobileNav) {
        menuOpen.addEventListener('click', () => {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Animate mobile nav links
            const links = mobileNav.querySelectorAll<HTMLElement>('.mobile-nav__link, .btn');
            gsap.fromTo(
                links,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: 'power2.out',
                    delay: 0.1,
                }
            );
        });
    }

    if (menuClose && mobileNav) {
        menuClose.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close mobile nav on link click
    document.querySelectorAll('.mobile-nav__link').forEach((link) => {
        link.addEventListener('click', () => {
            if (mobileNav) {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // ---- Scroll-based header styling ----
    if (header) {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            if (currentScroll > 100) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
                header.style.background = 'rgba(255, 255, 255, 0.85)';
            } else {
                header.style.boxShadow = 'none';
                header.style.background = 'rgba(255, 255, 255, 0.65)';
            }

            lastScroll = currentScroll;
        });
    }

    // ---- Scroll Progress Bar ----
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const progress = height > 0 ? (scrolled / height) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    });
}
