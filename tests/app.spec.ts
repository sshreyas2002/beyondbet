import { test, expect } from "@playwright/test";
test("place a fictional pick and update wallet", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Good evening, Shreyas" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Explore predictions" }).click();
  await page.getByRole("button", { name: "Celtics 1.72x" }).click();
  await page.getByLabel("Credits to allocate").fill("100");
  await page.getByRole("button", { name: "Place prediction" }).click();
  await expect(page.getByText("Prediction placed. Good luck!")).toBeVisible();
  await page
    .getByRole("button", { name: "Wallet", exact: true })
    .first()
    .click();
  await expect(page.getByTestId("available-balance")).toHaveText("900");
  await expect(page.getByText("Celtics", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Settle demo predictions" }).click();
  await expect(page.getByTestId("available-balance")).toHaveText("1,072");
});
test("filters, empty search, league creation and pause", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Explore predictions" }).click();
  await page
    .getByPlaceholder("Search teams, players, or markets")
    .fill("no-result");
  await expect(page.getByText("No matching predictions")).toBeVisible();
  await page
    .getByRole("button", { name: "Leagues", exact: true })
    .first()
    .click();
  await page
    .getByRole("button", { name: "Create league", exact: true })
    .click();
  await page.getByLabel("League name").fill("Friends Club");
  await page.getByRole("button", { name: "Create private league" }).click();
  await expect(
    page.getByRole("heading", { name: "Friends Club" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  await page.getByRole("button", { name: "Pause participation" }).click();
  await expect(page.getByText("Participation paused")).toBeVisible();
  await page
    .getByRole("button", { name: "Predictions", exact: true })
    .first()
    .click();
  await page.getByPlaceholder("Search teams, players, or markets").fill("");
  await page.getByRole("button", { name: "Celtics 1.72x" }).click();
  await expect(
    page.getByRole("button", { name: "Participation paused" }),
  ).toBeDisabled();
});
test("mobile navigation and no page overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Good evening, Shreyas" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole("button", { name: "Predictions", exact: true })
    .last()
    .click();
  await page.getByRole("button", { name: "Celtics 1.72x" }).click();
  await expect(page.getByLabel("Credits to allocate")).toBeVisible();
});
test("league switching keeps invite code consistent", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Hoop Collective", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Hoop Collective", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("HOOPS24", { exact: true })).toBeVisible();
});
test("market type search and keyboard dialog controls", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Explore predictions" }).click();
  await page
    .getByPlaceholder("Search teams, players, or markets")
    .fill("winner");
  await expect(
    page.getByRole("button", { name: "Celtics 1.72x" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Celtics 1.72x" }).click();
  await expect(
    page.getByRole("dialog", { name: "Prediction slip" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => !!document.activeElement?.closest("[role=dialog]"),
    ),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("mobile settings can pause and resume directly", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Profile settings" }).click();
  await page.getByRole("button", { name: "Pause participation" }).click();
  await expect(
    page.getByRole("button", { name: "Resume participation" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Resume participation" }).click();
  await expect(
    page.getByRole("button", { name: "Pause participation" }),
  ).toBeVisible();
});
test("session reminders appear at the selected interval", async ({ page }) => {
  await page.clock.install();
  await page.goto("/");
  await page.getByRole("button", { name: "Profile settings" }).click();
  await page.getByLabel("Session reminder interval").selectOption("15");
  await page.clock.fastForward("15:00");
  await expect(
    page.getByRole("dialog", { name: "Session reminder" }),
  ).toBeVisible();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Pause participation" })
    .click();
  await expect(
    page.getByRole("button", { name: "Resume participation" }),
  ).toBeVisible();
});
test("created leagues survive switching and support local invite codes", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Add league" }).click();
  await page.getByLabel("League name").fill("Friends League");
  await page.getByRole("button", { name: "Create private league" }).click();
  await expect(page.getByText("DEMO0004", { exact: true })).toBeVisible();
  await page
    .getByRole("button", { name: "Hoop Collective", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Friends League", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Friends League", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("DEMO0004", { exact: true })).toBeVisible();
});
