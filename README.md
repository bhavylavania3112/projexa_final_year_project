<div align="center">

# 🎙️ SmartReception

### AI-Powered Voice Agent — Never Miss a Revenue-Generating Call Again

[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)
[![Vapi AI](https://img.shields.io/badge/Vapi-AI%20Chat-000000?style=for-the-badge)](https://vapi.ai/)

<br />

*A premium, animated landing page for an AI-powered receptionist service that handles calls, books appointments, and converts callers into customers — 24/7 with under 2-second latency.*

<br />

</div>

---

## ✨ Overview

**SmartReception** is an AI voice agent platform that replaces traditional receptionists with intelligent, always-on virtual agents. This repository contains the marketing website — a beautifully crafted, animation-rich single-page application that showcases the product's capabilities and lets visitors interact with a live AI demo.

> 🎯 **Live AI Chat** — Visitors can talk to the SmartReception AI directly through the embedded Vapi widget.

---

## 🚀 Features

### 🎬 Cinematic Intro Animation
A **50-frame canvas-based animation** that plays a shutter-opening effect when the user first visits the site. The frames are preloaded and rendered on a full-screen `<canvas>` element at 30fps, triggered by scroll, click, touch swipe, or keyboard input.

### 🔤 3D Text Split Animation
The hero title characters animate in with a staggered **3D rotation + translate** effect using GSAP. Characters are grouped by word to prevent mid-word line breaks while maintaining per-character animation control.

### 📜 Scroll-Triggered Reveals
All sections use GSAP-powered **scroll reveal animations** with configurable delays and stagger effects, creating a cinematic scrolling experience.

### 🎯 Interactive Elements
- **Magnetic buttons** — Buttons subtly follow the cursor with a radial highlight effect
- **Custom cursor** — A dual-ring cursor with hover state changes (hidden on mobile)
- **Parallax backgrounds** — Glow orbs move at different speeds during scroll
- **Waveform visualizer** — Animated audio bars in the hero section

### 💬 Live AI Chat Widget
Embedded **Vapi AI widget** in the bottom-right corner lets visitors have a real conversation with the SmartReception AI agent — demonstrating the product live.

### 🖥️ Dashboard Terminal
A realistic **terminal-style UI** showcasing a live agent interaction: transcription → AI response → action execution → confirmation — all auto-typed with GSAP.

### 🤝 Partner Marquee
An infinite-scroll ticker displaying technology partners (Deepgram, Gemini, n8n, ElevenLabs, Twilio) with seamless CSS animation.

### 📱 Responsive Design
Fully responsive layout with mobile navigation drawer, adaptive typography, and touch-friendly interactions.

---

## 🏗️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Build Tool** | [Vite](https://vitejs.dev/) | Lightning-fast HMR & optimized builds |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| **Animation** | [GSAP](https://gsap.com/) | Professional-grade animations |
| **Smooth Scroll** | [Lenis](https://lenis.studiofreight.com/) | Buttery-smooth scroll experience |
| **AI Chat** | [Vapi](https://vapi.ai/) | Embedded AI voice/chat widget |
| **Styling** | Vanilla CSS | Custom design system with CSS variables |

---

## 🏛️ Architecture

```
SmartReception/
├── index.html                  # Single-page HTML structure
├── public/
│   └── frames/                 # 50 PNG frames for intro animation
├── src/
│   ├── main.ts                 # Entry point — imports & initializes everything
│   ├── animations/
│   │   ├── shutter.ts          # Frame-sequence canvas intro animation
│   │   ├── textSplit.ts        # Hero title character split + 3D animation
│   │   ├── scrollReveal.ts     # GSAP scroll-triggered reveal effects
│   │   ├── terminal.ts         # Dashboard terminal auto-typing
│   │   ├── parallax.ts         # Parallax glow orb effects
│   │   ├── magneticBtn.ts      # Magnetic button hover effect
│   │   └── cursor.ts           # Custom dual-ring cursor
│   ├── components/
│   │   ├── header.ts           # Header scroll effects & mobile nav
│   │   └── smoothScroll.ts     # Lenis smooth scroll setup
│   └── styles/
│       ├── base.css            # CSS variables, resets, typography
│       ├── shutter.css         # Intro canvas overlay styles
│       ├── background.css      # Glow orbs & page background
│       ├── header.css          # Navigation & mobile drawer
│       ├── hero.css            # Hero section & waveform
│       ├── pipeline.css        # "How It Works" pipeline cards
│       ├── dashboard.css       # Terminal UI styles
│       ├── partners.css        # Partner marquee ticker
│       ├── footer.css          # Footer layout & links
│       └── animations.css      # Scroll reveal, cursor, & responsive
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies & scripts
```

---

## 🛠️ The AI Pipeline

SmartReception's AI agent operates through four modular stages:

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   🎤 STT    │───▶│   🧠 LLM    │───▶│   ⚡ Action  │───▶│   🔊 TTS    │
│  Deepgram   │    │   Gemini    │    │  n8n / Make  │    │ ElevenLabs  │
│             │    │             │    │             │    │             │
│ Real-time   │    │ Context-    │    │ Automated   │    │ Natural,    │
│ transcripts │    │ aware       │    │ booking,    │    │ human-like  │
│ 95%+ acc.   │    │ reasoning   │    │ CRM, routes │    │ responses   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

---

## ⚡ Quick Start

### Prerequisites
- **Node.js** 18+ and **npm**

### Installation

```bash
# Clone the repository
git clone https://github.com/bhavylavania3112/projexa_final_year_project.git
cd projexa_final_year_project

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be running at **http://localhost:3000** 🚀

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🎨 Design Philosophy

SmartReception's design follows these principles:

- **Cinematic First Impression** — The shutter-opening intro creates a "reveal" moment that hooks visitors
- **Motion with Purpose** — Every animation serves the narrative: scroll reveals guide the eye, the terminal demo tells a story
- **Premium Minimalism** — Clean typography, generous whitespace, subtle glassmorphism
- **Vibrant Accents** — A warm gradient palette (coral, blue, yellow) contrasts with the clean white base
- **Interactive Proof** — The live AI chat widget turns a marketing page into a product demo

---

## 📄 License

© 2026 SmartReception Inc. All rights reserved.

---

<div align="center">

**Built with ❤️ by Bhavy**

*SmartReception — From missed calls to booked appointments, effortless and reliable.*

</div>
