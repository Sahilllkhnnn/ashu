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
    <div className="pt-32 pb-20 bg-brand-dark min-h-screen">
      <div className="container mx-auto px-6">
        <SectionTitle title={t.services_page.title} subtitle={t.services_page.subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={service.id} className="card-3d-wrapper animate-fade-in-up" style={{animationDelay: `${idx * 0.1}s`}}>
              <div className="bg-[#120808] rounded-xl overflow-hidden border border-white/5 hover:border-brand-gold/40 transition-all duration-500 h-full flex flex-col group card-3d">
                <div className="h-56 overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-brand-maroon/20 to-black">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-red/10 to-transparent opacity-50"></div>
                  <div className="text-brand-gold/80 relative z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                    <DynamicIcon name={service.iconName} size={80} strokeWidth={1} />
                  </div>
                </div>
                
                <div className="p-8 flex-grow flex flex-col bg-gradient-to-b from-[#120808] to-black">
                  <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">{service.title}</h3>
                  <p className="text-gray-400 mb-8 flex-grow leading-relaxed font-light text-sm">{service.description}</p>
                  <Link 
                    to="/contact" 
                    className="w-full block text-center border border-white/10 text-white hover:bg-brand-gold hover:text-black hover:border-brand-gold font-bold py-3 rounded transition-all duration-300 uppercase text-xs tracking-widest"
                  >
                    {t.services_page.book_btn}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 relative rounded-2xl p-10 md:p-16 text-center text-white overflow-hidden border border-brand-gold/20">
          <div className="absolute inset-0 bg-brand-red/20 blur-3xl"></div>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6">{t.services_page.cta_title}</h3>
            <p className="mb-10 max-w-2xl mx-auto text-gray-300">{t.services_page.cta_desc}</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-gold text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              {t.services_page.cta_btn} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
