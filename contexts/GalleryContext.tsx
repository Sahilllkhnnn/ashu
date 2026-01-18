import React, { createContext, useContext, useState, useEffect } from 'react';
import { GalleryItem } from '../types';
import { supabase } from '../lib/supabaseClient';
import { GALLERY_ITEMS as DEFAULT_GALLERY } from '../constants';

interface GalleryContextType {
  galleryItems: GalleryItem[];
  uploadImage: (file: File, title: string, category: string) => Promise<void>;
  deleteImage: (id: string, imageUrl: string) => Promise<void>;
  loading: boolean;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        const formattedItems: GalleryItem[] = data.map(item => ({
          id: item.id,
          title: item.title,
          category: item.category,
          imageUrl: item.image_url,
        }));
        setGalleryItems(formattedItems);
      } else {
        setGalleryItems(DEFAULT_GALLERY);
      }
    } catch (err) {
      console.error('Error fetching gallery:', err);
      setGalleryItems(DEFAULT_GALLERY);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const uploadImage = async (file: File, title: string, category: string) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase.from('gallery').insert([{
        title,
        category,
        image_url: publicUrl,
      }]);

      if (dbError) throw dbError;

      await fetchGallery();
    } catch (err) {
      console.error('Error uploading image:', err);
      throw err;
    }
  };

  const deleteImage = async (id: string, imageUrl: string) => {
    try {
      const { error: dbError } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      // Extract filename from URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      if (fileName) {
        await supabase.storage.from('gallery-images').remove([fileName]);
      }

      setGalleryItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting image:', err);
      throw err;
    }
  };

  return (
    <GalleryContext.Provider value={{ galleryItems, uploadImage, deleteImage, loading }}>
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};
