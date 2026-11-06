import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "./routing";

export function assertLocale(value: string): Locale {
  if (!hasLocale(routing.locales, value)) {
    notFound();
  }

  return value;
}
