"use client";

import { useState } from "react";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        {/* Display da Calculadora */}
        <div className="text-right p-4 mb-4 bg-gray-700 rounded-lg text-white text-4xl font-bold">
          {displayValue}
        </div>
        
        {/* Grade de Botões */}
        <div className="grid grid-cols-4 gap-4">
          {buttonLayout.flat().map((button, index) => (
            <button
              key={index}
              className={`p-4 rounded-full text-white font-bold text-2xl
                ${
                  button === "C"
                    ? "bg-red-500 hover:bg-red-600"
                    : button === "="
                    ? "bg-green-500 hover:bg-green-600 col-span-2"
                    : ["+", "-", "*", "/"].includes(button)
                    ? "bg-purple-500 hover:bg-purple-600"
                    : "bg-gray-600 hover:bg-gray-500"
                }
              `}
            >
              {button}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}