"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const TrigGraph = () => {
    const [amplitude, setAmplitude] = useState(1);
    const [frequency, setFrequency] = useState(1);
    const [phase, setPhase] = useState(0);
    const [selectedFunction, setSelectedFunction] = useState("sin");
    const [step, setStep] = useState(1);

    const width = 500;
    const height = 300;
    const centerX = width / 2;
    const centerY = height / 2;
    const scaleX = 40;
    const scaleY = 50;

    const computeY = (x: number) => {
        const radianX = (x - centerX) / scaleX;
        switch (selectedFunction) {
            case "sin": return -amplitude * Math.sin(frequency * radianX + phase) * scaleY + centerY;
            case "cos": return -amplitude * Math.cos(frequency * radianX + phase) * scaleY + centerY;
            case "tan": return -amplitude * Math.tan(frequency * radianX + phase) * scaleY + centerY;
            default: return centerY;
        }
    };

    const points = Array.from({ length: width }, (_, i) => ({ x: i, y: computeY(i) }));

    return (
        <div className="p-4 mt-4 flex flex-col items-center gap-4">
            <h2 className="text-lg font-semibold">Funções Trigonométricas Interativas</h2>
            
            <div className="flex gap-2">
                <label>
                    Função:
                    <select value={selectedFunction} onChange={(e) => setSelectedFunction(e.target.value)} className="border p-1">
                        <option value="sin">Seno</option>
                        <option value="cos">Cosseno</option>
                        <option value="tan">Tangente</option>
                    </select>
                </label>
                <label>
                    Amplitude:
                    <input type="number" value={amplitude} onChange={(e) => setAmplitude(parseFloat(e.target.value))} className="border p-1 w-16" />
                </label>
                <label>
                    Frequência:
                    <input type="number" value={frequency} onChange={(e) => setFrequency(parseFloat(e.target.value))} className="border p-1 w-16" />
                </label>
                <label>
                    Fase:
                    <input type="number" value={phase} onChange={(e) => setPhase(parseFloat(e.target.value))} className="border p-1 w-16" />
                </label>
            </div>

            <svg width={width} height={height} className="border">
                {/* Eixos */}
                <line x1="0" y1={centerY} x2={width} y2={centerY} stroke="black" strokeWidth="2" />
                <line x1={centerX} y1="0" x2={centerX} y2={height} stroke="black" strokeWidth="2" />
                
                {/* Gráfico da função */}
                <motion.polyline
                    fill="none"
                    stroke="blue"
                    strokeWidth="2"
                    points={points.map(p => `${p.x},${p.y}`).join(" ")}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />
            </svg>

            {/* Modo Passo a Passo */}
            <div className="mt-4 p-4 border rounded-md text-center">
                <h2 className="text-lg font-semibold">Modo Passo a Passo</h2>
                <p>
                    {step === 1 ? "1️⃣ A amplitude define o quanto a função oscila para cima e para baixo."
                        : step === 2 ? "2️⃣ A frequência controla quantas oscilações ocorrem dentro de um intervalo."
                            : "3️⃣ A fase desloca a função para a esquerda ou direita no eixo X."}
                </p>
                <button onClick={() => setStep(step < 3 ? step + 1 : 1)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                    Próximo Passo
                </button>
            </div>
        </div>
    );
};

export default TrigGraph;
