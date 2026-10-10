export type Sport = "NBA" | "NFL";
export type Selection = {
  id: string;
  marketId: string;
  label: string;
  odds: number;
  event: string;
  kind: string;
  sport: Sport;
  result: "won" | "lost";
};
export type Market = {
  id: string;
  sport: Sport;
  kind: string;
  title: string;
  subtitle: string;
  time: string;
  teams: [string, string];
  colors: [string, string];
  options: Selection[];
};
function market(
  id: string,
  sport: Sport,
  kind: string,
  title: string,
  subtitle: string,
  teams: [string, string],
  colors: [string, string],
  labels: [string, string],
  odds: [number, number],
): Market {
  return {
    id,
    sport,
    kind,
    title,
    subtitle,
    teams,
    colors,
    time: sport === "NBA" ? "7:30 PM" : "8:20 PM",
    options: labels.map((label, i) => ({
      id: `${id}-${i}`,
      marketId: id,
      label,
      odds: odds[i],
      event: title,
      kind,
      sport,
      result: i === 0 ? "won" : "lost",
    })),
  };
}
export const markets: Market[] = [
  market(
    "boston",
    "NBA",
    "Winner",
    "Celtics vs. Knicks",
    "Madison Square Garden",
    ["BOS", "NYK"],
    ["#1c8b65", "#d57638"],
    ["Celtics", "Knicks"],
    [1.72, 2.2],
  ),
  market(
    "chiefs",
    "NFL",
    "Winner",
    "Chiefs vs. Bills",
    "Arrowhead Stadium",
    ["KC", "BUF"],
    ["#cf4651", "#3578ca"],
    ["Chiefs", "Bills"],
    [1.8, 2.05],
  ),
  market(
    "lakers",
    "NBA",
    "Spread",
    "Lakers vs. Warriors",
    "Chase Center",
    ["LAL", "GSW"],
    ["#956bd1", "#d9aa40"],
    ["Lakers +4.5", "Warriors −4.5"],
    [1.91, 1.91],
  ),
  market(
    "ravens",
    "NFL",
    "Total",
    "Ravens vs. Bengals",
    "Total points · 48.5",
    ["BAL", "CIN"],
    ["#9270ce", "#d06c3e"],
    ["Over 48.5", "Under 48.5"],
    [1.9, 1.9],
  ),
  market(
    "tatum",
    "NBA",
    "Player props",
    "Jayson Tatum",
    "Points · Boston Celtics",
    ["JT", "BOS"],
    ["#1c8b65", "#1c8b65"],
    ["Higher 27.5", "Lower 27.5"],
    [1.85, 1.85],
  ),
  market(
    "mahomes",
    "NFL",
    "Player props",
    "Patrick Mahomes",
    "Passing yards · Kansas City",
    ["PM", "KC"],
    ["#cf4651", "#cf4651"],
    ["Higher 275.5", "Lower 275.5"],
    [1.85, 1.85],
  ),
  market(
    "playoffs",
    "NBA",
    "Yes / No",
    "Boston to reach the finals?",
    "Season prediction · Fictional 62% probability",
    ["BOS", "NBA"],
    ["#1c8b65", "#4590ab"],
    ["Yes", "No"],
    [1.61, 2.63],
  ),
  market(
    "bills-playoffs",
    "NFL",
    "Yes / No",
    "Buffalo to win the division?",
    "Season prediction · Fictional 55% probability",
    ["BUF", "NFL"],
    ["#3578ca", "#4590ab"],
    ["Yes", "No"],
    [1.82, 2.22],
  ),
];
export const standings = [
  {
    name: "Jordan Davis",
    handle: "@jordand",
    initials: "JD",
    credits: 1480,
    accuracy: 76,
    change: 2,
    color: "#b78954",
  },
  {
    name: "Alex Morgan",
    handle: "@alexm",
    initials: "AM",
    credits: 1350,
    accuracy: 71,
    change: 1,
    color: "#6987ba",
  },
  {
    name: "You",
    handle: "@shreyas",
    initials: "SH",
    credits: 1280,
    accuracy: 68,
    change: 1,
    color: "#55bda8",
  },
  {
    name: "Sam Rivera",
    handle: "@samr",
    initials: "SR",
    credits: 1190,
    accuracy: 64,
    change: -1,
    color: "#9b7da6",
  },
  {
    name: "Chris Park",
    handle: "@chrisp",
    initials: "CP",
    credits: 1050,
    accuracy: 59,
    change: -2,
    color: "#789890",
  },
];
export const formatCredits = (n: number) =>
  n.toLocaleString("en-US", { maximumFractionDigits: 2 });
