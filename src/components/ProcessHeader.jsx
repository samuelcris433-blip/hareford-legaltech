import React from 'react';
import { Briefcase, Hash, Building2 } from 'lucide-react';

const ProcessHeader = ({ info }) => (
    <div className="bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-8 lg:p-10 mb-8 mt-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
            <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">{info.tipo}</span>
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 bg-slate-100 px-4 py-1.5 rounded-full">
                        <Hash size={14} /> Radicado: <strong className="text-primary">{info.radicado}</strong>
                    </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-5 leading-tight font-identity tracking-tight">{info.partes}</h1>
                
                <div className="flex flex-wrap items-center gap-8 text-sm text-slate-600 bg-white/50 p-4 rounded-2xl border border-slate-100/50 w-fit">
                    <span className="flex items-center gap-2 font-medium"><Briefcase size={18} className="text-accent"/> Operador Asignado: <strong className="text-slate-800">{info.operador}</strong></span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block"></span>
                    <span className="flex items-center gap-2 font-medium"><Building2 size={18} className="text-accent"/> Cuantía: <strong className="text-slate-800">{info.cuantia}</strong></span>
                </div>
            </div>
            
            <div className="flex flex-col xl:items-end w-full xl:w-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-100 z-10">
                <span className="text-xs text-slate-400 uppercase tracking-widest mb-3 font-bold">Estado Procesal Actual</span>
                <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                    </span>
                    <span className="text-primary font-bold text-xl">{info.estado}</span>
                </div>
                <div className="w-full xl:w-56 h-2 bg-slate-100 rounded-full mt-5 overflow-hidden">
                    <div className="h-full bg-accent w-3/5 rounded-full"></div>
                </div>
                <span className="text-xs text-slate-400 font-bold mt-2 self-start xl:self-end">60% Términos Consumidos</span>
            </div>
        </div>
    </div>
);

export default ProcessHeader;
