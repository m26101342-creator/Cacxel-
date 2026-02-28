import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  const shipping = total > 0 ? 15.00 : 0;
  const finalTotal = total + shipping;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 bg-blue-50/50 rounded-full flex items-center justify-center mb-8 shadow-inner border border-blue-100/50"
        >
          <ShoppingBag size={56} className="text-blue-400" strokeWidth={1.5} />
        </motion.div>
        <h2 className="text-[28px] font-extrabold text-slate-900 mb-3 tracking-tight">Your Cart is Empty</h2>
        <p className="text-slate-500 mb-10 text-[15px] font-medium max-w-[250px] leading-relaxed">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2">
          Start Shopping <ArrowRight size={18} strokeWidth={2.5} />
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 pb-36 pt-12">
      <div className="flex items-center gap-5 mb-8">
        <button onClick={() => navigate(-1)} className="w-11 h-11 bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all active:scale-95">
          <ArrowLeft size={22} strokeWidth={2.5} />
        </button>
        <h1 className="text-[28px] font-extrabold text-slate-900 tracking-tight">My Cart</h1>
      </div>
      
      <div className="space-y-5 mb-10">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={`${item.id}-${item.size}`}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -20 }}
              className="bg-white p-4 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50 flex gap-5 items-center relative group"
            >
              <div className="w-24 h-24 bg-slate-50 rounded-[1.5rem] p-2 shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-100/50 to-transparent mix-blend-multiply"></div>
                <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm relative z-10" />
              </div>
              
              <div className="flex-1 py-1">
                <h3 className="font-extrabold text-slate-800 text-[16px] mb-1.5 truncate pr-10 leading-tight">{item.name}</h3>
                <p className="text-[13px] font-semibold text-slate-400 mb-3 bg-slate-50 inline-block px-2 py-0.5 rounded-md">Size: {item.size}</p>
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-blue-600 text-lg tracking-tight">{formatCurrency(item.price)}</span>
                  <div className="flex items-center bg-slate-50 border border-slate-200/60 rounded-xl overflow-hidden h-9 shadow-sm">
                    <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="w-8 h-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors active:bg-slate-300">
                      <Minus size={14} strokeWidth={3} />
                    </button>
                    <span className="w-8 text-center font-bold text-[14px] text-slate-800 flex items-center justify-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="w-8 h-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors active:bg-slate-300">
                      <Plus size={14} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => removeFromCart(item.id, item.size)}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all bg-white rounded-full shadow-sm border border-slate-100"
              >
                <Trash2 size={16} strokeWidth={2.5} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="bg-white rounded-[2rem] p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-50"></div>
        <h3 className="font-extrabold text-slate-800 text-lg mb-5 relative z-10">Order Summary</h3>
        <div className="space-y-4 text-[15px] relative z-10">
          <div className="flex justify-between text-slate-500 font-medium">
            <span>Subtotal</span>
            <span className="text-slate-800 font-bold">{formatCurrency(total)}</span>
          </div>
          <div className="flex justify-between text-slate-500 font-medium">
            <span>Shipping</span>
            <span className="text-slate-800 font-bold">{formatCurrency(shipping)}</span>
          </div>
          <div className="border-t border-slate-100/80 pt-4 mt-2 flex justify-between items-center">
            <span className="text-slate-800 font-extrabold text-lg">Total</span>
            <span className="font-extrabold text-[22px] text-blue-600 tracking-tight">{formatCurrency(finalTotal)}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => navigate('/checkout')}
        className="w-full bg-blue-600 text-white font-bold py-4.5 rounded-full shadow-xl shadow-blue-600/25 hover:bg-blue-700 transition-all active:scale-95 flex justify-center items-center gap-2.5 text-[16px]"
      >
        Proceed to Checkout <ArrowRight size={20} strokeWidth={2.5} />
      </button>
    </div>
  );
}
