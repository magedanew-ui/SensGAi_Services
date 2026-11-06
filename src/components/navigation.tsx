"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";

const links = [
  ["vergleiche", "/vergleiche"],
  ["ratgeber", "/ratgeber"],
  ["wegweiser", "/wegweiser"],
  ["anfragen", "/anfragen-angebote"],
] as const;

export function MobileNav() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        <span className="sr-only">{open ? t("close") : t("menu")}</span>
      </button>
      {open ? (
        <nav
          id="mobile-menu"
          aria-label={t("main")}
          className="absolute inset-x-0 top-full border-b border-border bg-background px-4 py-3"
        >
          <ul className="grid gap-1">
            {links.map(([key, href]) => (
              <li key={key}>
                <Link
                  href={href}
                  className="flex min-h-12 items-center rounded-lg px-2 text-base font-medium"
                  onClick={() => setOpen(false)}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}

export function DesktopNav() {
  const t = useTranslations("Nav");

  return (
    <nav aria-label={t("main")} className="hidden items-center gap-1 md:flex">
      {links.map(([key, href]) => (
        <Link
          key={key}
          href={href}
          className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium"
        >
          {t(key)}
        </Link>
      ))}
    </nav>
  );
}
