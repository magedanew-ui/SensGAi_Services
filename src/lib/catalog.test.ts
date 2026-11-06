import { describe, expect, it } from "vitest";
import { categories } from "@/data/catalog";
import { categoryIsReady, getCategory, isRealUrl, listCategories } from "@/lib/catalog";
import { getArticleView } from "@/lib/articles";
import { contactError, interestError } from "@/lib/forms";
import de from "../../messages/de.json";
import ar from "../../messages/ar.json";

function leaves(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return [prefix];
  }
  return Object.entries(value).flatMap(([key, nested]) =>
    leaves(nested, prefix ? `${prefix}.${key}` : key),
  );
}

describe("messages", () => {
  it("uses the same keys in German and Arabic", () => {
    expect(leaves(de).sort()).toEqual(leaves(ar).sort());
  });
});

describe("catalog", () => {
  it("treats only http links as real", () => {
    expect(isRealUrl("https://example.com")).toBe(true);
    expect(isRealUrl("AFFILIATE_URL_STROM")).toBe(false);
    expect(isRealUrl(undefined)).toBe(false);
  });

  it("shows placeholder categories and keeps strom explanations", () => {
    expect(listCategories().map((item) => item.slug)).toContain("strom");
    expect(listCategories().length).toBe(categories.length);
    const strom = getCategory("strom");
    expect(strom?.fieldHelp.map((field) => field.id)).toEqual(["plz", "verbrauch"]);
    expect(strom?.glossary.some((item) => item.term === "Grundpreis")).toBe(true);
    expect(strom?.supportsPrefill).toBe(false);
    expect(strom?.prefillParams).toBeUndefined();
    expect(strom && categoryIsReady(strom)).toBe(false);
  });

  it("does not invent partner parameters for other categories", () => {
    const gas = getCategory("gas");
    expect(gas?.fieldHelp[0]?.id).toBe("todo");
    expect(gas?.supportsPrefill).toBe(false);
    expect(gas?.isInsurance).toBe(false);
    expect(getCategory("kfz")?.isInsurance).toBe(true);
    expect(getCategory("girokonto")?.isFinance).toBe(true);
  });
});

describe("articles", () => {
  it("shows the German authority article in Arabic with a notice", () => {
    const view = getArticleView("ar", "behoerden-termin");
    expect(view?.article.locale).toBe("de");
    expect(view?.notice).toBe("missingArabic");
  });

  it("hides the notice when both languages exist", () => {
    const view = getArticleView("de", "stromvertrag-verstehen");
    expect(view?.notice).toBeNull();
    expect(view?.article.locale).toBe("de");
  });
});

describe("forms", () => {
  it("checks contact fields", () => {
    expect(
      contactError({
        name: "A",
        email: "a@b.de",
        message: "Das ist lang genug.",
        privacy: true,
      }),
    ).toBe("name");
    expect(
      contactError({
        name: "Ada",
        email: "ada@example.de",
        message: "Das ist lang genug.",
        privacy: false,
      }),
    ).toBe("privacy");
    expect(
      contactError({
        name: "Ada",
        email: "ada@example.de",
        message: "Das ist lang genug.",
        privacy: true,
      }),
    ).toBeNull();
  });

  it("requires a request or an offer", () => {
    expect(
      interestError({
        name: "Ada",
        email: "ada@example.de",
        message: "Das ist lang genug.",
        privacy: true,
        kind: "sonst",
      }),
    ).toBe("kind");
  });
});
