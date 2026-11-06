import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "./page-header";
import { DesktopNav, MobileNav } from "./navigation";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export async function SiteHeader() {
  const brand = await getTranslations("Brand");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <Container className="relative flex min-h-16 flex-wrap items-center gap-2 py-2">
        <Link href="/" className="text-base font-semibold tracking-tight sm:text-lg">
          {brand("name")}
        </Link>
        <DesktopNav />
        <div className="ms-auto flex items-center">
          <LanguageSwitcher />
          <ThemeToggle />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
