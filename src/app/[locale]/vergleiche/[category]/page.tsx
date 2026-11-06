import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { GuidedForm } from "@/components/guided-form";
import { Ltr } from "@/components/ltr-text";
import { Notice } from "@/components/notice";
import { Photo } from "@/components/photo";
import { Container } from "@/components/page-header";
import { groupPhotos } from "@/data/photos";
import { routing } from "@/i18n/routing";
import { assertLocale } from "@/i18n/locale";
import { getArticleView } from "@/lib/articles";
import {
  categoryIsReady,
  getCategory,
  getPartner,
  isRealUrl,
  listCategories,
} from "@/lib/catalog";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    listCategories().map((category) => ({ locale, category: category.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category: slug } = await params;
  const category = getCategory(slug);
  const safeLocale = assertLocale(locale);
  if (!category) return {};
  return {
    title: category.title[safeLocale],
    description: category.shortText[safeLocale],
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale: localeValue, category: slug } = await params;
  const locale = assertLocale(localeValue);
  const category = getCategory(slug);
  if (!category) notFound();

  const t = await getTranslations("Category");
  const groups = await getTranslations("Groups");
  const notices = await getTranslations("Notices");
  const common = await getTranslations("Common");
  const partner = getPartner(category.partnerId);
  const ready = categoryIsReady(category);
  const frameReady = isRealUrl(category.iframeUrl);

  return (
    <Container className="py-12 sm:py-16">
      <Link href="/vergleiche" className="inline-flex items-center gap-2 text-sm font-medium">
        <ArrowLeft aria-hidden="true" className="size-4 rtl:-scale-x-100" />
        {t("back")}
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-5xl">
        {category.title[locale]}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{category.shortText[locale]}</p>
      <Photo
        src={groupPhotos[category.group].src}
        alt={groups(groupPhotos[category.group].alt)}
        className="mt-8 aspect-[16/9] max-w-3xl"
      />
      <p className="mt-4">
        <span className="inline-flex rounded-full bg-warning px-3 py-1 text-sm">
          {ready ? partner?.name : common("linkFollows")}
        </span>
      </p>

      <div className="mt-8 grid max-w-3xl gap-3">
        <Notice>{notices("tippgeber")}</Notice>
        {category.isInsurance ? <Notice tone="warning">{notices("insurance")}</Notice> : null}
        {category.isFinance ? <Notice tone="warning">{notices("finance")}</Notice> : null}
      </div>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-semibold">{t("fieldsTitle")}</h2>
        <p className="mt-3 text-muted">{t("fieldsLead")}</p>
        {partner ? (
          <p className="mt-3 text-sm">
            {t("partner")}:{" "}
            <Ltr>{partner.logoAllowed ? partner.name : partner.name}</Ltr>
          </p>
        ) : null}
        <div className="mt-6">
          <GuidedForm
            fields={category.fieldHelp}
            ready={ready}
            affiliateUrl={category.affiliateUrl}
            supportsPrefill={category.supportsPrefill}
            prefillParams={category.prefillParams}
          />
        </div>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-semibold">{t("windowTitle")}</h2>
        {frameReady && category.iframeUrl ? (
          <iframe
            title={t("windowTitle")}
            src={category.iframeUrl}
            className="mt-4 h-[640px] w-full rounded-2xl border border-border bg-surface"
          />
        ) : (
          <p className="mt-4 rounded-2xl border border-dashed border-border p-6 text-muted">
            {t("windowMissing")}
          </p>
        )}
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-semibold">{t("glossaryTitle")}</h2>
        <dl className="mt-4 grid gap-4">
          {category.glossary.map((item) => (
            <div key={item.term} className="rounded-2xl border border-border bg-surface p-4">
              <dt className="font-semibold">
                <Ltr>{item.term}</Ltr>
              </dt>
              <dd className="mt-2 text-sm leading-6 text-muted">{item[locale]}</dd>
            </div>
          ))}
        </dl>
      </section>

      <RelatedArticles slugs={category.relatedArticles} locale={locale} title={t("relatedTitle")} />
    </Container>
  );
}

async function RelatedArticles({
  slugs,
  locale,
  title,
}: {
  slugs: string[];
  locale: "de" | "ar";
  title: string;
}) {
  const articles = slugs
    .map((slug) => getArticleView(locale, slug))
    .filter((view) => view !== null);

  if (articles.length === 0) return null;

  return (
    <section className="mt-12 max-w-3xl">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <ul className="mt-4 grid gap-3">
        {articles.map((view) => (
          <li key={view.article.slug}>
            <Link
              href={`/ratgeber/${view.article.slug}`}
              className="block rounded-2xl border border-border bg-surface p-4"
            >
              <span className="font-semibold">{view.article.title}</span>
              <span className="mt-1 block text-sm text-muted">{view.article.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
