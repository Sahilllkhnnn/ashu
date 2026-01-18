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
    <div className="pt-40 pb-20 min-h-screen bg-brand-dark relative scene-3d">
      {/* Background Decor */}
      <div className="absolute top-20 right-0 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle title={t.gallery_page.title} subtitle={t.gallery_page.subtitle} />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-6 mb-20 animate-fade-in-up">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-10 py-3 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 border backdrop-blur-md relative overflow-hidden group ${
                filter === cat.id 
                  ? 'bg-brand-gold text-brand-dark border-brand-gold shadow-[0_0_25px_rgba(212,175,55,0.4)] scale-110' 
                  : 'bg-white/5 text-gray-400 border-white/10 hover:border-brand-gold hover:text-brand-gold'
              }`}
            >
              <span className="relative z-10">{cat.label}</span>
              {filter !== cat.id && <div className="absolute inset-0 bg-brand-gold/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>}
            </button>
          ))}
        </div>

        {/* 3D Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 px-4">
          {filteredItems.map((item, idx) => (
            <div 
                key={item.id} 
                className="break-inside-avoid card-3d-wrapper animate-fade-in-up"
                style={{animationDelay: `${idx * 0.05}s`}}
                onClick={() => setSelectedImage(item.imageUrl)}
            >
              <div className="card-3d relative group rounded-lg cursor-pointer bg-black shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-white/10 hover:border-brand-gold/40">
                  {/* Floating Frame Effect */}
                  <div className="aspect-w-4 aspect-h-3 overflow-hidden relative rounded-lg">
                    <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  
                  {/* Hover Overlay - Floating above */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 card-layer-mid">
                    {/* @ts-ignore */}
                    <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{t.gallery_page.filters[item.category.toLowerCase()] || item.category}</span>
                    <h4 className="text-white font-serif text-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 drop-shadow-md">{item.title}</h4>
                    <div className="w-16 h-[2px] bg-brand-gold mt-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100 shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
                  </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-32 text-gray-500 font-light flex flex-col items-center">
            <div className="w-20 h-20 border border-white/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
               <X className="text-gray-600" size={32} />
            </div>
            <p className="text-lg tracking-widest uppercase">{t.gallery_page.empty}</p>
          </div>
        )}
      </div>

      {/* Cinematic Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-fade-in-up duration-300" onClick={() => setSelectedImage(null)}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1),transparent)] pointer-events-none"></div>
            <button className="absolute top-8 right-8 text-white/50 hover:text-brand-gold transition-colors z-50 p-4 hover:bg-white/5 rounded-full">
                <X size={40} />
            </button>
            <div className="relative max-w-7xl max-h-[90vh] card-3d-wrapper">
                <img 
                    src={selectedImage} 
                    alt="Full View" 
                    className="max-w-full max-h-[90vh] rounded-xl shadow-[0_0_100px_rgba(0,0,0,0.9)] border border-white/10 card-layer-mid" 
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;