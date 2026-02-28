import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';

export default function Header() {
  const { itemCount } = useCart();
  const location = useLocation();

  if (location.pathname.startsWith('/product/') || location.pathname.startsWith('/checkout')) return null;

  return (
    <header className="bg-gray-50/80 backdrop-blur-md sticky top-0 z-40 shrink-0">
      <div className="px-6 pt-12 pb-4 flex items-center justify-between">
        <button className="w-11 h-11 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.04)] flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all active:scale-95">
          <Menu size={20} strokeWidth={2.5} />
        </button>
        <Link to="/cart" className="relative w-11 h-11 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.04)] flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all active:scale-95">
          <ShoppingBag size={20} strokeWidth={2.5} />
          {itemCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm"
            >
              {itemCount}
            </motion.span>
          )}
        </Link>
      </div>
    </header>
  );
}
