import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { InterestForm } from "@/components/interest-form";
import { Notice } from "@/components/notice";
import { Photo } from "@/components/photo";
import { Container, PageHeader } from "@/components/page-header";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Anfragen" });
  return { title: t("title"), description: t("lead") };
}

export default async function AnfragenPage() {
  const t = await getTranslations("Anfragen");

  return (
    <Container className="py-12 sm:py-16">
      <PageHeader title={t("title")} lead={t("lead")} />
      <Photo
        src="/photos/anfragen-talk.jpg"
        alt={t("photoAlt")}
        className="mt-8 aspect-[4/3] max-w-xl"
      />
      <div className="mt-8 max-w-3xl">
        <Notice>{t("soon")}</Notice>
      </div>
      <section className="mt-10 max-w-xl">
        <h2 className="text-2xl font-semibold">{t("formTitle")}</h2>
        <div className="mt-6">
          <InterestForm />
        </div>
      </section>
    </Container>
  );
}
