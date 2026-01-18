import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: 'Wedding',
    message: ''
  });
  const { t } = useLanguage();
  const { businessInfo } = useContent();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi, I am interested in ${formData.eventType}. Name: ${formData.name}, Phone: ${formData.phone}. Message: ${formData.message}`;
    const whatsappUrl = `https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="pt-40 pb-20 bg-brand-dark min-h-screen relative overflow-hidden scene-3d">
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-brand-maroon/20 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle title={t.contact_page.title} subtitle={t.contact_page.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 card-3d-wrapper perspective-2000 mt-10">
          
          {/* Info Section - Floating Glass Panel */}
          <div className="card-3d glass-panel p-10 md:p-14 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
            
            <h3 className="card-layer-mid text-4xl font-serif font-bold text-white mb-10 relative z-10">{t.contact_page.info_title}</h3>
            
            <div className="space-y-12 mb-16 relative z-10">
              <div className="flex items-start gap-8 group/item card-layer-base">
                <div className="w-16 h-16 rounded-full bg-brand-gold/5 border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover/item:bg-brand-gold group-hover/item:text-black transition-all shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                    <MapPin size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-gold mb-3 text-xs uppercase tracking-widest">{t.contact_page.labels.address}</h4>
                  <p className="text-gray-300 font-light leading-relaxed text-lg">{businessInfo.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-8 group/item card-layer-base">
                <div className="w-16 h-16 rounded-full bg-brand-gold/5 border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover/item:bg-brand-gold group-hover/item:text-black transition-all shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                    <Phone size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-gold mb-3 text-xs uppercase tracking-widest">{t.contact_page.labels.phone}</h4>
                  <p className="text-gray-300 font-light text-lg">{businessInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-8 group/item card-layer-base">
                <div className="w-16 h-16 rounded-full bg-brand-gold/5 border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover/item:bg-brand-gold group-hover/item:text-black transition-all shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                    <Mail size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-gold mb-3 text-xs uppercase tracking-widest">{t.contact_page.labels.email}</h4>
                  <p className="text-gray-300 font-light text-lg">{businessInfo.email}</p>
                </div>
              </div>
            </div>

            <div className="card-layer-base w-full h-72 bg-gray-900 rounded-xl overflow-hidden border border-white/10 relative z-10 grayscale hover:grayscale-0 transition-all duration-700 shadow-inner">
              <iframe 
                src={businessInfo.mapsLink} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>

          {/* Form Section - Recessed Dark Panel */}
          <div className="card-3d bg-black/60 backdrop-blur-xl border border-white/5 rounded-2xl p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <h3 className="card-layer-mid text-3xl font-serif font-bold text-white mb-3">{t.contact_page.form_title}</h3>
            <p className="text-gray-500 mb-12 font-light text-sm">{t.contact_page.form_sub}</p>
            
            <form onSubmit={handleSubmit} className="space-y-10 card-layer-base">
              <div className="relative group">
                <input 
                    type="text" name="name" required value={formData.name} onChange={handleChange} 
                    className="w-full bg-white/5 border-b border-white/10 text-white px-4 py-5 focus:border-brand-gold outline-none transition-all peer focus:bg-white/10 rounded-t-lg" 
                    placeholder=" " 
                />
                <label className="absolute left-4 top-5 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-brand-gold peer-focus:text-xs peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs pointer-events-none">{t.contact_page.fields.name}</label>
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-500 peer-focus:w-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative group">
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-white/5 border-b border-white/10 text-white px-4 py-5 focus:border-brand-gold outline-none transition-all peer focus:bg-white/10 rounded-t-lg" placeholder=" " />
                  <label className="absolute left-4 top-5 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-brand-gold peer-focus:text-xs peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs pointer-events-none">{t.contact_page.fields.phone}</label>
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-500 peer-focus:w-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                </div>
                <div className="relative group">
                  <select name="eventType" value={formData.eventType} onChange={handleChange} className="w-full bg-white/5 border-b border-white/10 text-white px-4 py-5 focus:border-brand-gold outline-none transition-all [&>option]:bg-black rounded-t-lg">
                    <option value="Wedding">{t.contact_page.event_options.wedding}</option>
                    <option value="Reception">{t.contact_page.event_options.reception}</option>
                    <option value="Birthday">{t.contact_page.event_options.birthday}</option>
                    <option value="Corporate">{t.contact_page.event_options.corporate}</option>
                    <option value="Other">{t.contact_page.event_options.other}</option>
                  </select>
                  <label className="absolute left-4 -top-3 text-brand-gold text-xs pointer-events-none">{t.contact_page.fields.event_type}</label>
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-500 peer-focus:w-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                </div>
              </div>

              <div className="relative group">
                <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full bg-white/5 border-b border-white/10 text-white px-4 py-5 focus:border-brand-gold outline-none transition-all peer resize-none focus:bg-white/10 rounded-t-lg" placeholder=" "></textarea>
                 <label className="absolute left-4 top-5 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-brand-gold peer-focus:text-xs peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs pointer-events-none">{t.contact_page.fields.message}</label>
                 <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-500 peer-focus:w-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
              </div>

              <button type="submit" className="btn-cinematic w-full bg-gradient-to-r from-brand-gold to-[#b49021] text-black font-bold py-6 rounded-sm flex items-center justify-center gap-3 shadow-lg uppercase tracking-[0.2em] text-sm mt-4">
                <MessageCircle size={20} /> {t.contact_page.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;