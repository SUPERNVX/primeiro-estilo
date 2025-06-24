
import { useEffect, useState } from "react";
import { Calendar, Target, TrendingUp, Home, Users, Award } from "lucide-react";

export const LinhaTempo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeYear, setActiveYear] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("timeline-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const timelineData = [
    {
      periodo: "Mês 2",
      years: 0.17,
      icon: Target,
      meta: "Reserva inicial R$ 1.000",
      acoes: ["Aporte automático via Nubank (R$ 500/mês)", "Cofrinho digital"],
      color: "blue",
      isDeficit: false,
    },
    {
      periodo: "Mês 6",
      years: 0.5,
      icon: TrendingUp,
      meta: "Quitar dívida de cartão",
      acoes: ["Pagar R$ 1.000/mês (50% da sobra)"],
      color: "orange",
      isDeficit: false,
    },
    {
      periodo: "Ano 1",
      years: 1,
      icon: Award,
      meta: "Reserva R$ 15k + capital giro",
      acoes: ["CDB 100% CDI (R$ 1.500/mês)", "Negócio estabilizado"],
      color: "green",
      isDeficit: false,
      turningPoint: true,
    },
    {
      periodo: "Ano 3",
      years: 3,
      icon: Users,
      meta: "Ampliação física do negócio",
      acoes: ["Compra de balcão refrigerado usado (R$ 3.500)"],
      color: "purple",
      isDeficit: false,
    },
    {
      periodo: "Ano 5",
      years: 5,
      icon: Calendar,
      meta: "Contratação de ajudante",
      acoes: ["Financiada por expansão do 'Clube do Bolo' (40 clientes)"],
      color: "cyan",
      isDeficit: false,
    },
    {
      periodo: "Ano 10",
      years: 10,
      icon: Home,
      meta: "Entrada casa própria R$ 90k",
      acoes: ["FIIs (HGLG11)", "LCI imobiliária (R$ 1.000/mês desde ano 3)"],
      color: "green",
      isDeficit: false,
    },
  ];

  const progressData = [
    { year: 0, value: -500, status: "deficit" },
    { year: 0.17, value: 500, status: "recovery" },
    { year: 0.5, value: 1556, status: "growth" },
    { year: 1, value: 2556, status: "profit" },
    { year: 3, value: 4000, status: "profit" },
    { year: 5, value: 6500, status: "profit" },
    { year: 10, value: 9500, status: "profit" },
  ];

  return (
    <div id="timeline-section" className="container mx-auto px-4">
      <div
        className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Linha do <span className="text-blue-400">Tempo</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Cronograma executável com metas financeiras e marcos de crescimento
        </p>
      </div>

      {/* Progress Chart Simulation */}
      <div
        className={`mb-16 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            Evolução Financeira ao Longo do Tempo
          </h3>
          
          <div className="relative h-64 mb-8">
            {/* Chart background */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gray-600"></div>
            </div>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
              <span>R$ 10.000</span>
              <span>R$ 5.000</span>
              <span className="text-white font-bold">R$ 0</span>
              <span className="text-red-400">-R$ 500</span>
            </div>
            
            {/* Chart line */}
            <svg className="absolute inset-0 w-full h-full ml-12" viewBox="0 0 800 200">
              {/* Deficit to profit turning point line */}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: "#ef4444", stopOpacity: 1 }} />
                  <stop offset="20%" style={{ stopColor: "#f97316", stopOpacity: 1 }} />
                  <stop offset="40%" style={{ stopColor: "#eab308", stopOpacity: 1 }} />
                  <stop offset="60%" style={{ stopColor: "#22c55e", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#22c55e", stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              
              {/* Chart line path */}
              <path
                d="M 0 180 L 80 120 L 160 80 L 240 40 L 400 20 L 600 10 L 800 5"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                fill="none"
                className={`transition-all duration-3000 delay-1000 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  strokeDasharray: isVisible ? "none" : "1000",
                  strokeDashoffset: isVisible ? "0" : "1000",
                }}
              />
              
              {/* Turning point indicator */}
              <circle
                cx="160"
                cy="80"
                r="4"
                fill="#ffffff"
                className="animate-pulse"
              />
              
              {/* Dotted line at turning point */}
              <line
                x1="160"
                y1="0"
                x2="160"
                y2="200"
                stroke="#ffffff"
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0.5"
              />
            </svg>
            
            {/* Data points */}
            {progressData.map((point, index) => (
              <div
                key={index}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 delay-${1500 + index * 200} ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
                style={{
                  left: `${12 + (point.year / 10) * 76}%`,
                  top: `${80 - (point.value + 500) / 10000 * 70}%`,
                }}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    point.status === "deficit"
                      ? "bg-red-400"
                      : point.status === "recovery"
                      ? "bg-orange-400"
                      : "bg-green-400"
                  } border-2 border-white shadow-lg`}
                />
                <div className={`text-xs font-bold mt-1 ${
                  point.status === "deficit" ? "text-red-400" : "text-green-400"
                }`}>
                  {point.value > 0 ? "+" : ""}R$ {point.value.toLocaleString('pt-BR')}
                </div>
              </div>
            ))}
          </div>
          
          {/* X-axis timeline */}
          <div className="flex justify-between text-xs text-gray-400 mt-4 ml-12">
            <span>Início</span>
            <span>2 meses</span>
            <span>6 meses</span>
            <span>1 ano</span>
            <span>3 anos</span>
            <span>5 anos</span>
            <span>10 anos</span>
          </div>
        </div>
      </div>

      {/* Timeline Milestones */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-red-400 via-blue-400 to-green-400 h-full opacity-30"></div>
        
        <div className="space-y-12">
          {timelineData.map((item, index) => {
            const Icon = item.icon;
            const isLeft = index % 2 === 0;
            
            const colorClasses = {
              blue: "border-blue-500/50 bg-blue-500/10 text-blue-400",
              orange: "border-orange-500/50 bg-orange-500/10 text-orange-400",
              green: "border-green-500/50 bg-green-500/10 text-green-400",
              purple: "border-purple-500/50 bg-purple-500/10 text-purple-400",
              cyan: "border-cyan-500/50 bg-cyan-500/10 text-cyan-400",
            };

            return (
              <div
                key={index}
                className={`relative transition-all duration-1000 delay-${index * 200} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div className={`flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
                  {/* Content card */}
                  <div className={`w-5/12 ${isLeft ? "pr-8" : "pl-8"}`}>
                    <div
                      className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border ${
                        colorClasses[item.color as keyof typeof colorClasses].split(' ')[0]
                      } ${colorClasses[item.color as keyof typeof colorClasses].split(' ')[1]} hover:scale-105 transition-all duration-300 group cursor-pointer`}
                      onMouseEnter={() => setActiveYear(index)}
                      onMouseLeave={() => setActiveYear(null)}
                    >
                      <div className="flex items-center mb-4">
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
                          <h3 className="text-xl font-bold text-white">{item.periodo}</h3>
                          <div className="text-sm text-gray-400">{item.years < 1 ? `${Math.round(item.years * 12)} meses` : `${item.years} ${item.years === 1 ? 'ano' : 'anos'}`}</div>
                        </div>
                      </div>
                      
                      <h4
                        className={`text-lg font-semibold mb-3 ${
                          colorClasses[item.color as keyof typeof colorClasses].split(' ')[2]
                        }`}
                      >
                        {item.meta}
                      </h4>
                      
                      <ul className="space-y-2">
                        {item.acoes.map((acao, actionIndex) => (
                          <li key={actionIndex} className="text-gray-300 text-sm flex items-start">
                            <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {acao}
                          </li>
                        ))}
                      </ul>
                      
                      {item.turningPoint && (
                        <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
                            <span className="text-white font-semibold text-sm">
                              Marco de Virada: Estabilidade Financeira Alcançada
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="w-2/12 flex justify-center">
                    <div
                      className={`w-6 h-6 rounded-full border-4 border-white ${
                        activeYear === index ? "scale-125" : "scale-100"
                      } transition-transform duration-300 ${
                        item.turningPoint ? "bg-white animate-pulse" : colorClasses[item.color as keyof typeof colorClasses].split(' ')[1].replace('bg-', '').replace('/10', '')
                      }`}
                      style={{
                        backgroundColor: item.turningPoint ? "white" : undefined,
                      }}
                    />
                  </div>
                  
                  {/* Empty space */}
                  <div className="w-5/12"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Summary */}
      <div
        className={`mt-16 bg-gradient-to-r from-blue-900/30 to-green-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 transition-all duration-1000 delay-1200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            Jornada de Transformação Financeira
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">6 marcos</div>
              <p className="text-gray-300">Objetivos definidos</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">10 anos</div>
              <p className="text-gray-300">Planejamento completo</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">R$ 90k</div>
              <p className="text-gray-300">Meta final: casa própria</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
