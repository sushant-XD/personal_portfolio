import { Introduction } from "@/components/sections/Introduction";
import { AcademicEducation } from "@/components/sections/AcademicEducation";
import { Experience } from "@/components/sections/Experience";
import { SkillsSection } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Introduction />
      <div className="section-separator"></div>
      <AcademicEducation />
      <div className="section-separator"></div>
      <Experience />
      <div className="section-separator"></div>
      <SkillsSection />
      <div className="section-separator"></div>
      <Projects />
      <div className="section-separator"></div>
      <Contact />
    </>
  );
}
