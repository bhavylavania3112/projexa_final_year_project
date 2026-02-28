/**
 * SmartReception — GSAP Scroll Reveal Animations
 *
 * Uses GSAP ScrollTrigger for premium scroll-based reveals
 * with stagger, scale, rotation, and blur effects.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollReveal(): void {
    // ---- Generic reveal elements ----
    const revealEls = document.querySelectorAll<HTMLElement>('.reveal');

    revealEls.forEach((el) => {
        // Determine delay from class
        let delay = 0;
        if (el.classList.contains('reveal-delay-1')) delay = 0.1;
        else if (el.classList.contains('reveal-delay-2')) delay = 0.2;
        else if (el.classList.contains('reveal-delay-3')) delay = 0.3;
        else if (el.classList.contains('reveal-delay-4')) delay = 0.4;

        gsap.fromTo(
            el,
            {
                opacity: 0,
                y: 40,
                filter: 'blur(4px)',
            },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1,
                delay,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            }
        );
    });

    // ---- Pipeline cards stagger ----
    const pipelineCards = document.querySelectorAll<HTMLElement>('.pipeline__card');
    if (pipelineCards.length > 0) {
        gsap.fromTo(
            pipelineCards,
            {
                opacity: 0,
                y: 60,
                scale: 0.9,
                rotationX: -15,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationX: 0,
                duration: 0.9,
                stagger: 0.15,
                ease: 'back.out(1.2)',
                scrollTrigger: {
                    trigger: '.pipeline__grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }

    // ---- Pipeline connecting line draw ----
    const pipelineLine = document.querySelector<HTMLElement>('.pipeline__line');
    if (pipelineLine) {
        gsap.fromTo(
            pipelineLine,
            { scaleX: 0 },
            {
                scaleX: 1,
                duration: 1.2,
                ease: 'power3.inOut',
                scrollTrigger: {
                    trigger: '.pipeline__grid',
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }

    // ---- Hero glass card entrance ----
    const glassCard = document.querySelector<HTMLElement>('.hero__glass-card');
    if (glassCard) {
        gsap.fromTo(
            glassCard,
            {
                opacity: 0,
                y: 30,
                scale: 0.95,
                boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                duration: 1,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: glassCard,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }

    // ---- Accuracy ring SVG animation ----
    const accuracyFill = document.querySelector<SVGCircleElement>('.accuracy-ring__fill');
    if (accuracyFill) {
        gsap.fromTo(
            accuracyFill,
            { strokeDashoffset: 175 },
            {
                strokeDashoffset: 17.5, // 90% fill
                duration: 2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.terminal',
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }

    // ---- Hero accent underline draw ----
    const accentUnderline = document.querySelector<HTMLElement>('.hero__title-accent');
    if (accentUnderline) {
        gsap.to(accentUnderline, {
            scrollTrigger: {
                trigger: accentUnderline,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
            onStart: () => {
                gsap.to(accentUnderline.querySelector('::after') || accentUnderline, {
                    '--accent-opacity': 0.4,
                    '--accent-scale': 1,
                    duration: 0.8,
                    delay: 0.5,
                });
            },
        });

        // Use a pseudo-element workaround
        gsap.fromTo(
            '.hero__title-accent::after',
            { scaleX: 0, opacity: 0 },
            {
                scaleX: 1,
                opacity: 0.4,
                duration: 0.8,
                delay: 1,
                ease: 'power3.out',
            }
        );
    }

    // ---- Footer reveal ----
    const footerElements = document.querySelectorAll<HTMLElement>(
        '.footer__brand, .footer__links, .footer__bottom'
    );
    if (footerElements.length > 0) {
        gsap.fromTo(
            footerElements,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.footer',
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }
}
