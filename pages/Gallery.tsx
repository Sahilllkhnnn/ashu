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
            <Loader2 className="animate-spin text-brand-gold" size={48} />
        </div>
     );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-brand-dark">
      <div className="container mx-auto px-6">
        <SectionTitle title={t.gallery_page.title} subtitle={t.gallery_page.subtitle} />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 border ${
                filter === cat.id 
                  ? 'bg-brand-gold text-brand-dark border-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-brand-gold hover:text-brand-gold'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry-ish Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, idx) => (
            <div 
                key={item.id} 
                className="break-inside-avoid relative group overflow-hidden rounded-xl cursor-pointer border border-white/5 animate-fade-in-up"
                style={{animationDelay: `${idx * 0.05}s`}}
                onClick={() => setSelectedImage(item.imageUrl)}
            >
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-brand-maroon/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                {/* Map category ID to translation safely */}
                {/* @ts-ignore */}
                <span className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{t.gallery_page.filters[item.category.toLowerCase()] || item.category}</span>
                <h4 className="text-white font-serif text-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-gray-500 font-light italic">
            {t.gallery_page.empty}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in-up duration-300" onClick={() => setSelectedImage(null)}>
            <button className="absolute top-6 right-6 text-white hover:text-brand-gold transition-colors">
                <X size={40} />
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
