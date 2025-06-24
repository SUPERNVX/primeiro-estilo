
import { useEffect, useState } from "react";
import { TrendingUp, Target, Award, Home } from "lucide-react";

export const ResultadosEsperados = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    dividas: [5700, 0, 0],
    reserva: [0, 15000, 26000],
    renda: [4000, 6900, 9500],
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Animate the comparison values
          const duration = 3000;
          const steps = 60;
          const stepDuration = duration / steps;
          
          let currentStep = 0;
          const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            setAnimatedValues({
              dividas: [
                Math.floor(5700 * (1 - easeOutQuart)),
                Math.floor(0 * easeOutQuart),
                Math.floor(0 * easeOutQuart),
              ],
              reserva: [
                Math.floor(0 * easeOutQuart),
                Math.floor(15000 * easeOutQuart),
                Math.floor(26000 * easeOutQuart),
              ],
              renda: [
                Math.floor(4000 + (6900 - 4000) * easeOutQuart),
                Math.floor(6900 * easeOutQuart + 4000 * (1 - easeOutQuart)),
                Math.floor(9500 * easeOutQuart + 4000 * (1 - easeOutQuart)),
              ],
            });
            
            if (currentStep >= steps) {
              clearInterval(interval);
              setAnimatedValues({
                dividas: [5700, 0, 0],
                reserva: [0, 15000, 26000],
                renda: [4000, 6900, 9500],
              });
            }
          }, stepDuration);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("resultados-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const resultadosData = [
    {
      icon: TrendingUp,
      title: "Evolução das Dívidas",
      subtitle: "Quitação completa em 12 meses",
      periods: ["Início", "Ano 1", "Ano 3"],
      values: animatedValues.dividas,
      color: "red",
      format: "currency",
      isDecrease: true,
    },
    {
      icon: Target,
      title: "Reserva de Emergência",
      subtitle: "Construção sólida de patrimônio",
      periods: ["Início", "Ano 1", "Ano 3"],
      values: animatedValues.reserva,
      color: "green",
      format: "currency",
      isDecrease: false,
    },
    {
      icon: Award,
      title: "Renda Mensal",
      subtitle: "Crescimento sustentável de receita",
      periods: ["Início", "Ano 1", "Ano 3"],
      values: animatedValues.renda,
      color: "blue",
      format: "currency",
      isDecrease: false,
    },
  ];

  const impactMetrics = [
    {
      title: "Transformação Financeira",
      value: "+R$ 3.056",
      description: "Melhoria mensal total",
      color: "green",
    },
    {
      title: "Quitação de Dívidas",
      value: "100%",
      description: "Em apenas 12 meses",
      color: "blue",
    },
    {
      title: "Crescimento de Renda",
      value: "+137.5%",
      description: "Aumento em 3 anos",
      color: "purple",
    },
    {
      title: "Independência Financeira",
      value: "10 anos",
      description: "Para entrada da casa própria",
      color: "orange",
    },
  ];

  return (
    <div id="resultados-section" className="container mx-auto px-4">
      <div
        className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Resultados <span className="text-green-400">Esperados</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Projeções realistas baseadas na implementação completa do plano financeiro
        </p>
      </div>

      {/* Evolution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {resultadosData.map((item, index) => {
          const Icon = item.icon;
          const colorClasses = {
            red: "border-red-500/50 bg-red-500/10 text-red-400",
            green: "border-green-500/50 bg-green-500/10 text-green-400",
            blue: "border-blue-500/50 bg-blue-500/10 text-blue-400",
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
                  colorClasses[item.color as keyof typeof colorClasses].split(' ')[0]
                } ${colorClasses[item.color as keyof typeof colorClasses].split(' ')[1]} hover:scale-105 transition-all duration-300 group h-full`}
              >
                <div className="flex items-center mb-6">
                  <div
                    className={`w-12 h-12 rounded-full ${
                      colorClasses[item.color as keyof typeof colorClasses].split(' ')[1]
                    } flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        colorClasses[item.color as keyof typeof colorClasses].split(' ')[2]
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.subtitle}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {item.periods.map((period, periodIndex) => {
                    const value = item.values[periodIndex];
                    const maxValue = Math.max(...item.values);
                    const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

                    return (
                      <div key={periodIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">{period}</span>
                          <span
                            className={`font-bold ${
                              colorClasses[item.color as keyof typeof colorClasses].split(' ')[2]
                            }`}
                          >
                            {item.format === "currency"
                              ? `R$ ${value.toLocaleString('pt-BR')}`
                              : value.toLocaleString('pt-BR')}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-2000 delay-${1000 + periodIndex * 200} ${
                              item.color === "red"
                                ? "bg-gradient-to-r from-red-600 to-red-400"
                                : item.color === "green"
                                ? "bg-gradient-to-r from-green-600 to-green-400"
                                : "bg-gradient-to-r from-blue-600 to-blue-400"
                            }`}
                            style={{
                              width: isVisible ? `${item.isDecrease ? 100 - percentage : percentage}%` : "0%",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Growth indicator */}
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-1">
                      {item.isDecrease ? "Redução Total" : "Crescimento Total"}
                    </div>
                    <div
                      className={`text-2xl font-bold ${
                        colorClasses[item.color as keyof typeof colorClasses].split(' ')[2]
                      }`}
                    >
                      {item.isDecrease ? "-100%" : 
                       item.title.includes("Reserva") ? "+∞" :
                       item.title.includes("Renda") ? "+137.5%" : "+100%"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Impact Metrics */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-800 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {impactMetrics.map((metric, index) => {
          const colorClasses = {
            green: "border-green-500/50 bg-green-500/10 text-green-400",
            blue: "border-blue-500/50 bg-blue-500/10 text-blue-400",
            purple: "border-purple-500/50 bg-purple-500/10 text-purple-400",
            orange: "border-orange-500/50 bg-orange-500/10 text-orange-400",
          };

          return (
            <div
              key={index}
              className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border ${
                colorClasses[metric.color as keyof typeof colorClasses].split(' ')[0]
              } ${colorClasses[metric.color as keyof typeof colorClasses].split(' ')[1]} hover:scale-105 transition-all duration-300 text-center`}
            >
              <h4 className="text-sm text-gray-300 mb-2">{metric.title}</h4>
              <div
                className={`text-3xl font-bold mb-2 ${
                  colorClasses[metric.color as keyof typeof colorClasses].split(' ')[2]
                }`}
              >
                {metric.value}
              </div>
              <p className="text-xs text-gray-400">{metric.description}</p>
            </div>
          );
        })}
      </div>

      {/* Final Success Summary */}
      <div
        className={`bg-gradient-to-r from-green-900/30 via-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30 transition-all duration-1000 delay-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Home className="w-8 h-8 text-green-400 mr-3" />
            <h3 className="text-3xl font-bold text-white">
              Objetivo Final: <span className="text-green-400">Casa Própria</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div>
              <div className="text-2xl font-bold text-green-400 mb-2">R$ 90.000</div>
              <p className="text-gray-300 text-sm">Entrada da casa própria</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-2">10 anos</div>
              <p className="text-gray-300 text-sm">Prazo para conquista</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400 mb-2">R$ 9.500</div>
              <p className="text-gray-300 text-sm">Renda mensal projetada</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400 mb-2">Estável</div>
              <p className="text-gray-300 text-sm">Situação financeira</p>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <p className="text-lg text-gray-300 leading-relaxed">
              "De mãe solo com dívidas de <span className="text-red-400 font-bold">R$ 5.700</span> e 
              déficit mensal de <span className="text-red-400 font-bold">R$ 500</span>, para 
              empreendedora próspera com <span className="text-green-400 font-bold">R$ 26.000</span> de reserva 
              e <span className="text-green-400 font-bold">R$ 2.556</span> de sobra mensal. 
              Uma transformação completa em <span className="text-blue-400 font-bold">10 anos</span>."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
