import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <Heart size={40} className="text-red-300" strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Sem Desejos</h2>
        <p className="text-slate-500 mb-8 font-medium">A sua lista de desejos está vazia.</p>
        <Link to="/" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
          Explorar Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 pb-32">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-10">A Sua Lista de Desejos</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {wishlist.map((product, index) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ProductCard product={product as any} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
