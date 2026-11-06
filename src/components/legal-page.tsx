import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container, PageHeader } from "@/components/page-header";
import { lines } from "@/lib/text";

async function LegalPage({ namespace }: { namespace: "Impressum" | "Datenschutz" | "Terms" | "Ads" }) {
  const t = await getTranslations(namespace);
  return (
    <Container className="py-12 sm:py-16">
      <PageHeader title={t("title")} />
      <div className="mt-8 grid max-w-3xl gap-4 text-base leading-7">
        {lines(t.raw("paragraphs")).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Container>
  );
}

export async function impressumMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Impressum" });
  return { title: t("title") };
}

export async function privacyMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Datenschutz" });
  return { title: t("title") };
}

export async function termsMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Terms" });
  return { title: t("title") };
}

export async function adsMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Ads" });
  return { title: t("title") };
}

export function ImpressumPage() {
  return <LegalPage namespace="Impressum" />;
}

export function PrivacyPage() {
  return <LegalPage namespace="Datenschutz" />;
}

export function TermsPage() {
  return <LegalPage namespace="Terms" />;
}

export function AdsPage() {
  return <LegalPage namespace="Ads" />;
}
