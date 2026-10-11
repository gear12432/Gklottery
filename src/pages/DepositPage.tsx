import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wallet, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createTransaction } from '../services/transactionService';
import { PaymentMethod } from '../types/transaction';
import { formatCurrency } from '../utils/formatCurrency';
import { ErrorMessage } from '../components/ErrorMessage';

const PRESET_AMOUNTS = [100, 200, 500, 1000, 2000, 5000];

export const DepositPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const [amount, setAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>('500');
  const [method, setMethod] = useState<PaymentMethod>('UPI');
  const [loading, setLoading] = useState(false);
  const [successTxId, setSuccessTxId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAmountChange = (val: number) => {
    setAmount(val);
    setCustomAmount(String(val));
  };

  const handleCustomInput = (val: string) => {
    setCustomAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setAmount(num);
    } else {
      setAmount(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      navigate('/login');
      return;
    }
    if (amount < 10) {
      setError('Minimum deposit amount is ₹10.');
      return;
    }
    if (amount > 100000) {
      setError('Maximum single deposit limit is ₹1,00,000.');
      return;
    }

    setLoading(true);
    try {
      const tx = await createTransaction(user.uid, 'DEPOSIT', amount, method, `Deposit via ${method}`);
      setSuccessTxId(tx.referenceId);
      await refreshProfile();
    } catch (err: any) {
      setError('Deposit transaction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF2F3] pb-12 select-none">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-[#F36B16] to-[#C95C2D] p-4 text-white">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-90 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <h1 className="text-base font-extrabold tracking-tight">Deposit Funds</h1>
          <div className="w-8" />
        </div>
      </div>

      <main className="max-w-md mx-auto p-4 space-y-4">
        {/* Balance Card */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Current Balance
            </span>
            <span className="text-xl font-black text-gray-900">
              {formatCurrency(profile?.balance || 0)}
            </span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-orange-100 text-[#F36B16] flex items-center justify-center">
            <Wallet className="w-5 h-5" />
          </div>
        </div>

        {error && <ErrorMessage message={error} />}

        {successTxId ? (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-200 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#16834A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-lg font-black text-gray-900">Deposit Successful!</h2>
            <p className="text-xs text-gray-600 font-medium">
              Added <span className="font-extrabold text-[#16834A]">{formatCurrency(amount)}</span> to your wallet balance.
            </p>
            <div className="p-3 bg-gray-50 rounded-xl text-[11px] font-mono text-gray-500">
              Ref ID: <span className="font-bold text-gray-800">{successTxId}</span>
            </div>
            <button
              onClick={() => navigate('/wallet')}
              className="w-full py-3.5 bg-[#F36B16] text-white text-xs font-black rounded-xl shadow-md active:scale-95 transition-all"
            >
              View Wallet & History
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-5">
            {/* Amount Entry */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Deposit Amount (₹)
              </label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => handleCustomInput(e.target.value)}
                placeholder="Enter amount e.g. 500"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-lg font-black text-gray-900 focus:bg-white focus:border-[#F36B16] focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              />

              {/* Presets */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                {PRESET_AMOUNTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleAmountChange(p)}
                    className={`py-2 rounded-xl text-xs font-black transition-all active:scale-95 ${
                      amount === p
                        ? 'bg-[#F36B16] text-white shadow-xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-orange-50'
                    }`}
                  >
                    + ₹{p}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Select Payment Gateway
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'UPI', label: 'BHIM UPI' },
                  { id: 'GPAY', label: 'Google Pay' },
                  { id: 'PHONEPE', label: 'PhonePe' },
                  { id: 'PAYTM', label: 'Paytm' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id as PaymentMethod)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                      method === m.id
                        ? 'bg-orange-50 border-[#F36B16] text-[#C95C2D]'
                        : 'bg-white border-gray-200 text-gray-700'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || amount < 10}
              className="w-full py-4 bg-[#F36B16] hover:bg-[#C95C2D] text-white text-xs font-black rounded-2xl shadow-md active:scale-98 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>CONFIRM DEPOSIT OF {formatCurrency(amount)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center space-x-1 text-[10px] text-gray-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16834A]" />
              <span>256-Bit Encrypted Secure Payment Processing</span>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};
