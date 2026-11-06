import { defineRouting } from "next-intl/routing";

/**
 * Add a locale by appending it here and creating messages/{locale}.json.
 * English can be added later without moving routes or components.
 */
export const locales = ["de", "ar"] as const;

export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: "de",
  localePrefix: "always",
  localeDetection: false,
  localeCookie: false,
});
