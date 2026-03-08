/**
 * SmartReception — Main Entry Point
 *
 * Imports all styles and initializes all animation modules.
 * This is the single entry point for the Vite build.
 */

// ---- Styles ----
import './styles/base.css';
import './styles/shutter.css';
import './styles/background.css';
import './styles/header.css';
import './styles/hero.css';
import './styles/pipeline.css';
import './styles/dashboard.css';
import './styles/partners.css';
import './styles/footer.css';
import './styles/animations.css';
import './styles/callWidget.css';

// ---- Lenis smooth scroll CSS ----
import 'lenis/dist/lenis.css';

// ---- Animations ----
import { initShutter } from './animations/shutter';
import { initScrollReveal } from './animations/scrollReveal';
import { initTerminal } from './animations/terminal';
import { initParallax } from './animations/parallax';
import { initMagneticButtons } from './animations/magneticBtn';
import { initTextSplit } from './animations/textSplit';
import { initCustomCursor } from './animations/cursor';

// ---- Components ----
import { initHeader } from './components/header';
import { initSmoothScroll } from './components/smoothScroll';
import { initCallWidget } from './components/callWidget';

// ---- Initialize Everything ----
document.addEventListener('DOMContentLoaded', () => {
    // Core components first
    initSmoothScroll();
    initHeader();

    // Shutter intro (blocks page until opened)
    initShutter();

    // GSAP animations
    initTextSplit();
    initScrollReveal();
    initTerminal();
    initParallax();
    initMagneticButtons();
    initCustomCursor();

    // Vapi call widget
    initCallWidget();

    console.log('🚀 SmartReception initialized with GSAP + Lenis');
});
