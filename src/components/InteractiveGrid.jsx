import React, { useState, useEffect, useRef } from 'react';

const InteractiveGrid = () => {
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('mouseleave', () => setMousePos({ x: -1000, y: -1000 }));
        }
        
        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('mouseleave', () => setMousePos({ x: -1000, y: -1000 }));
            }
        };
    }, []);

    // Generar una cuadrícula de 20x10 puntos
    const rows = 15;
    const cols = 30;
    const dots = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            dots.push({ id: `${i}-${j}`, row: i, col: j });
        }
    }

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-slate-50 flex items-center justify-center">
            <div 
                className="grid gap-8 p-8"
                style={{
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                    width: '120%',
                    height: '120%'
                }}
            >
                {dots.map((dot) => {
                    // Calculamos la distancia del mouse a cada punto.
                    // Como no podemos hacerlo exactamente con refs por rendimiento de 400 puntos,
                    // lo simulamos por porcentaje en la pantalla, pero es mejor usar el spotlight nativo
                    // con un mix-blend-mode para iluminar los puntos estáticos.
                    return null;
                })}
            </div>
            
            {/* Mejor aproximación: Patrón CSS fijo + Spotlight que interactúa revelando el color de los puntos */}
            <div 
                className="absolute inset-0"
                style={{
                    backgroundImage: 'radial-gradient(#cbd5e1 2px, transparent 2px)',
                    backgroundSize: '40px 40px',
                    opacity: 0.5
                }}
            ></div>
            
            {/* Spotlight que revela un patrón de puntos verdes brillantes */}
            <div 
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                    backgroundImage: 'radial-gradient(#6E9B30 2px, transparent 2px)',
                    backgroundSize: '40px 40px',
                    WebkitMaskImage: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
                    maskImage: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
                    opacity: 1
                }}
            ></div>
            
            {/* Gradiente flotante animado para darle un toque creativo adicional */}
            <div 
                className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] mix-blend-multiply animate-[pulse_8s_ease-in-out_infinite]"
                style={{ transform: `translate(${mousePos.x * -0.05}px, ${mousePos.y * -0.05}px)` }}
            ></div>
            <div 
                className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] mix-blend-multiply animate-[pulse_10s_ease-in-out_infinite]"
                style={{ transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)` }}
            ></div>
        </div>
    );
};

export default InteractiveGrid;
