import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article-body";
import { Photo } from "@/components/photo";
import { articlePhotos } from "@/data/photos";
import { Ltr } from "@/components/ltr-text";
import { Notice } from "@/components/notice";
import { Container } from "@/components/page-header";
import { routing } from "@/i18n/routing";
import { assertLocale } from "@/i18n/locale";
import { allSlugs, getArticleView } from "@/lib/articles";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    allSlugs().map((slug) => ({ locale, slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const view = getArticleView(locale, slug);
  if (!view) return {};
  return { title: view.article.title, description: view.article.description };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeValue, slug } = await params;
  const locale = assertLocale(localeValue);
  const view = getArticleView(locale, slug);
  if (!view) notFound();

  const t = await getTranslations("Ratgeber");
  const common = await getTranslations("Common");
  const notices = await getTranslations("Notices");

  return (
    <Container className="py-12 sm:py-16">
      <article>
        {view.notice ? (
          <div className="mb-6 max-w-3xl">
            <Notice>{t(view.notice)}</Notice>
          </div>
        ) : null}
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
          {view.article.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-muted">{view.article.description}</p>
        {view.article.updated ? (
          <p className="mt-3 text-sm text-muted">
            {common("updated")}: <Ltr>{view.article.updated}</Ltr>
          </p>
        ) : null}
        {articlePhotos[view.article.slug] ? (
          <Photo
            src={articlePhotos[view.article.slug]}
            alt={view.article.title}
            className="mt-8 aspect-[4/3] max-w-3xl"
          />
        ) : null}
        <div className="mt-8">
          <ArticleBody source={view.article.body} />
        </div>
        <div className="mt-10 max-w-3xl">
          <Notice>{notices("tippgeber")}</Notice>
        </div>
      </article>
    </Container>
  );
}
