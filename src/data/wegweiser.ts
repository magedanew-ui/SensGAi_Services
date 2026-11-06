export type WegweiserGroup = "gesundheit" | "behoerden" | "arbeit" | "beratung";

export interface WegweiserEntry {
  id: string;
  group: WegweiserGroup;
  title: { de: string; ar: string };
  text: { de: string; ar: string };
  url?: string;
  phone?: string;
}

/** Official services only. SensGAi links out and does not book anything. */
export const wegweiserEntries: WegweiserEntry[] = [
  {
    id: "bereitschaft",
    group: "gesundheit",
    title: {
      de: "Ärztlicher Bereitschaftsdienst",
      ar: "خدمة الأطباء خارج الدوام",
    },
    text: {
      de: "Wenn die Praxis zu hat und es kein Notfall ist. Im Notfall wählen Sie 112.",
      ar: "إذا العيادة مسكرة والموضوع مو طوارئ. للطوارئ اتصل بـ 112.",
    },
    url: "https://www.116117.de/",
    phone: "116117",
  },
  {
    id: "bamf",
    group: "behoerden",
    title: { de: "BAMF", ar: "المكتب الاتحادي للهجرة واللاجئين" },
    text: {
      de: "Informationen zu Aufenthalt, Integration und Integrationskursen.",
      ar: "معلومات عن الإقامة والاندماج ودورات الاندماج.",
    },
    url: "https://www.bamf.de/",
  },
  {
    id: "verwaltung",
    group: "behoerden",
    title: { de: "Verwaltungsportal des Bundes", ar: "بوابة الإدارات الاتحادية" },
    text: {
      de: "Hier finden Sie Zuständigkeiten, zum Beispiel für die Ausländerbehörde vor Ort.",
      ar: "هون تلاقي الجهة المسؤولة، مثلاً دائرة الأجانب بمدينتك.",
    },
    url: "https://verwaltung.bund.de/",
  },
  {
    id: "make-it",
    group: "behoerden",
    title: { de: "Make it in Germany", ar: "Make it in Germany" },
    text: {
      de: "Offizielle Informationen für Fachkräfte, die nach Deutschland kommen.",
      ar: "معلومات رسمية للأشخاص اللي بيجوا يشتغلوا بألمانيا.",
    },
    url: "https://www.make-it-in-germany.com/",
  },
  {
    id: "arbeitsagentur",
    group: "arbeit",
    title: { de: "Bundesagentur für Arbeit", ar: "وكالة العمل الاتحادية" },
    text: {
      de: "Arbeit suchen, Arbeitslosengeld und Beratung der Agentur für Arbeit.",
      ar: "تدوير شغل، إعانة البطالة، واستشارة وكالة العمل.",
    },
    url: "https://www.arbeitsagentur.de/",
  },
  {
    id: "rente",
    group: "arbeit",
    title: { de: "Deutsche Rentenversicherung", ar: "التأمين التقاعدي الألماني" },
    text: {
      de: "Fragen zur Rente und zur Rentenversicherung.",
      ar: "أسئلة عن التقاعد وتأمين التقاعد.",
    },
    url: "https://www.deutsche-rentenversicherung.de/",
  },
  {
    id: "verbraucher",
    group: "beratung",
    title: { de: "Verbraucherzentrale", ar: "مركز حماية المستهلك" },
    text: {
      de: "Unabhängige Beratung zu Verträgen, Energie und Schulden. Das ist keine Seite von SensGAi.",
      ar: "استشارة مستقلة عن العقود والطاقة والديون. هاد مو موقع SensGAi.",
    },
    url: "https://www.verbraucherzentrale.de/",
  },
  {
    id: "migration",
    group: "beratung",
    title: { de: "Migrationsberatung für Erwachsene", ar: "استشارة الهجرة للكبار" },
    text: {
      de: "Beratung für erwachsene Zugewanderte. Das Angebot liegt beim BAMF und den Trägern.",
      ar: "استشارة للكبار الجدد. الخدمة عند BAMF والجهات الشريكة.",
    },
    url: "https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Migrationsberatung/migrationsberatung-node.html",
  },
  {
    id: "antidiskriminierung",
    group: "beratung",
    title: {
      de: "Antidiskriminierungsstelle des Bundes",
      ar: "الهيئة الاتحادية لمكافحة التمييز",
    },
    text: {
      de: "Beratung, wenn Sie wegen Herkunft, Religion oder anderer Gründe benachteiligt werden.",
      ar: "استشارة إذا انظلمت بسبب أصلك أو دينك أو سبب ثاني.",
    },
    url: "https://www.antidiskriminierungsstelle.de/",
  },
];

export const wegweiserGroupOrder: WegweiserGroup[] = [
  "gesundheit",
  "behoerden",
  "arbeit",
  "beratung",
];
