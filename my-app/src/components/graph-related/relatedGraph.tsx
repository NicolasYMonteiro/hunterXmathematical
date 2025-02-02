"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const RelatedGraph = () => {
    const [m, setM] = useState("1");
    const [b, setB] = useState("2");
    const [m2, setM2] = useState("1");
    const [b2, setB2] = useState("-1");
    const [selectedPoint, setSelectedPoint] = useState<{ x: number; y: number; label: string } | null>(null);
    const [showSecondLine, setShowSecondLine] = useState(false);
    const [step, setStep] = useState(1);

    const width = 300;
    const height = 300;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 27;

    const parseValue = (value: string) => {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? 0 : parsed;
    };

    const computeLine = (mVal: number, bVal: number) => {
        const xMin = -centerX / scale;
        const xMax = centerX / scale;
        return {
            x1: centerX + xMin * scale,
            y1: centerY - (mVal * xMin + bVal) * scale,
            x2: centerX + xMax * scale,
            y2: centerY - (mVal * xMax + bVal) * scale,
        };
    };
    const xIntercept = -parseValue(b) / parseValue(m);
    const yIntercept = parseValue(b);

    const points = [
        { x: 0, y: yIntercept, label: `Interseção no eixo Y na coordenada (0, ${yIntercept}): Onde a reta cruza o eixo Y.` },
        { x: xIntercept, y: 0, label: `Interseção no eixo X na coordenada (${xIntercept}, 0): Onde a reta cruza o eixo X.` },
    ].filter(point => isFinite(point.x) && isFinite(point.y));

    if (xIntercept === 0 && yIntercept === 0) {
        points.push({ x: 0, y: 0, label: "Interseção no eixo X e Y na origem." });
    }

    const line1 = computeLine(parseValue(m), parseValue(b));
    const line2 = computeLine(parseValue(m2), parseValue(b2));

    return (
        <div className="p-4 mt-4 flex flex-col md:flex-row md:items-start items-center gap-4"> {/* Container Principal */}

            <div className="p-4 w-min border rounded-xl"> {/* Container Esqerdo */}

                <h2 className="text-lg font-semibold mb-2">Explorando Funções do Primeiro Grau</h2>
                <p>
                    Ajuste os coeficientes abaixo para ver como a equação da reta muda.
                    O coeficiente angular <strong>a</strong> define a inclinação, enquanto <strong>b</strong> define o deslocamento vertical.
                </p>
                <h2 className="text-xl font-semibold mb-2 text-center">Gráfico Interativo</h2>

                <div className="flex flex-col gap-2 mb-4"> {/* Inputs de coeficientes */}
                    <label>
                        Coeficiente Angular (a):{" "}
                        <input type="number" value={m} onChange={(e) => setM(e.target.value)} className="border p-1 w-16" />
                    </label>
                    <label>
                        Coeficiente Linear (b):{" "}
                        <input type="number" value={b} onChange={(e) => setB(e.target.value)} className="border p-1 w-16" />
                    </label>
                    <label>
                        <input type="checkbox" checked={showSecondLine} onChange={() => setShowSecondLine(!showSecondLine)} />
                        {" "}Mostrar Segunda Reta
                    </label>
                    {showSecondLine && (
                        <>
                            <label>
                                Coeficiente Angular da Segunda Reta (a2):{" "}
                                <input type="number" value={m2} onChange={(e) => setM2(e.target.value)} className="border p-1 w-16" />
                            </label>
                            <label>
                                Coeficiente Linear da Segunda Reta (b2):{" "}
                                <input type="number" value={b2} onChange={(e) => setB2(e.target.value)} className="border p-1 w-16" />
                            </label>
                        </>
                    )}
                </div>

                <svg width={width} height={height} className="border">
                    {/* Eixos */}
                    <line x1="0" y1={centerY} x2={width} y2={centerY} stroke="black" strokeWidth="2" />
                    <line x1={centerX} y1="0" x2={centerX} y2={height} stroke="black" strokeWidth="2" />

                    {/* Traços e números no eixo X */}
                    {Array.from({ length: width / scale }, (_, i) => i - Math.floor(width / (2 * scale))).map((x) => (
                        <g key={`tick-x-${x}`}>
                            <line x1={centerX + x * scale} y1={centerY - 5} x2={centerX + x * scale} y2={centerY + 5} stroke="gray" />
                            {x !== 0 && (
                                <text x={centerX + x * scale - 5} y={centerY + 15} fontSize="12" fill="gray">{x}</text>
                            )}
                        </g>
                    ))}

                    {/* Traços e números no eixo Y */}
                    {Array.from({ length: height / scale }, (_, i) => i - Math.floor(height / (2 * scale))).map((y) => (
                        <g key={`tick-y-${y}`}>
                            <line x1={centerX - 5} y1={centerY - y * scale} x2={centerX + 5} y2={centerY - y * scale} stroke="gray" />
                            {y !== 0 && (
                                <text x={centerX + 10} y={centerY - y * scale + 5} fontSize="12" fill="gray">{y}</text>
                            )}
                        </g>
                    ))}

                    {/* Letras X e Y */}
                    <text x={width - 15} y={centerY - 12} fontSize="14" fill="black">X</text>
                    <text x={centerX - 20} y={15} fontSize="14" fill="black">Y</text>

                    {/* Reta Principal com Animação */}
                    <motion.line
                        x1={line1.x1} y1={line1.y1} x2={line1.x2} y2={line1.y2}
                        stroke="blue" strokeWidth="2"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                    />

                    {/* Segunda Reta Opcional */}
                    {showSecondLine && (
                        <motion.line
                            x1={line2.x1} y1={line2.y1} x2={line2.x2} y2={line2.y2}
                            stroke="red" strokeWidth="2" strokeDasharray="4"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                        />
                    )}

                    {/* Triângulo da Inclinação */}
                    <polygon
                        points={`${centerX},${centerY} ${centerX + scale},${centerY} ${centerX + scale},${centerY - parseValue(m) * scale}`}
                        fill="rgba(26, 255, 150, 0.4)" stroke="green" strokeWidth="1"
                    />

                    {/* Pontos Interativos */}
                    {points.map((point, index) => (
                        <circle
                            key={index}
                            cx={centerX + point.x * scale}
                            cy={centerY - point.y * scale}
                            r="5"
                            fill="red"
                            onClick={() => setSelectedPoint(point)}
                            className="cursor-pointer"
                        />
                    ))}
                </svg>

                {/* Equação Atualizada */}
                <div className="mt-4 text-center">
                    <p className="text-lg font-semibold">Equação da reta: <span className="text-blue-600">y = {m}x + {b}</span></p>
                    {showSecondLine && (
                        <p className="text-lg font-semibold">Segunda reta: <span className="text-red-600">y = {m2}x + {b2}</span></p>
                    )}
                </div>

                {/* Explicação do Ponto Selecionado */}
                {selectedPoint && (
                    <div className="mt-4 p-2 border rounded-md">
                        <p><strong>Ponto Selecionado:</strong> ({selectedPoint.x}, {selectedPoint.y})</p>
                        <p>{selectedPoint.label}</p>
                    </div>
                )}

                {/* Modo Passo a Passo */}
                <div className="mt-4 p-4 border rounded-md">
                    <h2 className="text-lg font-semibold">Modo Passo a Passo</h2>
                    <p>{step === 1 ? "1️⃣ O coeficiente angular (a) define o ângulo de inclinação da reta." :
                        step === 2 ? "2️⃣ O coeficiente linear (b) define onde a reta corta o eixo Y." :
                            "3️⃣ Para encontrar o ponto onde a reta corta o eixo X, resolvemos y = 0."}</p>
                    <button onClick={() => setStep(step < 3 ? step + 1 : 1)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                        Próximo Passo
                    </button>
                </div>
            </div>

            <div className="p-4 w-full">
                <h2 className="text-lg font-semibold mb-2">Função do Primeiro Grau</h2>
                <p>
                    Uma função do primeiro grau é expressa como <strong>f(x) = ax + b</strong>, onde:
                    <ul className="list-disc pl-4 mt-2">
                        <li><strong>a</strong> é o coeficiente angular e determina a inclinação da reta.</li>
                        <li><strong>b</strong> é o coeficiente linear e indica onde a reta intercepta o eixo Y.</li>
                    </ul>
                </p>

                <h2 className="text-lg font-semibold mt-4">Pontos Importantes da Reta</h2>
                <p>
                    A reta é composta por infinitos pontos, mas dois são essenciais:
                    <ul className="list-disc pl-4 mt-2">
                        <li><strong>Interceptação no Eixo Y (0, b):</strong> Onde a reta corta o eixo Y.</li>
                        <li><strong>Interceptação no Eixo X (-b/a, 0):</strong> Onde a reta corta o eixo X, resolvendo <strong>ax + b = 0</strong>.</li>
                    </ul>
                </p>

                <h2 className="text-lg font-semibold mt-4">Interseções da Reta</h2>
                <p>
                    As interseções ocorrem onde a reta corta os eixos:
                    <ul className="list-disc pl-4 mt-2">
                        <li><strong>Eixo Y:</strong> O valor de <strong>b</strong> já indica essa interseção.</li>
                        <li><strong>Eixo X:</strong> Resolva <strong>ax + b = 0</strong> para encontrar a interseção.</li>
                    </ul>
                    Se houver outra reta, a interseção pode ser encontrada resolvendo o sistema de equações.
                </p>

                <h2 className="text-lg font-semibold mt-4">Triângulo Retângulo e Ângulo de Inclinação</h2>
                <p>
                    A inclinação da reta pode ser representada por um triângulo retângulo:
                    <ul className="list-disc pl-4 mt-2">
                        <li>O <strong>cateto vertical</strong> representa a variação em <strong>y</strong> (<strong>Δy</strong>).</li>
                        <li>O <strong>cateto horizontal</strong> representa a variação em <strong>x</strong> (<strong>Δx</strong>).</li>
                        <li>A <strong>hipotenusa</strong> é a própria reta (visualize isso definindo o coeficiente linear = 0).</li>
                    </ul>
                    O coeficiente angular <strong>a</strong> pode ser expresso como:
                    <pre className="bg-gray-100 p-2 rounded-xl w-min px-6 my-2"><code>a = Δy / Δx</code></pre>
                    O ângulo de inclinação <strong>θ</strong> pode ser calculado por:
                    <pre className="bg-gray-100 p-2 rounded-xl w-min px-6 mt-2"><code>tan(θ) = a</code></pre>
                </p>

                <h2 className="text-lg font-semibold mt-4">Como Usar Essas Informações?</h2>
                <p>
                    <ul className="list-disc pl-4 mt-2">
                        <li><strong>Identificar</strong> os coeficientes <strong>a</strong> e <strong>b</strong>.</li>
                        <li><strong>Determinar</strong> as interseções com os eixos.</li>
                        <li><strong>Visualizar</strong> a inclinação usando o triângulo retângulo.</li>
                        <li><strong>Resolver</strong> equações para encontrar interseções entre retas.</li>
                    </ul>
                    Esses conceitos ajudam a compreender e aplicar funções do primeiro grau com eficiência!
                </p>
            </div>


        </div>
    );
};

export default RelatedGraph;
