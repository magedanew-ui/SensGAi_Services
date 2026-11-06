import nodemailer from "nodemailer";

type MailInput = {
  subject: string;
  text: string;
};

type MailResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "send_failed" };

export async function sendMail(input: MailInput): Promise<MailResult> {
  const from = process.env.MAIL_FROM;
  const to = process.env.MAIL_TO;

  if (!from || !to) {
    logUnsent(input);
    return { ok: false, reason: "not_configured" };
  }

  try {
    if (process.env.RESEND_API_KEY) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          subject: input.subject,
          text: input.text,
        }),
      });

      if (!response.ok) return { ok: false, reason: "send_failed" };
      return { ok: true };
    }

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from,
        to,
        subject: input.subject,
        text: input.text,
      });
      return { ok: true };
    }
  } catch {
    return { ok: false, reason: "send_failed" };
  }

  logUnsent(input);
  return { ok: false, reason: "not_configured" };
}

function logUnsent(input: MailInput) {
  if (process.env.NODE_ENV === "production") return;
  console.info("[mail] Versand ist nicht konfiguriert.", input.subject);
}
