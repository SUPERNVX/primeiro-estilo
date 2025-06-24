
import { useEffect, useState } from "react";
import { ShoppingCart, Car, Wifi, Coffee, Package } from "lucide-react";

export const ReducaoCustos = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("custos-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const economiesData = [
    {
      icon: ShoppingCart,
      category: "Alimentação",
      action: "Compra FIFO (Ceagesp/Atacadão) + feira semanal",
      economy: 300,
      newValue: 700,
      oldValue: 1000,
      color: "green",
    },
    {
      icon: Car,
      category: "Transporte (SP)",
      action: "Bilhete Único (ônibus/metrô) + entregas de bike em raio de 3km",
      economy: 281.2,
      newValue: 118.8,
      oldValue: 400,
      color: "green",
    },
    {
      icon: Wifi,
      category: "Internet",
      action: "Plano Claro Pós: 15GB + chamadas ilimitadas (R$ 60)",
      economy: 190,
      newValue: 60,
      oldValue: 250,
      color: "green",
    },
    {
      icon: Coffee,
      category: "Lazer",
      action: "Amazon Prime (R$ 14,90) + parques públicos gratuitos",
      economy: 335.1,
      newValue: 14.9,
      oldValue: 350,
      color: "green",
    },
    {
      icon: Package,
      category: "Matéria-prima",
      action: "Compra FIFO de insumos + parceria com padarias locais",
      economy: 150,
      newValue: 450,
      oldValue: 600,
      color: "green",
    },
  ];

  const totalEconomy = economiesData.reduce((sum, item) => sum + item.economy, 0);

  return (
    <div id="custos-section" className="container mx-auto px-4">
      <div
        className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Redução de <span className="text-green-400">Custos</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Estratégias inteligentes para otimizar gastos sem comprometer a qualidade de vida
        </p>
        
        {/* Total Economy Highlight */}
        <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30 max-w-md mx-auto">
          <div className="text-sm text-gray-300 mb-2">Economia Total Mensal</div>
          <div className="text-4xl font-bold text-green-400">
            R$ {totalEconomy.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {economiesData.map((item, index) => {
          const Icon = item.icon;
          const economyPercentage = (item.economy / item.oldValue) * 100;

          return (
            <div
              key={index}
              className={`transition-all duration-1000 delay-${index * 100} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 group h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{item.category}</h3>
                </div>

                <p className="text-gray-300 text-sm mb-6 line-clamp-3">{item.action}</p>

                <div className="space-y-4">
                  {/* Before/After Comparison */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-xs text-gray-400 mb-1">Antes</div>
                      <div className="text-lg font-bold text-red-400">
                        R$ {item.oldValue.toLocaleString('pt-BR')}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 mb-1">Depois</div>
                      <div className="text-lg font-bold text-green-400">
                        R$ {item.newValue.toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>

                  {/* Economy Amount */}
                  <div className="bg-green-500/10 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-300 mb-1">Economia Mensal</div>
                    <div className="text-xl font-bold text-green-400">
                      R$ {item.economy.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-green-300">
                      -{economyPercentage.toFixed(0)}%
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Redução</span>
                      <span>{economyPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-2000 delay-1000"
                        style={{
                          width: isVisible && hoveredCard === index ? `${economyPercentage}%` : "0%",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Section */}
      <div
        className={`bg-gradient-to-r from-green-900/30 to-green-800/30 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30 transition-all duration-1000 delay-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold text-green-400 mb-6">
            Impacto da Otimização de Custos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">
                R$ {totalEconomy.toLocaleString('pt-BR')}
              </div>
              <p className="text-gray-300">Economia Mensal Total</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">
                R$ {(totalEconomy * 12).toLocaleString('pt-BR')}
              </div>
              <p className="text-gray-300">Economia Anual</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">24.6%</div>
              <p className="text-gray-300">Redução de Gastos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
