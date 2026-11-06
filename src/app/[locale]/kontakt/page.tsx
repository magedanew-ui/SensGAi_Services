import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact-form";
import { Container, PageHeader } from "@/components/page-header";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return { title: t("title"), description: t("lead") };
}

export default async function ContactPage() {
  const t = await getTranslations("Contact");

  return (
    <Container className="py-12 sm:py-16">
      <PageHeader title={t("title")} lead={t("lead")} />
      <section className="mt-10 max-w-xl">
        <h2 className="text-2xl font-semibold">{t("formTitle")}</h2>
        <div className="mt-6">
          <ContactForm />
        </div>
      </section>
    </Container>
  );
}
