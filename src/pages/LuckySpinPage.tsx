import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Dices, Sparkles, Trophy, Award, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createTransaction } from '../services/transactionService';
import { formatCurrency } from '../utils/formatCurrency';
import { ErrorMessage } from '../components/ErrorMessage';

const WHEEL_SECTORS = [
  { label: '₹10', value: 10, bg: '#F36B16', text: '#FFFFFF' },
  { label: '₹25', value: 25, bg: '#16834A', text: '#FFFFFF' },
  { label: '₹50', value: 50, bg: '#F6C445', text: '#242424' },
  { label: '₹100', value: 100, bg: '#C95C2D', text: '#FFFFFF' },
  { label: 'Better Luck', value: 0, bg: '#9CA3AF', text: '#FFFFFF' },
  { label: '₹200 VIP', value: 200, bg: '#7C3AED', text: '#FFFFFF' },
  { label: '₹15', value: 15, bg: '#EA580C', text: '#FFFFFF' },
  { label: '₹500 Grand', value: 500, bg: '#DC2626', text: '#FFFFFF' },
];

export const LuckySpinPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<string | null>(null);
  const [spinsLeft, setSpinsLeft] = useState(3);
  const [error, setError] = useState<string | null>(null);

  const handleSpin = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (spinsLeft <= 0) {
      setError('No remaining spins for today! Check back tomorrow or claim VIP ticket pass.');
      return;
    }
    if (isSpinning) return;

    setError(null);
    setIsSpinning(true);
    setWonPrize(null);

    // Pick random target sector index
    const randomIndex = Math.floor(Math.random() * WHEEL_SECTORS.length);
    const selectedSector = WHEEL_SECTORS[randomIndex];

    // Compute extra full turns + target angle
    const sectorAngle = 360 / WHEEL_SECTORS.length;
    const targetDegree = 360 * 5 + (WHEEL_SECTORS.length - randomIndex) * sectorAngle - sectorAngle / 2;

    setRotation((prev) => prev + targetDegree);

    setTimeout(async () => {
      setIsSpinning(false);
      setSpinsLeft((prev) => Math.max(0, prev - 1));

      if (selectedSector.value > 0) {
        setWonPrize(`Congratulations! You won ${selectedSector.label}!`);
        await createTransaction(
          user.uid,
          'LUCKY_SPIN_REWARD',
          selectedSector.value,
          'WALLET_BALANCE',
          `Lucky Wheel Spin Win (${selectedSector.label})`
        );
        await refreshProfile();
      } else {
        setWonPrize('Better luck next time! Try another spin.');
      }
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#EEF2F3] pb-12 select-none">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 p-4 text-white">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-90 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <h1 className="text-base font-extrabold tracking-tight">Lucky Wheel Spin</h1>
          <div className="w-8" />
        </div>
      </div>

      <main className="max-w-md mx-auto p-4 space-y-4">
        {/* Banner Card */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Available Wallet Balance
            </span>
            <span className="text-lg font-black text-[#F36B16]">
              {formatCurrency(profile?.balance || 0)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Free Spins Remaining
            </span>
            <span className="text-sm font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 inline-block mt-0.5">
              {spinsLeft} Spins Left
            </span>
          </div>
        </div>

        {error && <ErrorMessage message={error} />}

        {wonPrize && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-center shadow-xs animate-bounce">
            <Sparkles className="w-6 h-6 text-[#F6C445] mx-auto mb-1" />
            <h3 className="text-sm font-extrabold text-amber-900">{wonPrize}</h3>
          </div>
        )}

        {/* Wheel Container */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center relative overflow-hidden">
          {/* Wheel Pointer */}
          <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-red-600 z-20 -mb-4 drop-shadow-md" />

          {/* Wheel */}
          <div
            className="w-64 h-64 rounded-full relative border-8 border-amber-400 shadow-xl overflow-hidden transition-all duration-[4000ms] ease-out"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {WHEEL_SECTORS.map((sector, index) => {
              const angle = 360 / WHEEL_SECTORS.length;
              const rotateVal = index * angle;

              return (
                <div
                  key={index}
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    transform: `rotate(${rotateVal}deg)`,
                    transformOrigin: '50% 50%',
                  }}
                >
                  <div
                    className="w-full h-full flex items-start justify-center pt-3 text-[11px] font-black tracking-tight"
                    style={{ color: sector.text }}
                  >
                    {sector.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Spin Button */}
          <button
            onClick={handleSpin}
            disabled={isSpinning || spinsLeft <= 0}
            className="mt-6 w-full py-4 bg-gradient-to-r from-[#F36B16] via-[#E85D08] to-[#C95C2D] text-white text-sm font-black rounded-2xl shadow-lg hover:scale-102 active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isSpinning ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Spinning Wheel...</span>
              </>
            ) : (
              <>
                <Dices className="w-5 h-5" />
                <span>SPIN WHEEL NOW</span>
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
};
