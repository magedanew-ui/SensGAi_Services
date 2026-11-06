import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/page-header";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <Container className="py-20">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <p className="mt-4 text-muted">{t("text")}</p>
      <Link href="/" className="btn btn-primary mt-8">
        {t("home")}
      </Link>
    </Container>
  );
}
