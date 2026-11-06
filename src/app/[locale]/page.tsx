import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CategoryIcon } from "@/components/category-icon";
import { Container } from "@/components/page-header";
import { categoriesByGroup } from "@/lib/catalog";
import { assertLocale } from "@/i18n/locale";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations("Home");
  const groups = await getTranslations("Groups");
  const common = await getTranslations("Common");
  const brand = await getTranslations("Brand");
  const pillarPhotos = [
    { src: "/photos/pillar-compare.jpg", alt: "pillar1Alt" },
    { src: "/photos/pillar-guide.jpg", alt: "pillar2Alt" },
    { src: "/photos/pillar-help.jpg", alt: "pillar3Alt" },
  ] as const;
  const preview = categoriesByGroup()
    .flatMap((entry) => entry.items)
    .slice(0, 4);

  return (
    <>
      <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-muted">{brand("parent")}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
            {t("sloganLead")} <span className="text-accent">{t("sloganSave")}</span>{" "}
            {t("sloganEnd")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{t("lead")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/vergleiche" className="btn btn-primary">
              {t("ctaCompare")}
            </Link>
            <Link href="/ratgeber" className="btn btn-secondary">
              {t("ctaGuide")}
            </Link>
          </div>
        </div>
        <Image
          src="/photos/hero-home.jpg"
          alt={t("heroAlt")}
          width={1280}
          height={720}
          priority
          className="h-auto w-full rounded-3xl object-cover"
        />
      </Container>

      <Container className="pb-16">
        <h2 className="text-2xl font-semibold">{t("pillarsTitle")}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {(["1", "2", "3"] as const).map((item, index) => (
            <article key={item} className="overflow-hidden rounded-2xl border border-border bg-surface">
              <Image
                src={pillarPhotos[index].src}
                alt={t(pillarPhotos[index].alt)}
                width={1200}
                height={900}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold">
                  {t(`pillar${item}Title` as "pillar1Title")}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {t(`pillar${item}Text` as "pillar1Text")}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>

      <Container className="pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">{t("categoriesTitle")}</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">{t("categoriesText")}</p>
          </div>
          <Link href="/vergleiche" className="text-sm font-semibold">
            {t("allCategories")}
          </Link>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {preview.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/vergleiche/${category.slug}`}
                className="flex h-full gap-4 rounded-2xl border border-border bg-surface p-5"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <CategoryIcon name={category.icon} />
                </span>
                <span>
                  <span className="block text-xs text-muted">{groups(category.group)}</span>
                  <span className="mt-1 block text-lg font-semibold">
                    {category.title[locale]}
                  </span>
                  <span className="mt-2 block text-sm text-muted">
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
      </Container>
    </>
  );
}
