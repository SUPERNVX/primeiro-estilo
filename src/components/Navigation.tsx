
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  activeSection: string;
}

export const Navigation = ({ activeSection }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { id: "hero", label: "Início" },
    { id: "diagnostico", label: "Diagnóstico" },
    { id: "custos", label: "Redução de Custos" },
    { id: "renda", label: "Renda Extra" },
    { id: "fluxo", label: "Fluxo de Caixa" },
    { id: "timeline", label: "Linha do Tempo" },
    { id: "resultados", label: "Resultados" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold text-white">
            Plano Financeiro <span className="text-blue-400">Priscila</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? "text-blue-400 bg-blue-400/10"
                    : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? "text-blue-400 bg-blue-400/10"
                    : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
