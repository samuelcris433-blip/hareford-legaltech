import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProcessHeader from '../components/ProcessHeader';
import ProcessTabs, { tabsConfig } from '../components/ProcessTabs';
import NotificationBoard from '../components/NotificationBoard';
import AudienceRepository from '../components/AudienceRepository';
import { Plus } from 'lucide-react';

const processInfo = {
    radicado: '2023-ARB-0145',
    tipo: 'Arbitraje Ordinario',
    operador: 'Dr. Fernando Londoño',
    partes: 'Inversiones Omega S.A.S. vs Constructora Andina S.A.',
    cuantia: '$1,500,000,000 COP',
    estado: 'Etapa Probatoria'
};

const ProcessDetail = () => {
    const [activeTab, setActiveTab] = useState('procesales');

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            
            <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto h-screen relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400 font-bold tracking-wider mb-6">
                        <a href="#" className="hover:text-primary transition-colors">MODULOS MASC</a>
                        <span className="text-slate-300">/</span>
                        <a href="#" className="hover:text-primary transition-colors">ARBITRAJE ORDINARIO</a>
                        <span className="text-slate-300">/</span>
                        <span className="text-primary bg-primary/5 px-3 py-1 rounded-lg border border-primary/10">EXPEDIENTE DIGITAL</span>
                    </div>

                    <ProcessHeader info={processInfo} />
                    
                    <ProcessTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    
                    <div className="bg-white/40 backdrop-blur-md rounded-3xl p-12 mb-8 min-h-[250px] flex flex-col items-center justify-center text-center border-dashed border-2 border-slate-300/50 shadow-inner relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>
                        
                        <div className="w-20 h-20 bg-white shadow-sm text-slate-300 rounded-2xl flex items-center justify-center mb-6 relative z-10 border border-slate-100">
                            {tabsConfig.find(t => t.id === activeTab)?.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-primary mb-3 font-identity relative z-10">Cuaderno: {tabsConfig.find(t => t.id === activeTab)?.label}</h3>
                        <p className="text-slate-500 max-w-lg text-sm leading-relaxed font-medium relative z-10">
                            {activeTab === 'cautelares' ? 
                                'Acceso restringido. Las actuaciones de este cuaderno son reservadas hasta que la medida cautelar sea practicada debidamente.' : 
                                'Visualiza y gestiona las actuaciones procesales. Haz clic en el botón inferior para radicar un nuevo documento o actuación en este cuaderno.'}
                        </p>
                        {activeTab !== 'cautelares' && (
                            <button 
                                onClick={() => alert("Función de Radicación: Se abrirá la ventana modal para subir el memorial o actuación.")}
                                className="relative z-10 mt-8 px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl shadow-[0_8px_20px_rgba(41,84,87,0.3)] hover:bg-primary/90 hover:shadow-[0_8px_25px_rgba(41,84,87,0.4)] transition-all flex items-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                            >
                                <Plus size={18} /> Nueva Actuación
                            </button>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        <div className="xl:col-span-2">
                            <NotificationBoard />
                        </div>
                        <div className="xl:col-span-1">
                            <AudienceRepository />
                        </div>
                    </div>
                    
                    <footer className="mt-16 text-center text-xs font-bold text-slate-400 py-8 border-t border-slate-200/50">
                        &copy; 2026 Centro de Arbitraje y Conciliación Hereford. <br className="md:hidden"/> Plataforma Legaltech asegurada mediante cifrado E2EE.
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default ProcessDetail;
