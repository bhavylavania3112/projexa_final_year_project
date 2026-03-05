/**
 * SmartReception — Text Split Animation
 *
 * Splits hero title text into individual characters
 * and animates them in with staggered 3D effects.
 */

import gsap from 'gsap';

/**
 * Splits text content of an element into wrapped `<span>` characters,
 * preserving child elements (like <br>, <span>) intact.
 */
function splitTextIntoChars(element: HTMLElement): HTMLElement[] {
    const chars: HTMLElement[] = [];
    const nodes = Array.from(element.childNodes);

    nodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent || '';
            const fragment = document.createDocumentFragment();

            // Split into words first, then chars within each word
            const words = text.split(/( )/); // keep spaces as separate tokens

            words.forEach((word) => {
                if (word === ' ') {
                    fragment.appendChild(document.createTextNode(' '));
                } else if (word.length > 0) {
                    // Wrap all chars of this word in a word-level span
                    const wordSpan = document.createElement('span');
                    wordSpan.className = 'word';
                    wordSpan.style.display = 'inline-block';
                    wordSpan.style.whiteSpace = 'nowrap';

                    word.split('').forEach((char) => {
                        const span = document.createElement('span');
                        span.className = 'char';
                        span.textContent = char;
                        span.style.display = 'inline-block';
                        span.style.opacity = '0';
                        span.style.transform = 'translateY(40px) rotateX(-40deg)';
                        wordSpan.appendChild(span);
                        chars.push(span);
                    });

                    fragment.appendChild(wordSpan);
                }
            });

            node.replaceWith(fragment);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            // Recursively split text in child elements
            if (el.tagName === 'BR') return;
            const innerChars = splitTextIntoChars(el);
            chars.push(...innerChars);
        }
    });

    return chars;
}

export function initTextSplit(): void {
    const heroTitle = document.querySelector<HTMLElement>('.hero__title');
    if (!heroTitle) return;

    // Remove the reveal class so GSAP takes over
    heroTitle.classList.remove('reveal', 'reveal-delay-1');
    heroTitle.style.opacity = '1';
    heroTitle.style.transform = 'none';

    const chars = splitTextIntoChars(heroTitle);

    if (chars.length === 0) return;

    // Animate characters in with stagger
    gsap.to(chars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: 'back.out(1.5)',
        delay: 0.3,
    });

    // Animate the accent underline after text appears
    const accentEl = heroTitle.querySelector<HTMLElement>('.hero__title-accent');
    if (accentEl) {
        // We need to animate the ::after pseudo-element
        // Use GSAP's cssRule or just animate a CSS custom property
        gsap.fromTo(
            accentEl,
            {},
            {
                delay: 1.0,
                duration: 0.8,
                ease: 'power3.out',
                onStart: () => {
                    // Force the pseudo-element to appear
                    const style = document.createElement('style');
                    style.textContent = `.hero__title-accent::after { opacity: 0.4 !important; transform: scaleX(1) !important; transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease !important; }`;
                    document.head.appendChild(style);
                },
            }
        );
    }
}
