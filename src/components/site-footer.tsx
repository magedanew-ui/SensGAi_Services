import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "./page-header";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const nav = await getTranslations("Nav");

  return (
    <footer className="mt-auto border-t border-border">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="max-w-sm text-sm leading-6 text-muted">{t("about")}</p>
        </div>
        <nav aria-label={t("navigate")}>
          <h2 className="text-sm font-semibold">{t("navigate")}</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            <li>
              <Link href="/vergleiche">{nav("vergleiche")}</Link>
            </li>
            <li>
              <Link href="/ratgeber">{nav("ratgeber")}</Link>
            </li>
            <li>
              <Link href="/wegweiser">{nav("wegweiser")}</Link>
            </li>
            <li>
              <Link href="/anfragen-angebote">{nav("anfragen")}</Link>
            </li>
            <li>
              <Link href="/ueber-uns">{t("aboutLink")}</Link>
            </li>
            <li>
              <Link href="/kontakt">{t("contactLink")}</Link>
            </li>
          </ul>
        </nav>
        <nav aria-label={t("legal")}>
          <h2 className="text-sm font-semibold">{t("legal")}</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            <li>
              <Link href="/impressum">{t("imprint")}</Link>
            </li>
            <li>
              <Link href="/datenschutz">{t("privacy")}</Link>
            </li>
            <li>
              <Link href="/nutzungsbedingungen">{t("terms")}</Link>
            </li>
            <li>
              <Link href="/werbehinweis">{t("adsLink")}</Link>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold">{t("contact")}</h2>
          <p className="mt-3 text-sm">{t("city")}</p>
          <p className="mt-1 text-sm text-muted">{t("email")}</p>
          <p className="mt-4 text-sm leading-6 text-muted">{t("ads")}</p>
        </div>
      </Container>
    </footer>
  );
}
