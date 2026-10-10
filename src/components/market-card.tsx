import { Clock3, ArrowUpRight, Users } from "lucide-react";
import type { Market, Selection } from "@/lib/demo";
export function MarketCard({
  market,
  selected,
  onSelect,
}: {
  market: Market;
  selected?: string;
  onSelect: (selection: Selection) => void;
}) {
  const player = market.kind === "Player props";
  return (
    <article className="market-card">
      <div className="market-meta">
        <span className="sport-label">
          {market.sport} <span>· {market.kind}</span>
        </span>
        <span>
          <Clock3 size={12} />
          {market.time}
        </span>
      </div>
      <div className="matchup">
        <div
          className={`team-mark ${player ? "player-mark" : ""}`}
          style={{ "--team-color": market.colors[0] } as React.CSSProperties}
        >
          {market.teams[0]}
        </div>
        <div className="matchup-title">
          <h3>{market.title}</h3>
          <p>{market.subtitle}</p>
        </div>
        {!player && (
          <div
            className="team-mark"
            style={{ "--team-color": market.colors[1] } as React.CSSProperties}
          >
            {market.teams[1]}
          </div>
        )}
      </div>
      <div className="market-options">
        {market.options.map((s) => (
          <button
            key={s.id}
            className={selected === s.id ? "selected" : ""}
            onClick={() => onSelect(s)}
            aria-label={`${s.label} ${s.odds}x`}
          >
            <span>{s.label}</span>
            <strong>
              {s.odds.toFixed(2)}
              <small>x</small>
            </strong>
          </button>
        ))}
      </div>
      <div className="market-footer">
        <span>
          <Users size={12} /> {market.id === "boston" ? "248" : "126"} demo
          picks
        </span>
        <span>
          View market <ArrowUpRight size={12} />
        </span>
      </div>
    </article>
  );
}
