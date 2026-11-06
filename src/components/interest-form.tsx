"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { submitInterest } from "@/actions/interest";
import { idleFormState } from "@/lib/forms";

function SubmitButton() {
  const t = useTranslations("InterestForm");
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-primary" type="submit" disabled={pending}>
      {pending ? t("pending") : t("submit")}
    </button>
  );
}

export function InterestForm() {
  const t = useTranslations("InterestForm");
  const locale = useLocale();
  const [state, action] = useActionState(submitInterest, idleFormState);

  return (
    <form action={action} className="grid gap-5" noValidate>
      <input type="hidden" name="locale" value={locale} />
      <div className="absolute -start-[9999px]" aria-hidden="true">
        <label>
          {t("honeypot")}
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium">
        {t("name")}
        <input className="field" name="name" autoComplete="name" required />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        {t("email")}
        <input className="field" name="email" type="email" autoComplete="email" required dir="ltr" />
      </label>
      <fieldset className="grid gap-3">
        <legend className="text-sm font-medium">{t("kind")}</legend>
        <label className="flex min-h-11 items-center gap-3 text-sm">
          <input type="radio" name="kind" value="anfrage" />
          {t("anfrage")}
        </label>
        <label className="flex min-h-11 items-center gap-3 text-sm">
          <input type="radio" name="kind" value="angebot" />
          {t("angebot")}
        </label>
      </fieldset>
      <label className="grid gap-2 text-sm font-medium">
        {t("message")}
        <textarea className="field min-h-36 py-3" name="message" required />
      </label>
      <label className="flex items-start gap-3 text-sm">
        <input className="mt-1 size-5" type="checkbox" name="privacy" />
        <span>
          {t("privacy")}{" "}
          <Link href="/datenschutz" className="underline">
            {t("privacyLink")}
          </Link>
        </span>
      </label>
      <SubmitButton />
      {state.message ? (
        <p role="status" className="text-sm" aria-live="polite">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
