"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const QuadraticGraph = () => {
    const [a, setA] = useState("1");
    const [b, setB] = useState("0");
    const [c, setC] = useState("-4");
    const [selectedPoint, setSelectedPoint] = useState<{ x: number; y: number; label: string } | null>(null);
    const [step, setStep] = useState(1);


    const width = 300;
    const height = 300;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 25;

    const parseValue = (value: string) => parseFloat(value) || 0;

    const computeQuadraticPoints = (aVal: number, bVal: number, cVal: number) => {
        let points = [];
        for (let x = -centerX / scale; x <= centerX / scale; x += 0.1) {
            const y = aVal * x ** 2 + bVal * x + cVal;
            points.push({ x: centerX + x * scale, y: centerY - y * scale });
        }
        return points;
    };

    const aNum = parseValue(a);
    const bNum = parseValue(b);
    const cNum = parseValue(c);
    const delta = bNum ** 2 - 4 * aNum * cNum;
    const vertexX = -bNum / (2 * aNum);
    const vertexY = aNum * vertexX ** 2 + bNum * vertexX + cNum;
    const roots =
        delta >= 0
            ? [
                { x: (-bNum + Math.sqrt(delta)) / (2 * aNum), label: "Raiz 1" },
                { x: (-bNum - Math.sqrt(delta)) / (2 * aNum), label: "Raiz 2" },
            ].filter(root => isFinite(root.x))
            : [];

    const parabolaPoints = computeQuadraticPoints(aNum, bNum, cNum);

    return (
        <div className="p-4 mt-4 flex flex-col md:flex-row md:items-start items-center gap-4">
            {/* Container Esquerdo */}
            <div className="p-4 w-min border rounded-xl">
                <h2 className="text-lg font-semibold mb-2">Explorando Funções do Segundo Grau</h2>
                <p>Ajuste os coeficientes abaixo para modificar a parábola e entender sua estrutura.</p>

                {/* Inputs */}
                <div className="flex flex-col gap-2 mb-4">
                    <label>
                        Coeficiente Quadrático (a):{" "}
                        <input type="number" value={a} onChange={(e) => setA(e.target.value)} className="border p-1 w-16" />
                    </label>
                    <label>
                        Coeficiente Linear (b):{" "}
                        <input type="number" value={b} onChange={(e) => setB(e.target.value)} className="border p-1 w-16" />
                    </label>
                    <label>
                        Termo Independente (c):{" "}
                        <input type="number" value={c} onChange={(e) => setC(e.target.value)} className="border p-1 w-16" />
                    </label>
                </div>

                {/* Gráfico */}
                <svg width={width} height={height} className="border">
                    {/* Eixos */}
                    <line x1="0" y1={centerY} x2={width} y2={centerY} stroke="black" strokeWidth="2" />
                    <line x1={centerX} y1="0" x2={centerX} y2={height} stroke="black" strokeWidth="2" />

                    {/* Parabola */}
                    <motion.polyline
                        fill="none"
                        stroke="blue"
                        strokeWidth="2"
                        points={parabolaPoints.map(p => `${p.x},${p.y}`).join(" ")}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                    />

                    <line x1={centerX + vertexX * scale} y1="0" x2={centerX + vertexX * scale} y2={height} stroke="green" strokeDasharray="5,5" />

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


                    {/* Vértice */}
                    <circle
                        cx={centerX + vertexX * scale}
                        cy={centerY - vertexY * scale}
                        r="5"
                        fill="green"
                        onClick={() => setSelectedPoint({ x: vertexX, y: vertexY, label: "Vértice" })}
                        className="cursor-pointer"
                    />

                    {/* Raízes */}
                    {roots.map((root, index) => (
                        <circle
                            key={index}
                            cx={centerX + root.x * scale}
                            cy={centerY}
                            r="5"
                            fill="red"
                            onClick={() => setSelectedPoint({ x: root.x, y: 0, label: root.label })}
                            className="cursor-pointer"
                        />
                    ))}
                </svg>

                {/* Equação Atualizada */}
                <div className="mt-4 text-center">
                    <p className="text-lg font-semibold">
                        Equação: <span className="text-blue-600">y = {a}x² + {b}x + {c}</span>
                    </p>
                </div>

                {/* Explicação do Ponto Selecionado */}
                {selectedPoint && (
                    <div className="mt-4 p-2 border rounded-md">
                        <p><strong>Ponto Selecionado:</strong> ({selectedPoint.x.toFixed(1)}, {selectedPoint.y.toFixed(1)})</p>
                        <p>{selectedPoint.label}</p>
                    </div>
                )}

                {/* Modo Passo a Passo */}
                <div className="mt-4 p-4 border rounded-md">
                    <h2 className="text-lg font-semibold">Modo Passo a Passo</h2>

                    {step === 1 && (
                        <p>1️⃣ Calculamos o discriminante da equação quadrática usando a fórmula:
                            <pre className="bg-gray-100 p-2 rounded-xl w-min px-6 my-2"><code>Δ = b² - 4ac</code></pre>
                            Com os valores atuais:
                            <strong>Δ = {bNum}² - 4 × {aNum} × {cNum} = {delta}</strong>
                        </p>
                    )}

                    {step === 2 && (
                        <p>2️⃣ Agora analisamos o valor de Δ:
                            {delta > 0 && "Como Δ > 0, há duas raízes reais distintas."}
                            {delta === 0 && "Como Δ = 0, há apenas uma raiz real."}
                            {delta < 0 && "Como Δ < 0, não existem raízes reais."}
                        </p>
                    )}

                    {step === 3 && delta >= 0 && (
                        <p>3️⃣ Aplicamos a fórmula de Bhaskara para encontrar as raízes:
                            <pre className="bg-gray-100 p-2 rounded-xl w-min px-6 my-2"><code>x = (-b ± √Δ) / 2a</code></pre>
                            Substituindo os valores:
                            <br />
                            <strong>x₁ = (-{bNum} + √{delta}) / (2 × {aNum}) = {roots[0]?.x.toFixed(2)}</strong>
                            <br />
                            <strong>x₂ = (-{bNum} - √{delta}) / (2 × {aNum}) = {roots[1]?.x.toFixed(2)}</strong>
                        </p>
                    )}

                    {step === 3 && delta < 0 && (
                        <p>3️⃣ Como Δ {'<'} 0, a equação não tem raízes reais.</p>
                    )}

                    <button onClick={() => setStep(step < 3 ? step + 1 : 1)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                        Próximo Passo
                    </button>
                </div>
            </div>

            {/* Container Direito */}
            <div className="p-4 w-full">
                <h2 className="text-lg font-semibold mb-2">Função do Segundo Grau</h2>
                <p>
                    A função do segundo grau tem a forma <strong>f(x) = ax² + bx + c</strong>. Os coeficientes determinam:
                    <ul className="list-disc pl-4 mt-2">
                        <li><strong>a</strong>: Direção da concavidade (para cima se a `{'>'}` 0, para baixo se a {'<'} 0).</li>
                        <li><strong>b</strong>: Influencia a inclinação e a posição da parábola.</li>
                        <li><strong>c</strong>: Ponto onde a parábola cruza o eixo Y.</li>
                    </ul>
                </p>

                <h2 className="text-lg font-semibold mt-4">Vértice</h2>
                <p>
                    O vértice é o ponto máximo ou mínimo da parábola e ocorre em:
                    <pre className="bg-gray-100 p-2 rounded-xl w-min px-6 my-2"><code>x = -b / (2a)</code></pre>
                    Substituindo na equação, encontramos o <strong>y</strong> do vértice.
                </p>

                <h2 className="text-lg font-semibold mt-4">Raízes da Equação</h2>
                <p>
                    As raízes são encontradas resolvendo <strong>ax² + bx + c = 0</strong> usando a fórmula de Bhaskara:
                    <pre className="bg-gray-100 p-2 rounded-xl w-min px-6 mt-2"><code>x = (-b ± √Δ) / 2a</code></pre>
                    onde <strong>Δ = b² - 4ac</strong>. Se Δ &gt; 0, há duas raízes reais; se Δ = 0, há uma raiz; se Δ &lt; 0, não há raízes reais.
                </p>

                <h2 className="text-lg font-semibold mt-4">Conclusão</h2>
                <p>
                    Usando essas informações, podemos analisar o comportamento de qualquer função quadrática e prever suas interseções e extremos!
                </p>
            </div>
        </div>
    );
};

export default QuadraticGraph;
