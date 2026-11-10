import { test } from "node:test";
import assert from "node:assert/strict";
import { applicationEmail, handleApplication } from "../functions/api/foundry.ts";
import { validateApplication } from "../src/lib/foundry.ts";

const application = {
  name: "Test Builder", email: "builder@example.com", built: "An open source project used by five teams.",
  proof: "https://example.com/project", contribution: "Built the prototype and interviewed users.",
  current: "Shipped an improved onboarding flow last week.", challenge: "Rebuilt the import pipeline after real data broke it.",
  next: "Test the next version with ten users. I would value feedback.", company_website: "",
  submissionId: "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee",
};
const env: Env = { SMTP_HOST: "smtp.example.com", SMTP_PORT: "465", SMTP_USER: "test", SMTP_PASS: "test", NOTIFICATION_FROM: "foundry@example.com", NOTIFICATION_TO: "team@example.com" };
function request(body: unknown = application, origin = "https://mhx.dev") {
  return new Request("https://mhx.dev/api/foundry", { method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body: JSON.stringify(body) });
}

test("a complete application sends every answer and succeeds only after send resolves", async () => {
  let sent = false;
  const response = await handleApplication(request(), env, async (_env, answers, id) => {
    assert.equal(answers.current, application.current);
    assert.equal(id, application.submissionId);
    sent = true;
  });
  assert.equal(sent, true);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
});

test("missing answers, malformed email, overlong input and header injection never send", async () => {
  for (const overrides of [{ current: " " }, { email: "bad" }, { built: "x".repeat(3001) }, { name: "Builder\r\nBcc:someone@example.com" }]) {
    const response = await handleApplication(request({ ...application, ...overrides }), env, async () => assert.fail("Must not send"));
    assert.equal(response.status, 400);
  }
});

test("cross-origin requests, honeypot and oversized bodies never send", async () => {
  assert.equal((await handleApplication(request(application, "https://other.example"), env)).status, 403);
  assert.equal((await handleApplication(request({ ...application, company_website: "bot" }), env)).status, 400);
  assert.equal((await handleApplication(request({ ...application, built: "x".repeat(65537) }), env)).status, 413);
});

test("malformed payload and unsupported methods fail", async () => {
  assert.equal((await handleApplication(new Request("https://mhx.dev/api/foundry"), env)).status, 405);
  assert.equal((await handleApplication(request([]), env)).status, 400);
  assert.equal((await handleApplication(new Request("https://mhx.dev/api/foundry", { method: "POST", headers: { Origin: "https://mhx.dev", "Content-Type": "application/json" }, body: "{" }), env)).status, 400);
});

test("missing configuration and mail failures never produce success", async () => {
  assert.equal((await handleApplication(request(), { ...env, NOTIFICATION_TO: "" }, async () => assert.fail("Must not send"))).status, 503);
  const response = await handleApplication(request(), env, async () => { throw new Error("private transport details"); });
  assert.equal(response.status, 502);
  assert.doesNotMatch(await response.text(), /private transport details/);
});

test("notification escapes HTML, includes evidence, and replies to applicant", () => {
  const answers = validateApplication({ ...application, built: '<script>alert("x")</script>' })!;
  const mail = applicationEmail(answers);
  assert.equal(mail.replyTo, application.email);
  assert.doesNotMatch(mail.html, /<script>/);
  assert.match(mail.html, /&lt;script&gt;/);
  assert.match(mail.text, /https:\/\/example.com\/project/);
  assert.match(mail.text, /Test the next version/);
});
