import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Leaf, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="pb-32 px-6 pt-12 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20 text-center max-w-3xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-8">
          A Nossa Visão
        </h1>
        <p className="text-xl font-medium text-slate-500 leading-relaxed">
          Redefinimos a experiência de calçado premium. Design moderno, conforto absoluto e uma presença inconfundível para o seu dia a dia.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="aspect-[4/5] bg-blue-50 rounded-[2.5rem] p-8 flex flex-col justify-end relative overflow-hidden shadow-xl shadow-blue-900/5"
        >
          <img 
            src="https://images.unsplash.com/photo-1552346154-21d32810baa3?q=80&w=1000&auto=format&fit=crop" 
            alt="Editorial" 
            className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold text-white mb-4">A Nossa História</h2>
            <p className="text-blue-100 font-medium leading-relaxed">
              Fundada com o propósito de inovar no retalho. Acreditamos que o calçado deve ser uma extensão da sua identidade, combinando estilo e funcionalidade sem compromissos.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col justify-center space-y-10 pl-0 md:pl-10"
        >
          <div className="flex gap-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
              <Star size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Qualidade Premium</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Trabalhamos apenas com os melhores materiais. Cada par é rigorosamente selecionado para garantir durabilidade e um acabamento impecável.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Exclusividade</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                As nossas coleções são pensadas para quem procura algo único. A exclusividade e a atenção ao detalhe são a nossa assinatura.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
              <Leaf size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Sustentabilidade</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Comprometidos com o futuro. Otimizamos a nossa cadeia de fornecimento para reduzir o impacto ambiental sem comprometer a estética.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center shadow-2xl shadow-blue-600/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-400/30 to-transparent opacity-60" />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Junte-se ao Movimento.
          </h2>
          <p className="text-blue-100 font-medium text-lg mb-10 max-w-xl mx-auto">
            Descubra a nossa coleção e eleve o seu estilo a um novo patamar de conforto.
          </p>
          <Link to="/" className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-full font-bold shadow-lg hover:bg-blue-50 hover:scale-105 transition-all text-lg">
            Explorar Catálogo <ArrowRight size={20} strokeWidth={2.5} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
