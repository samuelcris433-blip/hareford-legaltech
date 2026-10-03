import React from 'react';
import { Bell, Download, Clock } from 'lucide-react';

const notificationsData = [
    { id: 1, fechaFijacion: '25 Oct 2023', cuaderno: 'Actuaciones Procesales', providencia: 'Auto No. 12 - Decreto de Pruebas', fechaAuto: '24 Oct 2023', url: '#', diasRestantes: 3 },
    { id: 2, fechaFijacion: '20 Oct 2023', cuaderno: 'Pruebas', providencia: 'Oficio Peritaje Contable', fechaAuto: '19 Oct 2023', url: '#', diasRestantes: 1 },
    { id: 3, fechaFijacion: '15 Oct 2023', cuaderno: 'Actuaciones Iniciales', providencia: 'Auto No. 05 - Admisión de Demanda', fechaAuto: '14 Oct 2023', url: '#', diasRestantes: 0 }
];

const NotificationBoard = () => (
    <div className="bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-primary flex items-center gap-3">
                <div className="p-2.5 bg-accent/10 rounded-xl text-accent"><Bell size={24} /></div>
                Estados Electrónicos Diarios
            </h2>
            <button className="text-sm text-primary font-bold hover:text-accent transition-colors">Ver Historial &rarr;</button>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b-2 border-slate-100 text-xs text-slate-400 font-bold uppercase tracking-widest">
                        <th className="pb-4 pr-4">Fijación</th>
                        <th className="pb-4 pr-4">Cuaderno</th>
                        <th className="pb-4 pr-4">Providencia</th>
                        <th className="pb-4 pr-4">Auto</th>
                        <th className="pb-4 pr-4 text-center">Doc</th>
                        <th className="pb-4 pl-4 text-right">Término</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {notificationsData.map((noti) => (
                        <tr key={noti.id} className="border-b border-slate-50 hover:bg-white transition-colors group">
                            <td className="py-5 pr-4 font-bold text-slate-700 whitespace-nowrap">{noti.fechaFijacion}</td>
                            <td className="py-5 pr-4">
                                <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap">{noti.cuaderno}</span>
                            </td>
                            <td className="py-5 pr-4 font-bold text-primary max-w-[200px] truncate" title={noti.providencia}>{noti.providencia}</td>
                            <td className="py-5 pr-4 text-slate-500 whitespace-nowrap font-medium">{noti.fechaAuto}</td>
                            <td className="py-5 pr-4 text-center">
                                <a href={noti.url} className="inline-flex items-center justify-center p-2.5 bg-primary/5 text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm" title="Descargar PDF firmado">
                                    <Download size={18} />
                                </a>
                            </td>
                            <td className="py-5 pl-4 text-right whitespace-nowrap">
                                {noti.diasRestantes > 0 ? (
                                    <span className="inline-flex items-center gap-2 bg-accent/10 text-accent font-bold px-3 py-1.5 rounded-xl text-xs border border-accent/20">
                                        <Clock size={14} />
                                        {noti.diasRestantes} días
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-2 bg-slate-100 text-slate-400 font-bold px-3 py-1.5 rounded-xl text-xs">
                                        Ejecutoriado
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default NotificationBoard;
