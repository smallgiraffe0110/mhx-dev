export const foundryQuestions = [
  {
    name: "built",
    label: "What have you built that you’re most proud of?",
    hint: "What does it do, who is it for, and what happened after you made it? Projects, businesses, research, and communities all count.",
    maxLength: 3000,
  },
  {
    name: "proof",
    label: "Show us.",
    hint: "Share links to a live project, demo, repository, write-up, or video. If your work is private, describe what you can share with us.",
    maxLength: 2000,
  },
  {
    name: "contribution",
    label: "What was your specific contribution?",
    hint: "What did you personally design, build, organize, or figure out?",
    maxLength: 2000,
  },
  {
    name: "current",
    label: "What are you working on right now?",
    hint: "Where does it stand today? What have you done on it in the last two weeks?",
    maxLength: 3000,
  },
  {
    name: "challenge",
    label: "Tell us about a difficult problem you ran into while building something.",
    hint: "What did you try, what failed, and what did you change?",
    maxLength: 3000,
  },
  {
    name: "next",
    label: "What will you build or prove next—and how would Foundry help?",
    hint: "Give us a concrete next milestone and the support that would make a difference.",
    maxLength: 2000,
  },
] as const;

export type FoundryAnswers = Record<(typeof foundryQuestions)[number]["name"], string> & {
  name: string;
  email: string;
};

export function validateApplication(input: unknown): FoundryAnswers | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const data = input as Record<string, unknown>;
  const fields = [{ name: "name", maxLength: 120 }, { name: "email", maxLength: 254 }, ...foundryQuestions];
  const answers: Record<string, string> = {};
  for (const field of fields) {
    const value = data[field.name];
    if (typeof value !== "string" || !value.trim() || value.length > field.maxLength || /\u0000/.test(value)) return null;
    answers[field.name] = value.trim();
  }
  if (/[\r\n]/.test(answers.name) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) return null;
  return answers as FoundryAnswers;
}
