import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Instagram, Mail, ArrowRight, Star, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { businessInfo } = useContent();

  return (
    <footer className="bg-[#050202] text-white pt-20 pb-10 border-t border-brand-maroon/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <h3 className="text-3xl font-serif font-bold text-white">Azad<span className="text-brand-gold">Tent</span>House</h3>
            <p className="text-gray-400 leading-relaxed font-light">{t.footer.desc}</p>
            <div className="flex gap-4">
              <a href={businessInfo.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-black transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href={`tel:${businessInfo.phone}`} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-black transition-all duration-300">
                <Phone size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold mb-6 text-brand-gold">{t.footer.headers.explore}</h4>
            <ul className="space-y-4">
              {[
                { label: t.nav.home, link: '/' },
                { label: t.nav.about, link: '/about' },
                { label: t.nav.services, link: '/services' },
                { label: t.nav.gallery, link: '/gallery' },
                { label: t.nav.contact, link: '/contact' }
              ].map((item) => (
                <li key={item.link}>
                  <Link to={item.link} className="text-gray-400 hover:text-brand-gold transition-colors flex items-center gap-2 group">
                    <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300"><ArrowRight size={14} /></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold mb-6 text-brand-gold">{t.footer.headers.services}</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">{t.service_items.tents.title}</li>
              <li className="hover:text-white transition-colors cursor-pointer">{t.service_items.decor.title}</li>
              <li className="hover:text-white transition-colors cursor-pointer">{t.service_items.lighting.title}</li>
              <li className="hover:text-white transition-colors cursor-pointer">{t.service_items.catering.title}</li>
              <li className="hover:text-white transition-colors cursor-pointer">{t.service_items.floral.title}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold mb-6 text-brand-gold">{t.footer.headers.visit}</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-gray-400">
                <MapPin className="flex-shrink-0 mt-1 text-brand-red" size={20} />
                <span className="font-light">{businessInfo.address}</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400">
                <Mail className="flex-shrink-0 text-brand-red" size={20} />
                <a href={`mailto:${businessInfo.email}`} className="hover:text-white transition-colors">{businessInfo.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Azad Tent House. {t.footer.rights}</p>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 text-xs text-gray-600 uppercase tracking-widest">
                <Star size={10} className="text-brand-gold" /> {t.footer.tag}
             </div>
             <Link to="/admin" className="text-gray-800 hover:text-gray-600 transition-colors">
                <Lock size={12} />
             </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
