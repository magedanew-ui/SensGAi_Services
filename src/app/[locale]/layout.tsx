import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

const themeBoot = `(function(){try{var t=localStorage.getItem("theme");var dark=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(dark){document.documentElement.classList.add("dark");}}catch(e){}})();`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    metadataBase: new URL(base),
    title: {
      default: t("title"),
      template: `%s · ${t("siteName")}`,
    },
    description: t("description"),
    alternates: {
      languages: {
        de: "/de",
        ar: "/ar",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const common = await getTranslations("Common");
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${notoArabic.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-3 focus:py-2"
          >
            {common("skip")}
          </a>
          <SiteHeader />
          <main id="content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
