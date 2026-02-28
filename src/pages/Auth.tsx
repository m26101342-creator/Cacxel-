import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || 'Something went wrong');

      login(result.token, result.user);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 p-8 md:p-12 relative">
        <button 
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 w-10 h-10 bg-slate-50 text-slate-500 rounded-full flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>

        <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center mt-4">
          {isLogin ? 'Bem-vindo de volta' : 'Criar Conta'}
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 font-medium text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nome Completo</label>
              <input name="name" type="text" required className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none font-medium transition-all" />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <input name="email" type="email" required className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none font-medium transition-all" />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Palavra-passe</label>
            <input name="password" type="password" required className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none font-medium transition-all" />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all disabled:opacity-50 mt-4"
          >
            {loading ? 'A processar...' : (isLogin ? 'Entrar' : 'Registar')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
          >
            {isLogin ? 'Não tem conta? Registe-se' : 'Já tem conta? Iniciar sessão'}
          </button>
        </div>
      </div>
    </div>
  );
}
