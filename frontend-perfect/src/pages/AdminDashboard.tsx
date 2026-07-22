import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService, productService, categoryService } from '../services/firebaseService';
import { adminAuthService } from '../services/adminAuthService';
import { uploadService } from '../services/uploadService';

import type { Profile, Product, Category } from '../lib/supabase';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allUsers, setAllUsers] = useState<Profile[]>([]);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({ name: '', description: '', price: '', category_id: '', image_url: '' });
  const [productImagePreview, setProductImagePreview] = useState('');

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '', image_url: '' });
  const [categoryImagePreview, setCategoryImagePreview] = useState('');

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (activeTab === 'products') loadProducts();
    if (activeTab === 'categories') loadCategories();
    if (activeTab === 'users') {
      loadAllUsers();
    }
  }, [activeTab]);

  const checkAuth = async () => {
    if (!adminAuthService.isAuthenticated()) {
      navigate('/admin');
      return;
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleProductImageUpload = async (file?: File | null) => {
    if (!file) return;
    try {
      const result = await uploadService.uploadImage(file);
      setProductForm((current) => ({ ...current, image_url: result.url }));
      setProductImagePreview(result.url);
    } catch (err) {
      console.error(err);
      showToast('Image upload failed', 'error');
    }
  };

  const handleCategoryImageUpload = async (file?: File | null) => {
    if (!file) return;
    try {
      const result = await uploadService.uploadImage(file);
      setCategoryForm((current) => ({ ...current, image_url: result.url }));
      setCategoryImagePreview(result.url);
    } catch (err) {
      console.error(err);
      showToast('Image upload failed', 'error');
    }
  };

  const loadProducts = async () => {
    const { data } = await productService.getAll();
    if (data) setProducts(data as Product[]);
  };

  const loadCategories = async () => {
    const { data } = await categoryService.getAllAdmin();
    if (data) setCategories(data as Category[]);
  };

  const loadAllUsers = async () => {
    const { data } = await adminService.getAllUsers();
    if (data) setAllUsers(data as Profile[]);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...productForm,
        price: parseFloat(productForm.price),
        category_id: productForm.category_id ? productForm.category_id : null,
        is_available: true,
      };
      if (editingProduct) {
        await productService.update(editingProduct.id, payload);
        showToast('Product updated', 'success');
      } else {
        await productService.create(payload);
        showToast('Product created', 'success');
      }
      setIsProductModalOpen(false);
      loadProducts();
    } catch (err) {
      showToast('Failed to save product', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await productService.delete(id);
    loadProducts();
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingCategory) {
        await categoryService.update(editingCategory.id, categoryForm);
        showToast('Category updated', 'success');
      } else {
        await categoryService.create(categoryForm);
        showToast('Category created', 'success');
      }
      setIsCategoryModalOpen(false);
      loadCategories();
    } catch (err) {
      showToast('Failed to save category', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    await categoryService.delete(id);
    loadCategories();
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Delete this user? This action cannot be undone.')) return;
    try {
      await adminService.deleteUser(id);
      showToast('User deleted', 'success');
      loadAllUsers();
    } catch (err) {
      showToast('Failed to delete user', 'error');
    }
  };

  const handleLogout = async () => {
    adminAuthService.logout();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {toast && (
        <div className={`fixed top-20 right-6 z-50 px-6 py-3 rounded-xl text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.message}
        </div>
      )}
      <div className="w-full bg-white border-b border-black/10 flex flex-col md:flex-row justify-between items-center fixed top-0 z-40 px-6 py-4">
        <div className="flex items-center gap-8 mb-4 md:mb-0">
          <h1 className="text-xl font-semibold text-black tracking-widest">KRUXNUT CMS</h1>
          <div className="flex gap-4 flex-wrap">
            {['products', 'categories', 'users'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium capitalize ${activeTab === tab ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}`}
              >
                {tab}
              </button>
            ))}
            <button
              onClick={() => navigate('/admin/orders')}
              className="text-sm font-medium text-gray-500 hover:text-black"
            >
              Orders
            </button>
            <button
              onClick={() => navigate('/admin/content')}
              className="text-sm font-medium text-gray-500 hover:text-black"
            >
              Content
            </button>
            <button
              onClick={() => navigate('/admin/api-keys')}
              className="text-sm font-medium text-gray-500 hover:text-black"
            >
              API Keys
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="text-sm text-gray-600 hover:text-black">View Site</button>
          <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-800">Logout</button>
        </div>
      </div>

      <div className="pt-32 px-6 md:px-12 max-w-6xl mx-auto">
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-light text-black">Manage Products</h2>
              <button onClick={() => { setEditingProduct(null); setProductForm({ name: '', description: '', price: '', category_id: '', image_url: '' }); setProductImagePreview(''); setIsProductModalOpen(true); }} className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-black/80">
                + Add Product
              </button>
            </div>
            <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/5 border-b border-black/10">
                    <th className="p-4 text-sm font-medium text-black">Image</th>
                    <th className="p-4 text-sm font-medium text-black">Name</th>
                    <th className="p-4 text-sm font-medium text-black">Price</th>
                    <th className="p-4 text-sm font-medium text-black text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr><td colSpan={4} className="p-8 text-center text-gray-500">No products found.</td></tr>
                  ) : (
                    products.map((p) => (
                      <tr key={p.id} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                        <td className="p-4">
                          {p.image_url && <img src={p.image_url} alt={p.name} className="w-12 h-12 rounded object-cover" />}
                        </td>
                        <td className="p-4 font-medium text-black">{p.name}</td>
                        <td className="p-4 text-gray-600">₹{p.price}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => { setEditingProduct(p); setProductForm({ name: p.name, description: p.description || '', price: String(p.price), category_id: p.category_id || '', image_url: p.image_url || '' }); setProductImagePreview(p.image_url || ''); setIsProductModalOpen(true); }} className="text-sm px-3 py-1 bg-gray-100 text-black rounded hover:bg-gray-200 mr-2">Edit</button>
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

        {activeTab === 'categories' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-light text-black">Manage Categories</h2>
              <button onClick={() => { setEditingCategory(null); setCategoryForm({ name: '', description: '', image_url: '' }); setCategoryImagePreview(''); setIsCategoryModalOpen(true); }} className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-black/80">
                + Add Category
              </button>
            </div>
            <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/5 border-b border-black/10">
                    <th className="p-4 text-sm font-medium text-black">Name</th>
                    <th className="p-4 text-sm font-medium text-black">Description</th>
                    <th className="p-4 text-sm font-medium text-black text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c.id} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                      <td className="p-4 font-medium text-black">{c.name}</td>
                      <td className="p-4 text-gray-600">{c.description || '-'}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => { setEditingCategory(c); setCategoryForm({ name: c.name, description: c.description || '', image_url: c.image_url || '' }); setCategoryImagePreview(c.image_url || ''); setIsCategoryModalOpen(true); }} className="text-sm px-3 py-1 bg-gray-100 text-black rounded hover:bg-gray-200 mr-2">Edit</button>
                        <button onClick={() => handleDeleteCategory(c.id)} className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h2 className="text-3xl font-light text-black mb-8">Manage Users</h2>
            <div className="bg-white rounded-2xl border border-black/10 overflow-hidden mb-8">
              <div className="p-6 border-b border-black/10">
                <h3 className="text-lg font-medium">All Users</h3>
              </div>
              {allUsers.length === 0 ? (
                <p className="p-6 text-gray-500">No users found.</p>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-black/5 border-b border-black/10">
                      <th className="p-4 text-sm font-medium text-black">Email</th>
                      <th className="p-4 text-sm font-medium text-black">Name</th>
                      <th className="p-4 text-sm font-medium text-black">Phone</th>
                      <th className="p-4 text-sm font-medium text-black">Role</th>
                      <th className="p-4 text-sm font-medium text-black text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((u) => (
                      <tr key={u.id} className="border-b border-black/5">
                        <td className="p-4 font-medium text-black">{u.email}</td>
                        <td className="p-4 text-gray-600">{u.full_name || '-'}</td>
                        <td className="p-4 text-gray-600">{u.phone || '-'}</td>
                        <td className="p-4 text-gray-600 capitalize">{u.role}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => handleDeleteUser(u.id)} className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>

      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light text-black">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsProductModalOpen(false)} className="text-gray-500 hover:text-black">✕</button>
            </div>
            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Name *</label>
                <input type="text" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} required className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Description</label>
                <textarea value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} rows={3} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Price *</label>
                <input type="number" step="0.01" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} required className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Product Image</label>
                <input type="file" accept="image/*" onChange={(e) => { void handleProductImageUpload(e.target.files?.[0]); }} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30" />
                <input type="text" value={productForm.image_url} onChange={(e) => { setProductForm({ ...productForm, image_url: e.target.value }); setProductImagePreview(e.target.value); }} className="w-full mt-3 bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30 font-mono text-sm" placeholder="Or paste an image URL" />
                {productImagePreview && <img src={productImagePreview} alt="Product preview" className="mt-3 w-24 h-24 rounded object-cover border border-black/10" />}
              </div>
              <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-black/80 disabled:opacity-50 mt-6">
                {loading ? 'Saving...' : 'Save Product'}
              </button>
            </form>
          </div>
        </div>
      )}

      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light text-black">{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
              <button onClick={() => setIsCategoryModalOpen(false)} className="text-gray-500 hover:text-black">✕</button>
            </div>
            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Name *</label>
                <input type="text" value={categoryForm.name} onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })} required className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Description</label>
                <textarea value={categoryForm.description} onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })} rows={3} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Category Image</label>
                <input type="file" accept="image/*" onChange={(e) => { void handleCategoryImageUpload(e.target.files?.[0]); }} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30" />
                <input type="text" value={categoryForm.image_url} onChange={(e) => { setCategoryForm({ ...categoryForm, image_url: e.target.value }); setCategoryImagePreview(e.target.value); }} className="w-full mt-3 bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30 font-mono text-sm" placeholder="Or paste an image URL" />
                {categoryImagePreview && <img src={categoryImagePreview} alt="Category preview" className="mt-3 w-24 h-24 rounded object-cover border border-black/10" />}
              </div>
              <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-black/80 disabled:opacity-50 mt-6">
                {loading ? 'Saving...' : 'Save Category'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
