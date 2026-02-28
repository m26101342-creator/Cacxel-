import { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: "Quanto tempo demora a entrega?",
    answer: "As entregas normais demoram entre 2 a 5 dias úteis. As entregas expresso são efetuadas no dia útil seguinte para encomendas realizadas até às 15h."
  },
  {
    question: "Posso devolver um artigo?",
    answer: "Sim, aceitamos devoluções no prazo de 30 dias após a receção da encomenda. Os artigos devem estar sem uso e na embalagem original."
  },
  {
    question: "Quais são os métodos de pagamento?",
    answer: "Aceitamos Multicaixa Express, cartões Visa e Mastercard, e PayPal. Todos os pagamentos são processados de forma segura."
  },
  {
    question: "Como sei o meu tamanho?",
    answer: "Disponibilizamos um guia de tamanhos detalhado em cada página de produto. Recomendamos que meça o seu pé e consulte a nossa tabela de conversão."
  },
  {
    question: "Fazem envios internacionais?",
    answer: "Atualmente, realizamos envios apenas para o território nacional. Estamos a trabalhar para expandir as nossas entregas para outros países em breve."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pb-32 px-6 pt-12 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-100">
          <MessageCircle size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
          Perguntas Frequentes
        </h1>
        <p className="text-lg font-medium text-slate-500 max-w-xl mx-auto">
          Encontre respostas rápidas para as dúvidas mais comuns sobre as nossas entregas, devoluções e pagamentos.
        </p>
      </motion.div>

      <div className="space-y-4 mb-20">
        {faqs.map((faq, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === index ? 'border-blue-600 shadow-md shadow-blue-600/10' : 'border-slate-200 hover:border-blue-300'}`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className={`font-bold text-lg pr-8 transition-colors ${openIndex === index ? 'text-blue-600' : 'text-slate-900'}`}>
                {faq.question}
              </span>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${openIndex === index ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                {openIndex === index ? (
                  <ChevronUp size={20} strokeWidth={2.5} />
                ) : (
                  <ChevronDown size={20} strokeWidth={2.5} />
                )}
              </div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-blue-50/30"
                >
                  <p className="px-6 pb-6 text-slate-600 font-medium leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="bg-blue-600 text-white rounded-[2.5rem] p-12 text-center shadow-xl shadow-blue-600/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-400/30 to-transparent opacity-60" />
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold mb-4">Ainda tem dúvidas?</h2>
          <p className="text-blue-100 font-medium mb-8 max-w-md mx-auto">A nossa equipa de suporte está pronta para ajudar com qualquer questão adicional.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:suporte@cacxel.com" className="flex items-center justify-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-full font-bold shadow-lg hover:bg-blue-50 transition-all">
              <Mail size={20} strokeWidth={2.5} /> Enviar Email
            </a>
            <a href="tel:+244900000000" className="flex items-center justify-center gap-3 bg-blue-700 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-blue-800 transition-all">
              <Phone size={20} strokeWidth={2.5} /> Ligar Agora
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
