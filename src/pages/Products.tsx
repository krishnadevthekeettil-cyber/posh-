import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Filter, Loader2, Star, X, MapPin, Phone, User, Send, ShoppingBag, CheckCircle2, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Product {
  id: string | number;
  model_name: string;
  price: string | number;
  category: string;
  image_url: string;
  description?: string;
  star_rating?: number;
  stock_quantity?: number;
  sizes_available?: string[];
}

const CheckoutModal = ({ product, isOpen, onClose, initialSize }: { product: Product | null, isOpen: boolean, onClose: () => void, initialSize?: string }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    location: '',
    pincode: '',
    size: initialSize || ''
  });

  useEffect(() => {
    if (initialSize) {
      setFormData(prev => ({ ...prev, size: initialSize }));
    }
  }, [initialSize]);

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.size) {
      alert("Please select a size first.");
      return;
    }
    
    const message = `*New Order from Posh!*%0A%0A` +
      `*Product Details:*%0A` +
      `- Name: ${product.model_name}%0A` +
      `- Price: ${product.price}%0A` +
      `- Size: UK ${formData.size}%0A` +
      `- Category: ${product.category}%0A%0A` +
      `*Customer Details:*%0A` +
      `- Name: ${formData.name}%0A` +
      `- Mobile: ${formData.mobile}%0A` +
      `- Location: ${formData.location}%0A` +
      `- Pincode: ${formData.pincode}`;

    const whatsappUrl = `https://wa.me/917593038781?text=${message}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-display tracking-tight">Checkout</h2>
                <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-8 p-4 bg-zinc-50 rounded-2xl">
                <img src={product.image_url} alt={product.model_name} className="w-16 h-16 object-cover rounded-xl" />
                <div>
                  <h3 className="font-bold uppercase text-sm">{product.model_name}</h3>
                  <div className="flex items-center space-x-2">
                    <p className="text-xl font-display">{product.price}</p>
                    <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full font-bold">UK {formData.size}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-4 bg-zinc-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    required
                    type="tel"
                    placeholder="Mobile Number"
                    className="w-full pl-12 pr-4 py-4 bg-zinc-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    required
                    type="text"
                    placeholder="Location / Address"
                    className="w-full pl-12 pr-4 py-4 bg-zinc-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    required
                    type="text"
                    placeholder="Pincode"
                    className="w-full pl-12 pr-4 py-4 bg-zinc-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-4 bg-black text-white rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-2 hover:bg-zinc-800 transition-colors"
                >
                  <span>Confirm via WhatsApp</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ProductDetailsModal = ({ product, isOpen, onClose, onShopNow, selectedSize, onSizeSelect }: { product: Product | null, isOpen: boolean, onClose: () => void, onShopNow: () => void, selectedSize: string, onSizeSelect: (size: string) => void }) => {
  if (!product) return null;

  const mrp = typeof product.price === 'number' ? product.price + 5000 : parseInt(String(product.price).replace(/[^\d]/g, '')) + 5000;
  const discount = 20; // Mock discount

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-6xl bg-white rounded-[2rem] overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 z-10 p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Column: Image Gallery */}
              <div className="lg:col-span-7 bg-zinc-50 p-8 flex items-center justify-center min-h-[400px]">
                <div className="relative w-full aspect-square max-w-lg">
                  <motion.img 
                    layoutId={`img-${product.id}`}
                    src={product.image_url} 
                    alt={product.model_name} 
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-black' : 'bg-zinc-300'}`} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="lg:col-span-5 p-8 lg:p-12">
                <div className="mb-8">
                  <p className="text-zinc-400 text-xs uppercase tracking-[0.2em] mb-2">Visit the POSH Store</p>
                  <h2 className="text-3xl md:text-4xl font-display tracking-tight mb-4 uppercase">{product.model_name}</h2>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center bg-zinc-900 text-white px-2 py-1 rounded text-xs font-bold">
                      <span className="mr-1">{product.star_rating || '4.8'}</span>
                      <Star className="w-3 h-3 fill-current text-yellow-400" />
                    </div>
                    <span className="text-zinc-400 text-xs uppercase tracking-widest">1,079 Ratings</span>
                  </div>

                  <div className="h-px bg-zinc-100 w-full mb-6" />

                  <div className="flex items-baseline space-x-3 mb-2">
                    <span className="text-red-500 text-2xl font-light">-{discount}%</span>
                    <span className="text-4xl font-display">
                      {typeof product.price === 'number' ? `₹${product.price}` : product.price}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm mb-6">
                    M.R.P.: <span className="line-through">₹{mrp.toLocaleString()}</span>
                  </p>

                  <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 mb-8">
                    <div className="flex items-center space-x-2 text-green-600 mb-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm font-bold uppercase tracking-wider">In Stock</span>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      FREE delivery <span className="font-bold text-zinc-900">Saturday, 11 April</span>. Order within 12 hrs 30 mins.
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-4 gap-4 mb-8">
                    {[
                      { icon: RotateCcw, label: '10 days Return' },
                      { icon: Truck, label: 'Free Delivery' },
                      { icon: ShieldCheck, label: 'Secure Pay' },
                      { icon: Star, label: 'Top Brand' },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center mb-2">
                          <item.icon className="w-4 h-4 text-zinc-600" />
                        </div>
                        <span className="text-[8px] uppercase tracking-tighter font-bold text-zinc-500">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Product Description */}
                  {product.description && (
                    <div className="mb-8">
                      <h4 className="text-xs font-bold uppercase tracking-widest mb-3">Product Description</h4>
                      <p className="text-sm text-zinc-600 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  )}

                  {/* Size Selection */}
                  <div className="mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Select Size (UK)</h4>
                    <div className="flex flex-wrap gap-2">
                      {(product.sizes_available && product.sizes_available.length > 0 ? product.sizes_available : ['6', '7', '8', '9', '10', '11']).map((size) => (
                        <button 
                          key={size}
                          onClick={() => onSizeSelect(size)}
                          className={`w-12 h-12 rounded-xl border flex items-center justify-center text-sm font-bold transition-all ${
                            selectedSize === size ? 'border-black bg-black text-white' : 'border-zinc-200 hover:border-zinc-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <button 
                      onClick={onShopNow}
                      className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full font-bold uppercase tracking-widest text-xs transition-colors shadow-lg shadow-yellow-400/20"
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={onShopNow}
                      className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold uppercase tracking-widest text-xs transition-colors shadow-lg shadow-orange-500/20"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const mockProducts: Product[] = [
    { id: 1, model_name: 'Posh One', price: '₹19,999', category: 'Performance', image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070', star_rating: 4.8, stock_quantity: 12 },
    { id: 2, model_name: 'Stealth Runner', price: '₹14,999', category: 'Lifestyle', image_url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974', star_rating: 4.5, stock_quantity: 8 },
    { id: 3, model_name: 'Urban Edge', price: '₹17,499', category: 'Urban', image_url: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070', star_rating: 4.2, stock_quantity: 15 },
    { id: 4, model_name: 'Cloud Walker', price: '₹21,999', category: 'Performance', image_url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1974', star_rating: 4.9, stock_quantity: 5 },
    { id: 5, model_name: 'Midnight Pro', price: '₹24,999', category: 'Limited', image_url: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1925', star_rating: 4.7, stock_quantity: 3 },
    { id: 6, model_name: 'Vortex Max', price: '₹16,499', category: 'Lifestyle', image_url: 'https://images.unsplash.com/photo-1512374382149-4332c6c021f1?q=80&w=1915', star_rating: 4.4, stock_quantity: 20 },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) throw error;

        if (data && data.length > 0) {
          setProducts(data);
          setError(null);
        } else {
          setProducts(mockProducts);
        }
      } catch (err: any) {
        // Log error for debugging but don't disrupt user experience
        console.warn('Supabase fetch failed, using mock data:', err.message);
        setProducts(mockProducts);
        // We don't set the error state here to avoid showing a "broken" UI
        // since we have perfectly good mock data to show.
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <Link to="/" className="inline-flex items-center space-x-2 text-black/50 hover:text-black transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs uppercase tracking-widest">Back</span>
          </Link>
          <button className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-6xl font-display tracking-tighter mb-16"
        >
          ALL <span className="text-zinc-300 italic">PRODUCTS</span>
        </motion.h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-300" />
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Loading Inventory...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="aspect-square bg-zinc-100 rounded-2xl overflow-hidden mb-6 relative">
                  <img 
                    src={product.image_url} 
                    alt={product.model_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    {product.category}
                  </div>
                  {product.stock_quantity !== undefined && product.stock_quantity < 5 && (
                    <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                      Only {product.stock_quantity} left
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-tight mb-1">{product.model_name}</h3>
                    <div className="flex items-center space-x-2">
                      <p className="text-zinc-400 text-sm">{product.category}</p>
                      {product.star_rating && (
                        <div className="flex items-center text-zinc-900 text-xs font-bold">
                          <Star className="w-3 h-3 fill-current text-yellow-400 mr-1" />
                          {product.star_rating}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="font-display text-xl">
                    {typeof product.price === 'number' ? `₹${product.price}` : product.price}
                  </p>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2 text-zinc-400">Select Size</h4>
                  <div className="flex flex-wrap gap-2">
                    {(product.sizes_available && product.sizes_available.length > 0 ? product.sizes_available : ['6', '7', '8', '9', '10', '11']).map(size => (
                      <button
                        key={size}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSize(size);
                          setSelectedProduct(product);
                        }}
                        className={`w-8 h-8 rounded-lg border text-[10px] font-bold transition-all ${
                          selectedSize === size && selectedProduct?.id === product.id
                            ? 'bg-black text-white border-black'
                            : 'border-zinc-200 hover:border-zinc-400 text-zinc-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsAboutModalOpen(true);
                    }}
                    className="py-3 bg-zinc-100 text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300"
                  >
                    ABOUT
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (!selectedSize || selectedProduct?.id !== product.id) {
                        alert("Please select a size first.");
                        return;
                      }
                      setSelectedProduct(product);
                      setIsModalOpen(true);
                    }}
                    className="py-3 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-black/10"
                  >
                    SHOP NOW
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        selectedSize={selectedSize}
        onSizeSelect={setSelectedSize}
        onShopNow={() => {
          setIsAboutModalOpen(false);
          setIsModalOpen(true);
        }}
      />

      <CheckoutModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        initialSize={selectedSize}
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Products;
