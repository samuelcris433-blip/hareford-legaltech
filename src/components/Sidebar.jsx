import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Scale, Gavel, FileSignature, ShieldAlert, HeartHandshake, PenTool } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();
    
    return (
        <aside className="w-72 bg-primary text-white hidden xl:flex flex-col h-screen sticky top-0 shadow-2xl z-20">
            <Link to="/" className="p-8 flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/10">
                <div className="w-12 h-12 min-w-[3rem] bg-accent rounded-xl flex items-center justify-center font-bold text-2xl font-identity text-white shadow-lg shadow-accent/30">H</div>
                <div>
                    <h2 className="font-bold text-[15px] tracking-wide font-identity leading-tight">HEREFORD</h2>
                    <span className="text-[9px] text-accent font-bold uppercase tracking-wider block mt-1 leading-tight">Centro de Arbitraje y Conciliación</span>
                </div>
            </Link>
            
            <div className="flex-1 px-4 py-2 overflow-y-auto custom-scrollbar flex flex-col gap-8 mt-4">
                
                <div>
                    <p className="px-4 text-xs font-bold text-white/40 uppercase tracking-wider mb-3">Principal</p>
                    <nav className="flex flex-col gap-2">
                        <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${location.pathname === '/dashboard' ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/10'}`}>
                            <LayoutDashboard size={20} /> Dashboard General
                        </Link>
                        <Link to="/radicar" className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all shadow-sm ${location.pathname === '/radicar' ? 'bg-accent/20 text-accent border border-accent/30 shadow-[0_0_15px_rgba(110,155,48,0.15)]' : 'bg-white text-primary hover:bg-white/90'}`}>
                            <PenTool size={20} /> Radicar Solicitud
                        </Link>
                    </nav>
                </div>

                <div>
                    <p className="px-4 text-xs font-bold text-white/40 uppercase tracking-wider mb-3">Módulos MASC</p>
                    <nav className="flex flex-col gap-2">
                        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-sm font-semibold text-white/80 transition-all">
                            <Scale size={20} /> Arbitraje Ordinario
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-sm font-semibold text-white/80 transition-all">
                            <FileSignature size={20} /> Conciliación Extrajudicial
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-sm font-semibold text-white/80 transition-all">
                            <Gavel size={20} /> Arbitraje Sumario
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-sm font-semibold text-white/80 transition-all">
                            <ShieldAlert size={20} /> Arbitraje Ejecutivo
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-sm font-semibold text-white/80 transition-all">
                            <HeartHandshake size={20} /> Arbitraje Social
                        </a>
                    </nav>
                </div>
            </div>
            
            <div className="p-6 border-t border-white/10 bg-black/10 mt-auto">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center text-sm font-bold text-white shadow-lg border border-white/20">DR</div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-bold text-white truncate">Director Centro</p>
                        <p className="text-xs text-white/60 truncate">director@hereford.co</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
