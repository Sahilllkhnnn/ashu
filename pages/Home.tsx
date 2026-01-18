import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Clock, Crown, ShieldCheck, UserCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';
import FeedbackSection from '../components/FeedbackSection';
import SectionTitle from '../components/SectionTitle';
import DynamicIcon from '../components/DynamicIcon';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { businessInfo, services, siteContent } = useContent();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full bg-brand-dark scene-3d">
      
      {/* --- HERO SECTION: 4 LAYER DEPTH --- */}
      <section className="relative h-screen w-full overflow-hidden hero-scene">
        
        {/* LAYER 1: Deep Background (Moves slowest) */}
        <div 
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{ 
            transform: `translateZ(-300px) scale(2) translateY(${scrollY * 0.3}px)`,
            backgroundImage: 'url(https://images.unsplash.com/photo-1519225421980-715cb0202128?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4) contrast(1.1)'
          }}
        ></div>

        {/* LAYER 2: Light Rays & Atmosphere (Moves medium) */}
        <div 
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ 
                transform: `translateZ(-150px) scale(1.5) translateY(${scrollY * 0.2}px)`,
                background: 'radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.15) 0%, transparent 60%)',
                mixBlendMode: 'screen'
            }}
        ></div>
        
        {/* LAYER 3: Main Content (Moves fastest, floats) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10"
             style={{ transform: `translateZ(0px)` }}>
             
          <div className="animate-[float-y-slow_6s_ease-in-out_infinite]" style={{ transformStyle: 'preserve-3d' }}>
            <div className="mb-6 inline-block" style={{ transform: 'translateZ(40px)' }}>
                <span className="py-2 px-6 rounded-full border border-brand-gold/30 bg-black/40 text-brand-gold text-xs md:text-sm tracking-[0.3em] uppercase font-bold backdrop-blur-md shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                {siteContent.hero.tagline}
                </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold mb-8 leading-none drop-shadow-2xl" 
                style={{ transform: 'translateZ(80px) rotateX(2deg)' }}>
                <span className="block text-gray-100">{siteContent.hero.title_line1}</span>
                <span className="block text-4xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-[#fff8dc] to-brand-gold mt-4 font-light italic pb-4">
                    {siteContent.hero.title_line2}
                </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-12 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-lg"
               style={{ transform: 'translateZ(60px)' }}>
                {siteContent.hero.description}
            </p>
            
            {/* LAYER 4: Buttons (Pop out most) */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center" style={{ transform: 'translateZ(140px)' }}>
                <a 
                href={`tel:${businessInfo.phone}`} 
                className="btn-cinematic group relative px-10 py-5 bg-brand-red overflow-hidden rounded-sm text-white shadow-[0_0_30px_rgba(61,10,10,0.6)]"
                >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    <span className="relative flex items-center gap-3 font-bold tracking-widest uppercase text-sm">
                        <Phone size={18} className="animate-pulse" /> {t.hero.call_btn}
                    </span>
                </a>
                
                <a 
                href={`https://wa.me/${businessInfo.whatsapp}`} 
                target="_blank"
                rel="noreferrer"
                className="btn-cinematic px-10 py-5 border border-brand-gold/50 text-brand-gold rounded-sm bg-black/30 backdrop-blur-md hover:bg-brand-gold hover:text-black hover:border-brand-gold"
                >
                <span className="flex items-center gap-3 font-bold tracking-widest uppercase text-sm">
                    <MessageCircle size={18} /> {t.hero.whatsapp_btn}
                </span>
                </a>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-70" style={{ transform: 'translateZ(20px)' }}>
           <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-brand-gold to-transparent animate-pulse"></div>
        </div>
        
        {/* Bottom Fade Gradient to match next section */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-brand-dark to-transparent z-20" style={{ transform: 'translateZ(10px)' }}></div>
      </section>

      {/* --- FEATURES: FLOAT CARDS --- */}
      <section className="relative z-30 -mt-20 px-4 pb-20 scene-3d">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: t.features.local.title, icon: Clock, desc: t.features.local.desc },
              { title: t.features.designs.title, icon: Crown, desc: t.features.designs.desc },
              { title: t.features.pricing.title, icon: ShieldCheck, desc: t.features.pricing.desc },
              { title: t.features.professional.title, icon: UserCheck, desc: t.features.professional.desc }
            ].map((item, idx) => (
              <div key={idx} className="card-3d-wrapper">
                <div className="card-3d h-full bg-[#120808]/90 backdrop-blur-lg border border-white/10 p-8 rounded-xl text-center shadow-2xl group">
                  <div className="card-layer-top w-20 h-20 mx-auto bg-gradient-to-br from-brand-maroon to-black rounded-full flex items-center justify-center mb-6 shadow-[0_10px_20px_rgba(0,0,0,0.5)] border border-brand-gold/20 group-hover:border-brand-gold group-hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all">
                    <item.icon size={36} className="text-brand-gold" />
                  </div>
                  <h3 className="card-layer-mid text-xl font-serif font-bold text-white mb-3 group-hover:text-brand-gold transition-colors">{item.title}</h3>
                  <p className="card-layer-base text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT --- */}
      <section className="py-32 px-6 relative scene-3d">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          
          <div className="relative order-2 lg:order-1 card-3d-wrapper perspective-1000">
             <div className="card-3d relative z-10 rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-white/10 group">
                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="About" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-10 left-10 text-white card-layer-mid">
                  <p className="font-serif italic text-brand-gold text-2xl mb-2">{t.about_preview.image_caption}</p>
                  <p className="font-bold text-3xl tracking-wide">{t.about_preview.image_sub}</p>
                </div>
             </div>
             {/* Floating Decorative Element */}
             <div className="absolute -top-10 -left-10 w-full h-full border-2 border-brand-gold/10 rounded-lg -z-0 animate-[float-y-slow_8s_ease-in-out_infinite]" style={{transform: 'translateZ(-50px)'}}></div>
          </div>

          <div className="order-1 lg:order-2" style={{transformStyle: 'preserve-3d'}}>
            <h4 className="text-brand-gold tracking-[0.2em] uppercase font-bold text-xs mb-6 flex items-center gap-4" style={{transform: 'translateZ(20px)'}}>
               <span className="w-12 h-[1px] bg-brand-gold"></span> {t.about_preview.subtitle}
            </h4>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight text-shadow-3d" style={{transform: 'translateZ(40px)'}}>
              {siteContent.about.title_start} <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-[#fff8dc]">{siteContent.about.title_highlight}</span>.
            </h2>
            <p className="text-gray-400 mb-10 leading-relaxed text-lg font-light" style={{transform: 'translateZ(10px)'}}>
              {siteContent.about.description}
            </p>
            
            <div className="grid grid-cols-2 gap-12 my-12 border-l-2 border-brand-gold/10 pl-10">
               <div className="group">
                 <h3 className="text-6xl font-serif font-bold text-white mb-2 group-hover:text-brand-gold transition-colors">{siteContent.about.years_experience}</h3>
                 <p className="text-gray-500 text-xs uppercase tracking-widest">{t.about_preview.years}</p>
               </div>
               <div className="group">
                 <h3 className="text-6xl font-serif font-bold text-white mb-2 group-hover:text-brand-gold transition-colors">{siteContent.about.clients_count}</h3>
                 <p className="text-gray-500 text-xs uppercase tracking-widest">{t.about_preview.clients}</p>
               </div>
            </div>

            <Link to="/about" className="btn-cinematic inline-flex items-center gap-4 text-white font-medium hover:text-brand-gold transition-colors pl-2">
              <span className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-gold group-hover:scale-110 transition-all bg-white/5">
                <ArrowRight size={22} />
              </span>
              <span className="uppercase tracking-widest text-sm font-bold">{t.about_preview.read_more}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* --- SERVICES PREVIEW --- */}
      <section className="py-32 px-6 bg-[#0a0303] relative overflow-hidden scene-3d">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <SectionTitle title={t.services_section.title} subtitle={t.services_section.subtitle} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
            {services.slice(0, 6).map((service) => (
              <div key={service.id} className="card-3d-wrapper group h-full">
                <div className="relative h-full bg-[#120808] border border-white/5 p-10 rounded-xl overflow-hidden card-3d group-hover:border-brand-gold/30 transition-all duration-500 shadow-2xl">
                  {/* Floating Icon */}
                  <div className="card-layer-top text-brand-gold mb-8 p-5 bg-white/5 inline-block rounded-full border border-white/5 shadow-[0_0_20px_rgba(212,175,55,0.1)] group-hover:scale-110 transition-transform">
                    <DynamicIcon name={service.iconName} size={40} strokeWidth={1} />
                  </div>
                  
                  <h3 className="card-layer-mid text-2xl font-serif font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">{service.title}</h3>
                  <p className="card-layer-base text-gray-500 text-sm mb-8 leading-relaxed group-hover:text-gray-300 transition-colors">{service.description}</p>
                  
                  <Link to="/services" className="card-layer-mid inline-flex items-center text-brand-red text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform group-hover:text-brand-gold">
                    {t.services_section.discover} <ArrowRight size={14} className="ml-2" />
                  </Link>

                  {/* Hover Glow */}
                  <div className="absolute -right-20 -top-20 w-60 h-60 bg-brand-gold/5 rounded-full blur-[80px] group-hover:bg-brand-gold/10 transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-20">
            <Link to="/services" className="btn-cinematic inline-block border border-white/20 text-white px-12 py-4 rounded-full hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all duration-300 font-bold tracking-widest uppercase text-xs shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-black/50 backdrop-blur-sm">
              {t.services_section.view_all}
            </Link>
          </div>
        </div>
      </section>

      {/* --- GALLERY STRIP --- */}
      <section className="py-32 bg-brand-dark relative scene-3d overflow-hidden">
         <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at center, #3d0a0a 0%, transparent 70%)'}}></div>
         <div className="container mx-auto px-6 mb-16 flex justify-between items-end relative z-10">
            <div style={{transform: 'translateZ(20px)'}}>
               <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">{t.gallery_strip.title}</h2>
               <p className="text-brand-gold mt-2 uppercase tracking-widest text-sm">{t.gallery_strip.subtitle}</p>
            </div>
            <Link to="/gallery" className="hidden md:flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider font-bold group">
                {t.gallery_strip.view_full} 
                <span className="group-hover:translate-x-1 transition-transform"><ArrowRight size={18}/></span>
            </Link>
         </div>
         
         <div className="flex overflow-x-auto gap-8 px-6 pb-20 snap-x scrollbar-hide relative z-10 perspective-1000">
           {['https://picsum.photos/seed/wed10/400/600', 'https://picsum.photos/seed/wed11/400/600', 'https://picsum.photos/seed/wed12/400/600', 'https://picsum.photos/seed/wed13/400/600'].map((url, i) => (
             <div key={i} className="card-3d-wrapper min-w-[300px] md:min-w-[380px]">
                <div className="card-3d h-[500px] relative rounded-xl overflow-hidden group snap-center cursor-pointer border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                    <img src={url} alt="Gallery" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-70 transition-opacity"></div>
                    
                    <div className="absolute bottom-10 left-8 card-layer-top">
                        <p className="text-brand-gold text-[10px] uppercase tracking-[0.2em] mb-2">{t.gallery_page.filters.wedding}</p>
                        <h4 className="text-white font-serif text-3xl font-bold">{t.features.designs.title}</h4>
                    </div>
                </div>
             </div>
           ))}
         </div>
      </section>

      <FeedbackSection />

      {/* --- CINEMATIC CTA --- */}
      <section className="py-32 relative overflow-hidden flex items-center justify-center scene-3d">
        <div className="absolute inset-0 bg-brand-maroon transform -skew-y-3 scale-110 origin-top-left z-0 border-t border-brand-gold/20"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="container mx-auto text-center relative z-10 px-6 card-3d-wrapper">
          <div className="card-3d">
            <h2 className="card-layer-top text-4xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-2xl">{t.cta_strip.title}</h2>
            <p className="card-layer-mid text-white/80 mb-12 max-w-2xl mx-auto text-xl font-light leading-relaxed">{t.cta_strip.desc}</p>
            <div className="card-layer-top">
                <Link to="/contact" className="btn-cinematic inline-block bg-white text-brand-maroon px-14 py-6 rounded-full font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-black transition-all shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    {t.cta_strip.btn}
                </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;