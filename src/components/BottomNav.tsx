import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, Heart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion } from 'motion/react';

export default function BottomNav() {
  const location = useLocation();
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();

  if (location.pathname.startsWith('/product/') || location.pathname.startsWith('/checkout')) return null;

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[340px] bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] py-3 px-6 flex justify-between items-center z-50 border border-white/40">
      <Link to="/" className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${location.pathname === '/' ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-blue-500'}`}>
        <Home size={22} strokeWidth={location.pathname === '/' ? 2.5 : 2} />
        {location.pathname === '/' && <motion.span layoutId="nav-home">Home</motion.span>}
      </Link>
      
      <Link to="/cart" className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${location.pathname === '/cart' ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-blue-500'}`}>
        <ShoppingCart size={22} strokeWidth={location.pathname === '/cart' ? 2.5 : 2} />
        {location.pathname === '/cart' && <motion.span layoutId="nav-cart">Cart</motion.span>}
        {itemCount > 0 && location.pathname !== '/cart' && (
          <span className="absolute top-1 right-2 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
            {itemCount}
          </span>
        )}
      </Link>

      <Link to="/wishlist" className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${location.pathname === '/wishlist' ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-blue-500'}`}>
        <Heart size={22} strokeWidth={location.pathname === '/wishlist' ? 2.5 : 2} />
        {location.pathname === '/wishlist' && <motion.span layoutId="nav-wish">Saved</motion.span>}
        {wishlist.length > 0 && location.pathname !== '/wishlist' && (
          <span className="absolute top-1 right-2 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
            {wishlist.length}
          </span>
        )}
      </Link>

      <Link to="/profile" className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${location.pathname === '/profile' ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-blue-500'}`}>
        <User size={22} strokeWidth={location.pathname === '/profile' ? 2.5 : 2} />
        {location.pathname === '/profile' && <motion.span layoutId="nav-prof">Profile</motion.span>}
      </Link>
    </div>
  );
}
