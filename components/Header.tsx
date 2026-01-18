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
      setIsScrolled(window.scrollY > 50);
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
      <header 
        className={`fixed w-full z-50 transition-all duration-700 ease-out transform-style-3d`}
        style={{
            transform: isScrolled 
                ? 'translateY(10px) translateZ(60px) rotateX(-2deg)' 
                : 'translateY(0) translateZ(0)',
            perspective: '1000px'
        }}
      >
        <div className={`mx-auto max-w-7xl transition-all duration-500 ${isScrolled ? 'px-4' : 'px-0'}`}>
            <div className={`
                relative backdrop-blur-xl border border-white/5 transition-all duration-500 rounded-xl
                ${isScrolled 
                    ? 'bg-black/60 shadow-[0_20px_40px_rgba(0,0,0,0.6)] py-3 px-6' 
                    : 'bg-transparent shadow-none py-6 px-6 border-transparent'
                }
            `}>
                {/* Glow Effect */}
                {isScrolled && <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-brand-gold/5 to-transparent opacity-50 pointer-events-none"></div>}

                <div className="flex justify-between items-center relative z-10">
                    {/* Logo */}
                    <Link to="/" className="relative group perspective-500">
                        <h1 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide transition-transform duration-300 group-hover:transform group-hover:translateZ(20px) text-shadow-3d">
                        Azad<span className="text-brand-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">Tent</span>House
                        </h1>
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
                            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">{item.name}</span>
                            <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-gold opacity-0 transition-opacity duration-300 ${location.pathname === item.path ? 'opacity-100' : 'group-hover:opacity-100'}`}></span>
                        </Link>
                        ))}
                        
                        {/* Language Toggle */}
                        <button 
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-3 py-1 border border-brand-gold/30 rounded-full text-brand-gold hover:bg-brand-gold hover:text-black transition-all duration-300 text-[10px] font-bold uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                        >
                        <Globe size={12} />
                        <span>{language === 'en' ? 'EN' : 'HI'}</span>
                        </button>

                        <a 
                        href={`https://wa.me/${businessInfo.whatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-brand-gold text-brand-dark px-6 py-2.5 rounded-sm font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 hover:translate-z-10"
                        >
                        {t.nav.enquire}
                        </a>
                    </nav>

                    {/* Mobile Controls */}
                    <div className="flex items-center gap-4 lg:hidden">
                        <button className="text-brand-gold focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={32} /> : <Menu size={32} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-transform duration-500 lg:hidden flex flex-col items-center justify-center space-y-8 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)} className={`text-3xl font-serif ${location.pathname === item.path ? 'text-brand-gold italic' : 'text-white'} hover:scale-110 transition-transform`}>
            {item.name}
          </Link>
        ))}
        <a href={`tel:${businessInfo.phone}`} className="mt-8 px-10 py-4 border border-brand-gold text-brand-gold rounded-full font-bold tracking-wider hover:bg-brand-gold hover:text-brand-dark transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]">
          {t.nav.call}
        </a>
      </div>
    </>
  );
};

export default Header;