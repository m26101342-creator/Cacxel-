import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-32 md:pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-3xl font-extrabold text-white tracking-tight mb-6 block">
              CACXEL
            </Link>
            <p className="text-slate-400 font-medium max-w-sm mb-8 leading-relaxed">
              Design moderno, conforto absoluto e uma experiência de compra simples e segura. O seu estilo começa aqui.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Navegação</h4>
            <ul className="space-y-3">
              <li><Link to="/explore" className="text-slate-400 hover:text-blue-400 font-medium transition-colors">Catálogo</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-blue-400 font-medium transition-colors">Sobre Nós</Link></li>
              <li><Link to="/faq" className="text-slate-400 hover:text-blue-400 font-medium transition-colors">Ajuda & FAQ</Link></li>
              <li><Link to="/cart" className="text-slate-400 hover:text-blue-400 font-medium transition-colors">Carrinho</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4">
              Receba as nossas novidades e ofertas exclusivas.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="O seu email" 
                className="bg-slate-800 border border-slate-700 rounded-l-xl px-4 py-3 w-full focus:outline-none focus:border-blue-500 text-white placeholder:text-slate-500 transition-colors"
              />
              <button type="submit" className="bg-blue-600 text-white px-5 py-3 rounded-r-xl hover:bg-blue-500 transition-colors">
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-slate-500">
            &copy; {new Date().getFullYear()} CACXEL. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-slate-500 hover:text-white transition-colors">Privacidade</Link>
            <Link to="#" className="text-slate-500 hover:text-white transition-colors">Termos de Serviço</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
