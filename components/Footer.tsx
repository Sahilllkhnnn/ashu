import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Instagram, Mail, ArrowRight, Star, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { businessInfo } = useContent();

  return (
    <footer className="bg-[#020101] text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden scene-3d">
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-brand-red/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 card-3d-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          <div className="space-y-8 card-3d">
            <h3 className="text-3xl font-serif font-bold text-white text-shadow-3d">Azad<span className="text-brand-gold">Tent</span>House</h3>
            <p className="text-gray-400 leading-relaxed font-light card-layer-base">{t.footer.desc}</p>
            <div className="flex gap-4 card-layer-mid">
              <a href={businessInfo.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-black transition-all duration-300 hover:scale-110 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <Instagram size={20} />
              </a>
              <a href={`tel:${businessInfo.phone}`} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-black transition-all duration-300 hover:scale-110 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <Phone size={20} />
              </a>
            </div>
          </div>

          <div className="card-3d">
            <h4 className="text-lg font-serif font-bold mb-8 text-brand-gold uppercase tracking-widest">{t.footer.headers.explore}</h4>
            <ul className="space-y-5">
              {[
                { label: t.nav.home, link: '/' },
                { label: t.nav.about, link: '/about' },
                { label: t.nav.services, link: '/services' },
                { label: t.nav.gallery, link: '/gallery' },
                { label: t.nav.contact, link: '/contact' }
              ].map((item) => (
                <li key={item.link}>
                  <Link to={item.link} className="text-gray-400 hover:text-brand-gold transition-colors flex items-center gap-3 group">
                    <span className="w-1 h-1 bg-brand-gold rounded-full group-hover:w-2 transition-all duration-300"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-3d">
            <h4 className="text-lg font-serif font-bold mb-8 text-brand-gold uppercase tracking-widest">{t.footer.headers.services}</h4>
            <ul className="space-y-5 text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-2 transition-transform duration-300">{t.service_items.tents.title}</li>
              <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-2 transition-transform duration-300">{t.service_items.decor.title}</li>
              <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-2 transition-transform duration-300">{t.service_items.lighting.title}</li>
              <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-2 transition-transform duration-300">{t.service_items.catering.title}</li>
              <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-2 transition-transform duration-300">{t.service_items.floral.title}</li>
            </ul>
          </div>

          <div className="card-3d">
            <h4 className="text-lg font-serif font-bold mb-8 text-brand-gold uppercase tracking-widest">{t.footer.headers.visit}</h4>
            <ul className="space-y-8">
              <li className="flex items-start gap-5 text-gray-400 group">
                <MapPin className="flex-shrink-0 mt-1 text-brand-red group-hover:text-brand-gold transition-colors" size={24} />
                <span className="font-light leading-relaxed">{businessInfo.address}</span>
              </li>
              <li className="flex items-center gap-5 text-gray-400 group">
                <Mail className="flex-shrink-0 text-brand-red group-hover:text-brand-gold transition-colors" size={24} />
                <a href={`mailto:${businessInfo.email}`} className="hover:text-white transition-colors">{businessInfo.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 text-center flex flex-col md:flex-row justify-between items-center gap-6 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-brand-gold shadow-[0_0_20px_rgba(212,175,55,0.8)]"></div>
          
          <p className="text-gray-600 text-sm font-light tracking-wide">© {new Date().getFullYear()} Azad Tent House. {t.footer.rights}</p>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 text-xs text-brand-gold/70 uppercase tracking-[0.2em] font-bold">
                <Star size={10} className="fill-brand-gold" /> {t.footer.tag}
             </div>
             <Link to="/admin" className="text-gray-800 hover:text-brand-gold transition-colors p-2">
                <Lock size={14} />
             </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;