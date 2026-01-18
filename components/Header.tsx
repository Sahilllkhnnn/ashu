import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Star, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t, language, toggleLanguage } = useLanguage();
  const { businessInfo } = useContent();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.services, path: '/services' },
    { name: t.nav.gallery, path: '/gallery' },
    { name: t.nav.contact, path: '/contact' },
  ];

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-500 border-b border-transparent ${isScrolled ? 'glass-dark py-3' : 'bg-transparent py-6'}`}>
        
        {/* Top Info Bar (Desktop) */}
        {!isScrolled && (
          <div className="hidden lg:flex justify-between items-center container mx-auto px-6 mb-2 text-brand-goldLight/70 text-[10px] tracking-[0.2em] uppercase border-b border-white/5 pb-3">
             <div className="flex items-center gap-6">
                <span className="flex items-center gap-2"><Star size={10} fill="#d4af37" /> Premium Event Decorators</span>
                <span>Chandia • Umariya • MP</span>
             </div>
             <div className="flex items-center gap-6">
                <a href={businessInfo.instagram} target="_blank" rel="noreferrer" className="hover:text-brand-gold transition-colors">Instagram</a>
                <span>•</span>
                <a href={`tel:${businessInfo.phone}`} className="hover:text-brand-gold transition-colors">{businessInfo.phone}</a>
             </div>
          </div>
        )}

        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="relative group">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">
              Azad<span className="text-brand-gold">Tent</span>House
            </h1>
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-500 group-hover:w-full"></div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:text-brand-gold relative group ${
                  location.pathname === item.path ? 'text-brand-gold' : 'text-gray-300'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-gold opacity-0 transition-opacity duration-300 ${location.pathname === item.path ? 'opacity-100' : 'group-hover:opacity-100'}`}></span>
              </Link>
            ))}
            
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1 border border-brand-gold/30 rounded-full text-brand-gold hover:bg-brand-gold hover:text-black transition-all duration-300 text-[10px] font-bold uppercase tracking-wider"
            >
              <Globe size={12} />
              <span>{language === 'en' ? 'EN' : 'HI'}</span>
            </button>

            <a 
              href={`https://wa.me/${businessInfo.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="bg-brand-gold text-brand-dark px-6 py-2.5 rounded-sm font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white transition-colors duration-300 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            >
              {t.nav.enquire}
            </a>
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={toggleLanguage} className="flex items-center gap-1 px-3 py-1.5 border border-brand-gold/50 rounded-full text-brand-gold text-xs font-bold">
              <span>{language === 'en' ? 'EN' : 'हिंदी'}</span>
            </button>
            <button className="text-brand-gold focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-transform duration-500 lg:hidden flex flex-col items-center justify-center space-y-8 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute top-0 left-0 w-full h-full bg-hero-pattern opacity-5 pointer-events-none"></div>
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)} className={`text-3xl font-serif ${location.pathname === item.path ? 'text-brand-gold italic' : 'text-white'}`}>
            {item.name}
          </Link>
        ))}
        <a href={`tel:${businessInfo.phone}`} className="mt-8 px-10 py-4 border border-brand-gold text-brand-gold rounded-full font-bold tracking-wider hover:bg-brand-gold hover:text-brand-dark transition-all">
          {t.nav.call}
        </a>
      </div>
    </>
  );
};

export default Header;