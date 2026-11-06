export type ContactError = "name" | "email" | "message" | "privacy";
export type InterestError = ContactError | "kind";

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const idleFormState: FormState = { status: "idle", message: "" };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function contactError(input: {
  name: string;
  email: string;
  message: string;
  privacy: boolean;
}): ContactError | null {
  if (input.name.trim().length < 2) return "name";
  if (!emailPattern.test(input.email.trim())) return "email";
  if (input.message.trim().length < 10 || input.message.trim().length > 5000) {
    return "message";
  }
  if (!input.privacy) return "privacy";
  return null;
}

export function interestError(input: {
  name: string;
  email: string;
  message: string;
  privacy: boolean;
  kind: string;
}): InterestError | null {
  if (input.kind !== "anfrage" && input.kind !== "angebot") return "kind";
  return contactError(input);
}

export function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, 160);
}
