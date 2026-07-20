import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { apiGet, apiPost, apiPutAuth, apiDeleteAuth } from '../utils/api';
import type { Product } from '../components/Collection';

const ADMIN_TOKEN = 'umbra-admin-secret-2024';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');

  // Shared
  const [loading, setLoading] = useState(false);

  // Products
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productName, setProductName] = useState('');
  const [productTag, setProductTag] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productImage, setProductImage] = useState<File | null>(null);

  // Carousel
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [carouselLoading, setCarouselLoading] = useState(false);

  // Craft
  const [craftTitle, setCraftTitle] = useState('');
  const [craftSubtitle, setCraftSubtitle] = useState('');
  const [craftSteps, setCraftSteps] = useState<Array<{ id?: string; title: string; description: string; imageUrl: string }>>([]);
  const [craftLoading, setCraftLoading] = useState(false);

  // Community
  const [communityTitle, setCommunityTitle] = useState('');
  const [communitySubtitle, setCommunitySubtitle] = useState('');
  const [communityInfluencers, setCommunityInfluencers] = useState<Array<{ id?: string; name: string; videoUrl: string }>>([]);
  const [communityLoading, setCommunityLoading] = useState(false);

  // Media Library
  const [mediaItems, setMediaItems] = useState<Array<{ id: string; url: string; section?: string; title?: string; description?: string }>>([]);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState<any>(null);
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaSection, setMediaSection] = useState('');
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaDescription, setMediaDescription] = useState('');

  // Fetch helpers
  const fetchProducts = async () => {
    try {
      const data = await apiGet<Product[]>('/api/products');
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCarousel = async () => {
    try {
      const data = await apiGet<{ images?: string[] }>('/api/carousel');
      if (data) {
        setCarouselImages(Array.isArray(data.images) ? data.images : []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCraft = async () => {
    try {
      const data = await apiGet<{ title?: string; subtitle?: string; steps?: any[] }>('/api/craft');
      if (data) {
        setCraftTitle(data.title || '');
        setCraftSubtitle(data.subtitle || '');
        setCraftSteps(Array.isArray(data.steps) ? data.steps.map((s: any, i: number) => ({ id: String(i), ...s })) : []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCommunity = async () => {
    try {
      const data = await apiGet<{ title?: string; subtitle?: string; influencers?: any[] }>('/api/community');
      if (data) {
        setCommunityTitle(data.title || '');
        setCommunitySubtitle(data.subtitle || '');
        setCommunityInfluencers(Array.isArray(data.influencers) ? data.influencers.map((inf: any, i: number) => ({ id: String(i), ...inf })) : []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMedia = async () => {
    try {
      const data = await apiGet<any[]>('/api/media');
      setMediaItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCarousel();
    fetchCraft();
    fetchCommunity();
    fetchMedia();
  }, []);

  // Products
  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductName('');
    setProductTag('');
    setProductDesc('');
    setProductImage(null);
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setProductName(product.name);
    setProductTag(product.tag || '');
    setProductDesc(product.description || '');
    setProductImage(null);
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      await apiDeleteAuth(`/api/products/${id}`, ADMIN_TOKEN);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Failed to delete product');
    }
  };

  const handleSaveProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (!productName) {
      alert("Name is required.");
      return;
    }
    setLoading(true);
    try {
      let imageUrl: string | undefined;
      if (productImage) {
        const imageRef = ref(storage, `products/${Date.now()}_${productImage.name}`);
        const uploadResult = await uploadBytes(imageRef, productImage);
        imageUrl = await getDownloadURL(uploadResult.ref);
      }
      const payload: any = { name: productName, tag: productTag, description: productDesc };
      if (imageUrl) payload.imageUrl = imageUrl;

      if (editingProduct) {
        await apiPutAuth(`/api/products/${editingProduct.id}`, payload, ADMIN_TOKEN);
      } else {
        await apiPost('/api/products', payload);
      }
      setIsProductModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Carousel
  const handleUpdateCarousel = async (e: FormEvent) => {
    e.preventDefault();
    setCarouselLoading(true);
    try {
      await apiPutAuth('/api/carousel', { images: carouselImages }, ADMIN_TOKEN);
      alert("Carousel updated!");
    } catch (error) {
      console.error(error);
      alert("Failed to update carousel");
    } finally {
      setCarouselLoading(false);
    }
  };

  const addCarouselImage = () => {
    const url = prompt("Enter image URL:");
    if (url) setCarouselImages([...carouselImages, url]);
  };

  const removeCarouselImage = (index: number) => {
    setCarouselImages(carouselImages.filter((_, i) => i !== index));
  };

  // Craft
  const handleUpdateCraft = async (e: FormEvent) => {
    e.preventDefault();
    setCraftLoading(true);
    try {
      const steps = craftSteps.map(({ id, ...rest }) => rest);
      await apiPutAuth('/api/craft', { title: craftTitle, subtitle: craftSubtitle, steps }, ADMIN_TOKEN);
      alert("Craft section updated!");
      fetchCraft();
    } catch (error) {
      console.error(error);
      alert("Failed to update craft");
    } finally {
      setCraftLoading(false);
    }
  };

  const addCraftStep = () => {
    setCraftSteps([...craftSteps, { title: '', description: '', imageUrl: '' }]);
  };

  const updateCraftStep = (index: number, field: string, value: string) => {
    const updated = [...craftSteps];
    updated[index] = { ...updated[index], [field]: value };
    setCraftSteps(updated);
  };

  const removeCraftStep = (index: number) => {
    setCraftSteps(craftSteps.filter((_, i) => i !== index));
  };

  // Community
  const handleUpdateCommunity = async (e: FormEvent) => {
    e.preventDefault();
    setCommunityLoading(true);
    try {
      const influencers = communityInfluencers.map(({ id, ...rest }) => rest);
      await apiPutAuth('/api/community', { title: communityTitle, subtitle: communitySubtitle, influencers }, ADMIN_TOKEN);
      alert("Community updated!");
      fetchCommunity();
    } catch (error) {
      console.error(error);
      alert("Failed to update community");
    } finally {
      setCommunityLoading(false);
    }
  };

  const addInfluencer = () => {
    setCommunityInfluencers([...communityInfluencers, { name: '', videoUrl: '' }]);
  };

  const updateInfluencer = (index: number, field: string, value: string) => {
    const updated = [...communityInfluencers];
    updated[index] = { ...updated[index], [field]: value };
    setCommunityInfluencers(updated);
  };

  const removeInfluencer = (index: number) => {
    setCommunityInfluencers(communityInfluencers.filter((_, i) => i !== index));
  };

  // Media Library
  const openAddMediaModal = () => {
    setEditingMedia(null);
    setMediaUrl('');
    setMediaSection('');
    setMediaTitle('');
    setMediaDescription('');
    setIsMediaModalOpen(true);
  };

  const openEditMediaModal = (media: any) => {
    setEditingMedia(media);
    setMediaUrl(media.url || '');
    setMediaSection(media.section || '');
    setMediaTitle(media.title || '');
    setMediaDescription(media.description || '');
    setIsMediaModalOpen(true);
  };

  const handleDeleteMedia = async (id: string) => {
    if (!confirm('Delete this media?')) return;
    try {
      await apiDeleteAuth(`/api/media/${id}`, ADMIN_TOKEN);
      fetchMedia();
    } catch (err) {
      console.error(err);
      alert('Failed to delete media');
    }
  };

  const handleSaveMedia = async (e: FormEvent) => {
    e.preventDefault();
    if (!mediaUrl) {
      alert("Image URL is required.");
      return;
    }
    try {
      const payload: any = {
        url: mediaUrl,
        section: mediaSection,
        title: mediaTitle,
        description: mediaDescription,
      };

      if (editingMedia) {
        await apiPutAuth(`/api/media/${editingMedia.id}`, payload, ADMIN_TOKEN);
      } else {
        await apiPost('/api/media', payload);
      }
      setIsMediaModalOpen(false);
      fetchMedia();
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    }
  };

  const handleUploadToStorage = async (file: File): Promise<string> => {
    const imageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
    const uploadResult = await uploadBytes(imageRef, file);
    return await getDownloadURL(uploadResult.ref);
  };

  const handleMediaFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await handleUploadToStorage(file);
      setMediaUrl(url);
    } catch (error) {
      console.error(error);
      alert("Failed to upload image");
    }
  };

  const assignMediaToSection = (media: any, section: string) => {
    if (section === 'product') {
      openEditProductModal({ id: media.id, name: media.title || 'Unnamed', tag: '', description: media.description || '', imageUrl: media.url });
    } else if (section === 'carousel') {
      setCarouselImages([...carouselImages, media.url]);
    } else if (section === 'craft') {
      const title = prompt("Enter craft step title:", media.title || '');
      const description = prompt("Enter craft step description:", media.description || '');
      if (title) {
        setCraftSteps([...craftSteps, { title, description: description || '', imageUrl: media.url }]);
      }
    } else if (section === 'community') {
      const name = prompt("Enter influencer name:", media.title || '');
      if (name) {
        setCommunityInfluencers([...communityInfluencers, { name, videoUrl: media.url }]);
      }
    }
  };

  const tabs = [
    { id: 'products', label: 'Products' },
    { id: 'carousel', label: 'Carousel' },
    { id: 'craft', label: 'Craft' },
    { id: 'community', label: 'Community' },
    { id: 'media', label: 'Media Library' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Consistent Header */}
      <div className="w-full bg-white border-b border-black/10 flex flex-col md:flex-row justify-between items-center fixed top-0 z-40 px-6 py-4">
        <div className="flex items-center gap-8 mb-4 md:mb-0">
          <h1 className="text-xl font-semibold text-black tracking-widest">UMBRA CMS</h1>
          <div className="flex gap-4 flex-wrap">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-sm font-medium ${activeTab === tab.id ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="text-sm text-gray-600 hover:text-black">View Site</button>
          <button onClick={() => navigate('/admin')} className="text-sm text-red-600 hover:text-red-800">Logout</button>
        </div>
      </div>

      <div className="pt-32 px-6 md:px-12 max-w-6xl mx-auto">
        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-light text-black">Manage Products</h2>
              <button onClick={openAddProductModal} className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-black/80">
                + Add Product
              </button>
            </div>
            <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/5 border-b border-black/10">
                    <th className="p-4 text-sm font-medium text-black">Image</th>
                    <th className="p-4 text-sm font-medium text-black">Name</th>
                    <th className="p-4 text-sm font-medium text-black">Tag</th>
                    <th className="p-4 text-sm font-medium text-black text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr><td colSpan={4} className="p-8 text-center text-gray-500">No products found.</td></tr>
                  ) : (
                    products.map(p => (
                      <tr key={p.id} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                        <td className="p-4">
                          {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-12 h-12 rounded object-cover" />}
                        </td>
                        <td className="p-4 font-medium text-black">{p.name}</td>
                        <td className="p-4 text-gray-600">{p.tag || '-'}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => openEditProductModal(p)} className="text-sm px-3 py-1 bg-gray-100 text-black rounded hover:bg-gray-200 mr-2">Edit</button>
                          <button onClick={() => handleDeleteProduct(p.id)} className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200">Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Carousel Tab */}
        {activeTab === 'carousel' && (
          <div>
            <h2 className="text-3xl font-light text-black mb-8">Manage Carousel</h2>
            <div className="p-8 rounded-2xl border border-black/10 bg-white">
              <form onSubmit={handleUpdateCarousel} className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Carousel Images</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {carouselImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img src={img} alt="" className="w-20 h-20 object-cover rounded border border-black/10" />
                        <button type="button" onClick={() => removeCarouselImage(index)} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={addCarouselImage} className="text-sm px-4 py-2 border border-black/10 rounded hover:bg-black/5">+ Add Image</button>
                </div>
                <button type="submit" disabled={carouselLoading} className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-black/80 disabled:opacity-50">
                  {carouselLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Craft Tab */}
        {activeTab === 'craft' && (
          <div>
            <h2 className="text-3xl font-light text-black mb-8">Manage Craft / Perfumery Section</h2>
            <div className="p-8 rounded-2xl border border-black/10 bg-white">
              <form onSubmit={handleUpdateCraft} className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Section Title</label>
                  <input type="text" value={craftTitle} onChange={e => setCraftTitle(e.target.value)} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-black outline-none focus:border-black/30" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Section Subtitle</label>
                  <textarea rows={3} value={craftSubtitle} onChange={e => setCraftSubtitle(e.target.value)} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-black outline-none focus:border-black/30" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm text-gray-600">Steps</label>
                    <button type="button" onClick={addCraftStep} className="text-sm px-3 py-1 bg-black text-white rounded hover:bg-black/80">+ Add Step</button>
                  </div>
                  {craftSteps.map((step, index) => (
                    <div key={step.id || index} className="border border-black/10 rounded-lg p-4 mb-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-medium text-black">Step {index + 1}</h4>
                        <button type="button" onClick={() => removeCraftStep(index)} className="text-sm text-red-600 hover:text-red-800">Remove</button>
                      </div>
                      <input
                        type="text"
                        placeholder="Step title"
                        value={step.title}
                        onChange={e => updateCraftStep(index, 'title', e.target.value)}
                        className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30 mb-2"
                      />
                      <textarea
                        placeholder="Step description"
                        value={step.description}
                        onChange={e => updateCraftStep(index, 'description', e.target.value)}
                        className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30 mb-2"
                        rows={2}
                      />
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={step.imageUrl}
                        onChange={e => updateCraftStep(index, 'imageUrl', e.target.value)}
                        className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30 font-mono text-sm"
                      />
                    </div>
                  ))}
                </div>
                <button type="submit" disabled={craftLoading} className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-black/80 disabled:opacity-50">
                  {craftLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Community Tab */}
        {activeTab === 'community' && (
          <div>
            <h2 className="text-3xl font-light text-black mb-8">Manage Community / Influencers</h2>
            <div className="p-8 rounded-2xl border border-black/10 bg-white">
              <form onSubmit={handleUpdateCommunity} className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Section Title</label>
                  <input type="text" value={communityTitle} onChange={e => setCommunityTitle(e.target.value)} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-black outline-none focus:border-black/30" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Section Subtitle</label>
                  <textarea rows={3} value={communitySubtitle} onChange={e => setCommunitySubtitle(e.target.value)} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-black outline-none focus:border-black/30" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm text-gray-600">Influencers</label>
                    <button type="button" onClick={addInfluencer} className="text-sm px-3 py-1 bg-black text-white rounded hover:bg-black/80">+ Add Influencer</button>
                  </div>
                  {communityInfluencers.map((inf, index) => (
                    <div key={inf.id || index} className="border border-black/10 rounded-lg p-4 mb-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-medium text-black">Influencer {index + 1}</h4>
                        <button type="button" onClick={() => removeInfluencer(index)} className="text-sm text-red-600 hover:text-red-800">Remove</button>
                      </div>
                      <input
                        type="text"
                        placeholder="Name"
                        value={inf.name}
                        onChange={e => updateInfluencer(index, 'name', e.target.value)}
                        className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30 mb-2"
                      />
                      <input
                        type="text"
                        placeholder="Video URL"
                        value={inf.videoUrl}
                        onChange={e => updateInfluencer(index, 'videoUrl', e.target.value)}
                        className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30 font-mono text-sm"
                      />
                    </div>
                  ))}
                </div>
                <button type="submit" disabled={communityLoading} className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-black/80 disabled:opacity-50">
                  {communityLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Media Library Tab */}
        {activeTab === 'media' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-light text-black">Media Library</h2>
              <button onClick={openAddMediaModal} className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-black/80">
                + Add Media
              </button>
            </div>
            <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/5 border-b border-black/10">
                    <th className="p-4 text-sm font-medium text-black">Preview</th>
                    <th className="p-4 text-sm font-medium text-black">Title / Description</th>
                    <th className="p-4 text-sm font-medium text-black">Section</th>
                    <th className="p-4 text-sm font-medium text-black text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mediaItems.length === 0 ? (
                    <tr><td colSpan={4} className="p-8 text-center text-gray-500">No media found.</td></tr>
                  ) : (
                    mediaItems.map(m => (
                      <tr key={m.id} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                        <td className="p-4">
                          {m.url && (
                            m.url.match(/\.(jpeg|jpg|png|webp)$/) ? (
                              <img src={m.url} alt={m.title || ''} className="w-20 h-20 rounded object-cover" />
                            ) : (
                              <video src={m.url} className="w-20 h-20 rounded object-cover" />
                            )
                          )}
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-black mb-1">{m.title || '-'}</div>
                          <div className="text-sm text-gray-600">{m.description || '-'}</div>
                        </td>
                        <td className="p-4 text-gray-600">{m.section || '-'}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => openEditMediaModal(m)} className="text-sm px-3 py-1 bg-gray-100 text-black rounded hover:bg-gray-200 mr-2">Edit</button>
                          <button onClick={() => handleDeleteMedia(m.id)} className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200">Delete</button>
                          <div className="mt-2">
                            <select
                              onChange={(e) => e.target.value && assignMediaToSection(m, e.target.value)}
                              className="text-xs bg-black/5 border border-black/10 rounded px-2 py-1 text-black"
                              defaultValue=""
                            >
                              <option value="" disabled>Assign to...</option>
                              <option value="product">Product</option>
                              <option value="carousel">Carousel</option>
                              <option value="craft">Craft</option>
                              <option value="community">Community</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light text-black">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsProductModalOpen(false)} className="text-gray-500 hover:text-black">✕</button>
            </div>
            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Product Name *</label>
                <input type="text" value={productName} onChange={e => setProductName(e.target.value)} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Tag (e.g. "50ml • Earthy & Warm")</label>
                <input type="text" value={productTag} onChange={e => setProductTag(e.target.value)} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Description</label>
                <textarea value={productDesc} onChange={e => setProductDesc(e.target.value)} rows={3} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Product Image {editingProduct && '(Leave blank to keep current)'}</label>
                <input type="file" accept="image/*" onChange={e => setProductImage(e.target.files?.[0] || null)} className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-black file:text-white hover:file:bg-black/80" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-black/80 disabled:opacity-50 mt-6">
                {loading ? 'Saving...' : 'Save Product'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Media Modal */}
      {isMediaModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light text-black">{editingMedia ? 'Edit Media' : 'Add New Media'}</h2>
              <button onClick={() => setIsMediaModalOpen(false)} className="text-gray-500 hover:text-black">✕</button>
            </div>
            <form onSubmit={handleSaveMedia} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Image URL *</label>
                <input
                  type="text"
                  value={mediaUrl}
                  onChange={e => setMediaUrl(e.target.value)}
                  className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30 font-mono text-sm"
                  placeholder="https://example.com/image.webp"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Or upload from device</label>
                <input type="file" accept="image/*" onChange={handleMediaFileChange} className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-black file:text-white hover:file:bg-black/80" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Title</label>
                <input type="text" value={mediaTitle} onChange={e => setMediaTitle(e.target.value)} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Description</label>
                <textarea value={mediaDescription} onChange={e => setMediaDescription(e.target.value)} rows={3} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Assign to Section</label>
                <select value={mediaSection} onChange={e => setMediaSection(e.target.value)} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30">
                  <option value="">-- Select Section --</option>
                  <option value="product">Product</option>
                  <option value="hero">Hero</option>
                  <option value="carousel">Carousel</option>
                  <option value="craft">Craft / Perfumery</option>
                  <option value="community">Community</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-black/80 mt-6">
                Save Media
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
