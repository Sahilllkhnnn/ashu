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
    <div className="pt-32 pb-20 bg-brand-dark min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-brand-maroon/10 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle title={t.contact_page.title} subtitle={t.contact_page.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-[#120808] border border-white/10 rounded-2xl shadow-2xl overflow-hidden card-3d-wrapper animate-fade-in-up">
          
          {/* Info Section */}
          <div className="bg-gradient-to-br from-[#1a0505] to-black p-10 md:p-14 border-r border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
            
            <h3 className="text-3xl font-serif font-bold text-white mb-8 relative z-10">{t.contact_page.info_title}</h3>
            
            <div className="space-y-10 mb-12 relative z-10">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full bg-brand-gold/5 border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                    <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-gold mb-2 text-xs uppercase tracking-widest">{t.contact_page.labels.address}</h4>
                  <p className="text-gray-300 font-light leading-relaxed text-lg">{businessInfo.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-brand-gold/5 border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                    <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-gold mb-2 text-xs uppercase tracking-widest">{t.contact_page.labels.phone}</h4>
                  <p className="text-gray-300 font-light text-lg">{businessInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-brand-gold/5 border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                    <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-gold mb-2 text-xs uppercase tracking-widest">{t.contact_page.labels.email}</h4>
                  <p className="text-gray-300 font-light text-lg">{businessInfo.email}</p>
                </div>
              </div>
            </div>

            <div className="w-full h-64 bg-gray-900 rounded-xl overflow-hidden border border-white/10 relative z-10 grayscale hover:grayscale-0 transition-all duration-700 shadow-inner">
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

          {/* Form Section */}
          <div className="p-10 md:p-14 bg-black/40 relative">
            <h3 className="text-3xl font-serif font-bold text-white mb-2">{t.contact_page.form_title}</h3>
            <p className="text-gray-500 mb-10 font-light text-sm">{t.contact_page.form_sub}</p>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative group">
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-transparent border-b border-gray-800 text-white px-0 py-4 focus:border-brand-gold outline-none transition-colors peer" placeholder=" " />
                <label className="absolute left-0 top-4 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-brand-gold peer-focus:text-xs peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs pointer-events-none">{t.contact_page.fields.name}</label>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-500 peer-focus:w-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-transparent border-b border-gray-800 text-white px-0 py-4 focus:border-brand-gold outline-none transition-colors peer" placeholder=" " />
                  <label className="absolute left-0 top-4 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-brand-gold peer-focus:text-xs peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs pointer-events-none">{t.contact_page.fields.phone}</label>
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-500 peer-focus:w-full"></div>
                </div>
                <div className="relative group">
                  <select name="eventType" value={formData.eventType} onChange={handleChange} className="w-full bg-transparent border-b border-gray-800 text-white px-0 py-4 focus:border-brand-gold outline-none transition-colors [&>option]:bg-black">
                    <option value="Wedding">{t.contact_page.event_options.wedding}</option>
                    <option value="Reception">{t.contact_page.event_options.reception}</option>
                    <option value="Birthday">{t.contact_page.event_options.birthday}</option>
                    <option value="Corporate">{t.contact_page.event_options.corporate}</option>
                    <option value="Other">{t.contact_page.event_options.other}</option>
                  </select>
                  <label className="absolute left-0 -top-4 text-brand-gold text-xs pointer-events-none">{t.contact_page.fields.event_type}</label>
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-500 peer-focus:w-full"></div>
                </div>
              </div>

              <div className="relative group">
                <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full bg-transparent border-b border-gray-800 text-white px-0 py-4 focus:border-brand-gold outline-none transition-colors peer resize-none" placeholder=" "></textarea>
                 <label className="absolute left-0 top-4 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-brand-gold peer-focus:text-xs peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs pointer-events-none">{t.contact_page.fields.message}</label>
                 <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-500 peer-focus:w-full"></div>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-brand-gold to-[#b49021] text-black font-bold py-5 rounded-sm hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-all duration-500 flex items-center justify-center gap-2 shadow-lg uppercase tracking-[0.2em] text-sm">
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