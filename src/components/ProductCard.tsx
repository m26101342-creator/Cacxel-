import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isLiked = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLiked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product as any);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-3.5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 relative group border border-slate-100/50">
      <button 
        onClick={toggleWishlist}
        className="absolute top-5 right-5 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm text-slate-400 z-10 hover:text-red-500 hover:scale-110 transition-all"
      >
        <Heart size={18} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "text-red-500" : ""} />
      </button>
      <Link to={`/product/${product.id}`}>
        <div className="h-36 bg-slate-50 rounded-[1.5rem] mb-4 overflow-hidden flex items-center justify-center p-3 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-100/50 to-transparent mix-blend-multiply"></div>
          <motion.img 
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain mix-blend-multiply drop-shadow-md relative z-10" 
          />
        </div>
        <div className="px-2 pb-1">
          <h3 className="font-bold text-slate-800 text-[15px] truncate mb-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>
          <p className="text-[13px] font-medium text-slate-400 mb-2">{product.category}</p>
          <p className="font-extrabold text-blue-600 text-[17px] tracking-tight">{formatCurrency(product.price)}</p>
        </div>
      </Link>
    </div>
  );
}
