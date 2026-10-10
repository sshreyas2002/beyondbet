import { CircleHelp, Search, Sparkles } from "lucide-react";
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
export function PredictionsView({
  sport,
  setSport,
  kind,
  setKind,
  search,
  setSearch,
  visibleMarkets,
  selected,
  select,
}: {
  sport: string;
  setSport: (s: string) => void;
  kind: string;
  setKind: (s: string) => void;
  search: string;
  setSearch: (s: string) => void;
  visibleMarkets: Market[];
  selected?: Selection;
  select: (s: Selection) => void;
}) {
  return (
    <>
      <div className="info-strip">
        <Sparkles size={16} />
        <span>
          Sample slate · All events, odds, probabilities, and results are
          fictional.
        </span>
        <span className="tag">DEMO</span>
      </div>
      <div className="prediction-toolbar">
        <div className="sport-tabs large">
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
        </div>
        <label className="search-field">
          <Search size={17} />
          <input
            placeholder="Search teams, players, or markets"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>
      <div className="market-filters">
        {[
          "All markets",
          "Winner",
          "Spread",
          "Total",
          "Player props",
          "Yes / No",
        ].map((k) => (
          <button
            key={k}
            className={kind === k ? "active" : ""}
            onClick={() => setKind(k)}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="results-heading">
        <h2>{kind === "All markets" ? "Explore the slate" : kind}</h2>
        <span>{visibleMarkets.length} sample markets</span>
      </div>
      <div className="markets-grid full-markets">
        {visibleMarkets.map((m) => (
          <MarketCard
            key={m.id}
            market={m}
            selected={selected?.id}
            onSelect={select}
          />
        ))}
      </div>
      {!visibleMarkets.length && (
        <div className="empty-state">
          <Search size={30} />
          <h3>No matching predictions</h3>
          <p>Try another team or clear your filters.</p>
          <button
            className="outline-button"
            onClick={() => {
              setSearch("");
              setKind("All markets");
              setSport("All sports");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
      <div className="sample-note">
        <CircleHelp size={15} />
        <p>
          Multipliers show the total virtual return, including your allocated
          credits. A 50-credit pick at 1.90x returns 95 credits if correct.
        </p>
      </div>
    </>
  );
}
