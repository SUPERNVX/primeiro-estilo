
import { useState, useEffect } from "react";
import { Hero } from "@/components/Hero";
import { DiagnosticoInicial } from "@/components/DiagnosticoInicial";
import { ReducaoCustos } from "@/components/ReducaoCustos";
import { RendaExtra } from "@/components/RendaExtra";
import { FluxoCaixa } from "@/components/FluxoCaixa";
import { LinhaTempo } from "@/components/LinhaTempo";
import { ResultadosEsperados } from "@/components/ResultadosEsperados";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.scrollY;

      sections.forEach((current) => {
        const htmlElement = current as HTMLElement;
        const sectionHeight = htmlElement.offsetHeight;
        const sectionTop = htmlElement.offsetTop - 100;
        const sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId || "");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navigation activeSection={activeSection} />
      
      <section id="hero">
        <Hero />
      </section>
      
      <section id="diagnostico" className="py-20">
        <DiagnosticoInicial />
      </section>
      
      <section id="custos" className="py-20 bg-gray-900/50">
        <ReducaoCustos />
      </section>
      
      <section id="renda" className="py-20">
        <RendaExtra />
      </section>
      
      <section id="fluxo" className="py-20 bg-gray-900/50">
        <FluxoCaixa />
      </section>
      
      <section id="timeline" className="py-20">
        <LinhaTempo />
      </section>
      
      <section id="resultados" className="py-20 bg-gray-900/50">
        <ResultadosEsperados />
      </section>
    </div>
  );
};

export default Index;
