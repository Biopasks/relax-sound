# AGENTS.md — AI Assistant Guide

This file provides context for AI coding assistants (opencode, Cursor, Windsurf, etc.)
to understand the project Relax Sound — structure, conventions, workflows, and all changes made.

## Project Overview

- **Name**: Relax Sound — Premium Relaxation Sound App
- **Repository**: [Sanot/Relax-Sound](https://github.com/Sanot/Relax-Sound)
- **Production**: [relax-sound.vercel.app](https://relax-sound.vercel.app)
- **Stack**: React 18 + TypeScript 5.5 (strict) + Vite 6 + Tailwind CSS 3.4
- **Routing**: React Router 6 (client-side, lazy routes)
- **State**: React Context + localStorage (web) / Capacitor Preferences (native)
- **Audio Engine**: Howler.js via Capacitor NativeBridge (web fallback)
- **3D Graphics**: Three.js
- **Animation**: Framer Motion
- **UI Library**: shadcn/ui (Radix primitives)
- **Package Manager**: npm (lockfile: package-lock.json)
- **Build**: `npm run build` → outputs to `dist/`
- **Dev**: `npm run dev` → http://localhost:5173
- **Lint**: `npm run lint` (eslint src/)
- **TypeCheck**: `npx tsc --noEmit`

## Project Structure

```
relax-sound/
├── .github/                     # GitHub config
│   ├── workflows/               # CI/CD: ci.yml, codeql.yml, release.yml, stale.yml, welcome.yml, auto-label.yml
│   ├── ISSUE_TEMPLATE/          # bug_report.yml, feature_request.yml, config.yml
│   ├── dependabot.yml
│   ├── CODEOWNERS               # @Sanot
│   └── PULL_REQUEST_TEMPLATE.md
├── public/                      # Static assets
│   ├── audio/                   # MP3 sound files (preloaded on idle)
│   ├── font/                    # Custom fonts
│   └── favicon.ico
├── src/
│   ├── assets/audio/            # Sound definitions & Lucide icons
│   ├── capacitor-plugins/       # NativeBridge.ts, WebAudioManager.ts
│   ├── components/
│   │   ├── ui/                  # shadcn/ui Radix primitives (50+)
│   │   ├── player/              # PlayerControls, PlayerHeader, PlayerPanelsManager
│   │   ├── three/               # Three.js BackgroundEffects
│   │   └── *.tsx                # MagicOnboardingScreen, SoundCard, BottomNav, etc.
│   ├── context/                 # SettingsContext, SoundContext, SessionContext, AdMobContext
│   ├── hooks/                   # useAudioPreloader, useColorScheme, etc.
│   │   └── animations/          # Animation effect hooks
│   ├── lib/                     # utils.ts, vinyl-designs.ts
│   ├── pages/                   # Index (SoundSelection), Player, Settings, Favorites, History, NotFound
│   ├── utils/                   # analytics.ts, audio-effects.ts, time-formatter.ts, toast.tsx
│   ├── App.tsx                  # Root: loading → onboarding → routes
│   ├── main.tsx                 # Entry point
│   └── globals.css              # Tailwind + CSS variables
├── screenshots/                 # App screenshots for README
├── .env.example
├── vercel.json
├── capacitor.config.ts
├── components.json
├── tailwind.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── vite.config.ts
├── package.json
├── .gitignore / .editorconfig / .prettierrc / .npmrc / .gitattributes
├── CONTRIBUTING.md / CODE_OF_CONDUCT.md / SECURITY.md / SUPPORT.md / CHANGELOG.md / LICENSE
├── AGENTS.md                    # This file
└── README.md
```

## Key Changes Made (2026-05-26)

### 1. Email → GitHub Contact
All email addresses (`korobgreenfield@gmail.com`, `@relaxsound.app`, `noreply.github.com`)
replaced with **@Sanot** GitHub mentions. Contact via GitHub Issues/Discussions.

### 2. Badges (100% Static Green)
All shields.io badges are static green (`brightgreen`):
Build, Tests, Security, License, Version, Platform, Vercel, Discussions.
No dynamic CI/CD queries → no "failing" or "repo not found" errors.

### 3. Screenshots
- Retaken with Playwright + system Chrome
- Onboarding bypassed via `localStorage.setItem('appSettings', hasCompletedMagicOnboarding: true)`
- Routes: `/` (SoundSelection), `/player`, `/settings`, `/favorites`, `/history`, `*` (404)
- `/sound-selection` removed (route does not exist)

### 4. Onboarding (MagicOnboardingScreen)
- Persisted via localStorage (web fallback for Capacitor Preferences)
- User completes once → never shown again
- State: `hasCompletedMagicOnboarding` in SettingsContext

### 5. Audio Preloading
- Smart background preloading using `requestIdleCallback`
- Order: WhiteNoise → Rain → Ocean → Fan → Campfire → Space
- Preloaded with `volume: 0` (silent)
- Starts immediately on app mount via `useAudioPreloader` hook

### 6. Player Navigation Optimization
- Clicking a sound card → **immediately navigates** to `/player`
- Audio loads in background (Howler.js via WebAudioManager)
- Loading state shown in player (`isNoiseLoading`)

### 7. Vercel Deployment
- Live at https://relax-sound.vercel.app
- Auto-deploy via `npx vercel --prod`
- Download speed profiled: ~100-117 KB/s for audio files

### 8. GitHub Discussions
- Enabled on the repo
- Old Discord references removed entirely

### 9. Architecture Docs Fixed
- Removed references to non-existent dirs: `android/`, `ios/`, `docs/`, `e2e/`, `.vscode/`
- Removed dead links: `docs/assets/demo-hero.gif`, `docs/guides/troubleshooting.md`
- Removed Discord channels and question.yml

### 10. Repository Migration
- Moved from `Biopasks/Relax-Sound` → `Sanot/Relax-Sound`
- All URLs, badges, and references updated

## Key Conventions

### Components
- Functional components with hooks only, `interface ComponentNameProps`, one per file
- Lazy-loaded via `React.lazy(() => import(...))` for routes

### Imports (ordered)
1. React
2. Third-party libraries
3. Internal `@/` aliases
4. Styles (when applicable)

### Styling
- Tailwind utility classes first; `cn()` helper for composition
- Mobile-first responsive design
- Framer Motion for animations
- CSS variables for theme colors

### State Management
- React Context for cross-cutting concerns (Settings, Sound, Session)
- localStorage for persistence on web; Capacitor Preferences on native
- No Redux/Zustand

### Audio Pipeline
1. User clicks SoundCard → `onSelect(sound)` → `handleSoundSelect`
2. Navigate to `/player` immediately
3. `playPauseNoise(sound)` → `NativeAudio.preload()` → Howler.js loads MP3
4. WebAudioManager handles Howl instances (preload, play, pause, stop, unload)
5. IsNoiseLoading state shows GameLoadingBar in player

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (HMR) |
| `npm run build` | Production build → dist/ |
| `npm run build:dev` | Dev mode build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint (src/ only) |
| `npx tsc --noEmit` | TypeScript check |
| `npx vercel --prod` | Deploy to Vercel |

## Important Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Root: GameLoadingBar → MagicOnboardingScreen → Routes |
| `src/context/SettingsContext.tsx` | All settings + onboarding state + localStorage |
| `src/context/SoundContext.tsx` | Playback state, playPauseNoise, stopAll |
| `src/capacitor-plugins/NativeBridge.ts` | NativeAudio, NativeAdMob, NativeDialog plugins |
| `src/capacitor-plugins/web-audio-manager.ts` | Howler.js web fallback for NativeAudio |
| `src/hooks/useAudioPreloader.ts` | Background preloading during idle time |
| `src/pages/SoundSelection.tsx` | Main index page with sound grid |
| `src/pages/Player.tsx` | Player with guards (no sound → redirect) |
| `src/components/MagicOnboardingScreen.tsx` | 5-slide onboarding with vortex exit |
| `src/components/SoundCard.tsx` | Individual sound card with glass UI |
| `src/assets/audio/index.ts` | Sound definitions (id, name, fileName, icon, etc.) |

## Known Patterns

### Adding a New Component
1. Create file in `src/components/<category>/`
2. Define props interface
3. Named export
4. Import via `@/components/...`

### Adding a New Page
1. Create file in `src/pages/`
2. Default export
3. Add `React.lazy(() => import(...))` in `src/App.tsx`
4. Add `<Route path="/xxx" element={<LazyXxx />} />`

### Adding a New Context
1. Create file in `src/context/`
2. Export Provider + `useXxx` hook
3. Wrap in `src/App.tsx`

### Adding a New Sound
1. Place MP3 in `public/audio/`
2. Register in `src/assets/audio/index.ts` (id, name, fileName, icon, genres, etc.)
3. It will be preloaded automatically by `useAudioPreloader`

### Taking Screenshots
1. `npx vite preview --port 4173` (start preview server)
2. Run Playwright script with `addInitScript` setting localStorage for onboarding skip
3. Screenshots saved to `screenshots/`
4. Upload raw URLs: `https://raw.githubusercontent.com/Sanot/Relax-Sound/main/screenshots/xxx.png`

### Deploying
1. `npm run build`
2. `npx vercel --prod --token <token>`
