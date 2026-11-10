"use client";

import { useRef, useState, type FormEvent } from "react";
import { foundryQuestions } from "@/lib/foundry";

export function FoundryApplication({ onComplete }: { onComplete: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inFlight = useRef(false);
  const submissionId = useRef<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    submissionId.current ??= crypto.randomUUID();
    inFlight.current = true;
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/foundry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, submissionId: submissionId.current }),
        signal: AbortSignal.timeout(30000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        throw new Error(result.error || "We couldn’t submit your application. Your answers are still here. Please try again.");
      }
      onComplete();
    } catch (failure) {
      setError(failure instanceof Error && failure.name === "Error"
        ? failure.message
        : "We couldn’t confirm your submission. Your answers are still here. Please try again.");
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="foundry-application" aria-busy={submitting} aria-labelledby="apply-title">
      <fieldset disabled={submitting}>
        <div className="application-identity">
          <label htmlFor="foundry-name">Name<input id="foundry-name" name="name" autoComplete="name" required maxLength={120} /></label>
          <label htmlFor="foundry-email">Email<input id="foundry-email" name="email" type="email" autoComplete="email" required maxLength={254} /></label>
        </div>
        <div className="application-honeypot" aria-hidden="true">
          <label>Leave this blank<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
        </div>
        {foundryQuestions.map((question, index) => (
          <div className="application-question" key={question.name}>
            <label htmlFor={`foundry-${question.name}`}><span className="question-number" aria-hidden="true">0{index + 1}</span>{question.label}</label>
            <p id={`foundry-${question.name}-hint`} className="field-hint">{question.hint}</p>
            <textarea id={`foundry-${question.name}`} name={question.name} required rows={question.name === "proof" ? 3 : 6} maxLength={question.maxLength} aria-describedby={`foundry-${question.name}-hint`} />
          </div>
        ))}
      </fieldset>
      {error && <p className="application-error" role="alert">{error}</p>}
      <button className="pill" type="submit" disabled={submitting}>{submitting ? "Submitting…" : "Apply to MHX Foundry"}<span aria-hidden="true">↗</span></button>
      <p className="application-privacy">Your answers go to the MHX team to review your application and contact you about Foundry.</p>
    </form>
  );
}
