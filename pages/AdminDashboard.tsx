import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFeedback } from '../contexts/FeedbackContext';
import { useGallery } from '../contexts/GalleryContext';
import { useContent } from '../contexts/ContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Lock, LogOut, Trash2, Star, ShieldCheck, 
  Image as ImageIcon, Upload, Loader2, X, LayoutDashboard, 
  Briefcase, FileText, Plus, Edit2, Save
} from 'lucide-react';
import DynamicIcon from '../components/DynamicIcon';
import { ICON_MAP } from '../constants';

type Tab = 'dashboard' | 'services' | 'gallery' | 'feedback' | 'content';

const AdminDashboard: React.FC = () => {
  const { isAdmin, login, logout, loading: authLoading } = useAuth();
  const { reviews, deleteReview } = useFeedback();
  const { galleryItems, uploadImage, deleteImage } = useGallery();
  const { services, businessInfo, siteContent, updateService, addService, deleteService, updateBusinessInfo, updateSiteContent } = useContent();
  const { t } = useLanguage();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  
  // Service Modal State
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [serviceForm, setServiceForm] = useState({ title: '', description: '', iconName: 'Tent' });
  const [serviceImageFile, setServiceImageFile] = useState<File | null>(null);

  // Gallery Upload State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Wedding');
  const [isUploading, setIsUploading] = useState(false);

  // Content Edit State
  const [editInfo, setEditInfo] = useState(businessInfo);
  const [editContent, setEditContent] = useState(siteContent);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error || 'Login failed');
    }
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      if (editingService) {
        // Edit mode (image update not implemented in this simple modal for brevity, but model supports it)
        await updateService({ ...editingService, ...serviceForm });
      } else {
        // Add mode
        await addService(serviceForm, serviceImageFile || undefined);
      }
      setIsServiceModalOpen(false);
      setEditingService(null);
      setServiceForm({ title: '', description: '', iconName: 'Tent' });
      setServiceImageFile(null);
    } catch (e) {
      console.error(e);
      alert('Error saving service');
    } finally {
      setIsUploading(false);
    }
  };

  const openEditService = (service: any) => {
    setEditingService(service);
    setServiceForm({ title: service.title, description: service.description, iconName: service.iconName });
    setIsServiceModalOpen(true);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile || !uploadTitle) return;

    setIsUploading(true);
    try {
      await uploadImage(uploadFile, uploadTitle, uploadCategory);
      setUploadFile(null);
      setUploadTitle('');
      alert('Image uploaded successfully');
    } catch (e: any) {
      alert('Failed to upload image. ' + (e.message || ''));
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveContent = async () => {
    setIsUploading(true);
    await updateBusinessInfo(editInfo);
    await updateSiteContent(editContent);
    setIsUploading(false);
    alert('Website content updated successfully!');
  };

  // Auth Guard
  if (authLoading) return <div className="min-h-screen bg-brand-dark flex items-center justify-center"><Loader2 className="animate-spin text-brand-gold" /></div>;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#120808] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-[50px]"></div>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-gold/20">
              <Lock className="text-brand-gold" size={32} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-white">{t.admin.login_title}</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
               <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all mb-4" required />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t.admin.password_placeholder} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all" required />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" className="w-full bg-brand-gold text-black font-bold py-3 rounded-lg uppercase tracking-widest hover:bg-white transition-colors">{t.admin.login_btn}</button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER FUNCTIONS ---

  const renderSidebar = () => (
    <div className="w-full md:w-64 bg-[#120808] border-r border-white/10 flex-shrink-0 flex flex-col min-h-[calc(100vh-80px)] md:min-h-screen">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-serif font-bold text-white">Admin<span className="text-brand-gold">Panel</span></h2>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'services', label: 'Services', icon: Briefcase },
          { id: 'gallery', label: 'Gallery', icon: ImageIcon },
          { id: 'feedback', label: 'Feedback', icon: Star },
          { id: 'content', label: 'Site Content', icon: FileText },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as Tab)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
              activeTab === item.id ? 'bg-brand-gold text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider text-red-500 hover:bg-red-500/10">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[
        { label: 'Total Services', value: services.length, icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { label: 'Gallery Images', value: galleryItems.length, icon: ImageIcon, color: 'text-purple-400', bg: 'bg-purple-400/10' },
        { label: 'Total Feedback', value: reviews.length, icon: Star, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
        { label: 'Average Rating', value: '4.8', icon: ShieldCheck, color: 'text-green-400', bg: 'bg-green-400/10' },
      ].map((stat, i) => (
        <div key={i} className="bg-[#120808] border border-white/10 p-6 rounded-xl flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
            <stat.icon size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            <p className="text-gray-400 text-xs uppercase tracking-wider">{stat.label}</p>
          </div>
        </div>
      ))}
      
      {/* Recent Activity / Feedback Preview */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-[#120808] border border-white/10 rounded-xl p-6 mt-6">
        <h3 className="text-lg font-bold text-white mb-4">Latest Feedback</h3>
        <div className="space-y-4">
            {reviews.slice(0, 3).map(r => (
                <div key={r.id} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <div>
                        <p className="text-white font-bold">{r.name}</p>
                        <p className="text-gray-400 text-sm truncate max-w-md">"{r.text}"</p>
                    </div>
                    <div className="flex gap-1 text-brand-gold">
                        {[...Array(r.rating)].map((_,i) => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                </div>
            ))}
            {reviews.length === 0 && <p className="text-gray-500">No feedback yet.</p>}
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-white">Manage Services</h2>
        <button onClick={() => { setEditingService(null); setServiceForm({ title: '', description: '', iconName: 'Tent' }); setIsServiceModalOpen(true); }} className="flex items-center gap-2 bg-brand-gold text-black px-4 py-2 rounded-lg font-bold text-sm uppercase">
          <Plus size={16} /> Add Service
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map(service => (
          <div key={service.id} className="bg-[#120808] border border-white/10 p-4 rounded-xl flex justify-between items-start group">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-lg flex items-center justify-center text-brand-gold overflow-hidden">
                {service.imageUrl ? (
                    <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
                ) : (
                    <DynamicIcon name={service.iconName} size={24} />
                )}
              </div>
              <div>
                <h3 className="text-white font-bold">{service.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">{service.description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEditService(service)} className="p-2 bg-white/5 rounded text-gray-300 hover:text-brand-gold"><Edit2 size={16} /></button>
              <button onClick={() => deleteService(service.id, service.imageUrl)} className="p-2 bg-red-500/10 rounded text-red-500 hover:bg-red-500 hover:text-white"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">Business Info</h3>
        {Object.entries(editInfo).map(([key, value]) => (
           key !== 'rating' && (
            <div key={key}>
                <label className="block text-gray-400 text-xs uppercase font-bold mb-1">{key}</label>
                <input 
                    type="text" 
                    value={value as string}
                    onChange={(e) => setEditInfo({...editInfo, [key]: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm"
                />
            </div>
           )
        ))}
      </div>
      
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">Hero Section</h3>
        <div>
            <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Tagline</label>
            <input type="text" value={editContent.hero.tagline} onChange={(e) => setEditContent({...editContent, hero: {...editContent.hero, tagline: e.target.value}})} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm" />
        </div>
        <div>
            <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Title Line 1</label>
            <input type="text" value={editContent.hero.title_line1} onChange={(e) => setEditContent({...editContent, hero: {...editContent.hero, title_line1: e.target.value}})} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm" />
        </div>
        <div>
            <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Title Line 2</label>
            <input type="text" value={editContent.hero.title_line2} onChange={(e) => setEditContent({...editContent, hero: {...editContent.hero, title_line2: e.target.value}})} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm" />
        </div>
        <button onClick={handleSaveContent} disabled={isUploading} className="w-full bg-brand-gold text-black font-bold py-3 rounded-lg uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2">
            {isUploading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
        </button>
      </div>
    </div>
  );

  const renderFeedback = () => (
     <div className="bg-[#120808] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/10 bg-white/5">
            <h3 className="font-bold text-brand-gold uppercase tracking-widest text-sm">Customer Feedback ({reviews.length})</h3>
        </div>
        <div className="divide-y divide-white/5">
            {reviews.map((review) => (
                <div key={review.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h4 className="text-white font-bold">{review.name}</h4>
                            <div className="flex text-brand-gold">{[...Array(5)].map((_, i) => <Star key={i} size={10} className={i < review.rating ? "fill-current" : "text-gray-700"} />)}</div>
                        </div>
                        <p className="text-gray-400 text-sm">"{review.text}"</p>
                        <p className="text-xs text-gray-600 mt-1">{review.date}</p>
                    </div>
                    <button onClick={() => deleteReview(review.id)} className="flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-500 rounded text-xs font-bold uppercase hover:bg-red-500 hover:text-white transition-colors">
                        <Trash2 size={14} /> Delete
                    </button>
                </div>
            ))}
        </div>
     </div>
  );

  const renderGallery = () => (
    <div className="space-y-8">
        {/* Upload */}
        <div className="bg-[#120808] border border-white/5 rounded-2xl p-6">
            <h3 className="font-bold text-brand-gold uppercase tracking-widest text-sm mb-6 flex items-center gap-2"><Upload size={16} /> Upload New Image</h3>
            <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="md:col-span-1">
                     <label className="block text-gray-400 text-xs uppercase font-bold mb-2">Title</label>
                     <input type="text" value={uploadTitle} onChange={(e) => setUploadTitle(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white" required />
                </div>
                <div className="md:col-span-1">
                    <label className="block text-gray-400 text-xs uppercase font-bold mb-2">Category</label>
                    <select value={uploadCategory} onChange={(e) => setUploadCategory(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white [&>option]:bg-black">
                        {['Wedding', 'Tent', 'Lighting', 'Party'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="md:col-span-1">
                    <label className="block text-gray-400 text-xs uppercase font-bold mb-2">File</label>
                    <input type="file" accept="image/*" onChange={(e) => setUploadFile(e.target.files ? e.target.files[0] : null)} className="w-full text-gray-400 text-xs" required />
                </div>
                <div className="md:col-span-1">
                    <button type="submit" disabled={isUploading} className="w-full bg-brand-gold text-black font-bold py-2.5 rounded uppercase text-xs tracking-widest hover:bg-white disabled:opacity-50">
                        {isUploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
            </form>
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {galleryItems.map((item) => (
                <div key={item.id} className="relative group rounded-lg overflow-hidden border border-white/10 aspect-square">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                        <p className="text-white text-xs font-bold mb-1">{item.title}</p>
                        <p className="text-brand-gold text-[10px] uppercase mb-3">{item.category}</p>
                        <button onClick={() => deleteImage(item.id, item.imageUrl)} className="text-red-500 hover:text-white bg-white/10 p-2 rounded-full"><Trash2 size={16} /></button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-brand-dark pt-20 md:pt-0">
      {renderSidebar()}
      <div className="flex-grow p-6 md:p-10 overflow-y-auto">
        <h1 className="text-3xl font-serif font-bold text-white mb-2 capitalize">{activeTab}</h1>
        <p className="text-gray-400 mb-8">Manage your website content securely.</p>
        
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'services' && renderServices()}
        {activeTab === 'gallery' && renderGallery()}
        {activeTab === 'feedback' && renderFeedback()}
        {activeTab === 'content' && renderContent()}
      </div>

      {/* Service Modal */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#1a1515] border border-white/10 p-8 rounded-2xl w-full max-w-lg relative">
            <button onClick={() => setIsServiceModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={24} /></button>
            <h3 className="text-xl font-bold text-white mb-6">{editingService ? 'Edit Service' : 'Add New Service'}</h3>
            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Title</label>
                <input type="text" value={serviceForm.title} onChange={e => setServiceForm({...serviceForm, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white" required />
              </div>
              <div>
                <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Description</label>
                <textarea rows={3} value={serviceForm.description} onChange={e => setServiceForm({...serviceForm, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white" required />
              </div>
              <div>
                  <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Image (Optional)</label>
                  <input type="file" accept="image/*" onChange={(e) => setServiceImageFile(e.target.files ? e.target.files[0] : null)} className="w-full text-gray-400 text-xs mb-2" />
                  <p className="text-xs text-gray-500 mb-2">Or select an icon below:</p>
              </div>
              <div>
                <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Icon (Fallback)</label>
                <div className="grid grid-cols-6 gap-2 h-32 overflow-y-auto bg-white/5 p-2 rounded border border-white/10">
                   {Object.keys(ICON_MAP).map(iconName => (
                     <button key={iconName} type="button" onClick={() => setServiceForm({...serviceForm, iconName})} className={`p-2 rounded flex items-center justify-center ${serviceForm.iconName === iconName ? 'bg-brand-gold text-black' : 'text-gray-400 hover:bg-white/10'}`}>
                        <DynamicIcon name={iconName} size={20} />
                     </button>
                   ))}
                </div>
              </div>
              <button type="submit" disabled={isUploading} className="w-full bg-brand-gold text-black font-bold py-3 rounded-lg uppercase tracking-widest hover:bg-white transition-colors">
                  {isUploading ? 'Saving...' : 'Save Service'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
