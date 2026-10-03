import React from 'react';
import { FileText, Scale, Search, ShieldAlert, Gavel } from 'lucide-react';

export const tabsConfig = [
    { id: 'iniciales', label: 'Actuaciones Iniciales', icon: <FileText size={20} /> },
    { id: 'procesales', label: 'Actuaciones Procesales', icon: <Scale size={20} /> },
    { id: 'pruebas', label: 'Pruebas', icon: <Search size={20} /> },
    { id: 'cautelares', label: 'Medidas Cautelares', icon: <ShieldAlert size={20} /> },
    { id: 'laudo', label: 'Terminación y Laudo', icon: <Gavel size={20} /> }
];

const ProcessTabs = ({ activeTab, setActiveTab }) => (
    <div className="flex overflow-x-auto gap-3 mb-8 hide-scrollbar p-1">
        {tabsConfig.map(tab => {
            const isActive = activeTab === tab.id;
            return (
                <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-6 py-4 text-sm transition-all whitespace-nowrap rounded-2xl border-2 ${
                        isActive 
                        ? 'bg-white border-accent text-primary font-bold shadow-[0_8px_20px_rgba(110,155,48,0.15)] -translate-y-1' 
                        : 'bg-white/60 border-transparent text-slate-500 font-bold hover:bg-white hover:shadow-md'
                    }`}
                >
                    <span className={`${isActive ? 'text-accent' : 'text-slate-400'}`}>
                        {tab.icon}
                    </span>
                    {tab.label}
                </button>
            )
        })}
    </div>
);

export default ProcessTabs;
