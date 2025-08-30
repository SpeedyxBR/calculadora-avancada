"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Função para calcular o fatorial de um número inteiro
const factorial = (n: number): number => {
  if (n < 0) return NaN;
  if (n === 0) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"calculator" | "history">(
    "calculator"
  );

  const buttonLayout = [
    ["C", "(", ")", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["^", "√", "log", "n!"],
    ["0", ".", "%", "="],
  ];

  const evaluateExpression = (expr: string) => {
    try {
      if (expr.includes("/0")) {
        return "Erro: Divisão por zero";
      }

      let sanitizedExpr = expr.replace(/\b0+(\d)/g, "$1");

      // Substitui operadores científicos por funções JavaScript
      sanitizedExpr = sanitizedExpr
        .replace(/\^/g, "**") // Potenciação
        .replace(/√(\d+)/g, "Math.sqrt($1)") // Raiz quadrada
        .replace(/log(\d+)/g, "Math.log10($1)") // Logaritmo
        .replace(/(\d+)%/g, "($1/100)") // Porcentagem
        .replace(/(\d+)!/g, "factorial($1)"); // Fatorial

      const result = eval(`
        const factorial = ${factorial.toString()};
        ${sanitizedExpr}
      `);
      return Number.isFinite(result) ? result.toString() : "Erro";
    } catch {
      return "Erro";
    }
  };

  const handleButtonClick = (value: string) => {
    if (value === "C") {
      setDisplayValue("0");
      setExpression("");
    } else if (value === "=") {
      const result = evaluateExpression(expression);
      setHistory((prev) => [...prev, `${expression} = ${result}`]);
      setDisplayValue(result);
      setExpression(result !== "Erro" ? result : "");
    } else {
      setExpression((prev) => prev + value);
      setDisplayValue((prev) => (prev === "0" ? value : prev + value));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden py-6">
      {/* Efeitos de fundo futurísticos */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-none blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/20 rounded-none blur-3xl animate-pulse delay-300"></div>

      <Card
        className="p-4 border-2 border-cyan-400/30 bg-black/40 backdrop-blur-xl shadow-2xl relative z-10 rounded-lg
                   before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500/10 
                   before:via-purple-500/10 before:to-pink-500/10 before:rounded-lg before:-z-10
                   hover:border-cyan-400/50 transition-all duration-300 hover:shadow-cyan-400/20 hover:shadow-2xl
                   w-[350px] max-w-[90vw]"
      >
        <CardContent className="p-0">
          {activeTab === "calculator" ? (
            <>
              {/* Display da Calculadora */}
              <div
                className="text-right p-4 mb-4 bg-gradient-to-r from-slate-800/80 to-slate-900/80 
                          rounded-lg border border-cyan-400/20 text-cyan-100 text-2xl font-mono font-bold 
                          shadow-inner backdrop-blur-sm relative overflow-hidden
                          before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
                          before:via-cyan-400/5 before:to-transparent before:animate-pulse
                          min-h-[60px] flex items-center justify-end"
              >
                <div className="relative z-10 drop-shadow-lg break-all">
                  {displayValue}
                </div>
                {/* Scanline effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent 
                            h-1 animate-pulse duration-2000"
                ></div>
              </div>

              {/* Grade de Botões */}
              <div className="grid grid-cols-4 gap-3">
                {buttonLayout.flat().map((button, index) => (
                  <Button
                    key={index}
                    onClick={() => handleButtonClick(button)}
                    className={`h-14 w-14 text-sm font-bold rounded-lg border-2 transition-all duration-200 
                                relative overflow-hidden group backdrop-blur-sm
                                hover:scale-105 hover:shadow-xl active:scale-95
                                before:absolute before:inset-0 before:bg-gradient-to-r before:opacity-0 
                                before:transition-opacity before:duration-300 group-hover:before:opacity-100
                    ${
                      button === "C"
                        ? `bg-gradient-to-r from-red-500/80 to-red-600/80 border-red-400/50 text-white
                           hover:from-red-400 hover:to-red-500 hover:border-red-300 hover:shadow-red-400/50
                           before:from-red-300/50 before:to-red-500/50`
                        : button === "="
                        ? `bg-gradient-to-r from-emerald-500/80 to-emerald-600/80 border-emerald-400/50 text-white
                           hover:from-emerald-400 hover:to-emerald-500 hover:border-emerald-300 hover:shadow-emerald-400/50
                           before:from-emerald-300/50 before:to-emerald-500/50`
                        : [
                            "+",
                            "-",
                            "*",
                            "/",
                            "(",
                            ")",
                            "^",
                            "√",
                            "log",
                            "%",
                            "n!",
                          ].includes(button)
                        ? `bg-gradient-to-r from-purple-500/80 to-violet-600/80 border-purple-400/50 text-white
                           hover:from-purple-400 hover:to-violet-500 hover:border-purple-300 hover:shadow-purple-400/50
                           before:from-purple-300/50 before:to-violet-500/50`
                        : `bg-gradient-to-r from-slate-600/80 to-slate-700/80 border-slate-400/50 text-cyan-100
                           hover:from-slate-500 hover:to-slate-600 hover:border-slate-300 hover:shadow-slate-400/50
                           before:from-slate-300/50 before:to-slate-500/50`
                    }
                  `}
                  >
                    <span className="relative z-10 drop-shadow-sm">
                      {button}
                    </span>
                    {/* Efeito de brilho nos botões */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                   -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    ></div>
                  </Button>
                ))}
              </div>
            </>
          ) : (
            /* Aba de Histórico */
            <div className="h-[300px] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-cyan-100 font-bold text-lg">Histórico</h3>
                {history.length > 0 && (
                  <button
                    onClick={() => setHistory([])}
                    className="text-red-400 hover:text-red-300 text-xs font-bold px-3 py-1 rounded-lg
                               bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 transition-all duration-200
                               hover:scale-105"
                  >
                    Limpar
                  </button>
                )}
              </div>

              <div
                className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-800/50 to-slate-900/50 
                           rounded-lg border border-cyan-400/20 p-3 space-y-2"
              >
                {history.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-cyan-100/50 text-center">
                    <div>
                      <div className="text-2xl mb-2">📋</div>
                      <p className="text-sm">Nenhum cálculo ainda</p>
                    </div>
                  </div>
                ) : (
                  history
                    .slice()
                    .reverse()
                    .map((item, index) => (
                      <div
                        key={index}
                        className="p-2 bg-slate-700/50 rounded-lg border border-slate-600/30 
                                   hover:border-cyan-400/30 transition-all duration-200 cursor-pointer
                                   hover:bg-slate-600/50 group hover:scale-[1.02]"
                        onClick={() => {
                          const result = item.split(" = ")[1];
                          if (result && result !== "Erro") {
                            setDisplayValue(result);
                            setExpression(result);
                            setActiveTab("calculator");
                          }
                        }}
                      >
                        <div className="text-cyan-100 font-mono">
                          <div className="text-cyan-100/70 text-xs mb-1">
                            #{history.length - index}
                          </div>
                          <div className="break-all text-sm">{item}</div>
                        </div>
                        <div className="text-xs text-cyan-100/50 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          🔄 Clique para usar
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Botões de Navegação - Agora fora da calculadora */}
      <div className="flex mt-6 bg-slate-800/50 rounded-lg p-1 relative z-10 backdrop-blur-sm border border-slate-600/30">
        <button
          onClick={() => setActiveTab("calculator")}
          className={`py-3 px-6 rounded-md text-sm font-bold transition-all duration-300 ${
            activeTab === "calculator"
              ? "bg-gradient-to-r from-cyan-500/80 to-blue-600/80 text-white shadow-lg"
              : "text-cyan-100/60 hover:text-cyan-100 hover:bg-slate-700/50"
          }`}
        >
          🧮 Calculadora
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`py-3 px-6 rounded-md text-sm font-bold transition-all duration-300 ${
            activeTab === "history"
              ? "bg-gradient-to-r from-purple-500/80 to-violet-600/80 text-white shadow-lg"
              : "text-cyan-100/60 hover:text-cyan-100 hover:bg-slate-700/50"
          }`}
        >
          📋 Histórico ({history.length})
        </button>
        <button
          onClick={() => window.open(window.location.href, "_blank")}
          className="py-3 px-6 rounded-md text-sm font-bold transition-all duration-300
                     text-cyan-100/60 hover:text-cyan-100 hover:bg-slate-700/50
                     border-l border-slate-600/50 ml-1 pl-6"
        >
          🚀 Nova Aba
        </button>
      </div>
    </div>
  );
}
