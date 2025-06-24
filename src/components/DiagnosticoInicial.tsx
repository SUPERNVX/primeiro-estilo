
import { useEffect, useState } from "react";
import { AlertTriangle, DollarSign, CreditCard, Shield } from "lucide-react";

export const DiagnosticoInicial = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    renda: 0,
    despesas: 0,
    dividas: 0,
    reserva: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate numbers
          const duration = 2000;
          const steps = 60;
          const stepDuration = duration / steps;
          
          let currentStep = 0;
          const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            setAnimatedValues({
              renda: Math.floor(4000 * easeOutQuart),
              despesas: Math.floor(4500 * easeOutQuart),
              dividas: Math.floor(5700 * easeOutQuart),
              reserva: Math.floor(0 * easeOutQuart),
            });
            
            if (currentStep >= steps) {
              clearInterval(interval);
            }
          }, stepDuration);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("diagnostico-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const diagnosticData = [
    {
      icon: DollarSign,
      title: "Renda Mensal Média",
      value: `R$ ${animatedValues.renda.toLocaleString()}`,
      status: "Volátil (R$ 3.000-5.500)",
      color: "blue",
      percentage: 89, // 4000/4500 * 100
    },
    {
      icon: AlertTriangle,
      title: "Despesas Fixas",
      value: `R$ ${animatedValues.despesas.toLocaleString()}`,
      status: "Déficit mensal: R$ 500",
      color: "red",
      percentage: 112.5, // 4500/4000 * 100
    },
    {
      icon: CreditCard,
      title: "Dívidas Totais",
      value: `R$ ${animatedValues.dividas.toLocaleString()}`,
      status: "Alto custo com juros",
      color: "red",
      percentage: 142.5, // 5700/4000 * 100
    },
    {
      icon: Shield,
      title: "Reserva Emergencial",
      value: `R$ ${animatedValues.reserva.toLocaleString()}`,
      status: "Vulnerabilidade financeira",
      color: "red",
      percentage: 0,
    },
  ];

  return (
    <div id="diagnostico-section" className="container mx-auto px-4">
      <div
        className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Diagnóstico <span className="text-red-400">Inicial</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Análise detalhada da situação financeira atual de Priscila antes da implementação do plano
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {diagnosticData.map((item, index) => {
          const Icon = item.icon;
          const colorClasses = {
            blue: "border-blue-500/50 bg-blue-500/10",
            red: "border-red-500/50 bg-red-500/10",
          };

          return (
            <div
              key={index}
              className={`transition-all duration-1000 delay-${index * 200} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div
                className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border ${
                  colorClasses[item.color as keyof typeof colorClasses]
                } hover:scale-105 transition-all duration-300 group h-full`}
              >
                <div className="flex items-center justify-center mb-4">
                  <div
                    className={`w-16 h-16 rounded-full ${
                      item.color === "blue" ? "bg-blue-500/20" : "bg-red-500/20"
                    } flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon
                      className={`w-8 h-8 ${
                        item.color === "blue" ? "text-blue-400" : "text-red-400"
                      }`}
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 text-center">
                  {item.title}
                </h3>

                <div className="text-center mb-4">
                  <div
                    className={`text-3xl font-bold mb-2 ${
                      item.color === "blue" ? "text-blue-400" : "text-red-400"
                    }`}
                  >
                    {item.value}
                  </div>
                  <p className="text-gray-400 text-sm">{item.status}</p>
                </div>

                {/* Percentage Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Relação c/ renda</span>
                    <span>{item.percentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-2000 delay-1000 ${
                        item.color === "blue"
                          ? "bg-gradient-to-r from-blue-600 to-blue-400"
                          : "bg-gradient-to-r from-red-600 to-red-400"
                      }`}
                      style={{
                        width: isVisible ? `${Math.min(item.percentage, 100)}%` : "0%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Card */}
      <div
        className={`mt-12 bg-gradient-to-r from-red-900/30 to-red-800/30 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30 transition-all duration-1000 delay-800 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold text-red-400 mb-4">
            Situação Crítica Identificada
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-red-400 mb-2">-R$ 500</div>
              <p className="text-gray-300">Déficit Mensal</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-400 mb-2">R$ 5.700</div>
              <p className="text-gray-300">Em Dívidas</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-400 mb-2">0%</div>
              <p className="text-gray-300">Reserva de Emergência</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
