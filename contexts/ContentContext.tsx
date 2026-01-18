import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Service, BusinessInfo, SiteContent } from '../types';
import { DEFAULT_BUSINESS_INFO, DEFAULT_SERVICES, DEFAULT_CONTENT } from '../constants';

interface ContentContextType {
  services: Service[];
  businessInfo: BusinessInfo;
  siteContent: SiteContent;
  updateService: (service: Service) => Promise<void>;
  addService: (service: Omit<Service, 'id'>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
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
      // 1. Fetch Services from Supabase
      const { data: servicesData, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching services:', error);
      } else if (servicesData && servicesData.length > 0) {
        setServices(servicesData.map(s => ({
          id: s.id.toString(), // Ensure string ID
          title: s.title,
          description: s.description,
          iconName: s.icon, // DB column 'icon' maps to type 'iconName'
          active: true // Default to true as DB schema might not have active col
        })));
      }

      // 2. Business Info & Content
      // Since specific tables weren't provided for these, we'll keep them static/local
      // or check a generic 'settings' table if available. For now, using Defaults.
      // This ensures the site works even if only 'services' table exists.

    } catch (err) {
      console.error('Error fetching content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshContent();
  }, []);

  const addService = async (service: Omit<Service, 'id'>) => {
    try {
      const { error } = await supabase.from('services').insert([{
        title: service.title,
        description: service.description,
        icon: service.iconName, // Map back to DB column
      }]);
      
      if (error) throw error;
      await refreshContent();
    } catch (e) {
      console.error("Add service error", e);
      // Fallback for demo
      setServices([...services, { ...service, id: Date.now().toString() }]);
    }
  };

  const updateService = async (service: Service) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({
          title: service.title,
          description: service.description,
          icon: service.iconName
        })
        .eq('id', service.id);

      if (error) throw error;
      await refreshContent();
    } catch (e) {
      console.error("Update service error", e);
    }
  };

  const deleteService = async (id: string) => {
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      await refreshContent();
    } catch (e) {
      console.error("Delete service error", e);
    }
  };

  const updateBusinessInfo = async (info: BusinessInfo) => {
    // Implement if settings table exists, else local state only
    setBusinessInfo(info);
  };

  const updateSiteContent = async (content: SiteContent) => {
    // Implement if settings table exists, else local state only
    setSiteContent(content);
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
