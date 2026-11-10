import type { Metadata } from "next";
import { Experience } from "@/components/Experience";

export const metadata: Metadata = {
  title: "Apply to the Foundry — mhx.",
  description: "Show us what you’re building. Apply to the MHX Foundry.",
};

export default function Page() {
  return <Experience page="apply" />;
}
