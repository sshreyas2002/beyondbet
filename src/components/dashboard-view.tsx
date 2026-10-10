import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Coins,
  Flag,
  Settings,
  ShieldCheck,
  Target,
  TrendingUp,
  Trophy,
  Play,
} from "lucide-react";
import {
  markets,
  standings,
  formatCredits,
  type Selection,
  type Market,
} from "@/lib/demo";
import type { Wallet } from "@/lib/wallet";
import type { View } from "@/lib/types";
import { MarketCard } from "./market-card";
import { Stat, SectionHeading, PredictionList } from "./ui";
export function DashboardView({
  wallet,
  period,
  sport,
  setSport,
  selected,
  select,
  changeView,
}: {
  wallet: Wallet;
  period: string;
  sport: string;
  setSport: (s: string) => void;
  selected?: Selection;
  select: (s: Selection) => void;
  changeView: (v: View) => void;
}) {
  return (
    <>
      <section className="hero-banner">
        <div className="hero-copy">
          <span className="hero-kicker">
            <span /> THE SPORT. THE SOCIAL. THE CHALLENGE.
          </span>
          <h2>
            All the game.
            <br />
            None of the stakes.
          </h2>
          <p>
            Make your picks. Find your people.
            <br />
            Play for the love of the game.
          </p>
          <button
            className="primary-button"
            onClick={() => changeView("Predictions")}
          >
            Explore predictions <ArrowRight size={17} />
          </button>
          <span className="hero-fine">
            <ShieldCheck size={13} />
            100% free to play. No cash. No pressure.
          </span>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="court-grid" />
          <div className="floating-tag tag-one">
            <span className="art-icon">
              <Trophy size={20} />
            </span>
            <div>
              FRIENDLY RIVALRY<strong>You’re in good company.</strong>
            </div>
          </div>
          <svg className="hero-ball" viewBox="0 0 220 220">
            <defs>
              <radialGradient id="ball">
                <stop stopColor="#54c0ab" />
                <stop offset=".7" stopColor="#288b7e" />
                <stop offset="1" stopColor="#0f4d48" />
              </radialGradient>
            </defs>
            <circle cx="110" cy="110" r="103" fill="url(#ball)" />
            <g fill="none" stroke="#113f3c" strokeWidth="5">
              <circle cx="110" cy="110" r="103" />
              <path d="M7 105 Q105 130 207 105 M116 7 Q92 105 116 213 M36 39 Q160 82 182 182 M180 35 Q48 96 37 183" />
            </g>
            <g fill="none" stroke="#92e4d1" strokeOpacity=".15">
              <circle cx="110" cy="110" r="96" />
              <circle cx="110" cy="110" r="90" />
            </g>
          </svg>
          <div className="floating-tag tag-two">
            <span className="small-coin">
              <Coins size={18} />
            </span>
            <div>
              WEEKLY DROP<strong>1,000 virtual credits</strong>
            </div>
            <span className="art-check">
              <Check size={15} />
            </span>
          </div>
          <span className="art-label">LESS RISK. MORE GAME.</span>
        </div>
      </section>
      <section className="stats-grid">
        <Stat
          icon={<Coins />}
          label="Available credits"
          value={formatCredits(wallet.available)}
          note="Weekly allowance: 1,000"
          change="No cash value"
        />
        <Stat
          icon={<Target />}
          label="Prediction accuracy"
          value={period === "This week" ? "68%" : "64%"}
          note="Sample performance"
          change="↑ 8% this week"
        />
        <Stat
          icon={<TrendingUp />}
          label="Weekly return"
          value={period === "This week" ? "+280" : "+1,240"}
          note="Illustrative demo history"
          change="↑ 28%"
        />
        <Stat
          icon={<Trophy />}
          label="League standing"
          value={
            <>
              3<span className="stat-suffix"> / 12</span>
            </>
          }
          note="The Sunday Club · Sample"
          change="↑ 1 place"
        />
      </section>
      <div className="dashboard-columns">
        <div>
          <SectionHeading
            title="On the board"
            subtitle="Your next prediction starts here."
            action="View all"
            onClick={() => changeView("Predictions")}
          />
          <div className="sport-tabs">
            <button
              className={sport === "All sports" ? "active" : ""}
              onClick={() => setSport("All sports")}
            >
              All sports
            </button>
            <button
              className={sport === "NBA" ? "active" : ""}
              onClick={() => setSport("NBA")}
            >
              ◎ NBA
            </button>
            <button
              className={sport === "NFL" ? "active" : ""}
              onClick={() => setSport("NFL")}
            >
              ◈ NFL
            </button>
            <span>FICTIONAL EVENTS & ODDS</span>
          </div>
          <div className="markets-grid">
            {markets
              .filter((m) => sport === "All sports" || m.sport === sport)
              .slice(0, 4)
              .map((m) => (
                <MarketCard
                  key={m.id}
                  market={m}
                  selected={selected?.id}
                  onSelect={select}
                />
              ))}
          </div>
          <div className="section-spacer">
            <SectionHeading
              title="Your predictions"
              subtitle="A little foresight goes a long way."
              action="View wallet"
              onClick={() => changeView("Wallet")}
            />
            <PredictionList wallet={wallet} />
          </div>
        </div>
        <aside className="dashboard-right">
          <section className="panel league-panel">
            <div className="panel-heading">
              <span className="panel-icon">
                <Trophy size={19} />
              </span>
              <div>
                <h3>The Sunday Club</h3>
                <p>Private league · 12 friends</p>
              </div>
              <button
                className="icon-button"
                aria-label="Open league"
                onClick={() => changeView("Leagues")}
              >
                <ArrowUpRight size={17} />
              </button>
            </div>
            <div className="league-panel-top">
              <span>WEEKLY LEADERBOARD</span>
              <span>Credits</span>
            </div>
            {standings.slice(0, 4).map((p, i) => (
              <div
                className={`mini-standing ${p.name === "You" ? "you-row" : ""}`}
                key={p.name}
              >
                <span className="rank">{i + 1}</span>
                <span
                  className="avatar"
                  style={{ background: p.color + "26", color: p.color }}
                >
                  {p.initials}
                </span>
                <div>
                  <strong>{p.name}</strong>
                  <small>{p.handle}</small>
                </div>
                <b>{formatCredits(p.credits)}</b>
              </div>
            ))}
            <button
              className="panel-link"
              onClick={() => changeView("Leagues")}
            >
              See full leaderboard <ArrowRight size={14} />
            </button>
          </section>
          <section className="panel weekly-challenge">
            <span className="challenge-kicker">
              <Flag size={14} /> THE WEEKLY CHALLENGE
            </span>
            <h3>
              Bragging rights
              <br />
              start here.
            </h3>
            <p>
              Make 5 predictions this week.
              <br />
              See where your instincts take you.
            </p>
            <div className="challenge-progress">
              <span>{Math.min(wallet.picks.length, 5)} of 5 predictions</span>
              <span>{Math.min(wallet.picks.length * 20, 100)}%</span>
            </div>
            <div className="progress-track">
              <i
                style={{
                  width: `${Math.min(wallet.picks.length * 20, 100)}%`,
                }}
              />
            </div>
            <span className="challenge-fine">
              Just for fun. No prizes or penalties.
            </span>
          </section>
          <section className="break-card">
            <span className="break-icon">
              <ShieldCheck size={22} />
            </span>
            <div>
              <strong>It’s a game. Keep it that way.</strong>
              <p>
                Play at your pace. Taking a break
                <br />
                is always a good call.
              </p>
              <button onClick={() => changeView("Settings")}>
                Your play settings <ArrowUpRight size={12} />
              </button>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
