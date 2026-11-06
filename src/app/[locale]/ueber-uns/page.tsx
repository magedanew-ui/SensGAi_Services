import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Photo } from "@/components/photo";
import { Container, PageHeader } from "@/components/page-header";
import { lines } from "@/lib/text";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return { title: t("title") };
}

export default async function AboutPage() {
  const t = await getTranslations("About");

  return (
    <Container className="py-12 sm:py-16">
      <PageHeader title={t("title")} />
      <Photo
        src="/photos/about-bonn.jpg"
        alt={t("photoAlt")}
        className="mt-8 aspect-[16/9] max-w-3xl"
      />
      <div className="mt-8 grid max-w-3xl gap-4 text-base leading-7">
        {lines(t.raw("paragraphs")).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Container>
  );
}
