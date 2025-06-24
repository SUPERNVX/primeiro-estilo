
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";

export const FluxoCaixa = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    rendaTotal: 0,
    despesasReduzidas: 0,
    pagamentoDividas: 0,
    sobraFinanceira: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Animate cash flow numbers
          const duration = 2000;
          const steps = 60;
          const stepDuration = duration / steps;
          
          let currentStep = 0;
          const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            setAnimatedValues({
              rendaTotal: Math.floor(6900 * easeOutQuart),
              despesasReduzidas: Math.floor(3393.70 * easeOutQuart),
              pagamentoDividas: Math.floor(950 * easeOutQuart),
              sobraFinanceira: Math.floor(2556.30 * easeOutQuart),
            });
            
            if (currentStep >= steps) {
              clearInterval(interval);
            }
          }, stepDuration);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("fluxo-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const fluxoData = [
    {
      icon: TrendingUp,
      title: "Renda Total",
      value: animatedValues.rendaTotal,
      description: "Renda base + estratégias extras",
      color: "blue",
      isPositive: true,
    },
    {
      icon: TrendingDown,
      title: "Despesas Reduzidas",
      value: animatedValues.despesasReduzidas,
      description: "Custos otimizados com qualidade",
      color: "orange",
      isPositive: false,
    },
    {
      icon: DollarSign,
      title: "Pagamento Dívidas",
      value: animatedValues.pagamentoDividas,
      description: "Quitação acelerada das dívidas",
      color: "red",
      isPositive: false,
    },
    {
      icon: Target,
      title: "Sobra Financeira",
      value: animatedValues.sobraFinanceira,
      description: "Disponível para investimentos",
      color: "green",
      isPositive: true,
    },
  ];

  // Calculate the flow visualization
  const totalIncome = 6900;
  const totalExpenses = 3393.70 + 950;
  const netResult = 2556.30;

  return (
    <div id="fluxo-section" className="container mx-auto px-4">
      <div
        className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Fluxo de <span className="text-green-400">Caixa</span> Projetado
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Visualização completa da transformação financeira após implementação das estratégias
        </p>
      </div>

      {/* Cash Flow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {fluxoData.map((item, index) => {
          const Icon = item.icon;
          const colorClasses = {
            blue: "border-blue-500/50 bg-blue-500/10 text-blue-400",
            orange: "border-orange-500/50 bg-orange-500/10 text-orange-400",
            red: "border-red-500/50 bg-red-500/10 text-red-400",
            green: "border-green-500/50 bg-green-500/10 text-green-400",
          };

          return (
            <div
              key={index}
              className={`transition-all duration-1000 delay-${index * 150} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div
                className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border ${
                  colorClasses[item.color as keyof typeof colorClasses].split(' ')[0]
                } ${colorClasses[item.color as keyof typeof colorClasses].split(' ')[1]} hover:scale-105 transition-all duration-300 group h-full`}
              >
                <div className="flex items-center justify-center mb-4">
                  <div
                    className={`w-16 h-16 rounded-full ${
                      colorClasses[item.color as keyof typeof colorClasses].split(' ')[1]
                    } flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon
                      className={`w-8 h-8 ${
                        colorClasses[item.color as keyof typeof colorClasses].split(' ')[2]
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
                      colorClasses[item.color as keyof typeof colorClasses].split(' ')[2]
                    }`}
                  >
                    {item.isPositive ? "+" : "-"}R$ {item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>

                {/* Progress indicator */}
                <div className="mt-4">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-2000 delay-${1000 + index * 200} ${
                        item.color === "blue"
                          ? "bg-gradient-to-r from-blue-600 to-blue-400"
                          : item.color === "orange"
                          ? "bg-gradient-to-r from-orange-600 to-orange-400"
                          : item.color === "red"
                          ? "bg-gradient-to-r from-red-600 to-red-400"
                          : "bg-gradient-to-r from-green-600 to-green-400"
                      }`}
                      style={{
                        width: isVisible ? "100%" : "0%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Flow Visualization */}
      <div
        className={`mb-12 transition-all duration-1000 delay-800 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Transformação do Fluxo Financeiro
          </h3>
          
          <div className="space-y-6">
            {/* Income Flow */}
            <div className="flex items-center justify-between p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <div className="flex items-center">
                <TrendingUp className="w-6 h-6 text-blue-400 mr-3" />
                <span className="text-white font-semibold">Entradas</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">
                +R$ {totalIncome.toLocaleString('pt-BR')}
              </div>
            </div>

            {/* Expenses Flow */}
            <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-lg border border-red-500/30">
              <div className="flex items-center">
                <TrendingDown className="w-6 h-6 text-red-400 mr-3" />
                <span className="text-white font-semibold">Saídas</span>
              </div>
              <div className="text-2xl font-bold text-red-400">
                -R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>

            {/* Net Result */}
            <div className="flex items-center justify-between p-6 bg-green-500/10 rounded-lg border border-green-500/30">
              <div className="flex items-center">
                <Target className="w-8 h-8 text-green-400 mr-3" />
                <span className="text-white font-bold text-lg">Resultado Líquido</span>
              </div>
              <div className="text-3xl font-bold text-green-400">
                +R$ {netResult.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transformation Highlight */}
      <div
        className={`bg-gradient-to-r from-red-900/20 via-gray-800/50 to-green-900/20 backdrop-blur-sm rounded-2xl p-8 border border-gray-600 transition-all duration-1000 delay-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            Transformação Financeira Completa
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-lg text-gray-300">Situação Anterior</div>
              <div className="text-3xl font-bold text-red-400">-R$ 500</div>
              <div className="text-sm text-gray-400">Déficit mensal</div>
            </div>
            <div className="space-y-2">
              <div className="text-lg text-gray-300">Transformação</div>
              <div className="text-3xl font-bold text-blue-400">+R$ 3.056</div>
              <div className="text-sm text-gray-400">Melhoria total</div>
            </div>
            <div className="space-y-2">
              <div className="text-lg text-gray-300">Nova Situação</div>
              <div className="text-3xl font-bold text-green-400">+R$ 2.556</div>
              <div className="text-sm text-gray-400">Sobra mensal</div>
            </div>
          </div>
          
          {/* Turning Point Indicator */}
          <div className="mt-8 pt-6 border-t border-gray-600">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-4 h-0.5 bg-red-400"></div>
              <div className="w-4 h-0.5 bg-red-400 opacity-75"></div>
              <div className="w-4 h-0.5 bg-red-400 opacity-50"></div>
              <div className="w-4 h-0.5 bg-red-400 opacity-25"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div className="w-4 h-0.5 bg-green-400 opacity-25"></div>
              <div className="w-4 h-0.5 bg-green-400 opacity-50"></div>
              <div className="w-4 h-0.5 bg-green-400 opacity-75"></div>
              <div className="w-4 h-0.5 bg-green-400"></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Ponto de virada: De déficit para prosperidade
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
