import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronRight, Scale, Users, BookOpen, Globe, ShieldCheck, HeartHandshake, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';

// Animación estándar para fade in up al hacer scroll
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Home = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const titleVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 1.2, 
                ease: [0.2, 0.65, 0.3, 0.9],
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.2, 0.65, 0.3, 0.9] } }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-accent selection:text-white">
            
            {/* Top Bar for Contact Info */}
            <div className={`hidden md:flex justify-between items-center px-12 py-2 bg-primary text-white/80 text-xs font-medium border-b border-white/10 transition-all ${scrolled ? 'hidden' : 'flex'}`}>
                <div className="flex gap-6">
                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-accent"/> Cra 12 17-41, Túquerres, Nariño</span>
                    <span className="flex items-center gap-1.5"><Phone size={14} className="text-accent"/> +57 315 3041945</span>
                </div>
                <span className="flex items-center gap-1.5"><Mail size={14} className="text-accent"/> hereford@apolohub.com</span>
            </div>

            {/* Navbar */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 backdrop-blur-md shadow-lg py-4 top-0' : 'bg-primary/90 md:bg-transparent py-5 top-0 md:top-[33px]'}`}>
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-2xl font-identity transition-colors ${scrolled ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-white text-primary shadow-lg'}`}>H</div>
                        <div className={`transition-colors text-white`}>
                            <h2 className="font-bold text-[15px] tracking-wide font-identity uppercase leading-tight">Hereford</h2>
                            <span className="text-[10px] font-bold uppercase tracking-wider block opacity-90 text-accent leading-tight">Centro de Arbitraje y Conciliación</span>
                        </div>
                    </div>
                    
                    <div className="hidden lg:flex items-center gap-10 text-sm font-bold tracking-wide text-white">
                        <a href="#inicio" onClick={(e) => scrollToSection(e, 'inicio')} className="hover:text-accent transition-colors">INICIO</a>
                        <a href="#nosotros" onClick={(e) => scrollToSection(e, 'nosotros')} className="hover:text-accent transition-colors">NOSOTROS</a>
                        <a href="#servicios" onClick={(e) => scrollToSection(e, 'servicios')} className="hover:text-accent transition-colors">SERVICIOS MASC</a>
                        <a href="#equipo" onClick={(e) => scrollToSection(e, 'equipo')} className="hover:text-accent transition-colors">NUESTRO EQUIPO</a>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/calculadora" className="bg-transparent text-white border border-white/20 hover:bg-white/10 px-6 py-2.5 rounded-full text-sm font-bold transition-all backdrop-blur-sm">
                            Calculadora
                        </Link>
                        <Link to="/radicar" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-2.5 rounded-full text-sm font-bold transition-all backdrop-blur-sm">
                            Radicar Solicitud
                        </Link>
                        <Link to="/dashboard" className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                            Acceso al Sistema <ChevronRight size={16} />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Cinematic Hero Section */}
            <header id="inicio" className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-[#0A1617]">
                {/* Cinematic Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <motion.img 
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2500&auto=format&fit=crop" 
                        alt="Corporate Architecture" 
                        className="w-full h-full object-cover object-center opacity-60 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1617] via-[#0a1617]/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a1617] via-primary/40 to-transparent mix-blend-multiply"></div>
                </div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full mt-20">
                    <div className="max-w-4xl">
                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={titleVariants}
                        >
                            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
                                <span className="w-16 h-[2px] bg-accent"></span>
                                <span className="text-accent font-bold tracking-[0.3em] uppercase text-sm md:text-base">Autoridad y Excelencia Legal</span>
                            </motion.div>
                            
                            <motion.h1 
                                variants={itemVariants}
                                className="text-5xl md:text-[5.5rem] font-bold text-white leading-[1.05] font-identity tracking-tight mb-8"
                            >
                                Hereford <br/>
                                <span className="text-3xl md:text-[3.5rem] text-white/80 font-normal mt-2 block">Centro de Arbitraje y Conciliación</span>
                            </motion.h1>

                            <motion.p 
                                variants={itemVariants}
                                className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl font-light leading-relaxed border-l-4 border-accent/50 pl-6"
                            >
                                Liderazgo institucional en la resolución alternativa de conflictos. Acompañamiento jurídico integral con estándares internacionales.
                            </motion.p>
                            
                            <motion.div 
                                variants={itemVariants}
                                className="flex flex-wrap gap-6"
                            >
                                <Link to="/radicar" className="bg-accent hover:bg-white hover:text-primary text-white px-10 py-5 rounded-none text-sm font-bold tracking-widest uppercase transition-all shadow-[0_10px_30px_rgba(110,155,48,0.3)] hover:shadow-xl hover:-translate-y-1 inline-flex items-center gap-3">
                                    Radicar Solicitud <ChevronRight size={18} />
                                </Link>
                                <Link to="/dashboard" className="bg-transparent border border-white/30 hover:border-white hover:bg-white/5 text-white px-10 py-5 rounded-none text-sm font-bold tracking-widest uppercase transition-all inline-flex items-center gap-3">
                                    Expediente Digital
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Animated Scroll Indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                >
                    <span className="text-white/50 text-xs font-bold tracking-[0.2em] uppercase">Descubrir</span>
                    <div className="w-[1px] h-16 bg-white/20 overflow-hidden relative">
                        <motion.div 
                            animate={{ y: [0, 64] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="w-full h-1/2 bg-accent absolute top-0"
                        ></motion.div>
                    </div>
                </motion.div>
            </header>

            {/* About Us (Conócenos) Section */}
            <motion.section 
                id="nosotros" 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="py-32 bg-[#FEEEE2] relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/40 rounded-full blur-3xl -mr-20 -mt-20"></div>
                
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        <motion.div variants={fadeInUp} className="lg:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 font-identity tracking-tight">Conócenos</h2>
                            <p className="text-slate-600 font-medium text-lg mb-6 leading-relaxed">
                                El Centro de Conciliación y Arbitraje Hereford es una entidad privada dedicada a la gestión y resolución alternativa de conflictos, que ofrece servicios especializados orientados a brindar soluciones eficientes, oportunas y confiables.
                            </p>
                            <p className="text-slate-600 font-medium text-lg mb-12 leading-relaxed">
                                Nuestra actuación se fundamenta en altos estándares de profesionalismo, ética, imparcialidad y confidencialidad, garantizando a las partes un acompañamiento integral.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <motion.div 
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_40px_rgba(41,84,87,0.06)] border border-white relative transition-all"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-10"><Globe size={64} className="text-primary"/></div>
                                    <h3 className="text-xl font-bold text-primary mb-4 font-identity">Misión</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        Comprometidos con la promoción de la convivencia pacífica y el acceso efectivo a la justicia en Túquerres y su zona de influencia, contribuyendo al fortalecimiento del tejido social y la construcción de una sociedad equitativa.
                                    </p>
                                </motion.div>
                                <motion.div 
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className="bg-gradient-to-br from-primary to-[#122728] p-8 rounded-3xl shadow-[0_20px_40px_rgba(41,84,87,0.3)] relative overflow-hidden border border-white/10 transition-all"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-10"><HeartHandshake size={64} className="text-white"/></div>
                                    <h3 className="text-xl font-bold text-white mb-4 font-identity">Visión</h3>
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        Ser un laboratorio vivo de paz y justicia regenerativa líder en Colombia y América Latina, consolidando un modelo "de código abierto" que fusione la tecnología con la sabiduría ancestral.
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="lg:w-1/2 bg-white/90 backdrop-blur-2xl rounded-[2rem] p-10 md:p-12 shadow-[0_30px_60px_rgba(41,84,87,0.08)] border border-white relative overflow-hidden">
                            <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
                            <h3 className="text-2xl font-bold text-primary mb-8 font-identity relative z-10">Principios Institucionales</h3>
                            <div className="flex flex-col gap-8">
                                {[
                                    { title: 'Excelencia Jurídica y Ética', desc: 'Actuamos con total Independencia y Legalidad, asegurando que cada trámite sea íntegro y sujeto a la ley.' },
                                    { title: 'Imparcialidad y Confianza', desc: 'Garantizamos Neutralidad absoluta frente a las partes y una Confidencialidad rigurosa.' },
                                    { title: 'Idoneidad y Transparencia', desc: 'Operadores expertos comprometidos con la Diligencia y procesos abiertos que aseguran claridad.' },
                                    { title: 'Respeto y Diversidad', desc: 'Priorizamos la Autonomía de la Voluntad bajo un Enfoque Restaurativo e Intercultural.' }
                                ].map((principio, idx) => (
                                    <div key={idx} className="flex gap-5">
                                        <div className="mt-1"><CheckCircle2 className="text-accent" size={24} /></div>
                                        <div>
                                            <h4 className="font-bold text-primary text-lg mb-1">{principio.title}</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">{principio.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Services Section */}
            <motion.section 
                id="servicios" 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="py-32 bg-primary text-white relative overflow-hidden"
            >
                {/* Decorative depth elements */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary via-[#1e4042] to-[#122728]"></div>
                
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-identity tracking-tight drop-shadow-md">Nuestros Servicios</h2>
                        <p className="text-white/70 font-medium text-lg">
                            Combinamos atención presencial, virtual e híbrida, garantizando que la tecnología no sea una barrera bajo un reglamento avalado por el Ministerio de Justicia.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'Conciliación', desc: 'Proceso asistido por un tercero neutral donde las partes dialogan y proponen soluciones para resolver diferencias de mutuo acuerdo.', icon: <HeartHandshake size={32} /> },
                            { title: 'Arbitraje Ordinario', desc: 'Las partes eligen un árbitro para resolver su conflicto. Proceso rápido y flexible. La decisión es definitiva y ejecutable.', icon: <Scale size={32} /> },
                            { title: 'Arbitraje Exprés', desc: 'Aplicable a casos hasta 500 SMLMV o cuantía indeterminada. Plazos reducidos, una sola audiencia, laudo en máximo 60 días.', icon: <Globe size={32} /> },
                            { title: 'Arbitraje Ejecutivo', desc: 'Mecanismo especializado para cobro de deudas que asegura pago mediante embargos y decisiones con plena validez legal.', icon: <ShieldCheck size={32} /> },
                        ].map((srv, idx) => (
                            <motion.div 
                                key={idx} 
                                whileHover={{ y: -15 }}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all shadow-xl group"
                            >
                                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all shadow-inner">
                                    {srv.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 font-identity">{srv.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed mb-6">{srv.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Corporate Leadership Section (cov.com style) */}
            <motion.section 
                id="equipo" 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="py-32 bg-white relative"
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="border-t border-slate-200 pt-16 mb-20 flex flex-col md:flex-row justify-between items-start gap-12">
                        <div className="md:w-1/3">
                            <h2 className="text-4xl md:text-5xl font-bold text-primary font-identity tracking-tight leading-tight">Liderazgo<br/>Institucional</h2>
                        </div>
                        <div className="md:w-2/3">
                            <p className="text-slate-500 font-light text-2xl leading-relaxed">
                                Contamos con profesionales de amplia trayectoria que garantizan la gestión de conflictos con celeridad, ética y absoluto rigor legal.
                            </p>
                        </div>
                    </div>

                    {/* Editorial Profile Card */}
                    <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto group">
                        <div className="w-full md:w-5/12 overflow-hidden relative">
                            {/* Decorative line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-accent z-10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700"></div>
                            <img 
                                src="/daira.png" 
                                alt="Daira Melissa Bustos Azain" 
                                className="w-full h-auto aspect-[3/4] object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <div className="w-full md:w-7/12 flex flex-col justify-center">
                            <h3 className="text-4xl md:text-5xl font-bold text-primary font-identity mb-4">Daira Melissa Bustos Azain</h3>
                            <h4 className="text-accent font-bold tracking-[0.2em] uppercase text-sm mb-10">Directora General / Conciliadora en Derecho</h4>
                            
                            <p className="text-slate-600 text-lg leading-relaxed font-light mb-8">
                                Responsable de la planeación estratégica, la dirección administrativa institucional y la garantía de imparcialidad, transparencia y calidad técnica en la prestación de los servicios de conciliación y arbitraje. 
                            </p>
                            <p className="text-slate-600 text-lg leading-relaxed font-light mb-10">
                                Su liderazgo asegura que la justicia alternativa sea una herramienta eficiente y rigurosa para todos nuestros usuarios, manteniendo los más altos estándares internacionales.
                            </p>
                            
                            <a href="#contacto" className="inline-flex items-center gap-3 text-primary font-bold hover:text-accent transition-colors uppercase tracking-widest text-sm">
                                Perfil Profesional <ChevronRight size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Footer */}
            <footer className="bg-primary text-white py-16 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center font-bold text-2xl font-identity text-white">H</div>
                                <div>
                                    <h2 className="font-bold text-lg tracking-wider font-identity leading-tight">HEREFORD</h2>
                                    <span className="text-[10px] text-accent font-bold uppercase tracking-wider block mt-1">Centro de Arbitraje</span>
                                </div>
                            </div>
                            <p className="text-white/60 text-sm font-medium mb-6">Transformando la justicia en un bien público, intercultural y accesible mediante mecanismos eficientes.</p>
                        </div>
                        
                        <div>
                            <h4 className="font-bold text-lg mb-6 font-identity">Contáctenos</h4>
                            <ul className="flex flex-col gap-4 text-white/70 text-sm">
                                <li className="flex items-center gap-3"><MapPin size={18} className="text-accent" /> Cra. 12 #17-41, Túquerres, Nariño</li>
                                <li className="flex items-center gap-3"><Phone size={18} className="text-accent" /> +57 315 3041945</li>
                                <li className="flex items-center gap-3"><Mail size={18} className="text-accent" /> hereford@apolohub.com</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-bold text-lg mb-6 font-identity">Enlaces Rápidos</h4>
                            <ul className="flex flex-col gap-3 text-white/70 text-sm">
                                <li><a href="#inicio" onClick={(e) => scrollToSection(e, 'inicio')} className="hover:text-accent transition-colors">Inicio</a></li>
                                <li><a href="#nosotros" onClick={(e) => scrollToSection(e, 'nosotros')} className="hover:text-accent transition-colors">Sobre Nosotros</a></li>
                                <li><a href="#servicios" onClick={(e) => scrollToSection(e, 'servicios')} className="hover:text-accent transition-colors">Tarifas y Servicios</a></li>
                                <li><Link to="/dashboard" className="text-accent font-bold hover:text-white transition-colors">Acceder al Sistema MASC</Link></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border-t border-white/10 pt-8 text-center text-white/40 text-xs font-medium">
                        &copy; 2026 Centro de Arbitraje y Conciliación Hereford. Todos los derechos reservados.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
