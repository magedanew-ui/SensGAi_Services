import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CategoryIcon } from "@/components/category-icon";
import { Photo } from "@/components/photo";
import { Container, PageHeader } from "@/components/page-header";
import { groupPhotos } from "@/data/photos";
import { assertLocale } from "@/i18n/locale";
import { categoriesByGroup } from "@/lib/catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Catalog" });
  return { title: t("title"), description: t("lead") };
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations("Catalog");
  const groups = await getTranslations("Groups");
  const common = await getTranslations("Common");
  const sections = categoriesByGroup();

  return (
    <Container className="py-12 sm:py-16">
      <PageHeader title={t("title")} lead={t("lead")} />
      <div className="mt-12 grid gap-12">
        {sections.map((section) => (
          <section key={section.group}>
            <Photo
              src={groupPhotos[section.group].src}
              alt={groups(groupPhotos[section.group].alt)}
              className="mb-5 aspect-[16/7] max-h-72"
            />
            <h2 className="text-xl font-semibold">{groups(section.group)}</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {section.items.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/vergleiche/${category.slug}`}
                    className="flex h-full gap-4 rounded-2xl border border-border bg-surface p-5"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <CategoryIcon name={category.icon} />
                    </span>
                    <span>
                      <span className="block text-lg font-semibold">
                        {category.title[locale]}
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-muted">
                        {category.shortText[locale]}
                      </span>
                      <span className="mt-3 inline-flex rounded-full bg-warning px-3 py-1 text-xs">
                        {common("linkFollows")}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Container>
  );
}
