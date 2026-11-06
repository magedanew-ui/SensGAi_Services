export type CategoryGroup = "wohnen" | "versicherungen" | "finanzen" | "reisen";

export interface Partner {
  id: string;
  name: string;
  /** Logos stay hidden until the partner allows the mark. */
  logoAllowed: boolean;
}

export interface FieldHelp {
  id: string;
  label: { de: string; ar: string };
  help: { de: string; ar: string };
  example?: { de: string; ar: string };
  inputType?: "text" | "number" | "select";
}

export interface GlossaryItem {
  /** German term as the partner shows it. */
  term: string;
  de: string;
  ar: string;
}

export interface Category {
  slug: string;
  group: CategoryGroup;
  /** Lucide icon name. */
  icon: string;
  title: { de: string; ar: string };
  shortText: { de: string; ar: string };
  partnerId: string;
  /** Placeholder until the real affiliate link exists. */
  affiliateUrl: string;
  /** Placeholder until the partner comparison frame exists. */
  iframeUrl?: string;
  /** True only when the partner tool documents URL parameters. */
  supportsPrefill: boolean;
  /** Own field id -> partner parameter name. Never invented. */
  prefillParams?: Record<string, string>;
  fieldHelp: FieldHelp[];
  glossary: GlossaryItem[];
  isInsurance: boolean;
  isFinance: boolean;
  relatedArticles: string[];
  /** Inactive categories stay hidden, except while placeholders are shown. */
  active: boolean;
}

export const partners: Partner[] = [
  { id: "check24", name: "CHECK24", logoAllowed: false },
  { id: "tarifcheck", name: "Tarifcheck", logoAllowed: false },
];

/**
 * The category table in the brief ended at Haftpflicht.
 * Girokonto and Reisen are included because the brief names bank accounts,
 * travel, and the groups finanzen and reisen.
 * Partner assignment is not a live contract.
 */
export const showPlaceholderCategories = true;

const todoField: FieldHelp = {
  id: "todo",
  label: { de: "TODO: Feld folgt", ar: "TODO: الحقل لاحقاً" },
  help: {
    de: "TODO: Erklärung folgt, sobald die Felder des Partners feststehen.",
    ar: "TODO: الشرح يجي لما تتحدد خانات الشريك.",
  },
  inputType: "text",
};

const todoGlossary: GlossaryItem[] = [
  {
    term: "TODO",
    de: "TODO: Begriffe folgen, sobald der Partner feststeht.",
    ar: "TODO: المصطلحات تجي لما يتحدد الشريك.",
  },
];

function placeholderCategory(
  category: Omit<
    Category,
    | "affiliateUrl"
    | "iframeUrl"
    | "supportsPrefill"
    | "fieldHelp"
    | "glossary"
    | "active"
    | "partnerId"
  > & { partnerId?: string },
): Category {
  const slug = category.slug.toUpperCase();
  return {
    ...category,
    partnerId: category.partnerId ?? "check24",
    affiliateUrl: `AFFILIATE_URL_${slug}`,
    iframeUrl: `IFRAME_URL_${slug}`,
    supportsPrefill: false,
    fieldHelp: [todoField],
    glossary: todoGlossary,
    active: false,
  };
}

