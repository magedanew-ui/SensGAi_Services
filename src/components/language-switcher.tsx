"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Language");
  const next = locale === "de" ? "ar" : "de";

  return (
    <Link
      href={pathname}
      locale={next}
      hrefLang={next}
      className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold"
    >
      <span className="sr-only">{t("switchTo")}: </span>
      {t(next)}
    </Link>
  );
}
