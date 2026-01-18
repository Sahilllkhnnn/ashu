import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { useContent } from '../contexts/ContentContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import DynamicIcon from '../components/DynamicIcon';

const Services: React.FC = () => {
  const { t } = useLanguage();
  const { services } = useContent();

  return (
    <div className="pt-40 pb-20 bg-brand-dark min-h-screen relative scene-3d overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-brand-maroon/30 to-transparent pointer-events-none"></div>
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle title={t.services_page.title} subtitle={t.services_page.subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <div key={service.id} className="card-3d-wrapper animate-fade-in-up" style={{animationDelay: `${idx * 0.1}s`}}>
              <div className="card-3d bg-[#120808]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/5 hover:border-brand-gold/40 h-full flex flex-col group shadow-2xl relative">
                
                {/* Image Area with Floating Icon */}
                <div className="h-72 overflow-hidden relative flex items-center justify-center bg-black card-layer-base">
                  {service.imageUrl ? (
                    <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-maroon/60 to-black"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120808] via-transparent to-transparent"></div>
                  
                  {/* Floating Icon - Pops out in 3D */}
                  <div className="card-layer-top absolute z-10 p-6 bg-black/40 backdrop-blur-md rounded-full border border-brand-gold/30 text-brand-gold shadow-[0_0_30px_rgba(212,175,55,0.2)] group-hover:scale-110 transition-all duration-500 group-hover:bg-brand-gold group-hover:text-black">
                    <DynamicIcon name={service.iconName} size={48} strokeWidth={1} />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-10 flex-grow flex flex-col bg-[#120808] relative z-20 border-t border-white/5">
                  <h3 className="card-layer-mid text-2xl font-serif font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">{service.title}</h3>
                  <div className="w-12 h-[2px] bg-brand-gold/50 mb-6 group-hover:w-full transition-all duration-700"></div>
                  <p className="card-layer-base text-gray-400 mb-8 flex-grow leading-relaxed font-light text-sm">{service.description}</p>
                  
                  <Link 
                    to="/contact" 
                    className="card-layer-mid w-full block text-center border border-white/10 text-white hover:bg-brand-gold hover:text-black hover:border-brand-gold font-bold py-4 rounded transition-all duration-300 uppercase text-xs tracking-[0.2em] shadow-lg"
                  >
                    {t.services_page.book_btn}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA 3D Container */}
        <div className="mt-32 card-3d-wrapper">
            <div className="card-3d relative rounded-2xl p-16 text-center text-white overflow-hidden border border-brand-gold/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-black/60 backdrop-blur-xl">
            <div className="absolute inset-0 bg-brand-red/20 blur-3xl -z-10"></div>
            
            <div className="relative z-10">
                <h3 className="card-layer-top text-4xl md:text-5xl font-serif font-bold mb-6 text-shadow-3d">{t.services_page.cta_title}</h3>
                <p className="card-layer-mid mb-12 max-w-2xl mx-auto text-gray-300 font-light text-lg">{t.services_page.cta_desc}</p>
                <Link to="/contact" className="btn-cinematic inline-flex items-center gap-3 bg-brand-gold text-black px-14 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                {t.services_page.cta_btn} <ArrowRight size={20} />
                </Link>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Services;