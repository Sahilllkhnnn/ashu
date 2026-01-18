import React from 'react';
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

  return (
    <div className="w-full overflow-hidden bg-brand-dark">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Image with Parallax feel */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519225421980-715cb0202128?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Royal Wedding Decor" 
            className="w-full h-full object-cover opacity-50 scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-black/70"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-brand-dark/40 to-brand-dark"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-white mt-10">
          <div className="inline-block mb-6 animate-fade-in-up">
            <span className="py-2 px-6 rounded-full border border-brand-gold/30 bg-black/40 text-brand-gold text-xs md:text-sm tracking-[0.3em] uppercase font-bold backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.1)]">
              {siteContent.hero.tagline}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold mb-8 leading-none animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <span className="block text-gray-100 drop-shadow-lg">{siteContent.hero.title_line1}</span>
            <span className="block text-4xl md:text-6xl lg:text-7xl text-brand-gold mt-4 font-light italic text-gradient-gold">{siteContent.hero.title_line2}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-12 font-light max-w-2xl mx-auto leading-relaxed animate-fade-in-up drop-shadow-md" style={{animationDelay: '0.4s'}}>
            {siteContent.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <a 
              href={`tel:${businessInfo.phone}`} 
              className="group relative px-8 py-4 bg-brand-red overflow-hidden rounded-sm transition-all hover:scale-105 shadow-[0_0_30px_rgba(61,10,10,0.6)] hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <span className="relative flex items-center gap-2 font-bold tracking-widest uppercase text-sm">
                <Phone size={18} /> {t.hero.call_btn}
              </span>
            </a>
            
            <a 
              href={`https://wa.me/${businessInfo.whatsapp}`} 
              target="_blank"
              rel="noreferrer"
              className="group px-8 py-4 border border-brand-gold text-brand-gold rounded-sm transition-all hover:bg-brand-gold hover:text-black shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] backdrop-blur-sm bg-black/20"
            >
               <span className="flex items-center gap-2 font-bold tracking-widest uppercase text-sm">
                <MessageCircle size={18} /> {t.hero.whatsapp_btn}
              </span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
           <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-brand-gold to-transparent"></div>
        </div>
      </section>

      {/* Features Cards - Floating 3D */}
      <section className="relative z-20 -mt-24 px-4 pb-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t.features.local.title, icon: Clock, desc: t.features.local.desc },
              { title: t.features.designs.title, icon: Crown, desc: t.features.designs.desc },
              { title: t.features.pricing.title, icon: ShieldCheck, desc: t.features.pricing.desc },
              { title: t.features.professional.title, icon: UserCheck, desc: t.features.professional.desc }
            ].map((item, idx) => (
              <div key={idx} className="card-3d-wrapper">
                <div className="card-3d glass p-8 rounded-xl text-center border-t border-brand-gold/20 bg-brand-dark/80 shadow-2xl">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-brand-red to-black rounded-full flex items-center justify-center mb-6 shadow-lg shadow-brand-red/30 text-brand-gold border border-brand-gold/10">
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/5 blur-[100px] pointer-events-none"></div>
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="relative order-2 lg:order-1 card-3d-wrapper">
             <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl border border-white/10 card-3d">
                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="About" className="w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="font-serif italic text-brand-gold text-xl mb-1">{t.about_preview.image_caption}</p>
                  <p className="font-bold text-2xl tracking-wide">{t.about_preview.image_sub}</p>
                </div>
             </div>
             {/* Decorative Frame */}
             <div className="absolute -top-6 -left-6 w-full h-full border-2 border-brand-gold/20 rounded-lg -z-0"></div>
          </div>

          <div className="order-1 lg:order-2">
            <h4 className="text-brand-gold tracking-[0.2em] uppercase font-bold text-xs mb-4 flex items-center gap-3">
               <span className="w-8 h-[1px] bg-brand-gold"></span> {t.about_preview.subtitle}
            </h4>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">
              {siteContent.about.title_start} <br/> <span className="text-gradient-gold">{siteContent.about.title_highlight}</span>.
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-lg font-light">
              {siteContent.about.description}
            </p>
            
            <div className="grid grid-cols-2 gap-8 my-10 border-l border-brand-gold/20 pl-8">
               <div>
                 <h3 className="text-5xl font-serif font-bold text-white mb-2">{siteContent.about.years_experience}</h3>
                 <p className="text-brand-gold text-xs uppercase tracking-widest">{t.about_preview.years}</p>
               </div>
               <div>
                 <h3 className="text-5xl font-serif font-bold text-white mb-2">{siteContent.about.clients_count}</h3>
                 <p className="text-brand-gold text-xs uppercase tracking-widest">{t.about_preview.clients}</p>
               </div>
            </div>

            <Link to="/about" className="group inline-flex items-center gap-3 text-white font-medium hover:text-brand-gold transition-colors">
              <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-gold group-hover:scale-110 transition-all">
                <ArrowRight size={20} />
              </span>
              <span className="uppercase tracking-widest text-sm">{t.about_preview.read_more}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="py-24 px-6 bg-[#0a0303] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <SectionTitle title={t.services_section.title} subtitle={t.services_section.subtitle} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service) => (
              <div key={service.id} className="card-3d-wrapper group h-full">
                <div className="relative h-full bg-[#120808] border border-white/5 p-8 rounded-xl overflow-hidden card-3d group-hover:border-brand-gold/30 transition-all duration-500">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-red/10 rounded-full blur-[60px] group-hover:bg-brand-gold/10 transition-all duration-500"></div>
                  <div className="text-brand-gold mb-6 relative z-10 p-4 bg-white/5 inline-block rounded-full border border-white/5 group-hover:scale-110 transition-transform">
                    <DynamicIcon name={service.iconName} size={32} strokeWidth={1} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-4 relative z-10 group-hover:text-brand-gold transition-colors">{service.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed relative z-10 group-hover:text-gray-300 transition-colors">{service.description}</p>
                  <Link to="/services" className="inline-flex items-center text-brand-red text-xs font-bold uppercase tracking-widest relative z-10 group-hover:translate-x-2 transition-transform group-hover:text-brand-gold">
                    {t.services_section.discover} <ArrowRight size={14} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link to="/services" className="inline-block border border-white/20 text-white px-10 py-4 rounded-full hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all duration-300 font-bold tracking-widest uppercase text-xs shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              {t.services_section.view_all}
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Strip */}
      <section className="py-24 bg-brand-dark relative">
         <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
         <div className="container mx-auto px-6 mb-12 flex justify-between items-end relative z-10">
            <div>
               <h2 className="text-4xl font-serif font-bold text-white">{t.gallery_strip.title}</h2>
               <p className="text-brand-gold mt-2 uppercase tracking-widest text-sm">{t.gallery_strip.subtitle}</p>
            </div>
            <Link to="/gallery" className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">{t.gallery_strip.view_full} <ArrowRight size={16}/></Link>
         </div>
         <div className="flex overflow-x-auto gap-6 px-6 pb-12 snap-x scrollbar-hide relative z-10">
           {['https://picsum.photos/seed/wed10/400/600', 'https://picsum.photos/seed/wed11/400/600', 'https://picsum.photos/seed/wed12/400/600', 'https://picsum.photos/seed/wed13/400/600'].map((url, i) => (
             <div key={i} className="min-w-[280px] md:min-w-[350px] h-[450px] relative rounded-xl overflow-hidden group snap-center cursor-pointer border border-white/10 shadow-2xl">
               <img src={url} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity"></div>
               <div className="absolute bottom-6 left-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                 <p className="text-brand-gold text-[10px] uppercase tracking-[0.2em] mb-2">{t.gallery_page.filters.wedding}</p>
                 <h4 className="text-white font-serif text-2xl">{t.features.designs.title}</h4>
               </div>
             </div>
           ))}
         </div>
      </section>

      <FeedbackSection />

      {/* CTA Section */}
      <section className="py-24 bg-brand-maroon relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-maroon via-transparent to-brand-maroon"></div>
        <div className="container mx-auto text-center relative z-10 px-6">
          <h2 className="text-3xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">{t.cta_strip.title}</h2>
          <p className="text-white/70 mb-10 max-w-2xl mx-auto text-lg font-light leading-relaxed">{t.cta_strip.desc}</p>
          <Link to="/contact" className="inline-block bg-white text-brand-maroon px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-black transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:scale-105">
            {t.cta_strip.btn}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;