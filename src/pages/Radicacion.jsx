import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { FileText, Users, Scale, Search, CheckCircle2, ChevronRight, ChevronLeft, UploadCloud, ShieldAlert, Loader } from 'lucide-react';

const steps = [
    { id: 1, title: 'Trámite', icon: <Scale size={20} /> },
    { id: 2, title: 'Partes', icon: <Users size={20} /> },
    { id: 3, title: 'Relato Legal', icon: <FileText size={20} /> },
    { id: 4, title: 'Pruebas', icon: <Search size={20} /> },
    { id: 5, title: 'Revisión', icon: <CheckCircle2 size={20} /> }
];

const Radicacion = () => {
    const [currentStep, setCurrentStep] = useState(1);
    
    // Form State
    const [tipoTramite, setTipoTramite] = useState('conciliacion');
    const [convocante, setConvocante] = useState({ nombre: '', identificacion: '', telefono: '', email: '' });
    const [convocado, setConvocado] = useState({ nombre: '', identificacion: '', email: '' });
    const [apoderado, setApoderado] = useState({ nombre: '', tp: '', email: '' });
    const [hechos, setHechos] = useState('');
    const [pretensiones, setPretensiones] = useState('');
    const [fundamentos, setFundamentos] = useState('');
    const [cuantia, setCuantia] = useState('');
    
    // Submission State
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const handleConvocanteChange = (e) => setConvocante({ ...convocante, [e.target.name]: e.target.value });
    const handleConvocadoChange = (e) => setConvocado({ ...convocado, [e.target.name]: e.target.value });
    const handleApoderadoChange = (e) => setApoderado({ ...apoderado, [e.target.name]: e.target.value });

    const submitForm = async () => {
        setIsSubmitting(true);
        try {
            const payload = {
                tipoTramite,
                convocante,
                convocado,
                apoderado,
                hechos,
                pretensiones,
                fundamentos,
                cuantia
            };

            const response = await fetch('http://localhost:3001/api/radicar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (data.success) {
                setPreviewUrl(data.previewUrl);
            } else {
                alert('Error al radicar: ' + data.error);
            }
        } catch (error) {
            console.error(error);
            alert('Error de conexión con el servidor. Asegúrate de que el backend esté encendido.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (previewUrl) {
        return (
            <div className="flex min-h-screen bg-transparent">
                <Sidebar />
                <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto h-screen flex flex-col items-center justify-center">
                    <div className="bg-white rounded-3xl p-10 shadow-2xl max-w-2xl text-center">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-3xl font-bold text-primary mb-4 font-identity">¡Solicitud Radicada!</h2>
                        <p className="text-slate-600 mb-8">
                            El correo con la plantilla PDF ha sido generado y enviado a <strong>hereford@apolohub.com</strong> a través de nuestro servidor de pruebas.
                        </p>
                        <a 
                            href={previewUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block bg-accent text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                        >
                            Ver Correo Entregado
                        </a>
                        <button 
                            onClick={() => window.location.reload()}
                            className="block mx-auto mt-6 text-slate-400 hover:text-primary text-sm font-bold"
                        >
                            Volver al inicio
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-transparent">
            <Sidebar />
            
            <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto h-screen relative">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 text-sm text-slate-400 font-bold tracking-wider mb-4">
                            <Link to="/dashboard" className="hover:text-primary transition-colors">DASHBOARD</Link>
                            <span className="text-slate-300">/</span>
                            <span className="text-primary bg-primary/5 px-3 py-1 rounded-lg border border-primary/10">RADICACIÓN MASC</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-primary font-identity">Nueva Solicitud MASC</h1>
                        <p className="text-slate-500 mt-2 font-medium">Asistente virtual para la radicación de conciliaciones y demandas arbitrales.</p>
                    </div>

                    {/* Stepper */}
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-sm border border-slate-100 hidden md:block">
                        <div className="flex justify-between relative">
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 -translate-y-1/2 rounded-full"></div>
                            <div className="absolute top-1/2 left-0 h-1 bg-accent -z-10 -translate-y-1/2 rounded-full transition-all duration-500" style={{ width: `${((currentStep - 1) / 4) * 100}%` }}></div>
                            
                            {steps.map(step => (
                                <div key={step.id} className="flex flex-col items-center gap-2 bg-transparent">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all shadow-sm ${
                                        currentStep === step.id ? 'bg-primary text-white scale-110 shadow-lg' : 
                                        currentStep > step.id ? 'bg-accent text-white' : 'bg-white text-slate-300 border border-slate-200'
                                    }`}>
                                        {step.icon}
                                    </div>
                                    <span className={`text-xs font-bold uppercase tracking-wider ${
                                        currentStep === step.id ? 'text-primary' : 
                                        currentStep > step.id ? 'text-accent' : 'text-slate-400'
                                    }`}>{step.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white/90 backdrop-blur-xl border border-white rounded-3xl p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[500px] flex flex-col relative overflow-hidden">
                        
                        <div className="flex-1 z-10 relative">
                            {/* Step 1: Trámite */}
                            {currentStep === 1 && (
                                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                                    <h2 className="text-2xl font-bold text-primary mb-8 font-identity">1. Selección del Trámite</h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        <div 
                                            onClick={() => setTipoTramite('conciliacion')}
                                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${tipoTramite === 'conciliacion' ? 'border-accent bg-accent/5' : 'border-slate-100 hover:border-accent/30'}`}
                                        >
                                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-4">
                                                <Users size={24} />
                                            </div>
                                            <h3 className="text-lg font-bold text-primary mb-2 font-identity">Conciliación Extrajudicial</h3>
                                            <p className="text-sm text-slate-500 font-medium">Solicitud para resolver conflictos de mutuo acuerdo con efectos de cosa juzgada.</p>
                                        </div>

                                        <div 
                                            onClick={() => setTipoTramite('arbitraje')}
                                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${tipoTramite === 'arbitraje' ? 'border-accent bg-accent/5' : 'border-slate-100 hover:border-accent/30'}`}
                                        >
                                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-4">
                                                <Scale size={24} />
                                            </div>
                                            <h3 className="text-lg font-bold text-primary mb-2 font-identity">Demanda Arbitral</h3>
                                            <p className="text-sm text-slate-500 font-medium">Radicación de demanda para justicia arbitral (Ordinario, Exprés o Ejecutivo).</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Partes */}
                            {currentStep === 2 && (
                                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                                    <h2 className="text-2xl font-bold text-primary mb-8 font-identity">2. Designación de las Partes</h2>
                                    
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                        {/* Convocante / Demandante */}
                                        <div>
                                            <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
                                                <span className="bg-primary text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
                                                {tipoTramite === 'conciliacion' ? 'Convocante' : 'Demandante'}
                                            </h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nombre Completo / Razón Social</label>
                                                    <input type="text" name="nombre" value={convocante.nombre} onChange={handleConvocanteChange} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white transition-colors" placeholder="Ej. Juan Guillermo Camues Viteri" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">CC / NIT</label>
                                                        <input type="text" name="identificacion" value={convocante.identificacion} onChange={handleConvocanteChange} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white transition-colors" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Teléfono</label>
                                                        <input type="tel" name="telefono" value={convocante.telefono} onChange={handleConvocanteChange} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white transition-colors" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Correo Electrónico</label>
                                                    <input type="email" name="email" value={convocante.email} onChange={handleConvocanteChange} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white transition-colors" placeholder="notificaciones@ejemplo.com" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Convocada / Demandada */}
                                        <div>
                                            <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
                                                <span className="bg-slate-200 text-slate-600 w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
                                                {tipoTramite === 'conciliacion' ? 'Convocada' : 'Demandada'}
                                            </h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nombre Completo / Razón Social</label>
                                                    <input type="text" name="nombre" value={convocado.nombre} onChange={handleConvocadoChange} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white transition-colors" placeholder="Ej. Banco Bilbao Vizcaya Argentaria" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">CC / NIT</label>
                                                    <input type="text" name="identificacion" value={convocado.identificacion} onChange={handleConvocadoChange} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white transition-colors" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Correo Electrónico</label>
                                                    <input type="email" name="email" value={convocado.email} onChange={handleConvocadoChange} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white transition-colors" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-8 bg-primary/5 p-5 rounded-2xl border border-primary/10">
                                        <label className="flex items-center gap-3 cursor-pointer mb-4">
                                            <input type="checkbox" className="w-5 h-5 rounded text-accent focus:ring-accent accent-accent" defaultChecked />
                                            <span className="text-sm font-bold text-primary">Actúo mediante Apoderado Judicial</span>
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nombre del Abogado</label>
                                                <input type="text" name="nombre" value={apoderado.nombre} onChange={handleApoderadoChange} className="w-full bg-white border border-slate-200 text-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors" placeholder="Ej. Juan Pérez" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tarjeta Profesional</label>
                                                <input type="text" name="tp" value={apoderado.tp} onChange={handleApoderadoChange} className="w-full bg-white border border-slate-200 text-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors" placeholder="Ej. 123.456 C.S.J" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Correo Electrónico</label>
                                                <input type="email" name="email" value={apoderado.email} onChange={handleApoderadoChange} className="w-full bg-white border border-slate-200 text-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors" placeholder="Ej. abogado@firma.com" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Relato Legal */}
                            {currentStep === 3 && (
                                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                                    <h2 className="text-2xl font-bold text-primary mb-8 font-identity">3. Relato Legal</h2>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-primary mb-2">Hechos</label>
                                            <p className="text-xs text-slate-500 mb-2">Relate de forma cronológica, clara y numerada los hechos que fundamentan la solicitud.</p>
                                            <textarea value={hechos} onChange={e => setHechos(e.target.value)} rows="5" className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white transition-colors resize-none" placeholder="1. El día...&#10;2. Posteriormente..."></textarea>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-primary mb-2">Pretensiones</label>
                                            <p className="text-xs text-slate-500 mb-2">Exprese con claridad y precisión lo que solicita que se declare o condene.</p>
                                            <textarea value={pretensiones} onChange={e => setPretensiones(e.target.value)} rows="4" className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white transition-colors resize-none" placeholder="PRIMERA: Que se declare..."></textarea>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-bold text-primary mb-2">Fundamentos de Derecho</label>
                                            <textarea value={fundamentos} onChange={e => setFundamentos(e.target.value)} rows="3" className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white transition-colors resize-none" placeholder="Normas jurídicas que sustentan su petición..."></textarea>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Pruebas y Cuantía */}
                            {currentStep === 4 && (
                                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                                    <h2 className="text-2xl font-bold text-primary mb-8 font-identity">4. Cuantía y Pruebas</h2>
                                    
                                    <div className="space-y-8">
                                        <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                                            <label className="block text-lg font-bold text-primary mb-3 font-identity">Estimación Razonada de la Cuantía</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                                                <input value={cuantia} onChange={e => setCuantia(e.target.value)} type="text" className="w-full bg-white border border-slate-200 text-slate-800 font-bold text-lg rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors" placeholder="Ej. 28000000" />
                                            </div>
                                            <p className="text-xs text-slate-500 mt-2 font-medium">De esta cuantía dependerá la tarifa institucional aplicable al trámite según el reglamento.</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-primary mb-3">Anexos y Pruebas Documentales</label>
                                            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-accent/50 transition-all cursor-pointer">
                                                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-primary mb-4">
                                                    <UploadCloud size={28} />
                                                </div>
                                                <p className="font-bold text-slate-700 mb-1">Arrastre aquí los documentos o haga clic para buscar</p>
                                                <p className="text-xs text-slate-500 font-medium text-center max-w-md">
                                                    (Simulación de carga de archivos para la prueba)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 5: Revisión */}
                            {currentStep === 5 && (
                                <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col items-center justify-center text-center py-10">
                                    <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-6">
                                        <ShieldAlert size={48} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-primary mb-4 font-identity">Confirmación y Juramento</h2>
                                    <p className="text-slate-600 max-w-xl text-sm leading-relaxed mb-8">
                                        Bajo la gravedad del juramento, manifiesta que no se ha presentado ninguna otra solicitud ni demanda ante autoridad administrativa o jurisdiccional alguna, que verse sobre los mismos hechos, partes y pretensiones aquí expuestos.
                                    </p>
                                    
                                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 w-full max-w-2xl text-left mb-8">
                                        <h4 className="font-bold text-sm text-primary uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Resumen de Radicación</h4>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="block text-xs text-slate-400 font-bold uppercase">Trámite</span>
                                                <span className="font-medium text-slate-800 capitalize">{tipoTramite.replace('_', ' ')}</span>
                                            </div>
                                            <div>
                                                <span className="block text-xs text-slate-400 font-bold uppercase">Convocante</span>
                                                <span className="font-medium text-slate-800">{convocante.nombre || 'No provisto'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Controls */}
                        <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-center relative z-10">
                            <button 
                                onClick={prevStep}
                                disabled={currentStep === 1 || isSubmitting}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:bg-slate-100 hover:text-primary'}`}
                            >
                                <ChevronLeft size={18} /> Anterior
                            </button>
                            
                            {currentStep < 5 ? (
                                <button 
                                    onClick={nextStep}
                                    className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                                >
                                    Siguiente <ChevronRight size={18} />
                                </button>
                            ) : (
                                <button 
                                    onClick={submitForm}
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 bg-accent text-white px-10 py-3 rounded-xl text-sm font-bold shadow-[0_8px_20px_rgba(110,155,48,0.3)] hover:bg-accent/90 hover:shadow-[0_8px_25px_rgba(110,155,48,0.4)] transition-all hover:-translate-y-0.5 disabled:bg-slate-400"
                                >
                                    {isSubmitting ? <><Loader size={18} className="animate-spin" /> Procesando...</> : <><CheckCircle2 size={18} /> Enviar Solicitud de Prueba</>}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Radicacion;
