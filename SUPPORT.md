# Support

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/Support-Channels-6d28d9?style=for-the-badge&logo=github&logoColor=white&labelColor=1e1b4b">
    <img alt="Support Channels" src="https://img.shields.io/badge/Support-Channels-6d28d9?style=for-the-badge&logo=github&logoColor=white&labelColor=1e1b4b">
  </picture>
</p>

<div align="center">

[![GitHub Discussions](https://img.shields.io/badge/discussions-active-brightgreen?style=flat-square)](https://github.com/Sanot/Relax-Sound/discussions)

</div>

---

## Table of Contents

- [Community Support](#community-support)
- [Documentation](#documentation)
- [Issue Tracker](#issue-tracker)
- [Professional Support](#professional-support)
- [Enterprise Support](#enterprise-support)
- [Before Asking for Help](#before-asking-for-help)
- [How to Ask Good Questions](#how-to-ask-good-questions)
- [FAQ](#faq)

---

## Community Support

### GitHub Discussions 💬

Use [GitHub Discussions](https://github.com/Sanot/Relax-Sound/discussions) for:
- General questions about the project
- Feature ideas and feedback
- Show and tell — share what you built
- Community connections

**Categories:**

| Category | Description |
|----------|-------------|
| Q&A | Questions and answers |
| Ideas | Feature suggestions |
| Show & Tell | Share your projects |
| General | Community discussion |
| Announcements | Project updates |





---

## Documentation

| Resource | Description | Link |
|----------|-------------|------|
| README | Quick start and overview | [README.md](README.md) |
| Contributing Guide | How to contribute | [CONTRIBUTING.md](CONTRIBUTING.md) |
| Code of Conduct | Community standards | [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) |
| Security Policy | Security reporting | [SECURITY.md](SECURITY.md) |
| Changelog | Version history | [CHANGELOG.md](CHANGELOG.md) |

---

## Issue Tracker

### Before Creating an Issue

- [ ] Search existing [issues](https://github.com/Sanot/Relax-Sound/issues) — yours may already be reported or answered
- [ ] Search [discussions](https://github.com/Sanot/Relax-Sound/discussions) — your question may already be answered
- [ ] Check the [FAQ](#faq)
- [ ] Make sure you are on the latest version

### Creating an Issue

Choose the appropriate template:

| Issue Type | Template | When to Use |
|------------|----------|-------------|
| 🐛 Bug Report | bug_report.yml | Something is broken |
| 💡 Feature Request | feature_request.yml | Suggest an enhancement |
| ❓ Question | GitHub Issues | Ask a question |
| 🔒 Security Vulnerability | [SECURITY.md](SECURITY.md) | Please do NOT create a public issue |

---

## Professional Support

For organizations that require:

- **Priority response** — Guaranteed response within 4 hours
- **Dedicated support** — Assigned support engineer
- **Custom SLAs** — Tailored service level agreements
- **Custom development** — Sound pack creation and feature customization
- **Integration support** — Help integrating with your systems

**Contact:** [@Sanot](https://github.com/Sanot) via GitHub Issues or Discussions

---

## Enterprise Support

### Enterprise Features

| Feature | Free | Enterprise |
|---------|------|------------|
| Community support | ✅ | ✅ |
| Priority support | ❌ | ✅ |
| Response time SLA | < 24h | < 2h |
| Dedicated engineer | ❌ | ✅ |
| Custom SLAs | ❌ | ✅ |
| Custom development | ❌ | ✅ |
| White-label deployment | ❌ | ✅ |
| Advanced security | ❌ | ✅ |

### Enterprise Contact

- **Contact:** [@Sanot](https://github.com/Sanot) on GitHub

---

## Before Asking for Help

### Self-Help Checklist

1. ✅ **Check the documentation** — README, guides, FAQ
2. ✅ **Search existing issues** — Use GitHub issue search
3. ✅ **Search discussions** — Use GitHub discussions search
4. ✅ **Google it** — Search for the error message
5. ✅ **Update to the latest version** — Your issue may already be fixed
6. ✅ **Check closed issues** — Your issue may have been resolved

### Common Issues

| Issue | Solution |
|-------|----------|
| `npm install` fails | Clear node_modules: `rm -rf node_modules package-lock.json && npm install` |
| Build fails | Check Node.js version: `node --version` (must be >= 20) |
| Audio doesn't play | Check browser audio permissions and volume settings |
| TypeScript errors | Run `npx tsc --noEmit` for detailed errors |
| Port already in use | Kill the process or use `npm run dev -- --port 3001` |

---

## How to Ask Good Questions

### DO ✅

- Provide **context**: What are you trying to achieve?
- Include **error messages**: Exact error text and stack traces
- Share **reproduction steps**: Minimal, complete, and verifiable example
- Mention your **environment**: OS, Node version, browser/device
- Show what you **already tried**
- Be **specific** about what's not working

### DON'T ❌

- "It doesn't work" — What exactly doesn't work?
- "Help me" — With what specifically?
- Screenshots of code instead of text
- Pasting large code blocks without context
- Asking if you can ask a question (just ask!)

### Good Question Template

```
## Environment
- OS: macOS 15.2
- Node.js: 20.18.0
- npm: 10.8.0
- Browser: Chrome 120
- Version: v1.0.0

## Problem
When I try to play the rain sound, nothing happens. No audio is heard and no errors appear in the console.

## Steps to Reproduce
1. Open the app
2. Click on "Rain" in the sound library
3. Press the play button
4. No audio plays

## What I Tried
- Checked system volume
- Cleared browser cache
- Tried different sound files (ocean works, rain doesn't)
- Checked browser console for errors

## Expected Behavior
The rain sound should play when selected and the play button is pressed.
```

---

## FAQ

### General

**Q: What is Relax Sound?**
A: A premium relaxation sound application with timer, ambient sound mixing, 3D audio visualizer, and meditation features.

**Q: Is Relax Sound free?**
A: Yes, Relax Sound is open source under the MIT license. Some premium sound packs may be offered as in-app purchases.

**Q: Can I use it commercially?**
A: Yes, the MIT license allows commercial use and modification.

### Technical

**Q: What browsers are supported?**
A: Chrome 90+, Safari 15+, Firefox 90+, Edge 90+. Mobile browsers are also supported.

**Q: Does it work offline?**
A: Yes, downloaded sounds are cached for offline playback.

**Q: How do I add custom sounds?**
A: Place audio files in `public/audio/` and register them in the sound library configuration file.

**Q: Can I run it on my phone?**
A: Yes, the web version is responsive, and native iOS/Android apps can be built via Capacitor.

---

<p align="center">
  <b>We're here to help!</b>
  <br/>
  <sub>Don't hesitate to reach out through any of the channels above.</sub>
</p>