export const categories: Category[] = [
  {
    slug: "strom",
    group: "wohnen",
    icon: "Zap",
    title: { de: "Strom", ar: "كهرباء" },
    shortText: {
      de: "Stromtarif für Ihre Wohnung vergleichen.",
      ar: "قارن تعرفة الكهربا لبيتك.",
    },
    partnerId: "check24",
    affiliateUrl: "AFFILIATE_URL_STROM",
    iframeUrl: "IFRAME_URL_STROM",
    supportsPrefill: false,
    fieldHelp: [
      {
        id: "plz",
        label: { de: "Postleitzahl", ar: "الرمز البريدي" },
        help: {
          de: "Die fünfstellige Postleitzahl Ihrer Wohnadresse.",
          ar: "الأرقام الخمسة لعنوان سكنك.",
        },
        example: { de: "z. B. 53229", ar: "مثلاً 53229" },
        inputType: "text",
      },
      {
        id: "verbrauch",
        label: {
          de: "Jahresverbrauch (kWh)",
          ar: "الاستهلاك السنوي (كيلوواط ساعة)",
        },
        help: {
          de: "Steht auf Ihrer letzten Stromrechnung. Wenn Sie ihn nicht kennen, nutzen Sie einen Richtwert.",
          ar: "مكتوب بآخر فاتورة كهربا. إذا ما بتعرفه، استخدم الرقم التقريبي.",
        },
        example: {
          de: "Richtwert: 1 Person etwa 1.500 kWh, 4 Personen etwa 3.500 kWh.",
          ar: "تقريباً: شخص واحد 1.500، أربع أشخاص 3.500.",
        },
        inputType: "number",
      },
    ],
    glossary: [
      {
        term: "Grundpreis",
        de: "Fester Betrag pro Monat, unabhängig vom Verbrauch.",
        ar: "مبلغ ثابت كل شهر، مهما كان استهلاكك.",
      },
      {
        term: "Arbeitspreis",
        de: "Preis pro verbrauchter Kilowattstunde.",
        ar: "السعر لكل كيلوواط ساعة بتستهلكه.",
      },
      {
        term: "Bonus",
        de: "Einmalige Gutschrift, meist nur im ersten Jahr.",
        ar: "خصم لمرة واحدة، في الغالب بس بأول سنة.",
      },
      {
        term: "Laufzeit",
        de: "Wie lange der Vertrag mindestens läuft.",
        ar: "أقل مدة للعقد.",
      },
      {
        term: "Kündigungsfrist",
        de: "Wie früh Sie vor Vertragsende kündigen müssen.",
        ar: "قديش لازم تلغي قبل نهاية العقد.",
      },
    ],
    isInsurance: false,
    isFinance: false,
    relatedArticles: ["stromvertrag-verstehen"],
    active: false,
  },
  placeholderCategory({
    slug: "gas",
    group: "wohnen",
    icon: "Flame",
    title: { de: "Gas", ar: "غاز" },
    shortText: {
      de: "Gastarif für Ihre Wohnung vergleichen.",
      ar: "قارن تعرفة الغاز لبيتك.",
    },
    isInsurance: false,
    isFinance: false,
    relatedArticles: ["stromvertrag-verstehen"],
  }),
  placeholderCategory({
    slug: "internet",
    group: "wohnen",
    icon: "Wifi",
    title: { de: "DSL und Internet", ar: "الإنترنت" },
    shortText: {
      de: "Internet an Ihrer Adresse vergleichen.",
      ar: "قارن الإنترنت على عنوانك.",
    },
    isInsurance: false,
    isFinance: false,
    relatedArticles: ["erste-wohnung"],
  }),
  placeholderCategory({
    slug: "mobilfunk",
    group: "wohnen",
    icon: "Smartphone",
    title: { de: "Handytarif", ar: "تعرفة الموبايل" },
    shortText: {
      de: "Handytarif vergleichen.",
      ar: "قارن تعرفة الموبايل.",
    },
    isInsurance: false,
    isFinance: false,
    relatedArticles: ["erste-wohnung"],
  }),
  placeholderCategory({
    slug: "kfz",
    group: "versicherungen",
    icon: "Car",
    title: { de: "Kfz-Versicherung", ar: "تأمين السيارة" },
    shortText: {
      de: "Kfz-Versicherung über einen Partner ansehen.",
      ar: "شوف تأمين السيارة عند الشريك.",
    },
    isInsurance: true,
    isFinance: false,
    relatedArticles: ["kfz-einfach"],
  }),
  placeholderCategory({
    slug: "haftpflicht",
    group: "versicherungen",
    icon: "Shield",
    title: { de: "Haftpflichtversicherung", ar: "تأمين المسؤولية" },
    shortText: {
      de: "Private Haftpflicht über einen Partner ansehen.",
      ar: "شوف تأمين المسؤولية عند الشريك.",
    },
    isInsurance: true,
    isFinance: false,
    relatedArticles: ["kfz-einfach"],
  }),
  placeholderCategory({
    slug: "girokonto",
    group: "finanzen",
    icon: "Landmark",
    title: { de: "Girokonto", ar: "حساب جاري" },
    shortText: {
      de: "Girokonten über einen Partner ansehen.",
      ar: "شوف الحسابات الجارية عند الشريك.",
    },
    isInsurance: false,
    isFinance: true,
    relatedArticles: ["konto-verstehen"],
  }),
  placeholderCategory({
    slug: "reisen",
    group: "reisen",
    icon: "Plane",
    title: { de: "Reisen", ar: "سفر" },
    shortText: {
      de: "Reiseangebote über einen Partner ansehen.",
      ar: "شوف عروض السفر عند الشريك.",
    },
    isInsurance: false,
    isFinance: false,
    relatedArticles: ["erste-wohnung"],
  }),
];
