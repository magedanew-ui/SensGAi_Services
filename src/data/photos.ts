import type { CategoryGroup } from "@/data/catalog";

export const groupPhotos: Record<
  CategoryGroup,
  { src: string; alt: "photoWohnen" | "photoVersicherungen" | "photoFinanzen" | "photoReisen" }
> = {
  wohnen: { src: "/photos/group-wohnen.jpg", alt: "photoWohnen" },
  versicherungen: { src: "/photos/group-insurance.jpg", alt: "photoVersicherungen" },
  finanzen: { src: "/photos/group-finance.jpg", alt: "photoFinanzen" },
  reisen: { src: "/photos/group-travel.jpg", alt: "photoReisen" },
};

export const articlePhotos: Record<string, string> = {
  "stromvertrag-verstehen": "/photos/article-strom.jpg",
  "erste-wohnung": "/photos/article-wohnung.jpg",
  "kfz-einfach": "/photos/article-kfz.jpg",
  "konto-verstehen": "/photos/article-konto.jpg",
  "behoerden-termin": "/photos/article-behoerde.jpg",
};
