import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingBag, Heart, CheckCircle2, Check, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sizes: string;
  rating: number;
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-8 text-center min-h-screen flex items-center justify-center font-bold text-blue-600">Loading...</div>;
  if (!product) return <div className="p-8 text-center min-h-screen flex items-center justify-center font-bold text-slate-500">Product not found</div>;

  const sizes = ["S", "M", "L", "XL"];
  const isLiked = isInWishlist(product.id);

  const toggleWishlist = () => {
    if (isLiked) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart({ ...product, size: selectedSize as any, quantity });
    navigate('/cart');
  };

  return (
    <div className="bg-white min-h-full pb-36 relative flex flex-col">
      <div className="flex justify-between items-center px-6 pt-12 pb-4 bg-white/80 backdrop-blur-md z-40 sticky top-0">
        <button onClick={() => navigate(-1)} className="w-11 h-11 bg-white border border-slate-100 shadow-sm rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors active:scale-95">
          <ChevronLeft size={22} strokeWidth={2.5} />
        </button>
        <h2 className="font-extrabold text-[17px] text-slate-800 tracking-tight">Details</h2>
        <button onClick={() => navigate('/cart')} className="w-11 h-11 bg-white border border-slate-100 shadow-sm rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors active:scale-95">
          <ShoppingBag size={20} strokeWidth={2.5} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 hide-scroll">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-50 rounded-[2.5rem] h-80 w-full flex items-center justify-center mb-6 overflow-hidden relative p-8 shadow-inner border border-slate-100/50"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-200/30 mix-blend-multiply"></div>
          <motion.img 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl relative z-10" 
          />
        </motion.div>
        
        <div className="flex justify-center gap-1.5 mb-8">
          <div className="w-6 h-1.5 bg-slate-800 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
        </div>

        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold tracking-wide mb-3">
              {product.category || "Men Footwear"}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">{product.name}</h1>
          </div>
          <button onClick={toggleWishlist} className="w-12 h-12 bg-white border border-slate-100 shadow-sm rounded-full flex items-center justify-center text-slate-400 mt-1 hover:bg-red-50 hover:border-red-100 transition-all active:scale-95">
            <Heart size={22} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "text-red-500" : ""} />
          </button>
        </div>

        <div className="flex justify-between items-center mb-8 bg-slate-50 p-4 rounded-3xl border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-extrabold text-xl shadow-sm border border-blue-200/50">C</div>
            <div>
              <div className="font-bold text-[15px] flex items-center gap-1.5 text-slate-800">
                Cacxel Store <CheckCircle2 size={16} className="text-blue-600 fill-blue-50" />
              </div>
              <div className="text-[13px] font-medium text-slate-500">Official store</div>
            </div>
          </div>
          <button className="bg-slate-900 text-white text-[13px] px-5 py-2.5 rounded-full font-semibold flex items-center gap-1.5 hover:bg-slate-800 transition-colors shadow-md shadow-slate-900/10">
            <Check size={16} strokeWidth={3} /> Following
          </button>
        </div>

        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-[15px] font-bold text-slate-800 mb-4">Select size</h3>
            <div className="flex gap-2.5">
              {sizes.map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-2xl font-bold text-[15px] transition-all duration-300 ${
                    selectedSize === size 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 shadow-sm'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-slate-800 mb-4 text-right">QTY</h3>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden h-12 shadow-sm">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors active:bg-slate-300">
                <Minus size={16} strokeWidth={3} />
              </button>
              <span className="w-8 text-center font-bold text-[15px] text-slate-800 flex items-center justify-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors active:bg-slate-300">
                <Plus size={16} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-[17px] font-bold text-slate-800 mb-3">Description</h3>
          <p className="text-[15px] text-slate-500 leading-relaxed font-medium">
            {product.description || "Premium quality materials tailored for everyday comfort and style. Step into comfort with the Cacxel signature shoe. Designed for the modern individual, it features a breathable upper and a durable sole."}
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 px-6 py-6 flex justify-between items-center rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.06)] z-50">
        <div>
          <span className="text-[13px] text-slate-500 font-semibold block mb-0.5">Total price</span>
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{formatCurrency(product.price * quantity)}</span>
        </div>
        <button onClick={handleAddToCart} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full flex items-center gap-2.5 shadow-xl shadow-blue-600/25 transition-all active:scale-95">
          <ShoppingBag size={20} strokeWidth={2.5} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
