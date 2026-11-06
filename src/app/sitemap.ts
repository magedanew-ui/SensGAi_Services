import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { allSlugs } from "@/lib/articles";
import { listCategories } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const paths = [
    "",
    "/vergleiche",
    ...listCategories().map((category) => `/vergleiche/${category.slug}`),
    "/ratgeber",
    ...allSlugs().map((slug) => `/ratgeber/${slug}`),
    "/wegweiser",
    "/anfragen-angebote",
    "/ueber-uns",
    "/kontakt",
    "/impressum",
    "/datenschutz",
    "/nutzungsbedingungen",
    "/werbehinweis",
  ];

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${base}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((entry) => [entry, `${base}/${entry}${path}`]),
        ),
      },
    })),
  );
}
