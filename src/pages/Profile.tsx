import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package, MapPin, CreditCard, Settings, HelpCircle, Phone, Info } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export default function Profile() {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetch('/api/orders', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(console.error);
  }, [user, navigate, token]);

  if (!user) return null;

  return (
    <div className="pb-32 max-w-5xl mx-auto px-6 pt-12">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="w-32 h-32 rounded-full ring-4 ring-blue-50 overflow-hidden bg-slate-100">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">{user.name}</h1>
          <p className="text-slate-500 font-medium mb-6">{user.email}</p>
          <button 
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="bg-red-50 text-red-600 px-6 py-3 rounded-full font-bold hover:bg-red-100 transition-all flex items-center gap-2 mx-auto md:mx-0"
          >
            <LogOut size={18} strokeWidth={2.5} /> Terminar Sessão
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-8">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Package size={24} /></div>
            O Meu Histórico
          </h2>
          
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="p-12 rounded-3xl border border-slate-100 text-center bg-white shadow-sm">
                <p className="text-slate-500 font-medium">Ainda não efetuou nenhuma encomenda.</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="rounded-3xl border border-slate-100 p-6 bg-white shadow-sm">
                  <div className="flex flex-wrap justify-between items-center gap-4 mb-6 border-b border-slate-100 pb-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Pedido #{order.id}</p>
                      <p className="font-bold text-slate-900">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Total</p>
                      <p className="font-extrabold text-blue-600 text-xl">{formatCurrency(order.total)}</p>
                    </div>
                    <div className="bg-green-50 text-green-600 px-4 py-2 rounded-full font-bold text-xs">
                      {order.status}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {JSON.parse(order.items).map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl p-2">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-slate-900 text-sm line-clamp-1">{item.name}</p>
                          <p className="text-xs font-medium text-slate-500 mt-1">Tam: {item.size} • Qtd: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-slate-900">{formatCurrency(item.price)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="md:col-span-4 space-y-8">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 mb-6">Conta</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors font-semibold text-slate-700 text-sm shadow-sm">
                <MapPin size={20} className="text-blue-500" /> Moradas
              </button>
              <button className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors font-semibold text-slate-700 text-sm shadow-sm">
                <CreditCard size={20} className="text-blue-500" /> Pagamentos
              </button>
              <button className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors font-semibold text-slate-700 text-sm shadow-sm">
                <Settings size={20} className="text-blue-500" /> Definições
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-slate-900 mb-6">Suporte</h2>
            <div className="space-y-3">
              <button onClick={() => navigate('/faq')} className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors font-semibold text-slate-700 text-sm shadow-sm">
                <HelpCircle size={20} className="text-slate-400" /> Ajuda e FAQ
              </button>
              <button className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors font-semibold text-slate-700 text-sm shadow-sm">
                <Phone size={20} className="text-slate-400" /> Contactos
              </button>
              <button onClick={() => navigate('/about')} className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors font-semibold text-slate-700 text-sm shadow-sm">
                <Info size={20} className="text-slate-400" /> Sobre Nós
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
