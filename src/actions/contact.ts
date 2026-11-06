"use server";

import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { contactError, oneLine, type FormState } from "@/lib/forms";
import { sendMail } from "@/lib/mail";

export async function submitContact(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  const localeValue = String(formData.get("locale") ?? routing.defaultLocale);
  const locale = hasLocale(routing.locales, localeValue)
    ? localeValue
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "ContactForm" });

  if (String(formData.get("company_website") ?? "").trim()) {
    return { status: "success", message: t("success") };
  }

  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const message = String(formData.get("message") ?? "");
  const privacy = formData.get("privacy") === "on";
  const error = contactError({ name, email, message, privacy });

  if (error === "name") return { status: "error", message: t("errorName") };
  if (error === "email") return { status: "error", message: t("errorEmail") };
  if (error === "message") return { status: "error", message: t("errorMessage") };
  if (error === "privacy") return { status: "error", message: t("errorPrivacy") };

  const result = await sendMail({
    subject: `SensGAi Kontakt: ${oneLine(name)}`,
    text: [`Name: ${oneLine(name)}`, `E-Mail: ${oneLine(email)}`, "", message.trim()].join(
      "\n",
    ),
  });

  if (!result.ok && result.reason === "not_configured") {
    return { status: "error", message: t("notConfigured") };
  }
  if (!result.ok) return { status: "error", message: t("sendFailed") };
  return { status: "success", message: t("success") };
}
