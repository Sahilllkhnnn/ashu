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

      if (error) {
        console.warn("Supabase fetch error:", error);
        // Don't overwrite with defaults if it's a real error, just show empty
        if (data === null) setGalleryItems(DEFAULT_GALLERY); 
      } else if (data && data.length > 0) {
        const formattedItems: GalleryItem[] = data.map(item => ({
          id: item.id,
          title: item.title,
          category: item.category,
          imageUrl: item.image_url,
        }));
        setGalleryItems(formattedItems);
      } else {
        // If empty table, show defaults for demo purposes, or empty array
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
      // 1. Sanitize filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      // 2. Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, file);

      if (uploadError) throw new Error(`Storage Error: ${uploadError.message}`);

      // 3. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(fileName);

      // 4. Insert into Database
      const { error: dbError } = await supabase.from('gallery').insert([{
        title,
        category,
        image_url: publicUrl,
      }]);

      if (dbError) throw new Error(`Database Error: ${dbError.message}`);

      // 5. Refresh
      await fetchGallery();
    } catch (err) {
      console.error('Error uploading image:', err);
      throw err;
    }
  };

  const deleteImage = async (id: string, imageUrl: string) => {
    try {
      // 1. Delete from DB
      const { error: dbError } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      // 2. Delete from Storage
      if (imageUrl) {
        const urlParts = imageUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];
        if (fileName) {
          await supabase.storage.from('gallery-images').remove([fileName]);
        }
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
