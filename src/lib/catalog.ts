import {
  categories,
  partners,
  showPlaceholderCategories,
  type Category,
  type CategoryGroup,
  type Partner,
} from "@/data/catalog";

const groupOrder: CategoryGroup[] = [
  "wohnen",
  "versicherungen",
  "finanzen",
  "reisen",
];

export function isRealUrl(url: string | undefined): boolean {
  return Boolean(url && /^https?:\/\//i.test(url));
}

export function listCategories(): Category[] {
  return categories.filter(
    (category) => category.active || showPlaceholderCategories,
  );
}

export function getCategory(slug: string): Category | undefined {
  return listCategories().find((category) => category.slug === slug);
}

export function getPartner(id: string): Partner | undefined {
  return partners.find((partner) => partner.id === id);
}

export function categoriesByGroup(): { group: CategoryGroup; items: Category[] }[] {
  return groupOrder
    .map((group) => ({
      group,
      items: listCategories().filter((category) => category.group === group),
    }))
    .filter((entry) => entry.items.length > 0);
}

export function categoryIsReady(category: Category): boolean {
  return category.active && isRealUrl(category.affiliateUrl);
}
