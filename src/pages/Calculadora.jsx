import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, AlertCircle, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const SMMLV_2026 = 1750905;
const SMLDV_2026 = 58363.50;

const getTarifaSMLDV = (smmlv) => {
    if (smmlv <= 7) return 6.00;
    if (smmlv <= 10) return 6.00;
    if (smmlv <= 15) return 8.00;
    if (smmlv <= 25) return 14.00;
    if (smmlv <= 50) return 28.00;
    if (smmlv <= 100) return 58.00;
    if (smmlv <= 176) return 105.00;
    if (smmlv <= 200) return 112.00;
    if (smmlv <= 300) return 148.00;
    if (smmlv <= 400) return 210.00;
    if (smmlv <= 529) return 270.00;
    if (smmlv <= 600) return 275.00;
    if (smmlv <= 764) return 285.00;
    if (smmlv <= 800) return 315.00;
    if (smmlv <= 1000) return 350.00;
    return 391.50;
};

const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
};

const Calculadora = () => {
    const [tipoCuantia, setTipoCuantia] = useState('determinada');
    const [valorCop, setValorCop] = useState('');
    const [resultado, setResultado] = useState(null);

    const handleValorChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setValorCop(value);
    };

    const calcularTarifa = () => {
        if (tipoCuantia === 'indeterminada') {
            setResultado({
                rango: 'Cuantía Indeterminada',
                baseSMLDV: 6.00,
                total: Math.round(6.00 * SMLDV_2026)
            });
            return;
        }

        const valorNum = parseFloat(valorCop);
        if (!valorNum || valorNum <= 0) return;

        const equivalenciaSmmlv = valorNum / SMMLV_2026;
        const tarifaSmldv = getTarifaSMLDV(equivalenciaSmmlv);
        
        let rangoTexto = '';
        if (equivalenciaSmmlv <= 7) rangoTexto = 'Mayor a 0 y hasta 7 SMMLV';
        else if (equivalenciaSmmlv <= 10) rangoTexto = 'Mayor a 7 y hasta 10 SMMLV';
        else if (equivalenciaSmmlv <= 15) rangoTexto = 'Mayor a 10 y hasta 15 SMMLV';
        else if (equivalenciaSmmlv <= 25) rangoTexto = 'Mayor a 15 y hasta 25 SMMLV';
        else if (equivalenciaSmmlv <= 50) rangoTexto = 'Mayor a 25 y hasta 50 SMMLV';
        else if (equivalenciaSmmlv <= 100) rangoTexto = 'Mayor a 50 y hasta 100 SMMLV';
        else if (equivalenciaSmmlv <= 176) rangoTexto = 'Mayor a 100 y hasta 176 SMMLV';
        else if (equivalenciaSmmlv <= 200) rangoTexto = 'Mayor a 176 y hasta 200 SMMLV';
        else if (equivalenciaSmmlv <= 300) rangoTexto = 'Mayor a 200 y hasta 300 SMMLV';
        else if (equivalenciaSmmlv <= 400) rangoTexto = 'Mayor a 300 y hasta 400 SMMLV';
        else if (equivalenciaSmmlv <= 529) rangoTexto = 'Mayor a 400 y hasta 529 SMMLV';
        else if (equivalenciaSmmlv <= 600) rangoTexto = 'Mayor a 529 y hasta 600 SMMLV';
        else if (equivalenciaSmmlv <= 764) rangoTexto = 'Mayor a 600 y hasta 764 SMMLV';
        else if (equivalenciaSmmlv <= 800) rangoTexto = 'Mayor a 764 y hasta 800 SMMLV';
        else if (equivalenciaSmmlv <= 1000) rangoTexto = 'Mayor a 800 y hasta 1000 SMMLV';
        else rangoTexto = 'Mayor a 1000 SMMLV en adelante';

        setResultado({
            rango: rangoTexto,
            baseSMLDV: tarifaSmldv,
            total: Math.round(tarifaSmldv * SMLDV_2026)
        });
    };

    useEffect(() => {
        if (tipoCuantia === 'indeterminada') {
            calcularTarifa();
            setValorCop('');
        } else {
            setResultado(null);
        }
    }, [tipoCuantia]);

    return (
        <div className="min-h-screen bg-[#FEEEE2] font-sans text-primary">
            {/* Top Navigation */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-primary/10 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-primary hover:text-accent font-bold transition-colors">
                        <ArrowLeft size={20} /> Volver al Inicio
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-md bg-primary text-white flex items-center justify-center font-bold text-sm font-identity">H</div>
                        <span className="font-bold text-sm uppercase tracking-wider font-identity">Hereford</span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-6">
                        <Calculator size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-identity mb-4">Calculadora de Tarifas</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
                        Liquida el costo de tu trámite de conciliación de forma automática y transparente según el reglamento de Hereford (Vigencia 2026).
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Panel de Entradas */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-7 bg-white rounded-3xl p-8 shadow-[0_20px_40px_rgba(41,84,87,0.05)] border border-white"
                    >
                        <h2 className="text-xl font-bold font-identity mb-6 border-b border-slate-100 pb-4">Parámetros del Trámite</h2>
                        
                        <div className="space-y-8">
                            {/* Selector de Tipo */}
                            <div>
                                <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Tipo de Cuantía</label>
                                <div className="flex bg-slate-100 p-1 rounded-xl">
                                    <button 
                                        onClick={() => setTipoCuantia('determinada')}
                                        className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all ${tipoCuantia === 'determinada' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-primary'}`}
                                    >
                                        Cuantía Determinada
                                    </button>
                                    <button 
                                        onClick={() => setTipoCuantia('indeterminada')}
                                        className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all ${tipoCuantia === 'indeterminada' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-primary'}`}
                                    >
                                        Indeterminada
                                    </button>
                                </div>
                            </div>

                            {/* Campo de Valor */}
                            <AnimatePresence>
                                {tipoCuantia === 'determinada' && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Valor de las Pretensiones (COP)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">$</span>
                                            <input 
                                                type="text" 
                                                value={valorCop ? new Intl.NumberFormat('es-CO').format(valorCop) : ''}
                                                onChange={handleValorChange}
                                                className="w-full bg-slate-50 border border-slate-200 text-primary font-bold text-2xl rounded-xl pl-10 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white transition-all"
                                                placeholder="Ej. 15.000.000"
                                            />
                                        </div>
                                        
                                        {/* Conversor Dinámico */}
                                        {valorCop && (
                                            <div className="mt-3 flex items-center gap-2 text-sm text-slate-500 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
                                                <AlertCircle size={16} className="text-accent" />
                                                <span>Equivale a <strong className="text-primary font-bold">{(parseFloat(valorCop) / SMMLV_2026).toFixed(2)}</strong> SMMLV</span>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {tipoCuantia === 'determinada' && (
                                <button 
                                    onClick={calcularTarifa}
                                    disabled={!valorCop}
                                    className="w-full bg-accent hover:bg-accent/90 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold tracking-wide uppercase transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                >
                                    Calcular Tarifa <ChevronRight size={18} />
                                </button>
                            )}
                        </div>
                    </motion.div>

                    {/* Panel de Resultados */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-5"
                    >
                        <div className="bg-primary text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden h-full flex flex-col">
                            {/* Textura sutil */}
                            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                            
                            <h2 className="text-xl font-bold font-identity mb-6 border-b border-white/10 pb-4 relative z-10">Resultado de Liquidación</h2>
                            
                            {resultado ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative z-10 flex-1 flex flex-col"
                                >
                                    <div className="mb-6 space-y-4">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                            <span className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Rango Detectado</span>
                                            <span className="font-medium text-white">{resultado.rango}</span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                            <span className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Liquidación Base</span>
                                            <span className="font-medium text-white">{resultado.baseSMLDV.toFixed(2)} SMLDV</span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-auto pt-6 border-t border-white/10">
                                        <span className="block text-sm font-bold text-accent uppercase tracking-wider mb-2">Valor Total del Trámite</span>
                                        <div className="text-4xl md:text-5xl font-bold font-identity tracking-tight mb-2">
                                            {formatCurrency(resultado.total)}
                                        </div>
                                        <span className="text-sm text-white/50 font-medium">Pesos Colombianos (COP)</span>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-white/40 text-center relative z-10 py-12">
                                    <Calculator size={48} className="mb-4 opacity-50" />
                                    <p className="font-medium">Ingresa el valor de las pretensiones para conocer la tarifa aplicable.</p>
                                </div>
                            )}
                            
                            <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                                <p className="text-[10px] text-white/40 leading-relaxed">
                                    * Esta liquidación corresponde exclusivamente a los gastos de administración y honorarios del Centro de Conciliación Hereford, de conformidad con el reglamento interno vigente. Los valores se basan en el SMMLV 2026 ({formatCurrency(SMMLV_2026)}).
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Calculadora;
