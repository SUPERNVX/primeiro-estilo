
import { useEffect, useState } from "react";
import { Calendar, Instagram, BookOpen, Link } from "lucide-react";

export const RendaExtra = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    clube: 0,
    vendas: 0,
    ebook: 0,
    afiliados: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Animate revenue numbers
          const duration = 2500;
          const steps = 60;
          const stepDuration = duration / steps;
          
          let currentStep = 0;
          const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            setAnimatedValues({
              clube: Math.floor(864 * easeOutQuart),
              vendas: Math.floor(1200 * easeOutQuart),
              ebook: Math.floor(500 * easeOutQuart),
              afiliados: Math.floor(336 * easeOutQuart),
            });
            
            if (currentStep >= steps) {
              clearInterval(interval);
            }
          }, stepDuration);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("renda-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const rendaData = [
    {
      icon: Calendar,
      title: "Clube do Bolo",
      description: "12 assinaturas (entrega semanal ao buscar filho na escola)",
      ganho: animatedValues.clube,
      tempo: "20 minutos",
      color: "blue",
      details: "Entrega conveniente no horário escolar",
    },
    {
      icon: Instagram,
      title: "Vendas Online",
      description: "Encomendas via Instagram (pré-pagamento obrigatório)",
      ganho: animatedValues.vendas,
      tempo: "15 minutos",
      color: "purple",
      details: "Marketing digital eficiente",
    },
    {
      icon: BookOpen,
      title: "E-book Digital",
      description: '"50 Receitas para Festas Escolares" (venda em redes sociais)',
      ganho: animatedValues.ebook,
      tempo: "1h/semana",
      color: "green",
      details: "Renda passiva escalável",
    },
    {
      icon: Link,
      title: "Links Afiliados",
      description: "Indicação de produtos de confeitaria (comissão 5%)",
      ganho: animatedValues.afiliados,
      tempo: "Automático",
      color: "orange",
      details: "Monetização de conteúdo",
    },
  ];

  const totalRenda = rendaData.reduce((sum, item) => sum + (item.ganho || 0), 0);
  const targetTotal = 2900;

  return (
    <div id="renda-section" className="container mx-auto px-4">
      <div
        className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Estratégia de <span className="text-blue-400">Renda Extra</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Fontes de receita realistas com baixa demanda de tempo para mães empreendedoras
        </p>
        
        {/* Total Revenue Progress */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30 max-w-md mx-auto">
          <div className="text-sm text-gray-300 mb-2">Meta de Renda Extra Mensal</div>
          <div className="text-4xl font-bold text-blue-400 mb-2">
            R$ {totalRenda.toLocaleString('pt-BR')}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-3000 delay-1000"
              style={{
                width: isVisible ? `${(totalRenda / targetTotal) * 100}%` : "0%",
              }}
            />
          </div>
          <div className="text-xs text-gray-400 mt-2">
            {((totalRenda / targetTotal) * 100).toFixed(0)}% da meta alcançada
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {rendaData.map((item, index) => {
          const Icon = item.icon;
          const colorClasses = {
            blue: "border-blue-500/50 bg-blue-500/10 text-blue-400",
            purple: "border-purple-500/50 bg-purple-500/10 text-purple-400",
            green: "border-green-500/50 bg-green-500/10 text-green-400",
            orange: "border-orange-500/50 bg-orange-500/10 text-orange-400",
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
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
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
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.details}</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  {item.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-400 mb-1">Ganho Mensal</div>
                    <div
                      className={`text-2xl font-bold ${
                        colorClasses[item.color as keyof typeof colorClasses].split(' ')[2]
                      }`}
                    >
                      R$ {item.ganho.toLocaleString('pt-BR')}
                    </div>
                  </div>
                  <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-400 mb-1">Tempo Diário</div>
                    <div className="text-xl font-bold text-white">{item.tempo}</div>
                  </div>
                </div>

                {/* Revenue Contribution Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Contribuição</span>
                    <span>{((item.ganho / targetTotal) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-2000 delay-${1000 + index * 200} ${
                        item.color === "blue"
                          ? "bg-gradient-to-r from-blue-600 to-blue-400"
                          : item.color === "purple"
                          ? "bg-gradient-to-r from-purple-600 to-purple-400"
                          : item.color === "green"
                          ? "bg-gradient-to-r from-green-600 to-green-400"
                          : "bg-gradient-to-r from-orange-600 to-orange-400"
                      }`}
                      style={{
                        width: isVisible ? `${(item.ganho / targetTotal) * 100}%` : "0%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Section */}
      <div
        className={`bg-gradient-to-r from-blue-900/30 to-green-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 transition-all duration-1000 delay-1200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold text-blue-400 mb-6">
            Potencial de Crescimento da Renda
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">
                R$ {totalRenda.toLocaleString('pt-BR')}
              </div>
              <p className="text-gray-300">Renda Extra Mensal</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">
                R$ {(totalRenda * 12).toLocaleString('pt-BR')}
              </div>
              <p className="text-gray-300">Potencial Anual</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">+72.5%</div>
              <p className="text-gray-300">Aumento de Renda</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400 mb-2">35min</div>
              <p className="text-gray-300">Tempo Médio Diário</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
