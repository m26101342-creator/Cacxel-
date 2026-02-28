import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { motion } from 'motion/react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 0, name: "All", image: "✨" },
    { id: 1, name: "Men's outfit", image: "👕" },
    { id: 2, name: "Woman's outfit", image: "👗" },
    { id: 3, name: "Men's footwears", image: "👟" }
  ];

  useEffect(() => {
    fetch(`/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-32 bg-gray-50 min-h-full">
      
      <div className="px-6 mb-8">
        <div className="bg-white rounded-[2rem] px-5 py-4 flex items-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50 transition-all focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-200">
          <Search size={20} className="text-slate-400 mr-3 shrink-0" />
          <input 
            type="text" 
            placeholder="What are you looking for?" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-[15px] w-full text-slate-700 placeholder:text-slate-400 font-medium"
          />
          <button className="p-1.5 bg-slate-50 rounded-xl ml-3 hover:bg-blue-50 hover:text-blue-600 transition-colors shrink-0">
            <SlidersHorizontal size={18} className="text-slate-500" />
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 mb-10"
      >
        <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-[2.5rem] p-6 relative overflow-hidden shadow-[0_20px_40px_-15px_rgba(37,99,235,0.5)]">
          <div className="relative z-10 w-[70%]">
            <span className="inline-block bg-slate-900 text-white text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full font-bold mb-4 shadow-sm">
              Limited Offer
            </span>
            <h2 className="text-white font-extrabold text-[22px] leading-[1.2] mb-6 drop-shadow-sm">
              First Purchase Enjoy a Special Offer
            </h2>
            <button className="bg-slate-900 text-white text-sm px-5 py-3 rounded-full flex items-center gap-3 hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/20 font-semibold">
              Shop Now 
              <div className="bg-white text-slate-900 rounded-full w-6 h-6 flex items-center justify-center">
                <ArrowRight size={14} strokeWidth={3} />
              </div>
            </button>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-blue-400 rounded-full blur-2xl opacity-60 mix-blend-screen"></div>
          <div className="absolute right-4 bottom-0 w-28 h-36 bg-gradient-to-t from-white/20 to-transparent rounded-t-full opacity-40 backdrop-blur-sm"></div>
          <div className="absolute top-4 right-8 w-12 h-12 bg-white/10 rounded-full blur-md"></div>
        </div>
        
        <div className="flex justify-center gap-1.5 mt-5">
          <div className="w-6 h-1.5 bg-blue-600 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
        </div>
      </motion.div>

      <div className="px-6 mb-10">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-extrabold text-slate-800 text-lg">Categories</h3>
          <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors">See all</button>
        </div>
        <div className="flex gap-4 overflow-x-auto hide-scroll pb-4 -mx-6 px-6">
          {categories.map((cat, index) => (
            <motion.button 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className={`min-w-[105px] p-4 rounded-[1.5rem] flex flex-col items-center transition-all duration-300 ${
                activeCategory === cat.name 
                  ? 'bg-blue-600 shadow-[0_10px_25px_-5px_rgba(37,99,235,0.4)] scale-105' 
                  : 'bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
              }`}
            >
              <div className={`w-14 h-14 rounded-full mb-3 flex items-center justify-center text-2xl transition-colors ${
                activeCategory === cat.name ? 'bg-white/20' : 'bg-slate-50'
              }`}>
                {cat.image}
              </div>
              <span className={`text-[13px] font-semibold text-center leading-tight ${
                activeCategory === cat.name ? 'text-white' : 'text-slate-600'
              }`}>
                {cat.name.split(' ').map((word, i) => <span key={i}>{word}<br/></span>)}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="px-6 mb-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-extrabold text-slate-800 text-lg">New Arrival</h3>
          <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors">See all</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
