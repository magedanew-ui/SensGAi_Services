import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Notice } from "@/components/notice";
import { Container, PageHeader } from "@/components/page-header";
import { articlePhotos } from "@/data/photos";
import { assertLocale } from "@/i18n/locale";
import { listArticles } from "@/lib/articles";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Ratgeber" });
  return { title: t("title"), description: t("lead") };
}

export default async function RatgeberPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations("Ratgeber");
  const articles = listArticles(locale);

  return (
    <Container className="py-12 sm:py-16">
      <PageHeader title={t("title")} lead={t("lead")} />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {articles.map((view) => {
          const photo = articlePhotos[view.article.slug];
          return (
          <li key={view.article.slug}>
            <Link
              href={`/ratgeber/${view.article.slug}`}
              className="block h-full overflow-hidden rounded-2xl border border-border bg-surface"
            >
              {photo ? (
                <Image
                  src={photo}
                  alt={view.article.title}
                  width={1200}
                  height={900}
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : null}
              <span className="block p-5">
              <h2 className="text-xl font-semibold">{view.article.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{view.article.description}</p>
              {view.notice ? (
                <span className="mt-3 block">
                  <Notice>{t(view.notice)}</Notice>
                </span>
              ) : null}
              </span>
            </Link>
          </li>
          );
        })}
      </ul>
    </Container>
  );
}
