import nodemailer from "nodemailer";
import { foundryQuestions, validateApplication, type FoundryAnswers } from "../../src/lib/foundry.ts";

const MAX_BODY_BYTES = 64 * 1024;
const json = (body: Record<string, unknown>, status = 200) => Response.json(body, {
  status,
  headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
});
const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character]!);

export function applicationEmail(answers: FoundryAnswers) {
  const entries = [
    ["Name", answers.name], ["Email", answers.email],
    ...foundryQuestions.map((question) => [question.label, answers[question.name]]),
  ];
  return {
    subject: `MHX Foundry application — ${answers.name}`,
    replyTo: answers.email,
    text: `New MHX Foundry application\n\n${entries.map(([label, value]) => `${label}\n${value}`).join("\n\n")}\n\nReply to this email to contact the applicant.`,
    html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#171717"><h1>New MHX Foundry application</h1>${entries.map(([label, value]) => `<h2 style="font-size:16px;margin-top:28px">${escapeHtml(label)}</h2><div style="white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.6">${escapeHtml(value)}</div>`).join("")}<p style="margin-top:32px;color:#666">Reply to this email to contact the applicant.</p></div>`,
  };
}

export async function handleApplication(request: Request, env: Env, send = sendNotification): Promise<Response> {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
  const origin = new URL(request.url).origin;
  if (request.headers.get("Origin") !== origin) return json({ error: "Please submit through the MHX application form." }, 403);
  if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/json")) return json({ error: "Expected a JSON application." }, 415);
  if (Number(request.headers.get("Content-Length")) > MAX_BODY_BYTES) return json({ error: "Your application is too large." }, 413);

  let input: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) return json({ error: "An application is required." }, 400);
    let size = 0;
    const decoder = new TextDecoder();
    let body = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return json({ error: "Your application is too large." }, 413);
      }
      body += decoder.decode(value, { stream: true });
    }
    const parsed: unknown = JSON.parse(body + decoder.decode());
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return json({ error: "Invalid application." }, 400);
    input = parsed as Record<string, unknown>;
  } catch {
    return json({ error: "We couldn’t read your application. Please try again." }, 400);
  }

  // Honeypot catches basic automated submissions without sending mail.
  if (input.company_website) return json({ error: "Please leave the hidden website field blank." }, 400);
  const answers = validateApplication(input);
  if (!answers || typeof input.submissionId !== "string" || !/^[a-f\d]{8}-(?:[a-f\d]{4}-){3}[a-f\d]{12}$/i.test(input.submissionId)) {
    return json({ error: "Please complete every field and use a valid email address." }, 400);
  }
  if (![env.SMTP_HOST, env.SMTP_USER, env.SMTP_PASS, env.NOTIFICATION_FROM, env.NOTIFICATION_TO].every(Boolean)) {
    return json({ error: "Applications are temporarily unavailable. Your answers are still here; please try again later." }, 503);
  }
  try {
    await send(env, answers, input.submissionId);
    return json({ ok: true });
  } catch {
    // Never log application content or SMTP errors, which can contain credentials.
    console.error(JSON.stringify({ event: "foundry_notification_failed", submissionId: input.submissionId }));
    return json({ error: "We couldn’t deliver your application. Your answers are still here. Please try again." }, 502);
  }
}

async function sendNotification(env: Env, answers: FoundryAnswers, submissionId: string) {
  const recipients = env.NOTIFICATION_TO.split(",").map((value) => value.trim()).filter(Boolean);
  if (!recipients.length || recipients.some((value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) throw new Error("Invalid notification recipients");
  const port = Number(env.SMTP_PORT || "465");
  if (port !== 465 && port !== 587) throw new Error("Use encrypted SMTP");
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port,
    secure: port === 465,
    requireTLS: true,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  try {
    const result = await transport.sendMail({
      from: { name: "MHX Foundry", address: env.NOTIFICATION_FROM },
      to: recipients,
      messageId: `<foundry-${submissionId}@mhx.dev>`,
      ...applicationEmail(answers),
    });
    if (result.rejected.length || result.accepted.length !== recipients.length) throw new Error("Notification not accepted for all recipients");
  } finally {
    transport.close();
  }
}

export function onRequest({ request, env }: { request: Request; env: Env }) {
  return handleApplication(request, env);
}
