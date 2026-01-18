import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { X, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useGallery } from '../contexts/GalleryContext';

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t } = useLanguage();
  const { galleryItems, loading } = useGallery();
  
  const categories = [
    { id: 'All', label: t.gallery_page.filters.all },
    { id: 'Wedding', label: t.gallery_page.filters.wedding },
    { id: 'Tent', label: t.gallery_page.filters.tent },
    { id: 'Lighting', label: t.gallery_page.filters.lighting },
    { id: 'Party', label: t.gallery_page.filters.party }
  ];

  const filteredItems = filter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  if (loading) {
     return (
        <div className="min-h-screen bg-brand-dark flex items-center justify-center pt-32">
            <div className="flex flex-col items-center gap-4">
              <div className="loader-spinner"></div>
              <p className="text-brand-gold text-sm uppercase tracking-widest animate-pulse">Loading Gallery...</p>
            </div>
        </div>
     );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-brand-dark relative">
      {/* Background Decor */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle title={t.gallery_page.title} subtitle={t.gallery_page.subtitle} />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in-up">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 border backdrop-blur-sm ${
                filter === cat.id 
                  ? 'bg-brand-gold text-brand-dark border-brand-gold shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105' 
                  : 'bg-white/5 text-gray-400 border-white/10 hover:border-brand-gold hover:text-brand-gold hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, idx) => (
            <div 
                key={item.id} 
                className="break-inside-avoid relative group overflow-hidden rounded-xl cursor-pointer border border-white/10 shadow-2xl animate-fade-in-up"
                style={{animationDelay: `${idx * 0.05}s`}}
                onClick={() => setSelectedImage(item.imageUrl)}
            >
              <div className="aspect-w-4 aspect-h-3 bg-gray-900 relative">
                 <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    loading="lazy"
                />
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                {/* @ts-ignore */}
                <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{t.gallery_page.filters[item.category.toLowerCase()] || item.category}</span>
                <h4 className="text-white font-serif text-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.title}</h4>
                <div className="w-12 h-[2px] bg-brand-gold mt-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100"></div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-32 text-gray-500 font-light flex flex-col items-center">
            <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-4">
               <X className="text-gray-600" />
            </div>
            {t.gallery_page.empty}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in-up duration-300" onClick={() => setSelectedImage(null)}>
            <button className="absolute top-6 right-6 text-white/50 hover:text-brand-gold transition-colors z-50 p-2 hover:bg-white/10 rounded-full">
                <X size={32} />
            </button>
            <img 
                src={selectedImage} 
                alt="Full View" 
                className="max-w-full max-h-[90vh] rounded-lg shadow-2xl border border-white/10" 
                onClick={(e) => e.stopPropagation()}
            />
        </div>
      )}
    </div>
  );
};

export default Gallery;