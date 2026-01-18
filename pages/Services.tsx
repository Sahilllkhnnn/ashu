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
    <div className="pt-32 pb-20 bg-brand-dark min-h-screen relative">
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-brand-maroon/20 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle title={t.services_page.title} subtitle={t.services_page.subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={service.id} className="card-3d-wrapper animate-fade-in-up" style={{animationDelay: `${idx * 0.1}s`}}>
              <div className="bg-[#120808] rounded-xl overflow-hidden border border-white/5 hover:border-brand-gold/40 transition-all duration-500 h-full flex flex-col group card-3d shadow-2xl relative">
                
                {/* Image / Icon Area */}
                <div className="h-64 overflow-hidden relative flex items-center justify-center bg-black">
                  {service.imageUrl ? (
                    <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-maroon/40 to-black"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120808] via-transparent to-transparent"></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute text-brand-gold/90 z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    <DynamicIcon name={service.iconName} size={64} strokeWidth={1} />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8 flex-grow flex flex-col bg-[#120808] relative z-20">
                  <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">{service.title}</h3>
                  <div className="w-10 h-[1px] bg-brand-gold/50 mb-4 group-hover:w-20 transition-all duration-500"></div>
                  <p className="text-gray-400 mb-8 flex-grow leading-relaxed font-light text-sm">{service.description}</p>
                  
                  <Link 
                    to="/contact" 
                    className="w-full block text-center border border-white/10 text-white hover:bg-brand-gold hover:text-black hover:border-brand-gold font-bold py-4 rounded transition-all duration-300 uppercase text-xs tracking-[0.2em]"
                  >
                    {t.services_page.book_btn}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 relative rounded-2xl p-10 md:p-16 text-center text-white overflow-hidden border border-brand-gold/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 bg-brand-red/10 blur-3xl"></div>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-serif font-bold mb-6">{t.services_page.cta_title}</h3>
            <p className="mb-10 max-w-2xl mx-auto text-gray-300 font-light text-lg">{t.services_page.cta_desc}</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-gold text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105">
              {t.services_page.cta_btn} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;