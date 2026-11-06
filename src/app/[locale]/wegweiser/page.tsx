import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Ltr } from "@/components/ltr-text";
import { Photo } from "@/components/photo";
import { Container, PageHeader } from "@/components/page-header";
import { assertLocale } from "@/i18n/locale";
import { wegweiserEntries, wegweiserGroupOrder } from "@/data/wegweiser";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Wegweiser" });
  return { title: t("title"), description: t("lead") };
}

export default async function WegweiserPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations("Wegweiser");
  const groups = await getTranslations("WegweiserGroups");

  return (
    <Container className="py-12 sm:py-16">
      <PageHeader title={t("title")} lead={t("lead")} />
      <Photo
        src="/photos/wegweiser-hall.jpg"
        alt={t("photoAlt")}
        className="mt-8 aspect-[16/9] max-w-3xl"
      />
      <div className="mt-12 grid gap-12">
        {wegweiserGroupOrder.map((group) => {
          const entries = wegweiserEntries.filter((entry) => entry.group === group);
          return (
            <section key={group}>
              <h2 className="text-xl font-semibold">{groups(group)}</h2>
              <ul className="mt-4 grid gap-4">
                {entries.map((entry) => (
                  <li
                    key={entry.id}
                    className="rounded-2xl border border-border bg-surface p-5"
                  >
                    <h3 className="text-lg font-semibold">{entry.title[locale]}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
                      {entry.text[locale]}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                      {entry.url ? (
                        <a
                          href={entry.url}
                          className="inline-flex items-center gap-1"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {t("open")}
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-4 rtl:-scale-x-100"
                          />
                        </a>
                      ) : null}
                      {entry.phone ? (
                        <span>
                          {t("phone")}: <Ltr>{entry.phone}</Ltr>
                        </span>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </Container>
  );
}
