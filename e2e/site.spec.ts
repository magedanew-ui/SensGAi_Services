import { expect, test } from "@playwright/test";

test("root redirects to German and shows the slogan", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/de\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Wechseln.");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Sparen.");
});

test("language switch keeps the page and flips direction", async ({ page }) => {
  await page.goto("/de/vergleiche");
  await page.getByRole("link", { name: /العربية/ }).click();
  await expect(page).toHaveURL(/\/ar\/vergleiche\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("المقارنات");
});

test("strom explains terms and keeps the partner link closed", async ({ page }) => {
  await page.goto("/de/vergleiche/strom");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Strom");
  await expect(page.getByText("Grundpreis", { exact: true })).toBeVisible();
  await expect(page.getByText("Postleitzahl", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Der Partner-Link folgt." })).toBeDisabled();
  await expect(page.getByText("Link folgt").first()).toBeVisible();
});

test("missing Arabic article shows the German text and a note", async ({ page }) => {
  await page.goto("/ar/ratgeber/behoerden-termin");
  await expect(page.getByText("هالمقالة لسا مش متوفرة بالعربي.")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Termin bei der Behörde");
});

test("mobile menu opens the catalog", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/de");
  await page.getByRole("button", { name: "Menü" }).click();
  await page
    .getByRole("navigation", { name: "Hauptnavigation" })
    .getByRole("link", { name: "Vergleiche", exact: true })
    .click();
  await expect(page).toHaveURL(/\/de\/vergleiche\/?$/);
});

test("empty contact form explains the missing name", async ({ page }) => {
  await page.goto("/de/kontakt");
  await page.getByRole("button", { name: "Nachricht senden" }).click();
  await expect(page.getByRole("status")).toContainText("Bitte schreiben Sie Ihren Namen.");
});
