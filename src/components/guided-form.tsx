"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import type { FieldHelp } from "@/data/catalog";
import { TextWithLtrNumbers } from "./ltr-text";

export function GuidedForm({
  fields,
  ready,
  affiliateUrl,
  supportsPrefill,
  prefillParams,
}: {
  fields: FieldHelp[];
  ready: boolean;
  affiliateUrl: string;
  supportsPrefill: boolean;
  prefillParams?: Record<string, string>;
}) {
  const t = useTranslations("Category");
  const locale = useLocale() === "ar" ? "ar" : "de";
  const [values, setValues] = useState<Record<string, string>>({});

  function openPartner() {
    if (!ready) return;
    const url = new URL(affiliateUrl);
    if (supportsPrefill && prefillParams) {
      for (const [fieldId, param] of Object.entries(prefillParams)) {
        const value = values[fieldId]?.trim();
        if (value) url.searchParams.set(param, value);
      }
    }
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      className="grid gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        openPartner();
      }}
    >
      {fields.map((field) => (
        <div key={field.id} className="grid gap-2">
          <label className="text-sm font-medium" htmlFor={field.id}>
            {field.label[locale]}
          </label>
          <p className="text-sm leading-6 text-muted">{field.help[locale]}</p>
          {field.example ? (
            <p className="text-sm text-foreground">
              {t("example")}: <TextWithLtrNumbers text={field.example[locale]} />
            </p>
          ) : null}
          <input
            id={field.id}
            className="field"
            inputMode={field.inputType === "number" ? "decimal" : "text"}
            dir={field.inputType === "number" ? "ltr" : undefined}
            value={values[field.id] ?? ""}
            onChange={(event) =>
              setValues((current) => ({ ...current, [field.id]: event.target.value }))
            }
          />
        </div>
      ))}
      <div>
        <button className="btn btn-primary gap-2" type="submit" disabled={!ready}>
          {ready ? t("continue") : t("continueDisabled")}
          <ArrowRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
        </button>
      </div>
    </form>
  );
}
