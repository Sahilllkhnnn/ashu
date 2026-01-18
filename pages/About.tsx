import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { Award, Users, HeartHandshake, History } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  const { siteContent } = useContent();

  return (
    <div className="pt-32 pb-20 bg-brand-dark">
      <div className="container mx-auto px-6">
        <SectionTitle title={t.about_page.title} subtitle={t.about_page.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24 animate-fade-in-up">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-brand-gold"></div>
                <span className="text-brand-gold uppercase tracking-widest text-sm font-bold">{t.about_page.since}</span>
            </div>
            <h3 className="text-4xl font-serif font-bold text-white mb-6">{siteContent.about.title_start} {siteContent.about.title_highlight}</h3>
            <p className="text-gray-400 leading-relaxed mb-6 font-light text-lg">
              {siteContent.about.description}
            </p>
            <p className="text-gray-400 leading-relaxed mb-8 font-light text-lg">
              {t.about_page.p2}
            </p>
            
            <div className="flex flex-wrap gap-4">
               {t.about_page.tags.map((tag: string) => (
                   <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-300 text-sm hover:border-brand-gold transition-colors">
                       {tag}
                   </span>
               ))}
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="relative z-10 rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                <img 
                src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Decoration Team" 
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />
            </div>
            {/* Back Glow */}
            <div className="absolute -inset-4 bg-brand-red/20 blur-xl -z-10 rounded-full"></div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-[#120808] rounded-2xl p-10 md:p-16 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-[80px]"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {[
              { icon: History, title: t.about_page.values.local.title, desc: t.about_page.values.local.desc },
              { icon: HeartHandshake, title: t.about_page.values.customer.title, desc: t.about_page.values.customer.desc },
              { icon: Award, title: t.about_page.values.quality.title, desc: t.about_page.values.quality.desc },
              { icon: Users, title: t.about_page.values.staff.title, desc: t.about_page.values.staff.desc },
            ].map((val, idx) => (
              <div key={idx} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-maroon to-black border border-white/10 rounded-full shadow-lg mb-6 text-brand-gold group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                  <val.icon size={36} strokeWidth={1.5} />
                </div>
                <h4 className="font-serif font-bold text-xl mb-3 text-white">{val.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
