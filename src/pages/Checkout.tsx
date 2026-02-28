import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../lib/utils';
import { CreditCard, MapPin, CheckCircle, Wallet, Smartphone, ArrowLeft } from 'lucide-react';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('mcx');

  const shipping = total > 0 ? 15.00 : 0;
  const finalTotal = total + shipping;

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items,
          total: finalTotal
        })
      });

      if (res.ok) {
        clearCart();
        setStep(3);
      }
    } catch (error) {
      console.error('Payment failed', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (items.length === 0 && step !== 3) {
      navigate('/cart');
    }
  }, [items.length, step, navigate]);

  if (items.length === 0 && step !== 3) return null;

  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center">
        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-200">
          <CheckCircle size={48} strokeWidth={2} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
        <p className="text-gray-500 mb-8 text-sm max-w-xs">Thank you for your purchase. Your order has been placed successfully.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-8 py-3 rounded-full font-medium shadow-lg shadow-blue-200 hover:bg-blue-600 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 pb-32 pt-10">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setStep(step === 2 ? 1 : navigate(-1) as any)} className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
      </div>

      <div className="flex items-center justify-center mb-8">
        <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-500' : 'text-gray-300'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 font-bold text-sm transition-colors ${step >= 1 ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-200 text-gray-500'}`}>1</div>
          <span className="text-[10px] font-bold uppercase">Shipping</span>
        </div>
        <div className={`w-12 h-1 mx-2 rounded-full transition-colors ${step >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`} />
        <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-500' : 'text-gray-300'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 font-bold text-sm transition-colors ${step >= 2 ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-200 text-gray-500'}`}>2</div>
          <span className="text-[10px] font-bold uppercase">Payment</span>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-3xl shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-blue-500" /> Shipping Address
            </h3>
            <div className="space-y-3">
              <input type="text" placeholder="Full Name" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 outline-none text-sm" defaultValue={user?.name} />
              <input type="text" placeholder="Address" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 outline-none text-sm" />
              <div className="flex gap-3">
                <input type="text" placeholder="City" className="flex-1 p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 outline-none text-sm" />
                <input type="text" placeholder="Zip" className="w-1/3 p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 outline-none text-sm" />
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setStep(2)}
            className="w-full bg-blue-500 text-white font-medium py-4 rounded-full shadow-lg shadow-blue-200 hover:bg-blue-600 transition-colors"
          >
            Continue to Payment
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-3xl shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Wallet size={18} className="text-blue-500" /> Payment Method
            </h3>
            
            <div className="space-y-3">
              <label className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all border ${paymentMethod === 'mcx' ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}>
                <input type="radio" name="payment" value="mcx" checked={paymentMethod === 'mcx'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 accent-blue-500" />
                <div className="w-10 h-10 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center"><Smartphone size={20} /></div>
                <div className="flex-1">
                  <div className="font-bold text-sm text-gray-800">Multicaixa Express</div>
                </div>
              </label>

              <label className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all border ${paymentMethod === 'visa' ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}>
                <input type="radio" name="payment" value="visa" checked={paymentMethod === 'visa'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 accent-blue-500" />
                <div className="w-10 h-10 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center"><CreditCard size={20} /></div>
                <div className="flex-1">
                  <div className="font-bold text-sm text-gray-800">Credit Card</div>
                </div>
              </label>
            </div>
          </div>
          
          <button 
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-blue-500 text-white font-medium py-4 rounded-full shadow-lg shadow-blue-200 hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : `Pay ${formatCurrency(finalTotal)}`}
          </button>
        </div>
      )}
    </div>
  );
}
