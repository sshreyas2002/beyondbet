# BeyondBet

All the game. None of the stakes.

A mobile-first social sports prediction **frontend prototype** built with Next.js, TypeScript, and Tailwind CSS. All events, odds, results, player statistics, league activity, and historical performance are fictional sample data. Credits have no monetary value. There are no deposits, purchases, withdrawals, prizes, or redeemable rewards.

## Set up on a blank MacBook

Install **Node.js, Visual Studio Code, and GitHub Desktop**. You do not need Python, Homebrew, a separate Next.js installation, command-line GitHub authentication, Supabase, or API keys for this prototype. Next.js and the other project packages are installed automatically below.

### 1. Install Node.js

1. Visit [nodejs.org/download](https://nodejs.org/en/download).
2. Select **Node.js 24 LTS** and download the macOS installer (`.pkg`). Run the installer and follow its prompts. If offered an architecture choice, use ARM64 for an Apple Silicon Mac (M-series chip), or x64 for an Intel Mac. Find your chip under **Apple menu → About This Mac**.
3. Open Terminal: press **Command–Space**, type **Terminal**, then press Enter.
4. Run these commands one at a time:

```sh
node --version
npm --version
```

Both should print version numbers. Node should show `v24...`. npm is included with Node. If a command is not found, close and reopen Terminal after installation.

### 2. Install Visual Studio Code

1. Download [Visual Studio Code](https://code.visualstudio.com/).
2. Open the download and move **Visual Studio Code** to **Applications**.
3. Launch it. No extensions are required to start.

VS Code is the editor where you will change files. Its built-in terminal will run the app.

### 3. Install GitHub Desktop

1. Download [GitHub Desktop](https://desktop.github.com/), install it, and open it.
2. Choose **Sign in to GitHub.com** and complete the browser sign-in using an account that can access `sshreyas2002/beyondbet`.

GitHub Desktop handles Git and GitHub authentication. No GitHub CLI, SSH keys, or personal access token is needed for this workflow.

### 4. Clone the repository and select the prototype branch

First create a folder for development projects using Terminal:

```sh
mkdir -p ~/Developer
```

Then in GitHub Desktop:

1. Choose **File → Clone Repository → URL**.
2. Enter `https://github.com/sshreyas2002/beyondbet`.
3. Set the local path to `~/Developer/beyondbet` (expand it to your home folder in the folder picker if needed).
4. Click **Clone**.
5. In the top toolbar, click **Current Branch** and select **`phase-1-prototype`**.

**The prototype is on `phase-1-prototype`, not `main`.** If you only see the starter README, check the selected branch. Click **Fetch origin** if the new branch does not appear yet.

`~` means your Mac user's home folder, such as `/Users/shreyas`. `/workspace/beyondbet` was a remote cloud location; it is not a folder on your Mac. No ZIP download or manual file copying is necessary when cloning this branch.

### 5. Open the project in VS Code

In VS Code, choose **File → Open Folder** and select the cloned `Developer/beyondbet` folder. Trust this repository if prompted.

Choose **Terminal → New Terminal**. This opens a terminal inside the editor. Confirm its location:

```sh
pwd
ls
```

The path should end with `/Developer/beyondbet`, and the file list should include `package.json`, `package-lock.json`, and `src`.

If the terminal opened elsewhere, run:

```sh
cd ~/Developer/beyondbet
```

### 6. Install packages and start the app

In the VS Code terminal, run:

```sh
npm ci
```

Wait for installation to finish. This installs Next.js, React, TypeScript, Tailwind CSS, and the test tools using the project's lockfile. Do not install Next.js globally.

Now run:

```sh
npm run dev
```

When the server reports that it is ready, type `http://localhost:3000` into Safari or Chrome. If Next.js reports a different port because 3000 is occupied, use the address it prints.

**Keep that terminal running while using the website.** Press **Control–C** in the terminal to stop the server. Starting a local server does not publish the website to the internet.

### 7. Make your first edit

Open `src/components/dashboard-view.tsx`, change a visible piece of text, and save with **Command–S**. The browser should update automatically. The regular development loop is **edit → save → check the browser → repeat**.

Useful files:

| File | Purpose |
| --- | --- |
| `src/components/dashboard-view.tsx` | Dashboard content |
| `src/components/predictions-view.tsx` | Prediction browsing |
| `src/components/beyondbet.tsx` | Navigation and shared demo state |
| `src/components/market-card.tsx` | Individual market cards |
| `src/app/globals.css` | Colors, spacing, and responsive styling |
| `src/lib/demo.ts` | Fictional events, odds, and leaderboard data |
| `src/lib/wallet.ts` | Demo credit allocation and settlement |

### 8. Check your changes

Open a second terminal in VS Code using the **+** button in the terminal panel. Leave the development server running in the first terminal.

Run:

```sh
npm test
npm run typecheck
```

To run browser tests, install their browser once on the Mac:

```sh
npx playwright install chromium
```

Then run:

```sh
npm run test:e2e
```

Browser tests exercise navigation, placing and settling picks, searches, league switching/creation, keyboard dialogs, mobile Settings, and reminders. They use system Chromium when available, otherwise the Playwright browser you installed. You can also select an installed Chromium executable with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.

To check the production version, stop the development server with **Control–C**, then run:

```sh
npm run build
npm start
```

Open the local address printed by the server. Stop this server before restarting `npm run dev`.

### 9. Save work with GitHub Desktop

A **commit** saves a checkpoint on your Mac. **Push** uploads commits to GitHub. **Fetch/Pull** downloads work from GitHub. Neither committing nor pushing deploys the website.

For a new change:

1. With `phase-1-prototype` selected and a clean working folder, choose **Branch → New Branch** and give it a descriptive name, such as `improve-dashboard`.
2. Make and test your edits in VS Code.
3. In GitHub Desktop, inspect **Changes** and the file differences.
4. Enter a short summary, such as `Improve dashboard layout`, then click **Commit**.
5. Click **Publish branch** the first time, or **Push origin** for later commits.
6. Use **Create Pull Request** when the change is ready for review. For improvements to this prototype, choose `phase-1-prototype` as the pull request's base branch unless you intentionally want to merge into `main`.

GitHub Desktop handles authentication. If pushing is denied, confirm you are signed into an account with write access. Do not force-push to work around an access error.

### 10. Your routine from now on

1. Open GitHub Desktop, select the appropriate branch, and click **Fetch origin**. Pull available changes once your local work is committed.
2. Open the project folder in VS Code.
3. Run `npm ci` after a fresh clone or when dependency files have changed; otherwise skip installation.
4. Run `npm run dev` and open the local browser address.
5. Edit, save, check the browser, and run the relevant tests.
6. Commit working changes and push them to GitHub.
7. Press **Control–C** to stop the server when finished.

Never commit `node_modules`, `.next`, or secret `.env` files; the project's `.gitignore` already excludes them. Keep `package-lock.json` in Git so collaborators install consistent dependencies. Keep credentials out of source code.

### Troubleshooting

- **Only the original README appears:** switch to `phase-1-prototype` in GitHub Desktop.
- **`node` or `npm` is not found:** install Node.js, then restart VS Code and Terminal.
- **`package.json` cannot be found:** run `cd ~/Developer/beyondbet` and confirm the branch and folder.
- **The browser cannot connect:** confirm the server is running and read its terminal output.
- **Port 3000 is occupied:** stop another development server you started, or use the alternate address Next.js prints.
- **Tests cannot find a browser:** run `npx playwright install chromium`.
- **An installation or build fails:** keep the full error message for diagnosis. Do not delete the lockfile, disable verification, or use `sudo npm install` as a first fix.

## Cloud environment notes

The cloud checkout is `/workspace/beyondbet`. For dependency installation in that sandbox, use `npm ci --cache /tmp/beyondbet-npm-cache`. These cloud paths are not used for Mac setup.

The project is Vercel-compatible but has not been deployed. Phase 1 needs no Supabase account, API keys, or external sports provider.

## Try it

1. Open **Predictions**, filter NFL or NBA, and select a fictional market.
2. Allocate credits in the prediction slip. Potential return includes the original allocation.
3. Open **Wallet** to see available and committed credits. **Settle demo predictions** applies predefined fictional outcomes once per pick.
4. Open **Leagues** to switch sample leagues, compare weekly/season standings, create a local demo league, or join with `SUNDAY24`, `HOOPS24`, or `OFFICE24`. Newly created codes also work during this session.
5. Post a local demo league message. Invite codes and messages do not connect real people.
6. Open **Settings** using the sidebar or profile initials on mobile to pause participation or choose a session reminder.

All changes are held in memory and reset when the page reloads. Weekly credit grants are illustrated, not scheduled. Historical stats and league standings are sample data; placing picks changes your wallet and prediction activity, not sample rankings. Demo settlement is client-side and is **not** production transaction security.

## Phase checklist

- [x] Phase 1 plan and proposed future Supabase database schema
- [x] Responsive dark dashboard with virtual balance and sample performance
- [x] NFL/NBA winner, spread, totals, player higher/lower, and yes/no sample markets
- [x] Search/filter and interactive prediction slip
- [x] Available/committed/settled credit accounting and duplicate settlement protection
- [x] Private league sample leaderboards, local create/join flows and discussion
- [x] Session reminders and pause/resume controls
- [x] Unit and browser interaction tests
- [ ] Phase 2, requiring your approval: email auth, age confirmation, avatars, Supabase persistence, server-side transactions, row-level security and weekly grants
- [ ] Later, separately approved: licensed sports data, real private invitations, voluntary time limits and optional nonclinical support tools

The prototype is intended for adults 18+ and is entertainment, not gambling treatment or therapy.

## Project structure

- `src/lib/demo.ts`: fictional market and leaderboard data
- `src/lib/wallet.ts`: tested demo placement and settlement transitions
- `src/components/`: dashboard, prediction browser, market cards, keyboard-accessible dialogs and shared interface components
- `src/app/`: Next.js page, layout and responsive styles
- `tests/`: unit and browser tests
- [Design and proposed schema](docs/superpowers/specs/2026-10-10-beyondbet-design.md)
- [Implementation plan](docs/superpowers/plans/2026-10-10-beyondbet.md)

The proposed schema describes future backend work; no database has been provisioned or migrated.
