import { describe, it, expect } from "vitest";
import { markets } from "../src/lib/demo";
import { placePick, settleDemo, initialWallet } from "../src/lib/wallet";
const selection = markets[0].options[0];
describe("fictional credit accounting", () => {
  it("reserves credits and locks displayed odds", () => {
    const w = placePick(initialWallet(), selection, 100, false);
    expect(w.available).toBe(900);
    expect(w.picks[0].stake).toBe(100);
    expect(w.picks[0].odds).toBe(1.72);
  });
  it.each([0, -1, 1.5, NaN, Infinity, 1001])(
    "rejects invalid stake %s",
    (stake) => {
      expect(() =>
        placePick(initialWallet(), selection, stake, false),
      ).toThrow();
    },
  );
  it("blocks picks while paused", () => {
    expect(() => placePick(initialWallet(), selection, 10, true)).toThrow(
      "paused",
    );
  });
  it("rejects a duplicate selection", () => {
    const w = placePick(initialWallet(), selection, 100, false);
    expect(() => placePick(w, selection, 100, false)).toThrow("already");
  });
  it("settles wins once with gross returns", () => {
    const w = settleDemo(placePick(initialWallet(), selection, 100, false));
    expect(w.available).toBe(1072);
    expect(w.picks[0].status).toBe("won");
    expect(settleDemo(w)).toEqual(w);
  });
  it("settles a loss without returning committed credits", () => {
    const w = settleDemo(
      placePick(initialWallet(), markets[0].options[1], 100, false),
    );
    expect(w.available).toBe(900);
    expect(w.picks[0].status).toBe("lost");
  });
});

it("rejects unknown markets", () => {
  expect(() =>
    placePick(initialWallet(), { ...selection, id: "unknown" }, 50, false),
  ).toThrow("Unknown");
});
it("uses seed odds and outcomes instead of altered client data", () => {
  const w = settleDemo(
    placePick(
      initialWallet(),
      { ...selection, odds: 100, result: "lost" },
      100,
      false,
    ),
  );
  expect(w.available).toBe(1072);
  expect(w.picks[0].status).toBe("won");
});
