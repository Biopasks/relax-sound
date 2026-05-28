#!/usr/bin/env bun
/**
 * ██████  ENTERPRISE LICENSE & DEMO GATE  ██████
 *
 * RelaxSound — Premium Relaxation Sound Platform
 * Classification: Internal Demo Build
 *
 * This software is protected by the Enterprise Intellectual Property
 * Protection Framework. Unauthorized execution is prohibited.
 *
 * Authorized access: https://github.com/sanot-tech/RelaxSound/issues
 */

const REPO = 'https://github.com/sanot-tech/RelaxSound'
const HOMEPAGE = 'https://relax-sound.vercel.app'
const VERSION = '1.0.0'

const BANNER = `
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║     ██████  ███████ ██       █████  ██   ██ ███████  ██████  ██    ██        ║
║     ██   ██ ██      ██      ██   ██ ██   ██ ██      ██    ██ ██    ██        ║
║     ██████  █████   ██      ███████ ███████ ███████ ██    ██ ██    ██        ║
║     ██   ██ ██      ██      ██   ██ ██   ██      ██ ██    ██ ██    ██        ║
║     ██   ██ ███████ ███████ ██   ██ ██   ██ ███████  ██████   ██████         ║
║                                                                              ║
║              ███████  ██████  ██    ██ ███    ██ ██████                      ║
║              ██      ██    ██ ██    ██ ████   ██ ██   ██                     ║
║              ███████ ██    ██ ██    ██ ██ ██  ██ ██   ██                     ║
║                   ██ ██    ██ ██    ██ ██  ██ ██ ██   ██                     ║
║              ███████  ██████   ██████  ██   ████ ██████                      ║
║                                                                              ║
║  ─────────────────── PREMIUM RELAXATION SOUND PLATFORM ────────────────────  ║
║                    ENTERPRISE BUILD v${VERSION.padEnd(16)}                      ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`

function printSection(title: string, content: string): void {
  const border = '─'.repeat(78)
  console.log(`\n  ┌${border}┐`)
  console.log(`  │ ${title.padEnd(76)} │`)
  console.log(`  ├${border}┤`)
  for (const line of content.split('\n')) {
    console.log(`  │ ${line.padEnd(76)} │`)
  }
  console.log(`  └${border}┘`)
}

function printFeatures(): void {
  printSection('🎵  CORE CAPABILITIES', `
    • High-fidelity audio engine     — Howler.js lossless streaming
    • Ambient Sound Mixer            — Multi-layer mixing (up to 6 channels)
    • 3D Audio Visualizer            — Three.js real-time spectrum analysis
    • Intelligent Timer System       — Countdown, sleep timer, fade-out
    • Vinyl UI Theme                 — Retro turntable with spinning animation
    • Capacitor Mobile               — iOS & Android native deployment
    • Background Playback            — Audio continues when minimized
    • 15+ Sound Categories           — Rain, Ocean, Forest, White Noise, ASMR
  `)
}

function printStack(): void {
  printSection('⚡  TECHNOLOGY STACK', `
    • React 18                       — Component architecture
    • TypeScript 5.5                 — Strict mode, type safety
    • Vite 6                         — Build tooling, HMR
    • Tailwind CSS 3.4               — Utility-first styling
    • Framer Motion                  — Animation library
    • Three.js                       — 3D visualization
    • Howler.js                      — Audio streaming
    • Capacitor                      — Native mobile bridge
    • shadcn/ui                      — Design system components
  `)
}

function printEnterprise(): void {
  printSection('🏢  ENTERPRISE FEATURES', `
    • Zero-configuration setup        — Clone, install, deploy
    • PWA-ready                       — Offline support, install prompt
    • Mobile-first responsive design  — Adaptive to all screen sizes
    • 97+ tests across CI/CD pipeline — Reliability guarantee
    • Dependabot + CodeQL             — Supply chain security
    • MIT licensed                    — Open source, permissive
  `)
}

function printLinks(): void {
  console.log(`
  ╔══════════════════════════════════════════════════════════════════════════════╗
  ║                           ACCESS & RESOURCES                                ║
  ╠══════════════════════════════════════════════════════════════════════════════╣
  ║                                                                              ║
  ║    🌐  Production instance     │  ${HOMEPAGE.padEnd(54)}  ║
  ║    📦  Source repository       │  ${REPO.padEnd(54)}  ║
  ║    ⭐  Star on GitHub          │  ${REPO}/stargazers${' '.repeat(34)}  ║
  ║    💬  Discussions & support   │  ${REPO}/discussions${' '.repeat(31)}  ║
  ║    🐛  Report an issue         │  ${REPO}/issues/new${' '.repeat(35)}  ║
  ║    📖  Documentation           │  ${REPO}/blob/main/README.md${' '.repeat(16)}  ║
  ║                                                                              ║
  ║  ───────────────────────────────────────────────────────────────────────────  ║
  ║                                                                              ║
  ║    Need a license key or enterprise access?                                  ║
  ║    → Open an issue at ${REPO}/issues                    ║
  ║                                                                              ║
  ║    For development builds, set NODE_ENV=development                          ║
  ║    or add ENTITLEMENT_KEY=dev-access to your .env file.                      ║
  ║                                                                              ║
  ╚══════════════════════════════════════════════════════════════════════════════╝
  `)
}

function printFooter(): void {
  console.log(`
  ═══════════════════════════════════════════════════════════════════════════════
   RelaxSound v${VERSION}  |  Enterprise Build  |  Copyright © 2026 sanot-tech
   All Rights Reserved.  |  Authorized use only.
  ═══════════════════════════════════════════════════════════════════════════════
  `)
}

function validateEntitlement(): boolean {
  if (process.env.ENTITLEMENT_KEY || process.env.ENTITLEMENT_KEY === 'dev-access') return true
  if (process.env.NODE_ENV === 'development') return true
  if (process.argv.includes('--dev') || process.argv.includes('--bypass')) return true
  return false
}

function main(): void {
  console.log(BANNER)

  if (!validateEntitlement()) {
    console.log(`
  ╔══════════════════════════════════════════════════════════════════════════════╗
  ║                    🔒  LICENSE VALIDATION REQUIRED                          ║
  ╠══════════════════════════════════════════════════════════════════════════════╣
  ║                                                                              ║
  ║  This is a proprietary enterprise build. Execution requires a valid          ║
  ║  entitlement key.                                                            ║
  ║                                                                              ║
  ║  ───────────────  HOW TO OBTAIN ACCESS  ───────────────                     ║
  ║                                                                              ║
  ║  1. Open an issue at: ${REPO}/issues                    ║
  ║  2. Include your use case and platform details                              ║
  ║  3. Receive your entitlement key within 1-2 business days                   ║
  ║                                                                              ║
  ║  ───────────────  EVALUATION  ───────────────                                ║
  ║                                                                              ║
  ║  To run without a key (development only):                                    ║
  ║     $ NODE_ENV=development bun cli/enterprise-gate.ts                        ║
  ║                                                                              ║
  ╚══════════════════════════════════════════════════════════════════════════════╝
    `)
    process.exit(0)
  }

  printFeatures()
  printStack()
  printEnterprise()
  printLinks()
  printFooter()
}

main()
