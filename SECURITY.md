# Security Policy

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/Security-Policy-6d28d9?style=for-the-badge&logo=securityscorecard&logoColor=white&labelColor=1e1b4b">
    <img alt="Security Policy" src="https://img.shields.io/badge/Security-Policy-6d28d9?style=for-the-badge&logo=securityscorecard&logoColor=white&labelColor=1e1b4b">
  </picture>
</p>

<div align="center">

[![CodeQL](https://img.shields.io/github/actions/workflow/status/Sanot/Relax-Sound/codeql.yml?branch=main&style=flat-square&logo=codeql&logoColor=white&label=CodeQL)](https://github.com/Sanot/Relax-Sound/actions/workflows/codeql.yml)
[![Dependabot](https://img.shields.io/badge/dependabot-active-brightgreen?style=flat-square&logo=dependabot&logoColor=white)](https://github.com/Sanot/Relax-Sound/security/dependabot)

</div>

---

## Table of Contents

- [Supported Versions](#supported-versions)
- [Reporting a Vulnerability](#reporting-a-vulnerability)
- [Disclosure Policy](#disclosure-policy)
- [Security Practices](#security-practices)
- [Dependency Management](#dependency-management)

---

## Supported Versions

We provide security patches for the following versions:

| Version | Supported | End of Life |
|---------|-----------|-------------|
| 1.x | ✅ Active | TBD |
| < 1.0 | ❌ No longer supported | 2026-01-01 |

**When to upgrade:**
- Patch version (`1.0.0` → `1.0.1`): Recommended
- Minor version (`1.x` → `1.y`): Recommended
- Major version (`1.x` → `2.x`): Required within 180 days of release

---

## Reporting a Vulnerability

### Important: Do Not Open Public Issues

If you discover a security vulnerability, **do not** create a public GitHub issue. Please report it privately through one of the following channels:

### Method 1: GitHub Private Report (Preferred)

Use GitHub's [Private Vulnerability Reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability) feature:

1. Go to the repository's **Security** tab
2. Click **Report a vulnerability**
3. Fill in the details

You can also mention **@Sanot** in a new issue for non-critical reports.

```
Subject: [Security Vulnerability] <Brief Description>

Body:
- **Project**: Relax Sound
- **Version**: [e.g., v1.2.3]
- **Type**: [e.g., XSS, Path Traversal, RCE]
- **Severity**: [Critical / High / Medium / Low]
- **Description**: Clear description of the vulnerability
- **Steps to Reproduce**: Detailed steps with code examples
- **Impact**: What an attacker could achieve
- **Proof of Concept**: Working PoC (if available)
- **Suggested Fix**: Any recommendations for resolution
- **Affected Components**: Files, endpoints, or modules affected
```

### Method 2: GitHub Issue with @Sanot

For non-critical concerns, open an issue and mention **@Sanot** for visibility.
3. Fill out the form with the details of the vulnerability

### Response Times

| Severity | Initial Response | Status Update | Resolution Goal |
|----------|-----------------|---------------|-----------------|
| Critical | < 4 hours | Daily | < 48 hours |
| High | < 24 hours | Every 2 days | < 7 days |
| Medium | < 48 hours | Weekly | < 30 days |
| Low | < 1 week | Bi-weekly | < 90 days |

---

## Disclosure Policy

### Responsible Disclosure

We follow a coordinated disclosure process:

1. **Report received** — Our security team acknowledges receipt
2. **Investigation** — We verify and assess the vulnerability
3. **Remediation** — We develop and test a fix
4. **Release** — We deploy the fix to supported versions
5. **Disclosure** — We publish a security advisory

### Embargo Period

We request a 90-day embargo period from the date of disclosure to allow time for remediation. During this period:

- The reporter agrees not to disclose the vulnerability publicly
- We agree to keep the reporter informed of progress
- We work together on the fix and advisory
- Extensions may be requested for complex vulnerabilities

### We Will

- Acknowledge receipt within 24 hours
- Provide regular status updates
- Give credit for valid reports (if desired)
- Notify you when the fix is released
- Include you in the advisory process

---

## Security Practices

### Code Security

- **Input validation** — All user input is validated and sanitized
- **Output encoding** — Output is properly encoded to prevent XSS
- **Authentication** — Secure token-based authentication
- **Authorization** — Role-based access control (RBAC)
- **Rate limiting** — API rate limiting on all endpoints
- **CORS** — Configured with strict origin whitelist
- **CSP** — Content Security Policy headers set
- **HTTPS** — Enforced in production

### Audio Security

- **Audio file validation** — MIME type and content verification for uploaded audio
- **Path sanitization** — Audio file paths are sanitized against traversal attacks
- **Stream security** — Secure streaming with signed URLs
- **DRM considerations** — Basic content protection for premium audio assets

### Infrastructure Security

- **Secrets management** — All secrets stored in environment variables or vault
- **Least privilege** — Minimal permissions required
- **Audit logging** — All access and changes logged

---

## Dependency Management

### Dependabot

We use Dependabot for automated dependency updates with the following configuration:

| Ecosystem | Schedule | Grouping | Review |
|-----------|----------|----------|--------|
| npm | Weekly (Monday) | React, TypeScript, Vite | Required |
| GitHub Actions | Weekly (Monday) | All | Required |

### Dependency Policy

| Severity | Action | Timeline |
|----------|--------|----------|
| Critical | Immediate update | < 24 hours |
| High | Scheduled patch release | < 7 days |
| Medium | Next minor release | < 30 days |
| Low | Next major release | < 90 days |

### Prohibited Dependencies

Dependencies with the following characteristics are prohibited:
- Unmaintained (no updates in > 1 year)
- Known unpatched vulnerabilities
- Restrictive licenses (AGPL, proprietary)
- Suspicious or typo-squatting names
- Telemetry without explicit user consent

---

## Contact

- **Security Issues**: [@Sanot](https://github.com/Sanot) via GitHub Issues

---

<p align="center">
  <b>Security is not a product, but a process.</b>
  <br/>
  <sub>— Bruce Schneier</sub>
  <br/><br/>
  <sub>Copyright © 2026 Sanot. All rights reserved.</sub>
</p>
