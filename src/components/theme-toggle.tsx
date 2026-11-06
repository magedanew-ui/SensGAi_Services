"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function isDark() {
  return document.documentElement.classList.contains("dark");
}

export function ThemeToggle() {
  const t = useTranslations("Theme");
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold"
      aria-pressed={dark}
    >
      <span className="sr-only">{t("label")}: </span>
      {dark ? t("light") : t("dark")}
    </button>
  );
}
