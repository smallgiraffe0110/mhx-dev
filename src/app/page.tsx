import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Approach } from "@/components/Approach";
import { Ventures } from "@/components/Ventures";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Approach />
        <Ventures />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
