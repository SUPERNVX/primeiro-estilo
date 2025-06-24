
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Target } from "lucide-react";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="text-center max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Plano Financeiro
            <span className="block text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text">
              Priscila
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Transformação de <span className="text-red-400 font-bold">déficit</span> para{" "}
            <span className="text-green-400 font-bold">prosperidade</span> - Uma jornada de{" "}
            <span className="text-blue-400 font-bold">mãe solo empreendedora</span>
          </p>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300 group">
            <div className="flex items-center justify-center mb-4">
              <TrendingDown className="w-12 h-12 text-red-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-2xl font-bold text-red-400 mb-2">Situação Inicial</h3>
            <p className="text-gray-300 text-lg">
              Déficit de <span className="text-red-400 font-bold">R$ 500/mês</span>
            </p>
            <p className="text-gray-400 text-sm mt-2">Dívidas: R$ 5.700</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
            <div className="flex items-center justify-center mb-4">
              <Target className="w-12 h-12 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-2xl font-bold text-blue-400 mb-2">Estratégia</h3>
            <p className="text-gray-300 text-lg">
              Economia de <span className="text-blue-400 font-bold">R$ 1.106/mês</span>
            </p>
            <p className="text-gray-400 text-sm mt-2">+ Renda extra: R$ 2.900</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 group">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-12 h-12 text-green-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-2xl font-bold text-green-400 mb-2">Resultado</h3>
            <p className="text-gray-300 text-lg">
              Sobra de <span className="text-green-400 font-bold">R$ 2.556/mês</span>
            </p>
            <p className="text-gray-400 text-sm mt-2">Meta: R$ 15k em reserva</p>
          </div>
        </div>

        <div
          className={`mt-12 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <button
            onClick={() => {
              document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
          >
            Explore o Plano Completo
          </button>
        </div>
      </div>
    </div>
  );
};
