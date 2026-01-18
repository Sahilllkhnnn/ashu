import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Service, BusinessInfo, SiteContent } from '../types';
import { DEFAULT_BUSINESS_INFO, DEFAULT_SERVICES, DEFAULT_CONTENT } from '../constants';

interface ContentContextType {
  services: Service[];
  businessInfo: BusinessInfo;
  siteContent: SiteContent;
  updateService: (service: Service) => Promise<void>;
  addService: (service: Omit<Service, 'id'>, imageFile?: File) => Promise<void>;
  deleteService: (id: string, imageUrl?: string) => Promise<void>;
  updateBusinessInfo: (info: BusinessInfo) => Promise<void>;
  updateSiteContent: (content: SiteContent) => Promise<void>;
  loading: boolean;
  refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(DEFAULT_BUSINESS_INFO);
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  const refreshContent = async () => {
    setLoading(true);
    try {
      // 1. Fetch Services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });

      if (servicesError) {
        console.warn("Supabase services fetch failed (likely empty table):", servicesError.message);
      } else if (servicesData && servicesData.length > 0) {
        setServices(servicesData.map(s => ({
          id: s.id,
          title: s.title,
          description: s.description,
          iconName: s.icon_name || 'Tent',
          imageUrl: s.image_url,
          category: s.category,
          active: s.active
        })));
      }

      // 2. Fetch Settings
      const { data: settingsData, error: settingsError } = await supabase.from('settings').select('*');
      
      if (!settingsError && settingsData) {
        settingsData.forEach(item => {
          if (item.key === 'business_info') setBusinessInfo(item.value);
          if (item.key === 'site_content') setSiteContent(item.value);
        });
      }

    } catch (err) {
      console.error('Unexpected error fetching content:', err);
      // Fallback to defaults is already set in initial state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshContent();
  }, []);

  const addService = async (service: Omit<Service, 'id'>, imageFile?: File) => {
    try {
      let imageUrl = service.imageUrl;

      if (imageFile) {
        // Upload to 'service-images' bucket
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('service-images')
          .upload(fileName, imageFile);
        
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('service-images')
          .getPublicUrl(fileName);
          
        imageUrl = publicUrl;
      }

      const { error } = await supabase.from('services').insert([{
        title: service.title,
        description: service.description,
        icon_name: service.iconName,
        image_url: imageUrl,
        category: service.category
      }]);
      
      if (error) throw error;
      await refreshContent();
    } catch (e) {
      console.error("Add service error", e);
      throw e;
    }
  };

  const updateService = async (service: Service) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({
          title: service.title,
          description: service.description,
          icon_name: service.iconName,
          image_url: service.imageUrl
        })
        .eq('id', service.id);

      if (error) throw error;
      await refreshContent();
    } catch (e) {
      console.error("Update service error", e);
      throw e;
    }
  };

  const deleteService = async (id: string, imageUrl?: string) => {
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;

      if (imageUrl) {
        const urlParts = imageUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];
        if (fileName && fileName.trim() !== '') {
            await supabase.storage.from('service-images').remove([fileName]);
        }
      }

      await refreshContent();
    } catch (e) {
      console.error("Delete service error", e);
      throw e;
    }
  };

  const updateBusinessInfo = async (info: BusinessInfo) => {
    try {
      await supabase.from('settings').upsert({ key: 'business_info', value: info });
      setBusinessInfo(info);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const updateSiteContent = async (content: SiteContent) => {
    try {
      await supabase.from('settings').upsert({ key: 'site_content', value: content });
      setSiteContent(content);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  return (
    <ContentContext.Provider value={{
      services,
      businessInfo,
      siteContent,
      updateService,
      addService,
      deleteService,
      updateBusinessInfo,
      updateSiteContent,
      loading,
      refreshContent
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
