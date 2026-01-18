import React, { useState } from 'react';
import { Star, Send, User, Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useFeedback } from '../contexts/FeedbackContext';
import SectionTitle from './SectionTitle';

const FeedbackSection: React.FC = () => {
  const { t } = useLanguage();
  const { reviews, addReview } = useFeedback();
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && rating > 0 && message) {
      const newReview = {
        name,
        rating,
        text: message
      };
      
      try {
        await addReview(newReview);
        setSubmitted(true);
        setName('');
        setMessage('');
        setRating(0);
        
        setTimeout(() => setSubmitted(false), 5000);
      } catch (e) {
        console.error("Failed to submit feedback", e);
      }
    }
  };

  return (
    <section className="py-24 px-6 relative bg-gradient-to-b from-[#120808] to-brand-dark overflow-hidden scene-3d">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full opacity-5 pointer-events-none bg-repeat">
         {/* Simple pattern fallback if image fails */}
         <div className="w-full h-full" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
      </div>
      
      <div className="container mx-auto relative z-10 card-3d-wrapper">
        <SectionTitle title={t.feedback.title} subtitle={t.feedback.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Feedback Form */}
          <div className="glass-dark p-8 md:p-12 rounded-2xl relative shadow-2xl card-3d">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-[60px] pointer-events-none"></div>
            
            <h3 className="text-2xl font-serif font-bold text-white mb-8 flex items-center gap-3 card-layer-mid">
              <span className="w-1 h-8 bg-brand-gold rounded-full"></span>
              {t.feedback.form_heading}
            </h3>

            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-fade-in-up">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                  <Send className="text-green-500" size={32} />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Thank You!</h4>
                <p className="text-gray-400">{t.feedback.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 card-layer-base">
                {/* Rating Input */}
                <div>
                  <label className="block text-sm uppercase tracking-widest text-brand-gold font-bold mb-3">
                    {t.feedback.rating_label}
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="focus:outline-none transition-transform hover:scale-110"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                      >
                        <Star 
                          size={32} 
                          className={`transition-colors duration-200 ${
                            star <= (hoverRating || rating) 
                              ? 'fill-brand-gold text-brand-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]' 
                              : 'fill-transparent text-gray-600'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name Input */}
                <div className="group">
                  <label className="block text-sm text-gray-400 mb-2">{t.feedback.name_label}</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.feedback.name_placeholder}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all"
                      required
                    />
                    <User className="absolute right-4 top-3.5 text-gray-500 group-focus-within:text-brand-gold transition-colors" size={18} />
                  </div>
                </div>

                {/* Message Input */}
                <div className="group">
                  <label className="block text-sm text-gray-400 mb-2">{t.feedback.message_label}</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.feedback.message_placeholder}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all resize-none"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-gold to-[#b49021] text-black font-bold py-4 rounded-lg uppercase tracking-widest hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 btn-cinematic"
                >
                  {t.feedback.submit_btn} <Send size={18} />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Reviews List */}
          <div className="relative card-3d">
             <h3 className="text-2xl font-serif font-bold text-white mb-8 flex items-center gap-3 card-layer-mid">
              <span className="w-1 h-8 bg-brand-red rounded-full"></span>
              {t.feedback.reviews_heading}
            </h3>
            
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-brand-gold/50 card-layer-base">
              {reviews.map((review) => (
                <div key={review.id} className="bg-[#1a1515] p-6 rounded-xl border border-white/5 hover:border-brand-gold/30 transition-all duration-300 group hover:translate-x-2">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-maroon/20 flex items-center justify-center text-brand-gold font-serif font-bold text-lg border border-brand-maroon/30">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg leading-none">{review.name}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={12} 
                              className={i < review.rating ? "fill-brand-gold text-brand-gold" : "text-gray-700"} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">{review.date}</span>
                  </div>
                  
                  <div className="relative">
                    <Quote size={24} className="absolute -top-1 -left-1 text-brand-gold/10 transform rotate-180" />
                    <p className="text-gray-400 text-sm leading-relaxed pl-6 relative z-10 italic">
                      "{review.text}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Decorative bottom fade */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-brand-dark to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;