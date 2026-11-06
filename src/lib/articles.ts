import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { routing, type Locale } from "@/i18n/routing";

const contentRoot = path.join(process.cwd(), "content", "ratgeber");

export type Article = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  updated: string;
  body: string;
};

export type ArticleNotice = "missingArabic" | "missingGerman";

export type ArticleView = {
  article: Article;
  notice: ArticleNotice | null;
};

function isLocale(value: string): value is Locale {
  return routing.locales.some((locale) => locale === value);
}

function readArticle(locale: Locale, slug: string): Article | null {
  const filePath = path.join(contentRoot, locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  return {
    slug,
    locale,
    title: String(parsed.data.title ?? slug),
    description: String(parsed.data.description ?? ""),
    updated: String(parsed.data.updated ?? ""),
    body: parsed.content.trim(),
  };
}

export function allSlugs(): string[] {
  const slugs = new Set<string>();

  for (const locale of routing.locales) {
    const directory = path.join(contentRoot, locale);
    if (!fs.existsSync(directory)) continue;
    for (const fileName of fs.readdirSync(directory)) {
      if (fileName.endsWith(".mdx")) slugs.add(fileName.slice(0, -4));
    }
  }

  return [...slugs].sort((a, b) => a.localeCompare(b));
}

export function listArticles(locale: string): ArticleView[] {
  if (!isLocale(locale)) return [];

  return allSlugs()
    .map((slug) => getArticleView(locale, slug))
    .filter((view): view is ArticleView => view !== null);
}

export function getArticleView(locale: string, slug: string): ArticleView | null {
  if (!isLocale(locale)) return null;

  const requested = readArticle(locale, slug);
  const otherLocale: Locale = locale === "de" ? "ar" : "de";
  const other = readArticle(otherLocale, slug);

  if (requested && other) return { article: requested, notice: null };
  if (requested && !other) {
    return {
      article: requested,
      notice: otherLocale === "ar" ? "missingArabic" : "missingGerman",
    };
  }
  if (!requested && other) {
    return {
      article: other,
      notice: locale === "ar" ? "missingArabic" : "missingGerman",
    };
  }

  return null;
}
