"use client";
import type { View } from "@/lib/types";
import { SectionHeading, PredictionList } from "./ui";
import { PredictionsView } from "./predictions-view";
import { DashboardView } from "./dashboard-view";

import { useEffect, useState } from "react";
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Coins,
  Copy,
  Home,
  Layers3,
  MessageCircle,
  Plus,
  Settings,
  ShieldCheck,
  Target,
  Trophy,
  Users,
  Wallet as WalletIcon,
  X,
  Zap,
  Pause,
  Play,
} from "lucide-react";
import { markets, standings, formatCredits, type Selection } from "@/lib/demo";
import {
  initialWallet,
  placePick,
  settleDemo,
  type Wallet,
} from "@/lib/wallet";
import { Dialog } from "./dialog";

const initialLeagues: Record<string, string> = {
  SUNDAY24: "The Sunday Club",
  HOOPS24: "Hoop Collective",
  OFFICE24: "Office Rivals",
};
const nav = [
  { name: "Dashboard" as View, icon: Home },
  { name: "Predictions" as View, icon: Target },
  { name: "Leagues" as View, icon: Users },
  { name: "Wallet" as View, icon: WalletIcon },
];
export default function BeyondBet() {
  const [leagues, setLeagues] = useState(initialLeagues);
  const [view, setView] = useState<View>("Dashboard"),
    [wallet, setWallet] = useState<Wallet>(initialWallet),
    [selected, setSelected] = useState<Selection>(),
    [stake, setStake] = useState("50"),
    [sport, setSport] = useState("All sports"),
    [kind, setKind] = useState("All markets"),
    [search, setSearch] = useState(""),
    [paused, setPaused] = useState(false),
    [message, setMessage] = useState(""),
    [showNotifications, setShowNotifications] = useState(false),
    [modal, setModal] = useState<"create" | "join" | null>(null),
    [leagueName, setLeagueName] = useState(""),
    [league, setLeague] = useState("The Sunday Club"),
    [invite, setInvite] = useState("SUNDAY24"),
    [discussion, setDiscussion] = useState(""),
    [posts, setPosts] = useState([
      {
        name: "Jordan Davis",
        text: "Big week ahead. Who’s backing Boston? 👀",
        initials: "JD",
      },
    ]),
    [period, setPeriod] = useState("This week"),
    [reminder, setReminder] = useState("30"),
    [sessionNotice, setSessionNotice] = useState(false);
  useEffect(() => {
    if (reminder === "off") return;
    const timer = setTimeout(
      () => setSessionNotice(true),
      Number(reminder) * 60000,
    );
    return () => clearTimeout(timer);
  }, [reminder, sessionNotice]);
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 5000);
    return () => clearTimeout(timer);
  }, [message]);
  const active = wallet.picks.filter((p) => p.status === "active"),
    settled = wallet.picks.filter((p) => p.status !== "active"),
    committed = active.reduce((sum, p) => sum + p.stake, 0),
    returns = settled.reduce((sum, p) => sum + p.returned, 0);
  const select = (s: Selection) => {
    setSelected(s);
    setMessage("");
  };
  function submit() {
    if (!selected) return;
    try {
      setWallet((w) => placePick(w, selected, Number(stake), paused));
      setSelected(undefined);
      setMessage("Prediction placed. Good luck!");
    } catch (e) {
      setMessage((e as Error).message);
    }
  }
  function changeView(v: View) {
    setView(v);
    setSelected(undefined);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const visibleMarkets = markets.filter(
    (m) =>
      (sport === "All sports" || m.sport === sport) &&
      (kind === "All markets" || m.kind === kind) &&
      `${m.title} ${m.subtitle} ${m.kind} ${m.sport} ${m.options.map((s) => s.label).join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button
          className="brand"
          onClick={() => changeView("Dashboard")}
          aria-label="BeyondBet home"
        >
          <span className="brand-symbol">
            <Zap size={25} fill="currentColor" />
          </span>
          <span>
            beyond<span className="brand-light">bet</span>
            <i />
          </span>
        </button>
        <div className="workspace-label">YOUR PLAYBOOK</div>
        <nav>
          {nav.map(({ name, icon: Icon }) => (
            <button
              key={name}
              aria-label={name}
              className={`nav-item ${view === name ? "active" : ""}`}
              onClick={() => changeView(name)}
            >
              <Icon size={19} />
              {name}
              {name === "Leagues" && <span className="nav-badge">3</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-leagues">
          <div className="workspace-label">
            YOUR LEAGUES{" "}
            <button aria-label="Add league" onClick={() => setModal("create")}>
              <Plus size={15} />
            </button>
          </div>
          {Object.entries(leagues).map(([code, name], i) => (
            <button
              key={name}
              onClick={() => {
                setLeague(name);
                setInvite(code);
                changeView("Leagues");
              }}
            >
              <span className={`league-dot dot-${i}`} />
              {name}
              <ChevronRight size={13} />
            </button>
          ))}
        </div>
        <div className="sidebar-bottom">
          <div className="play-note">
            <ShieldCheck size={23} />
            <strong>
              All the game.
              <br />
              None of the stakes.
            </strong>
            <p>
              Free to play. Always.
              <br />
              Your credits have no cash value.
            </p>
            <button onClick={() => changeView("Settings")}>
              Play on your terms <ArrowUpRight size={12} />
            </button>
          </div>
          <button
            className={`nav-item ${view === "Settings" ? "active" : ""}`}
            onClick={() => changeView("Settings")}
          >
            <Settings size={18} />
            Settings
          </button>
          <div className="sidebar-profile">
            <span className="avatar self">SH</span>
            <div>
              <strong>Shreyas</strong>
              <span>@shreyas · Demo profile</span>
            </div>
            <ChevronDown size={14} />
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <span className="breadcrumb">
            Your playbook <ChevronRight size={13} /> <strong>{view}</strong>
          </span>
          <span className="mobile-brand">
            <Zap size={20} /> beyondbet
          </span>
          <div className="header-actions">
            <span className="demo-badge">
              <i /> DEMO MODE
            </span>
            <button
              className="header-wallet"
              onClick={() => changeView("Wallet")}
            >
              <Coins size={16} />
              {formatCredits(wallet.available)} <span>credits</span>
            </button>
            <div className="notification-wrap">
              <button
                className="icon-button notification-button"
                aria-label="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={19} />
                <i />
              </button>
              {showNotifications && (
                <div className="notification-panel">
                  <strong>You’re all caught up</strong>
                  <p>
                    No pick prompts. Just league updates and the session
                    reminders you choose.
                  </p>
                  <button onClick={() => setShowNotifications(false)}>
                    Got it
                  </button>
                </div>
              )}
            </div>
            <button
              className="avatar self top-avatar"
              aria-label="Profile settings"
              onClick={() => changeView("Settings")}
            >
              SH
            </button>
          </div>
        </header>
        <main className="page-content">
          <div className="page-heading">
            <div>
              <div className="eyebrow">
                {view === "Dashboard"
                  ? "SATURDAY, OCTOBER 10 · DEMO SEASON"
                  : view === "Predictions"
                    ? "THE FIELD IS YOURS"
                    : view === "Leagues"
                      ? "BETTER TOGETHER"
                      : view === "Wallet"
                        ? "FICTIONAL CREDITS. REAL CLARITY."
                        : "YOUR GAME, YOUR PACE"}
              </div>
              <h1>
                {view === "Dashboard" ? (
                  <>
                    Good evening, Shreyas<span className="greeting-dot">.</span>
                  </>
                ) : view === "Predictions" ? (
                  "Make your call."
                ) : view === "Leagues" ? (
                  "A little friendly competition."
                ) : view === "Wallet" ? (
                  "Your virtual wallet."
                ) : (
                  "Play on your terms."
                )}
              </h1>
              <p>
                {view === "Dashboard"
                  ? "A fresh slate. A friendly rivalry. Let’s see what you’ve got."
                  : view === "Predictions"
                    ? "Put your sports knowledge to the test. No real money involved."
                    : view === "Leagues"
                      ? "Make predictions, share the game, and see how you stack up."
                      : view === "Wallet"
                        ? "Every credit is fictional and has no monetary value."
                        : "Enjoy the competition. Take a break whenever you need."}
              </p>
            </div>
            {view === "Dashboard" ? (
              <button
                className="outline-button period-selector"
                onClick={() =>
                  setPeriod(period === "This week" ? "Season" : "This week")
                }
              >
                <Clock3 size={15} />
                {period}
                <ChevronDown size={14} />
              </button>
            ) : view === "Leagues" ? (
              <button
                className="primary-button"
                onClick={() => setModal("create")}
              >
                <Plus size={16} />
                Create league
              </button>
            ) : null}
          </div>
          {view === "Dashboard" && (
            <DashboardView
              wallet={wallet}
              period={period}
              sport={sport}
              setSport={setSport}
              selected={selected}
              select={select}
              changeView={changeView}
            />
          )}
          {view === "Predictions" && (
            <PredictionsView
              sport={sport}
              setSport={setSport}
              kind={kind}
              setKind={setKind}
              search={search}
              setSearch={setSearch}
              visibleMarkets={visibleMarkets}
              selected={selected}
              select={select}
            />
          )}
          {view === "Wallet" && (
            <>
              <div className="wallet-grid">
                <section className="wallet-main-card">
                  <div className="wallet-kicker">
                    <Coins size={20} /> VIRTUAL WALLET
                  </div>
                  <p>Available credits</p>
                  <h2 data-testid="available-balance">
                    {formatCredits(wallet.available)}
                  </h2>
                  <span>Fictional credits · No monetary value</span>
                  <div className="wallet-divider" />
                  <div className="wallet-bottom">
                    <div>
                      <small>Weekly allowance</small>
                      <strong>1,000 credits</strong>
                    </div>
                    <div>
                      <small>Next demo drop</small>
                      <strong>Monday, Oct 12</strong>
                    </div>
                  </div>
                </section>
                <section className="panel wallet-summary">
                  <h3>Your credits at a glance</h3>
                  <div>
                    <span>
                      <Clock3 size={16} />
                      Committed to active picks
                    </span>
                    <strong>{formatCredits(committed)}</strong>
                  </div>
                  <div>
                    <span>
                      <ArrowDownLeft size={16} />
                      Settled returns
                    </span>
                    <strong>{formatCredits(returns)}</strong>
                  </div>
                  <div>
                    <span>
                      <Layers3 size={16} />
                      Total picks placed
                    </span>
                    <strong>{wallet.picks.length}</strong>
                  </div>
                  <p>
                    Demo balances reset on reload. Weekly grants and saved
                    transactions will be added in a future phase.
                  </p>
                  <button
                    className="outline-button"
                    disabled={!active.length}
                    onClick={() => {
                      setWallet((w) => settleDemo(w));
                      setMessage(
                        "Demo predictions settled using fictional sample results.",
                      );
                    }}
                  >
                    Settle demo predictions
                  </button>
                </section>
              </div>
              <SectionHeading
                title="Prediction activity"
                subtitle="Every pick. Every credit. All in one place."
              />
              <PredictionList wallet={wallet} />
              <div className="info-strip wallet-info">
                <ShieldCheck size={20} />
                <span>
                  Credits cannot be bought, sold, withdrawn, or exchanged for
                  anything of value. No cash prizes or rewards.
                </span>
              </div>
            </>
          )}
          {view === "Leagues" && (
            <>
              <div className="league-overview">
                <section className="league-hero panel">
                  <span className="league-emblem">
                    <Trophy size={30} />
                  </span>
                  <div>
                    <span className="eyebrow">PRIVATE LEAGUE · DEMO</span>
                    <h2>{league}</h2>
                    <p>
                      Equal starts. Friendly rivalries. A whole season of good
                      calls.
                    </p>
                    <div className="league-detail">
                      <span>
                        <Users size={15} />{" "}
                        {league === "The Sunday Club" ? "12" : "5"} members
                      </span>
                      <span>
                        <Coins size={15} />
                        1,000 starting credits
                      </span>
                    </div>
                  </div>
                  <button
                    className="outline-button"
                    onClick={() => {
                      navigator.clipboard
                        ?.writeText(invite)
                        .then(() => setMessage(`Invite code copied: ${invite}`))
                        .catch(() => setMessage(`Invite code: ${invite}`));
                      if (!navigator.clipboard)
                        setMessage(`Invite code: ${invite}`);
                    }}
                  >
                    <Copy size={15} />
                    Invite friends
                  </button>
                </section>
                <div className="league-actions">
                  <span>
                    Invite code: <b>{invite}</b> · Local demo only
                  </span>
                  <button
                    className="text-button"
                    onClick={() => setModal("join")}
                  >
                    <Plus size={14} />
                    Join a league
                  </button>
                </div>
              </div>
              <div className="league-content">
                <section className="panel leaderboard">
                  <div className="leaderboard-heading">
                    <h3>
                      <Trophy size={18} />
                      League leaderboard
                    </h3>
                    <div className="segmented">
                      <button
                        className={period === "This week" ? "active" : ""}
                        onClick={() => setPeriod("This week")}
                      >
                        Weekly
                      </button>
                      <button
                        className={period === "Season" ? "active" : ""}
                        onClick={() => setPeriod("Season")}
                      >
                        Season
                      </button>
                    </div>
                  </div>
                  <div className="leaderboard-table">
                    <div className="table-head">
                      <span>RANK / PLAYER</span>
                      <span>ACCURACY</span>
                      <span>VIRTUAL CREDITS</span>
                    </div>
                    {standings.map((p, i) => (
                      <div
                        className={`table-row ${p.name === "You" ? "you-row" : ""}`}
                        key={p.name}
                      >
                        <div>
                          <span
                            className={`table-rank ${i === 0 ? "first-place" : ""}`}
                          >
                            {i === 0 ? <Trophy size={17} /> : i + 1}
                          </span>
                          <span
                            className="avatar"
                            style={{
                              background: p.color + "26",
                              color: p.color,
                            }}
                          >
                            {p.initials}
                          </span>
                          <div>
                            <strong>{p.name}</strong>
                            <small>{p.handle}</small>
                          </div>
                        </div>
                        <span>
                          {period === "Season" ? p.accuracy - 3 : p.accuracy}%
                        </span>
                        <strong>
                          {formatCredits(
                            period === "Season" ? p.credits + 940 : p.credits,
                          )}
                          <small
                            className={p.change > 0 ? "positive" : "negative"}
                          >
                            {p.change > 0 ? "↑" : "↓"} {Math.abs(p.change)}
                          </small>
                        </strong>
                      </div>
                    ))}
                  </div>
                  <p className="table-note">
                    Illustrative sample standings · Your demo picks do not
                    change these rankings.
                  </p>
                </section>
                <section className="panel discussion-panel">
                  <div className="panel-heading">
                    <MessageCircle size={20} />
                    <h3>The group chat</h3>
                    <span className="tag">LOCAL DEMO</span>
                  </div>
                  <div className="discussion-posts">
                    {posts.map((post, i) => (
                      <div className="discussion-post" key={i}>
                        <span className="avatar">{post.initials}</span>
                        <div>
                          <strong>
                            {post.name}
                            <small>Just now · demo</small>
                          </strong>
                          <p>{post.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (discussion.trim()) {
                        setPosts([
                          ...posts,
                          {
                            name: "You",
                            text: discussion.trim(),
                            initials: "SH",
                          },
                        ]);
                        setDiscussion("");
                      }
                    }}
                  >
                    <label className="sr-only" htmlFor="discussion">
                      Message to your league
                    </label>
                    <input
                      id="discussion"
                      maxLength={250}
                      placeholder="Talk a little sports…"
                      value={discussion}
                      onChange={(e) => setDiscussion(e.target.value)}
                    />
                    <button
                      aria-label="Post message"
                      disabled={!discussion.trim()}
                    >
                      <ArrowUpRight size={17} />
                    </button>
                  </form>
                  <p className="chat-fine">
                    Messages are visible only in this browser session.
                  </p>
                </section>
              </div>
              <SectionHeading
                title="Around your league"
                subtitle="A look at your friends’ settled predictions."
              />
              <div className="friend-picks">
                <section className="panel friend-pick">
                  <span className="avatar">JD</span>
                  <div>
                    <strong>Jordan Davis</strong>
                    <p>Celtics to win · 50 credits at 1.72x</p>
                  </div>
                  <span className="status won">Correct · +36</span>
                </section>
                <section className="panel friend-pick">
                  <span className="avatar">AM</span>
                  <div>
                    <strong>Alex Morgan</strong>
                    <p>Over 48.5 · 40 credits at 1.90x</p>
                  </div>
                  <span className="status lost">Incorrect · −40</span>
                </section>
              </div>
              <p className="muted small">
                Sample settled activity. All outcomes are fictional.
              </p>
            </>
          )}
          {view === "Settings" && (
            <div className="settings-grid">
              <section className="panel settings-panel">
                <span className="panel-icon">
                  <ShieldCheck size={22} />
                </span>
                <h2>Make room for a break.</h2>
                <p>
                  There’s no streak to protect or penalty for stepping away.
                </p>
                <div className="setting-row">
                  <div>
                    <strong>Session reminder</strong>
                    <p>A quiet reminder to check in with yourself.</p>
                  </div>
                  <label>
                    <span className="sr-only">Session reminder interval</span>
                    <select
                      value={reminder}
                      onChange={(e) => setReminder(e.target.value)}
                    >
                      <option value="off">Off</option>
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">60 minutes</option>
                    </select>
                  </label>
                </div>
                <div className="setting-row">
                  <div>
                    <strong>
                      {paused ? "Participation paused" : "Pause participation"}
                    </strong>
                    <p>You can still browse and follow your league.</p>
                  </div>
                  <button
                    className={paused ? "primary-button" : "outline-button"}
                    onClick={() => setPaused(!paused)}
                  >
                    {paused ? <Play size={15} /> : <Pause size={15} />}{" "}
                    {paused ? "Resume participation" : "Pause participation"}
                  </button>
                </div>
                <div className="info-strip">
                  <Clock3 size={18} />
                  <span>
                    Reminders and pauses apply to this session. Reloading resets
                    demo preferences.
                  </span>
                </div>
              </section>
              <section className="panel settings-panel">
                <span className="panel-icon">
                  <Users size={22} />
                </span>
                <h2>Your demo profile</h2>
                <div className="profile-preview">
                  <span className="avatar self">SH</span>
                  <div>
                    <strong>Shreyas</strong>
                    <p>@shreyas · Demo account</p>
                  </div>
                </div>
                <p>
                  This prototype is intended for adults 18+. It is
                  entertainment, not gambling treatment, clinical advice, or
                  therapy.
                </p>
                <p>
                  Accounts, avatars, age confirmation, saved preferences, and
                  optional voluntary time limits belong to a later phase.
                </p>
                <button
                  className="outline-button"
                  onClick={() => changeView("Dashboard")}
                >
                  Back to dashboard <ArrowRight size={15} />
                </button>
              </section>
            </div>
          )}
          <footer className="page-footer">
            <span>
              <Zap size={13} /> BeyondBet <span>·</span> All the game. None of
              the stakes.
            </span>
            <span>Fictional data. Virtual credits. No cash value.</span>
          </footer>
        </main>
      </div>
      <nav className="mobile-nav">
        {nav.map(({ name, icon: Icon }) => (
          <button
            key={name}
            className={view === name ? "active" : ""}
            onClick={() => changeView(name)}
          >
            <Icon size={21} />
            <span>{name}</span>
          </button>
        ))}
      </nav>
      {selected && (
        <div className="slip-backdrop" onClick={() => setSelected(undefined)}>
          <Dialog
            className="pick-slip"
            label="Prediction slip"
            onClose={() => setSelected(undefined)}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="slip-heading">
              <h2>
                <Target size={20} />
                Your prediction
              </h2>
              <button
                className="icon-button"
                aria-label="Close prediction slip"
                onClick={() => setSelected(undefined)}
              >
                <X size={19} />
              </button>
            </div>
            <span className="eyebrow">
              {selected.sport} · {selected.kind} · FICTIONAL MARKET
            </span>
            <h3>{selected.label}</h3>
            <p>{selected.event}</p>
            <div className="slip-multiplier">
              <span>Virtual return multiplier</span>
              <strong>{selected.odds.toFixed(2)}x</strong>
            </div>
            <label className="stake-label" htmlFor="stake">
              Credits to allocate{" "}
              <span>Available: {formatCredits(wallet.available)}</span>
            </label>
            <div className="stake-input">
              <Coins size={18} />
              <input
                id="stake"
                type="number"
                min="1"
                max={wallet.available}
                step="1"
                value={stake}
                onChange={(e) => setStake(e.target.value)}
              />
              <span>credits</span>
            </div>
            <div className="quick-stakes">
              {[25, 50, 100].map((n) => (
                <button key={n} onClick={() => setStake(String(n))}>
                  {n}
                </button>
              ))}
            </div>
            <div className="potential">
              <span>Potential total return</span>
              <strong>
                {Number(stake) > 0
                  ? formatCredits(Number(stake) * selected.odds)
                  : "0"}{" "}
                <small>credits</small>
              </strong>
            </div>
            <button
              className="primary-button place-button"
              disabled={
                paused ||
                !Number.isSafeInteger(Number(stake)) ||
                Number(stake) <= 0 ||
                Number(stake) > wallet.available ||
                wallet.picks.some((p) => p.id === selected.id)
              }
              onClick={submit}
            >
              {paused
                ? "Participation paused"
                : wallet.picks.some((p) => p.id === selected.id)
                  ? "Prediction already placed"
                  : "Place prediction"}
              <ArrowRight size={16} />
            </button>
            <div className="slip-note">
              <ShieldCheck size={15} />
              <p>
                Fictional credits only. No money or prizes.
                <br />
                This demo resets when you reload.
              </p>
            </div>
          </Dialog>
        </div>
      )}
      {message && (
        <div className="toast" role="status">
          <Check size={18} />
          <span>{message}</span>
          <button aria-label="Dismiss message" onClick={() => setMessage("")}>
            <X size={15} />
          </button>
        </div>
      )}
      {sessionNotice && (
        <div className="modal-backdrop">
          <Dialog
            className="modal"
            label="Session reminder"
            onClose={() => setSessionNotice(false)}
          >
            <Clock3 size={30} />
            <h2>Time for a quick check-in.</h2>
            <p>
              You’ve been here for {reminder} minutes. A break is always
              welcome.
            </p>
            <button
              className="primary-button"
              onClick={() => {
                setPaused(true);
                setSessionNotice(false);
                setView("Settings");
              }}
            >
              Pause participation
            </button>
            <button
              className="text-button"
              onClick={() => setSessionNotice(false)}
            >
              Dismiss reminder
            </button>
          </Dialog>
        </div>
      )}
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <Dialog
            className="modal"
            label={modal === "create" ? "Create league" : "Join league"}
            onClose={() => setModal(null)}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close icon-button"
              aria-label="Close league dialog"
              onClick={() => setModal(null)}
            >
              <X size={20} />
            </button>
            <span className="panel-icon">
              <Users size={25} />
            </span>
            <h2>
              {modal === "create"
                ? "Your people. Your league."
                : "Join the conversation."}
            </h2>
            <p>
              {modal === "create"
                ? "Create a private demo league. Everyone starts with 1,000 fictional credits."
                : "Try SUNDAY24, HOOPS24, or OFFICE24 to explore a sample league."}
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (modal === "create" && leagueName.trim()) {
                  setLeague(leagueName.trim());
                  const newCode =
                    "DEMO" +
                    String(Object.keys(leagues).length + 1).padStart(4, "0");
                  setInvite(newCode);
                  setLeagues({ ...leagues, [newCode]: leagueName.trim() });
                  setView("Leagues");
                  setModal(null);
                  setLeagueName("");
                  setMessage("Demo league created. It stays in this session.");
                } else if (modal === "join") {
                  const code = leagueName.toUpperCase().trim();
                  const names = leagues;
                  if (names[code]) {
                    setLeague(names[code]);
                    setInvite(code);
                    setView("Leagues");
                    setModal(null);
                    setLeagueName("");
                    setMessage("Joined sample league. Welcome!");
                  } else
                    setMessage(
                      "Try a sample invite code: SUNDAY24, HOOPS24, or OFFICE24.",
                    );
                }
              }}
            >
              <label htmlFor="league-name">
                {modal === "create" ? "League name" : "Invite code"}
              </label>
              <input
                id="league-name"
                value={leagueName}
                onChange={(e) => setLeagueName(e.target.value)}
                maxLength={40}
                required
                placeholder={
                  modal === "create" ? "e.g. The Sunday Club" : "SUNDAY24"
                }
              />
              <button className="primary-button" type="submit">
                {modal === "create"
                  ? "Create private league"
                  : "Join demo league"}
                <ArrowRight size={16} />
              </button>
            </form>
            <small>Local demo only · No real invites are sent.</small>
          </Dialog>
        </div>
      )}
    </div>
  );
}
