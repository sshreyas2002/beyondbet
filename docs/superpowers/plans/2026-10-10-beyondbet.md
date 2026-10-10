# BeyondBet Phase 1 Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** A shareable, interactive frontend demo of BeyondBet.
**Architecture:** Next.js client shell with typed fictional markets, reusable cards and pure wallet transitions. Memory-only state, no external services.
**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Lucide icons, Vitest, Playwright.
**Spec:** docs/superpowers/specs/2026-10-10-beyondbet-design.md

## Global Constraints

- Fictional credits only; no payments or redeemable rewards.
- Clearly fictional events and odds; 1,000 initial demo credits.
- Phase 1 only: no auth, persistence, sports APIs or clinical advice.
- Mobile-first dark interface, teal accent; Vercel-compatible.

## Review Focus

- Invalid and oversized stakes cannot change balances.
- Duplicate submissions cannot create duplicate active picks.
- Repeated settlement cannot mint additional credits.
- Paused participation blocks placement but permits browsing.
- Empty searches and narrow mobile layouts remain usable.

### Task 1: Demo wallet and typed data

Files: src/lib/demo.ts, src/lib/wallet.ts, tests/wallet.test.ts, package.json, tsconfig.json.
Interfaces: placePick(wallet, selection, stake, paused) returns updated wallet or error; settleDemo(wallet) returns updated wallet. Typed Selection and Prediction.

- [x] Add tests for valid placement, invalid/oversized stakes, duplicate selections, pause and repeated settlement; run to observe failure.
- [x] Implement pure transitions and fictional seed markets; run npm test.

### Task 2: Interactive application

Files: src/app/layout.tsx, src/app/page.tsx, src/app/globals.css, src/components/beyondbet.tsx, src/components/market-card.tsx.
Consumes demo markets and wallet transitions. Produces responsive dashboard, picks, wallet, leagues and settings.

- [x] Add browser flow expectations for navigation, allocation, filtering, empty state, league creation, pause and mobile usability.
- [x] Build interface with accessible buttons/forms and useful empty/error states.
- [x] Run browser flows and production build; fix failures.

### Task 3: Run instructions and reusable environment

Files: README.md and cloud environment install/start fields.

- [x] Document install/run/test commands, demo limitations and future schema.
- [x] Verify application requests and save tested setup/start instructions.
- [x] Record completed/remaining checklist and seek approval before Phase 2.
