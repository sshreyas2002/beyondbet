import { markets, type Selection } from "./demo";
export type Prediction = Selection & {
  stake: number;
  status: "active" | "won" | "lost";
  returned: number;
};
export type Wallet = { available: number; picks: Prediction[] };
export const initialWallet = (): Wallet => ({ available: 1000, picks: [] });
export function placePick(
  wallet: Wallet,
  selection: Selection,
  stake: number,
  paused: boolean,
): Wallet {
  const canonical = markets
    .flatMap((m) => m.options)
    .find((s) => s.id === selection.id);
  if (!canonical) throw new Error("Unknown fictional market selection.");
  if (paused)
    throw new Error(
      "Participation is paused. Resume in Settings when you are ready.",
    );
  if (!Number.isSafeInteger(stake) || stake <= 0)
    throw new Error("Choose a positive whole number of credits.");
  if (stake > wallet.available)
    throw new Error("Not enough available credits.");
  if (wallet.picks.some((p) => p.id === selection.id))
    throw new Error("You already placed this prediction.");
  return {
    available: wallet.available - stake,
    picks: [
      { ...canonical, stake, status: "active", returned: 0 },
      ...wallet.picks,
    ],
  };
}
export function settleDemo(wallet: Wallet): Wallet {
  let returns = 0;
  const picks = wallet.picks.map((p) => {
    if (p.status !== "active") return p;
    const returned =
      p.result === "won" ? Math.round(p.stake * p.odds * 100) / 100 : 0;
    returns += returned;
    return { ...p, status: p.result, returned };
  });
  return {
    available: Math.round((wallet.available + returns) * 100) / 100,
    picks,
  };
}
