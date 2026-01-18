import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
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
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-brand-maroon/20 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle title={t.contact_page.title} subtitle={t.contact_page.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-[#120808] border border-white/10 rounded-2xl shadow-2xl overflow-hidden card-3d-wrapper">
          
          <div className="bg-brand-maroon/10 p-10 md:p-14 border-r border-white/5 relative">
            <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
            <h3 className="text-3xl font-serif font-bold text-white mb-8 relative z-10">{t.contact_page.info_title}</h3>
            <div className="space-y-8 mb-12 relative z-10">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all">
                    <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-gold mb-1 text-sm uppercase tracking-wider">{t.contact_page.labels.address}</h4>
                  <p className="text-gray-300 font-light leading-relaxed">{businessInfo.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all">
                    <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-gold mb-1 text-sm uppercase tracking-wider">{t.contact_page.labels.phone}</h4>
                  <p className="text-gray-300 font-light">{businessInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all">
                    <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-gold mb-1 text-sm uppercase tracking-wider">{t.contact_page.labels.email}</h4>
                  <p className="text-gray-300 font-light">{businessInfo.email}</p>
                </div>
              </div>
            </div>

            <div className="w-full h-64 bg-gray-900 rounded-xl overflow-hidden border border-white/10 relative z-10 grayscale hover:grayscale-0 transition-all duration-500">
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

          <div className="p-10 md:p-14 bg-black/40">
            <h3 className="text-3xl font-serif font-bold text-white mb-2">{t.contact_page.form_title}</h3>
            <p className="text-gray-500 mb-10 font-light text-sm">{t.contact_page.form_sub}</p>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative group">
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-transparent border-b border-gray-700 text-white px-0 py-3 focus:border-brand-gold outline-none transition-colors peer" placeholder=" " />
                <label className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-brand-gold peer-focus:text-xs peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs pointer-events-none">{t.contact_page.fields.name}</label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-transparent border-b border-gray-700 text-white px-0 py-3 focus:border-brand-gold outline-none transition-colors peer" placeholder=" " />
                  <label className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-brand-gold peer-focus:text-xs peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs pointer-events-none">{t.contact_page.fields.phone}</label>
                </div>
                <div className="relative group">
                  <select name="eventType" value={formData.eventType} onChange={handleChange} className="w-full bg-transparent border-b border-gray-700 text-white px-0 py-3 focus:border-brand-gold outline-none transition-colors [&>option]:bg-black">
                    <option value="Wedding">{t.contact_page.event_options.wedding}</option>
                    <option value="Reception">{t.contact_page.event_options.reception}</option>
                    <option value="Birthday">{t.contact_page.event_options.birthday}</option>
                    <option value="Corporate">{t.contact_page.event_options.corporate}</option>
                    <option value="Other">{t.contact_page.event_options.other}</option>
                  </select>
                  <label className="absolute left-0 -top-4 text-brand-gold text-xs pointer-events-none">{t.contact_page.fields.event_type}</label>
                </div>
              </div>

              <div className="relative group">
                <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full bg-transparent border-b border-gray-700 text-white px-0 py-3 focus:border-brand-gold outline-none transition-colors peer resize-none" placeholder=" "></textarea>
                 <label className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-brand-gold peer-focus:text-xs peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs pointer-events-none">{t.contact_page.fields.message}</label>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-brand-maroon to-brand-red text-white font-bold py-4 rounded-sm hover:from-brand-gold hover:to-brand-goldLight hover:text-black transition-all duration-500 flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest text-sm">
                <MessageCircle size={18} /> {t.contact_page.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
