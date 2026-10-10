# BeyondBet Phase 1 design

Build a polished, mobile-first social sports prediction demo for adults to share with friends and collaborators. Follow the supplied brief: Next.js, TypeScript, Tailwind; entirely fictional currency without monetary value. No payments, prizes, redeemable rewards, live data, authentication, or backend integrations in Phase 1.

## Experience

A dark navy interface with teal accents, left desktop navigation and mobile bottom navigation. Dashboard shows a 1,000-credit initial wallet, activity, performance, featured events, and league standings. Picks supports fictional NFL/NBA winner, spread, total, player prop, higher/lower and yes/no markets; filtering and search feed a pick slip. Users allocate integer credits, view potential returns and submit. Wallet and predictions reflect submitted picks. Leagues show private standings, create/join demo flows, invite codes and a local discussion. Settings allow session reminders and pausing picks. All effects stay in memory and reset on reload; communicate that explicitly.

## Architecture and trust

Next.js App Router hosts one interactive client shell. Typed seed data is isolated from pure wallet functions and UI components. Only fictional fixed prices exist. Demo placement validates balance, selection IDs and stake; rejects duplicate choices and paused play. Sample settlement, triggered explicitly in Wallet, uses predefined fictional outcomes and is idempotent. This client logic is a simulation, never a production trust boundary.

## Future database proposal

Supabase PostgreSQL: profiles(id references auth.users, username unique, avatar_url, adult_confirmed_at); events(id, provider_ref unique, league, starts_at, status); markets(id, event_id, kind, line, status); selections(id, market_id, label, decimal_odds); wallets(id, user_id, league_id nullable, available, committed, unique user/scope); predictions(id, user_id, wallet_id, selection_id, stake, locked_odds, status, return_amount, created_at, settled_at); ledger(id, wallet_id, prediction_id nullable, amount, kind, idempotency_key unique); leagues(id, owner_id, name, invite_hash, season); memberships(league_id,user_id unique, joined_at); discussions(id,league_id,user_id,body,created_at); play_preferences(user_id,reminder_minutes,pause_until).

Future implementation requires server-only atomic placement/settlement, locked rows, nonnegative wallet constraints, unique weekly grant keys, immutable ledger, secure hashed invites, membership-scoped RLS and admin-only results. Reads of profiles/memberships/discussions scoped by RLS; users never directly write wallet or outcome fields. Licensed provider replaces seed adapter later. Credits: 1,000 per week, with exact reset/rollover rules agreed before persistence. No clinical advice or treatment claims.

## Verification

Unit tests prove allocation, rejection of invalid stakes/insufficient balances, paused play, duplicate selection and settlement idempotency. Browser checks cover tabs, placing picks and wallet updates, filtering, league creation, pausing and responsive layout. Production build and TypeScript must pass.
