import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Sparkles, CheckCircle2, Ticket, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEMO_VIP_TICKETS } from '../services/lotteryService';
import { createTransaction } from '../services/transactionService';
import { formatCurrency } from '../utils/formatCurrency';
import { ErrorMessage } from '../components/ErrorMessage';

export const VipTicketsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const [claimedPasses, setClaimedPasses] = useState<string[]>([]);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClaim = async (passId: string, bonusCredit: number, title: string) => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (claimedPasses.includes(passId)) return;

    setClaimingId(passId);
    setError(null);

    try {
      await createTransaction(
        user.uid,
        'VIP_BONUS',
        bonusCredit,
        'WALLET_BALANCE',
        `Claimed VIP Pass Reward: ${title}`
      );
      setClaimedPasses((prev) => [...prev, passId]);
      await refreshProfile();
    } catch (err) {
      setError('Failed to claim VIP pass. Please try again.');
    } finally {
      setClaimingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF2F3] pb-12 select-none">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 p-4 text-white">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-90 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <h1 className="text-base font-extrabold tracking-tight">VIP Pass Center</h1>
          <div className="w-8" />
        </div>
      </div>

      <main className="max-w-md mx-auto p-4 space-y-4">
        {/* Banner */}
        <div className="bg-gradient-to-br from-purple-800 via-indigo-700 to-blue-800 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="flex items-center space-x-2 mb-2">
            <Award className="w-6 h-6 text-[#F6C445]" />
            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
              EXCLUSIVE MEMBERSHIP
            </span>
          </div>
          <h2 className="text-xl font-black">VIP Draw Passes</h2>
          <p className="text-xs text-indigo-100 font-medium mt-1">
            Unlock instant cashback bonus, bumper ticket discounts, and zero-fee withdrawals!
          </p>
        </div>

        {error && <ErrorMessage message={error} />}

        {/* Passes List */}
        <div className="space-y-3">
          {DEMO_VIP_TICKETS.map((pass) => {
            const isClaimed = claimedPasses.includes(pass.id);

            return (
              <div
                key={pass.id}
                className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 relative overflow-hidden space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                      {pass.passType}
                    </span>
                    <span className="text-xs font-bold text-gray-500">
                      Bonus: <span className="text-[#16834A] font-black">₹{pass.bonusCredit}</span>
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-gray-900">{pass.title}</h3>
                  <p className="text-xs text-gray-500 font-medium mt-1">{pass.description}</p>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg">
                    Expires in 3 days
                  </span>

                  {isClaimed ? (
                    <span className="inline-flex items-center space-x-1 text-xs font-black text-[#16834A] bg-emerald-50 px-3 py-1.5 rounded-xl">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Pass Claimed</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleClaim(pass.id, pass.bonusCredit, pass.title)}
                      disabled={claimingId === pass.id}
                      className="bg-[#F36B16] hover:bg-[#C95C2D] text-white text-xs font-black px-4 py-2 rounded-xl shadow-xs active:scale-95 transition-all flex items-center space-x-1 disabled:opacity-50"
                    >
                      {claimingId === pass.id ? (
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-[#F6C445]" />
                          <span>Claim ₹{pass.bonusCredit} Pass</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
