import React, { createContext, useContext, useState, useEffect } from 'react';
import { GalleryItem } from '../types';
import { supabase } from '../lib/supabaseClient';
import { GALLERY_ITEMS as DEFAULT_GALLERY } from '../constants';

interface GalleryContextType {
  galleryItems: GalleryItem[];
  uploadImage: (file: File, title: string, category: string) => Promise<void>;
  deleteImage: (id: number, imageUrl: string) => Promise<void>;
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

      if (error) {
        console.error('Error fetching gallery:', error);
        setGalleryItems(DEFAULT_GALLERY);
      } else if (data) {
        const formattedItems: GalleryItem[] = data.map(item => ({
          id: item.id,
          title: item.title,
          category: item.category,
          imageUrl: item.image_url,
        }));
        setGalleryItems(formattedItems);
      }
    } catch (err) {
      console.error('Error:', err);
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
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      
      // 1. Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(fileName);

      // 3. Insert record into DB
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

  const deleteImage = async (id: number, imageUrl: string) => {
    try {
      // 1. Delete from DB
      const { error: dbError } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      // 2. Delete from storage (Extract filename from URL)
      // URL format: .../storage/v1/object/public/gallery-images/filename
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      if (fileName) {
        const { error: storageError } = await supabase.storage
          .from('gallery-images')
          .remove([fileName]);
          
        if (storageError) console.warn("Storage deletion error (image might persist):", storageError);
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
