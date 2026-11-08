"use client";

import { useId, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

export type MailField = {
  name: string;
  label: string;
  type?: "text" | "email" | "url" | "textarea";
  required?: boolean;
  autoComplete?: string;
  hint?: string;
  wide?: boolean;
};

type MailFormProps = {
  subject: string;
  fields: MailField[];
  submitLabel: string;
};

// No backend: the form writes the email and hands it to the visitor's mail app.
export function MailForm({ subject, fields, submitLabel }: MailFormProps) {
  const formId = useId();
  const [sent, setSent] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = fields.map((field) => {
      const value = String(data.get(field.name) ?? "").trim();
      const heading = /[?:]$/.test(field.label) ? field.label : `${field.label}:`;
      return `${heading}\n${value || "-"}\n`;
    });
    const nameField = String(data.get("name") ?? "").trim();
    const fullSubject = nameField ? `${subject}: ${nameField}` : subject;
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = href;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      {fields.map((field) => {
        const id = `${formId}-${field.name}`;
        const hintId = field.hint ? `${id}-hint` : undefined;
        const inputClass =
          "w-full rounded-lg border border-starlight/15 bg-night/60 px-4 py-3 text-starlight placeholder:text-haze/50 transition-colors hover:border-starlight/30 focus:border-sodium focus:outline-none focus-visible:outline-none";
        return (
          <div
            key={field.name}
            className={field.wide || field.type === "textarea" ? "sm:col-span-2" : ""}
          >
            <label htmlFor={id} className="mb-2 block text-sm text-starlight/90">
              {field.label}
              {field.required ? null : (
                <span className="text-haze"> (optional)</span>
              )}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={id}
                name={field.name}
                required={field.required}
                rows={4}
                aria-describedby={hintId}
                className={`${inputClass} resize-y`}
              />
            ) : (
              <input
                id={id}
                name={field.name}
                type={field.type ?? "text"}
                required={field.required}
                autoComplete={field.autoComplete}
                aria-describedby={hintId}
                className={inputClass}
              />
            )}
            {field.hint ? (
              <p id={hintId} className="mt-1.5 text-sm text-haze">
                {field.hint}
              </p>
            ) : null}
          </div>
        );
      })}

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="rounded-full bg-sodium px-7 py-3 font-medium text-night transition-colors hover:bg-[#ffb860]"
        >
          {submitLabel}
        </button>
        <p aria-live="polite" className="text-sm text-haze">
          {sent
            ? `Your mail app should open with this filled in. If it didn't, write to ${CONTACT_EMAIL}.`
            : `This opens your mail app, addressed to ${CONTACT_EMAIL}.`}
        </p>
      </div>
    </form>
  );
}
