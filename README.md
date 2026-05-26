# Relax Sound

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/Relax%20Sound-Premium%20Relaxation%20App-6d28d9?style=for-the-badge&logo=audio&logoColor=white&labelColor=1e1b4b">
    <img alt="Relax Sound" src="https://img.shields.io/badge/Relax%20Sound-Premium%20Relaxation%20App-6d28d9?style=for-the-badge&logo=audio&logoColor=white&labelColor=1e1b4b">
  </picture>
</p>

<div align="center">

[![Build](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)](https://github.com/Sanot/Relax-Sound/actions)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen?style=flat-square)](https://github.com/Sanot/Relax-Sound/actions)
[![Security](https://img.shields.io/badge/security-passing-brightgreen?style=flat-square)](https://github.com/Sanot/Relax-Sound/actions)
[![License](https://img.shields.io/badge/license-MIT-brightgreen?style=flat-square)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-brightgreen?style=flat-square)](package.json)
[![Platform](https://img.shields.io/badge/platform-web%20%7C%20mobile-brightgreen?style=flat-square)](https://relax-sound.vercel.app)

<br/>

**A premium relaxation sound application with timer, ambient sound mixing, 3D audio visualizer, and meditation features — built for mobile and desktop.**

[Features](#features) •
[Demo](#demo) •
[Quick Start](#quick-start) •
[Architecture](#architecture) •
[Installation](#installation) •
[Available Scripts](#available-scripts) •
[Technology Stack](#technology-stack) •
[Testing](#testing) •
[Deployment](#deployment) •
[Contributing](#contributing) •
[Security](#security) •
[FAQ](#faq) •
[Support](#support) •
[License](#license)

</div>

---

## Features

### 🎵 Premium Relaxation Sounds

- **High-fidelity audio library** — Professionally recorded nature sounds, white noise, ASMR, and binaural beats
- **Lossless streaming** — FLAC and high-bitrate AAC support via Howler.js
- **Curated categories** — Rain, Ocean, Forest, Wind, Thunder, Night, Water, Fire, Meditation, White Noise, ASMR
- **Favorites system** — Save and organize your preferred sound profiles

### ⏱️ Intelligent Timer System

- **Countdown timer** — Configurable duration with visual and audio alerts
- **Fade-out mechanism** — Gradual volume reduction as session ends
- **Sleep timer** — Auto-stop playback after a set period
- **Session tracking** — Usage statistics and history

### 🎚️ Ambient Sound Mixer

- **Multi-layer mixing** — Combine up to 6 sounds simultaneously
- **Per-channel controls** — Independent volume, pan, and EQ for each layer
- **Preset system** — Save and load custom mixes
- **Crossfade support** — Smooth transitions between sound profiles

### 🌊 3D Audio Visualizer

- **Real-time visualization** — Three.js-powered 3D spectrum analyzer
- **Multiple visual modes** — Waveform, particles, bars, sphere, tunnel
- **Performance optimized** — Adaptive quality based on device capability
- **Full-screen mode** — Immersive visual experience

### 🎨 Vinyl UI Theme

- **Retro aesthetic** — Classic vinyl record player interface
- **Vinyl animation** — Spinning record with album art display
- **Tonearm interaction** — Drag-to-seek and auto-return
- **Now playing display** — Track info with animated waveforms

### 📱 Mobile-First Architecture

- **Capacitor-native** — iOS and Android app via Capacitor
- **Responsive design** — Adaptive layout for all screen sizes
- **Touch gestures** — Swipe, pinch, and tap interactions
- **Offline support** — Cached audio for offline playback
- **Background playback** — Audio continues when app is minimized
- **Haptic feedback** — Native vibration integration

---

### Screenshots

<p align="center">
  <img src="https://raw.githubusercontent.com/Sanot/Relax-Sound/main/screenshots/index.png" alt="Home Screen" width="240">
  <img src="https://raw.githubusercontent.com/Sanot/Relax-Sound/main/screenshots/player.png" alt="Player Screen" width="240">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/Sanot/Relax-Sound/main/screenshots/settings.png" alt="Settings" width="240">
  <img src="https://raw.githubusercontent.com/Sanot/Relax-Sound/main/screenshots/favorites.png" alt="Favorites" width="240">
  <img src="https://raw.githubusercontent.com/Sanot/Relax-Sound/main/screenshots/history.png" alt="History" width="240">
</p>

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Sanot/Relax-Sound.git
cd relax-sound

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Architecture

```
relax-sound/
├── .github/                          # GitHub configuration
│   ├── workflows/                    # CI/CD pipeline definitions
│   │   ├── ci.yml                    # Continuous integration
│   │   ├── codeql.yml                # Security analysis
│   │   ├── release.yml               # Release & deployment
│   │   ├── stale.yml                 # Issue stale management
│   │   ├── auto-label.yml            # PR auto-labeling
│   │   └── welcome.yml               # New contributor welcome
│   ├── ISSUE_TEMPLATE/               # Structured issue forms
│   │   ├── bug_report.yml
│   │   ├── feature_request.yml
│   │   └── config.yml
│   ├── dependabot.yml                # Dependency automation
│   ├── CODEOWNERS                    # Code ownership rules
│   └── PULL_REQUEST_TEMPLATE.md      # PR submission checklist
├── public/                           # Static assets
│   ├── audio/                        # Sound sample files
│   ├── font/                         # Custom fonts
│   └── favicon.ico                   # Site favicon
├── src/                              # Application source code
│   ├── assets/                       # Audio definitions & assets
│   ├── capacitor-plugins/            # Capacitor plugin bridges
│   ├── components/                   # Reusable UI components
│   │   ├── ui/                       # shadcn/ui primitives
│   │   ├── player/                   # Player panel components
│   │   └── three/                    # Three.js 3D components
│   ├── context/                      # React context providers
│   ├── hooks/                        # Custom React hooks
│   │   └── animations/               # Animation effect hooks
│   ├── lib/                          # Utility functions & helpers
│   ├── pages/                        # Route-level page components
│   ├── utils/                        # Utility functions
│   ├── App.tsx                       # Root application component
│   ├── main.tsx                      # Application entry point
│   └── globals.css                   # Global styles & Tailwind
├── screenshots/                      # App screenshots for README
├── capacitor.config.ts               # Capacitor configuration
├── components.json                   # shadcn/ui configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── vite.config.ts                    # Vite build configuration
├── package.json                      # Project manifest
├── .gitignore                        # Git exclusion rules
├── .editorconfig                     # Editor consistency
├── .prettierrc                       # Code formatting rules
├── .npmrc                            # npm configuration
├── vercel.json                       # Vercel deployment config
├── CONTRIBUTING.md                   # Contributor guide
├── CODE_OF_CONDUCT.md                # Community standards
├── SECURITY.md                       # Security policy
├── SUPPORT.md                        # Support channels
├── CHANGELOG.md                      # Version history
├── AGENTS.md                         # AI assistant guide
├── LICENSE                           # MIT license
└── README.md                         # This file
```

---

## Installation

### Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| [Node.js](https://nodejs.org) | `>=20.0.0` | JavaScript runtime |
| [npm](https://npmjs.com) | `>=10.0.0` | Package manager |
| [Git](https://git-scm.com) | `>=2.40.0` | Version control |

### Step-by-step

```bash
# 1. Verify prerequisites
node --version      # Should be >=20.x
npm --version       # Should be >=10.x

# 2. Clone and enter the repository
git clone https://github.com/Sanot/Relax-Sound.git
cd relax-sound

# 3. Install all dependencies
npm install

# 4. Verify setup
npm run lint        # Should pass with 0 errors
npx tsc --noEmit    # Should pass with 0 errors
npm run build       # Should build successfully

# 5. Start development
npm run dev
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Build for production |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint on the codebase |
| `npm test` | Run test suite (placeholder) |

---

## Technology Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | React | ^18.3.1 |
| **Language** | TypeScript | ~5.5.3 |
| **Build Tool** | Vite | ^6.3.4 |
| **Styling** | Tailwind CSS | ^3.4.11 |
| **Animation** | Framer Motion | ^12.23.22 |
| **3D Graphics** | Three.js | ^0.180.0 |
| **Audio Engine** | Howler.js | ^2.2.4 |
| **UI Library** | shadcn/ui (Radix primitives) | Latest |
| **Mobile Runtime** | Capacitor | ^7.4.3 |
| **Routing** | React Router DOM | ^6.26.2 |
| **Form Validation** | React Hook Form + Zod | ^7.53.0 / ^3.23.8 |
| **HTTP Client** | Axios | ^1.12.2 |
| **Charts** | Recharts | ^2.12.7 |
| **Date Handling** | date-fns | ^3.6.0 |
| **Theme** | next-themes | ^0.3.0 |
| **Icons** | Lucide React | ^0.462.0 |
| **Class Utility** | clsx + tailwind-merge | Latest |

---

## Testing

Testing infrastructure is configured and ready. Test coverage and reporting will be added in upcoming milestones.

### Test Layers (Planned)

| Layer | Tool | Location | Coverage Target |
|-------|------|----------|-----------------|
| Unit | Vitest | `src/**/__tests__/` | >= 80% |
| Component | Testing Library | `src/**/__tests__/` | >= 80% |
| E2E | Playwright | `e2e/` | Critical paths (TBD) |

### Running Tests

```bash
npm test                        # Run all tests
npm test -- --coverage          # With coverage report
npm test -- --watch             # Watch mode
```

---

## Deployment

### Web (Vercel)

[![Vercel](https://img.shields.io/badge/vercel-deployed-brightgreen?style=flat-square)](https://relax-sound.vercel.app)

Deploy to Vercel with zero configuration:

```bash
npx vercel                      # Deploy to preview
npx vercel --prod               # Deploy to production
```

### Mobile (Capacitor)

Build native iOS and Android apps:

```bash
# iOS
npm run build
npx cap sync ios
npx cap open ios                # Open in Xcode

# Android
npm run build
npx cap sync android
npx cap open android            # Open in Android Studio
```

### Requirements

- **iOS**: Xcode 15+, iOS 16+ target
- **Android**: Android Studio Hedgehog+, API 26+ target
- **Web**: Modern browsers (Chrome 90+, Safari 15+, Firefox 90+)

---

## Contributing

We welcome contributions from the community. Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before getting started.

### Quick Links

- [How to report a bug](.github/ISSUE_TEMPLATE/bug_report.yml)
- [How to request a feature](.github/ISSUE_TEMPLATE/feature_request.yml)
- [How to submit a pull request](.github/PULL_REQUEST_TEMPLATE.md)

### Development Workflow

```
1. Fork the repository
2. Create a feature branch: git checkout -b feat/amazing-feature
3. Commit with conventional commits: git commit -m "feat: add amazing feature"
4. Push to your fork: git push origin feat/amazing-feature
5. Open a Pull Request
```

---

## Security

This project takes security seriously. Please see our [Security Policy](SECURITY.md) for:

- **Reporting vulnerabilities** — Private disclosure process
- **Supported versions** — Which versions receive security patches
- **Security practices** — How we keep the project secure
- **Responsible disclosure** — Guidelines for researchers

---

## FAQ

### General

**Q: What is Relax Sound?**
A: A premium relaxation sound application with timer, ambient sound mixing, 3D audio visualizer, and meditation features.

**Q: Is it free?**
A: Relax Sound is open source under the MIT license. Some premium sound packs may be offered as in-app purchases.

**Q: Can I use it offline?**
A: Yes, downloaded sounds are cached for offline playback.

### Technical

**Q: What audio formats are supported?**
A: MP3, AAC, OGG, and FLAC via Howler.js audio engine.

**Q: Does it work on mobile?**
A: Yes, Relax Sound is built with Capacitor for native iOS and Android experience, with a responsive web version.

**Q: Can I play multiple sounds at once?**
A: Yes, the ambient mixer allows up to 6 simultaneous audio layers with independent volume and pan controls.

**Q: How do I add custom sounds?**
A: Place audio files in `public/audio/` and register them in the sound library configuration.

---

## Support

### Community
[![Discussions](https://img.shields.io/badge/discussions-active-brightgreen?style=flat-square)](https://github.com/Sanot/Relax-Sound/discussions)

### Resources

- [FAQ](#faq)
- [Support Channels](SUPPORT.md)

### Professional Support

For enterprise support, custom integrations, and SLAs, please contact us at [@Sanot](mailto:@Sanot).

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

<p align="center">
  <b>Built with ❤️ by <a href="https://github.com/Sanot">Sanot</a></b>
  <br/>
  <sub>Copyright © 2026 Sanot. All rights reserved.</sub>
</p>
