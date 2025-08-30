"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState("0");

  const buttonLayout = [
    ["C", "(", ")", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Efeitos de fundo futurísticos */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-300"></div>

      <Card
        className="p-6 border-2 border-cyan-400/30 bg-black/40 backdrop-blur-xl shadow-2xl relative z-10 
                      before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500/10 
                      before:via-purple-500/10 before:to-pink-500/10 before:rounded-lg before:-z-10
                      hover:border-cyan-400/50 transition-all duration-300 hover:shadow-cyan-400/20 hover:shadow-2xl"
      >
        <CardContent className="p-0">
          {/* Display da Calculadora */}
          <div
            className="text-right p-6 mb-6 bg-gradient-to-r from-slate-800/80 to-slate-900/80 
                         rounded-xl border border-cyan-400/20 text-cyan-100 text-5xl font-mono font-bold 
                         shadow-inner backdrop-blur-sm relative overflow-hidden
                         before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
                         before:via-cyan-400/5 before:to-transparent before:animate-pulse"
          >
            <div className="relative z-10 drop-shadow-lg">{displayValue}</div>
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
                className={`h-16 w-16 text-xl font-bold rounded-xl border-2 transition-all duration-200 
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
                      ? `bg-gradient-to-r from-emerald-500/80 to-emerald-600/80 border-emerald-400/50 text-white col-span-2
                         hover:from-emerald-400 hover:to-emerald-500 hover:border-emerald-300 hover:shadow-emerald-400/50
                         before:from-emerald-300/50 before:to-emerald-500/50`
                      : ["+", "-", "*", "/", "(", ")"].includes(button)
                      ? `bg-gradient-to-r from-purple-500/80 to-violet-600/80 border-purple-400/50 text-white
                         hover:from-purple-400 hover:to-violet-500 hover:border-purple-300 hover:shadow-purple-400/50
                         before:from-purple-300/50 before:to-violet-500/50`
                      : `bg-gradient-to-r from-slate-600/80 to-slate-700/80 border-slate-400/50 text-cyan-100
                         hover:from-slate-500 hover:to-slate-600 hover:border-slate-300 hover:shadow-slate-400/50
                         before:from-slate-300/50 before:to-slate-500/50`
                  }
                `}
              >
                <span className="relative z-10 drop-shadow-sm">{button}</span>
                {/* Efeito de brilho nos botões */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                               -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                ></div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
