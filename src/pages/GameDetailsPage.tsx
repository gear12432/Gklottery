import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Flame, Sparkles, CheckCircle2 } from 'lucide-react';
import { POPULAR_GAMES } from '../components/GameCard';
import { useAuth } from '../context/AuthContext';
import { createTransaction } from '../services/transactionService';
import { formatCurrency } from '../utils/formatCurrency';
import { ErrorMessage } from '../components/ErrorMessage';

export const GameDetailsPage: React.FC = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const [playing, setPlaying] = useState(false);
  const [resultMsg, setResultMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const game = POPULAR_GAMES.find((g) => g.id === gameId) || POPULAR_GAMES[0];
  const entryFee = parseInt(game.minEntry.replace(/[^0-9]/g, '')) || 20;

  const handlePlay = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setError(null);
    setResultMsg(null);

    if ((profile?.balance || 0) < entryFee) {
      setError(`Insufficient balance. Please deposit at least ${formatCurrency(entryFee - (profile?.balance || 0))}.`);
      return;
    }

    setPlaying(true);
    try {
      // Deduct entry
      await createTransaction(user.uid, 'LOTTERY_PURCHASE', entryFee, 'WALLET_BALANCE', `Entry Fee for ${game.title}`);

      // Random win logic (60% win rate for demo)
      const isWin = Math.random() > 0.4;
      const winMultiplier = isWin ? 2.5 : 0;
      const winAmount = Math.round(entryFee * winMultiplier);

      setTimeout(async () => {
        setPlaying(false);
        if (isWin) {
          setResultMsg(`Jackpot! You guessed correctly and won ${formatCurrency(winAmount)}!`);
          await createTransaction(user.uid, 'WINNINGS', winAmount, 'WALLET_BALANCE', `Winnings from ${game.title}`);
        } else {
          setResultMsg('Close guess! Better luck on your next round.');
        }
        await refreshProfile();
      }, 1500);
    } catch (err: any) {
      setError('Game error. Please try again.');
      setPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF2F3] pb-12 select-none">
      <div className="bg-gradient-to-r from-[#F36B16] to-[#C95C2D] p-4 text-white">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-90 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <h1 className="text-base font-extrabold tracking-tight">{game.title}</h1>
          <div className="w-8" />
        </div>
      </div>

      <main className="max-w-md mx-auto p-4 space-y-4">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 text-center space-y-3">
          <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${game.bgGradient} flex items-center justify-center text-white mx-auto shadow-md`}>
            <Flame className="w-8 h-8 text-yellow-200 animate-bounce" />
          </div>
          <h2 className="text-lg font-black text-gray-900">{game.title}</h2>
          <p className="text-xs text-gray-500 font-medium">{game.category} • Entry: {game.minEntry}</p>
        </div>

        {error && <ErrorMessage message={error} />}

        {resultMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#16834A] mx-auto" />
            <p className="text-xs font-extrabold text-emerald-900">{resultMsg}</p>
          </div>
        )}

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">Your Wallet Balance</span>
            <span className="text-sm font-black text-[#F36B16]">
              {formatCurrency(profile?.balance || 0)}
            </span>
          </div>

          <button
            onClick={handlePlay}
            disabled={playing}
            className="w-full py-4 bg-[#F36B16] hover:bg-[#C95C2D] text-white text-xs font-black rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {playing ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>START ROUND ({formatCurrency(entryFee)})</span>
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
};
