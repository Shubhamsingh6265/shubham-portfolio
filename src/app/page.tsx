import { NeuralCanvas } from "@/components/fx/NeuralCanvas";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Journey } from "@/components/sections/Journey";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { ChatWidgetLoader } from "@/components/ai/ChatWidgetLoader";

export default function Home() {
  return (
    <>
      <NeuralCanvas />
      <Hero />
      <About />
      <Skills />
      <Journey />
      <Projects />
      <Education />
      <Certifications />
      <Contact />
      <Footer />
      <ChatWidgetLoader />
    </>
  );
}
