import React from 'react';
import { Video, Calendar, Clock, Download, PlayCircle } from 'lucide-react';

const audiencesData = [
    { id: 1, titulo: 'Audiencia de Instalación del Tribunal', fecha: '10 Sep 2023', duracion: '1h 45m', tipo: 'Híbrida' },
    { id: 2, titulo: 'Audiencia de Conciliación', fecha: '01 Oct 2023', duracion: '2h 10m', tipo: 'Virtual' }
];

const AudienceRepository = () => (
    <div className="bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col">
        <h2 className="text-xl font-bold text-primary flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary"><Video size={24} /></div>
            Repositorio de Audiencias
        </h2>
        <div className="flex flex-col gap-4 flex-1">
            {audiencesData.map(aud => (
                <div key={aud.id} className="border border-slate-100 rounded-2xl p-5 bg-white hover:border-primary/30 hover:shadow-lg transition-all flex gap-5 items-center group cursor-pointer">
                    <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center text-primary/40 relative overflow-hidden group-hover:text-primary transition-colors">
                        <Video size={28} />
                        <div className="absolute inset-0 bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100">
                            <PlayCircle size={32} className="text-white" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-primary mb-2 line-clamp-1 group-hover:text-accent transition-colors">{aud.titulo}</h3>
                        <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-500">
                            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-slate-400"/> {aud.fecha}</span>
                            <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400"/> {aud.duracion}</span>
                            <span className="bg-primary/5 text-primary px-2.5 py-1 rounded-md">{aud.tipo}</span>
                        </div>
                    </div>
                    <button className="text-slate-300 hover:text-accent transition-colors p-3 bg-slate-50 rounded-xl group-hover:bg-accent/10">
                        <Download size={20} />
                    </button>
                </div>
            ))}
        </div>
    </div>
);

export default AudienceRepository;
