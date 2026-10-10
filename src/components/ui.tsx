import { Target, ArrowRight } from "lucide-react";
import type { Wallet } from "@/lib/wallet";
export function Stat({
  icon,
  label,
  value,
  note,
  change,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  note: string;
  change: string;
}) {
  return (
    <article className="stat-card">
      <div className="stat-label">
        {label}
        <span>{icon}</span>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-note">
        <span>{note}</span>
        <small>{change}</small>
      </div>
    </article>
  );
}
export function SectionHeading({
  title,
  subtitle,
  action,
  onClick,
}: {
  title: string;
  subtitle?: string;
  action?: string;
  onClick?: () => void;
}) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action && (
        <button className="text-button" onClick={onClick}>
          {action}
          <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}
export function PredictionList({ wallet }: { wallet: Wallet }) {
  return (
    <div className="panel prediction-list">
      {wallet.picks.length ? (
        wallet.picks.map((p) => (
          <div className="prediction-row" key={p.id}>
            <span className={`prediction-icon ${p.status}`}>
              <Target size={19} />
            </span>
            <div>
              <strong>{p.label}</strong>
              <p>
                {p.event} · {p.kind}
              </p>
            </div>
            <div className="prediction-amount">
              <strong>{p.stake} credits</strong>
              <p>{p.odds.toFixed(2)}x multiplier</p>
            </div>
            <span className={`status ${p.status}`}>
              {p.status === "active"
                ? "Active"
                : p.status === "won"
                  ? "Correct"
                  : "Incorrect"}
            </span>
          </div>
        ))
      ) : (
        <div className="empty-predictions">
          <span className="panel-icon">
            <Target size={23} />
          </span>
          <div>
            <h3>Your next great call is waiting.</h3>
            <p>Select a market to make your first fictional prediction.</p>
          </div>
        </div>
      )}
    </div>
  );
}
