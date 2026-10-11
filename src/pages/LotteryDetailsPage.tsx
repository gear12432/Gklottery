import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Ticket, Sparkles, Clock, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { KERALA_LOTTERIES, buyLotteryTicket } from '../services/lotteryService';
import { LotteryTicket } from '../types/lottery';
import { formatCurrency } from '../utils/formatCurrency';
import { ErrorMessage } from '../components/ErrorMessage';

export const LotteryDetailsPage: React.FC = () => {
  const { drawId } = useParams();
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [purchasing, setPurchasing] = useState(false);
  const [purchasedTickets, setPurchasedTickets] = useState<LotteryTicket[]>([]);
  const [error, setError] = useState<string | null>(null);

  const draw = KERALA_LOTTERIES.find((d) => d.id === drawId) || KERALA_LOTTERIES[0];
  const totalPrice = draw.ticketPrice * quantity;

  const handleBuy = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setError(null);

    if ((profile?.balance || 0) < totalPrice) {
      setError(`Insufficient wallet balance (${formatCurrency(profile?.balance || 0)}). Please deposit at least ${formatCurrency(totalPrice - (profile?.balance || 0))}.`);
      return;
    }

    setPurchasing(true);
    try {
      const tickets = await buyLotteryTicket(user.uid, draw, quantity);
      setPurchasedTickets(tickets);
      await refreshProfile();
    } catch (err: any) {
      setError('Failed to complete ticket purchase. Please try again.');
    } finally {
      setPurchasing(false);
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
          <h1 className="text-base font-extrabold tracking-tight">{draw.name}</h1>
          <div className="w-8" />
        </div>
      </div>

      <main className="max-w-md mx-auto p-4 space-y-4">
        {/* Draw Header Banner */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="bg-orange-100 text-[#C95C2D] text-xs font-black uppercase px-2.5 py-0.5 rounded-md">
              {draw.code}
            </span>
            <span className="text-xs font-bold text-gray-500">
              Draw Time: <span className="text-gray-900 font-bold">{draw.drawDate}</span>
            </span>
          </div>

          <h2 className="text-xl font-black text-gray-900">{draw.name}</h2>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">{draw.description}</p>

          <div className="p-3 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-[#F6C445]" />
              <div>
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                  Top 1st Prize
                </span>
                <span className="text-lg font-black text-[#C95C2D]">{draw.firstPrize}</span>
              </div>
            </div>
            <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              ₹{draw.ticketPrice} / Ticket
            </span>
          </div>
        </div>

        {error && <ErrorMessage message={error} />}

        {purchasedTickets.length > 0 ? (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-200 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#16834A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-black text-gray-900">
              Tickets Purchased Successfully!
            </h3>
            <p className="text-xs text-gray-600">
              Your official tickets are registered under your account for draw result matching.
            </p>

            <div className="space-y-2 text-left pt-2">
              {purchasedTickets.map((t) => (
                <div
                  key={t.id}
                  className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 block uppercase">
                      Ticket Series & Number
                    </span>
                    <span className="text-sm font-mono font-black text-gray-900">
                      {t.ticketNumber}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    ACTIVE
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/wallet')}
              className="w-full py-3.5 bg-[#F36B16] text-white text-xs font-black rounded-xl shadow-md active:scale-95 transition-all"
            >
              View My Tickets in Wallet
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4">
            <h3 className="text-sm font-black text-gray-900">Select Ticket Quantity</h3>

            <div className="flex items-center justify-between bg-gray-50 p-2 rounded-2xl border border-gray-200">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-xl bg-white text-gray-900 font-black text-lg shadow-2xs hover:bg-orange-50 active:scale-90 transition-all"
              >
                -
              </button>
              <span className="text-base font-black text-gray-900">{quantity} Tickets</span>
              <button
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                className="w-10 h-10 rounded-xl bg-white text-gray-900 font-black text-lg shadow-2xs hover:bg-orange-50 active:scale-90 transition-all"
              >
                +
              </button>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase block">
                  Total Cost
                </span>
                <span className="text-xl font-black text-[#F36B16]">
                  {formatCurrency(totalPrice)}
                </span>
              </div>

              <button
                onClick={handleBuy}
                disabled={purchasing}
                className="py-3.5 px-6 bg-[#F36B16] hover:bg-[#C95C2D] text-white text-xs font-black rounded-2xl shadow-md active:scale-95 transition-all flex items-center space-x-2 disabled:opacity-50"
              >
                {purchasing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Ticket className="w-4 h-4" />
                    <span>Confirm Purchase</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
