import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckCircle2, Gift, Sparkles, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getTodayCheckIn, performDailyCheckIn, CHECKIN_REWARDS_BY_DAY } from '../services/checkInService';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { formatCurrency } from '../utils/formatCurrency';

export const CheckInPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [claimedReward, setClaimedReward] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.uid) {
      getTodayCheckIn(user.uid)
        .then((record) => {
          if (record) {
            setIsCheckedIn(true);
            setClaimedReward(record.rewardAmount);
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleClaim = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setClaiming(true);
    setError(null);

    try {
      // Calculate day streak (default 1)
      const res = await performDailyCheckIn(user.uid, 1);
      setIsCheckedIn(true);
      setClaimedReward(res.rewardAmount);
      await refreshProfile();
    } catch (err: any) {
      setError('Failed to process daily check-in. Please try again.');
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF2F3] pb-12 select-none">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#F36B16] to-[#C95C2D] p-4 text-white">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-90 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <h1 className="text-base font-extrabold tracking-tight">Daily Check-In Rewards</h1>
          <div className="w-8" />
        </div>
      </div>

      <main className="max-w-md mx-auto p-4 space-y-4">
        {/* Banner Card */}
        <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 rounded-3xl p-6 text-white shadow-md relative overflow-hidden text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Gift className="w-10 h-10 text-[#F6C445] animate-bounce" />
          </div>
          <h2 className="text-xl font-black">Check In Every Day</h2>
          <p className="text-xs text-orange-100 font-medium mt-1 max-w-xs mx-auto">
            Maintain your daily streak to unlock up to ₹150 Free Credit + VIP Bumper Entry Pass!
          </p>

          <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-around text-center">
            <div>
              <span className="text-[10px] text-orange-100 uppercase tracking-wider block font-bold">
                Wallet Balance
              </span>
              <span className="text-lg font-black text-[#F6C445]">
                {formatCurrency(profile?.balance || 0)}
              </span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <span className="text-[10px] text-orange-100 uppercase tracking-wider block font-bold">
                Check-In Status
              </span>
              <span className="text-sm font-black text-white">
                {isCheckedIn ? 'Checked In Today' : 'Ready To Claim'}
              </span>
            </div>
          </div>
        </div>

        {error && <ErrorMessage message={error} />}

        {loading ? (
          <LoadingSpinner message="Checking today's check-in status..." />
        ) : (
          <>
            {/* Action Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center">
              {isCheckedIn ? (
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#16834A] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-extrabold text-gray-900">
                    Checked In For Today!
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    You earned <span className="font-bold text-[#16834A]">₹{claimedReward}</span> credit! Come back tomorrow to continue your streak.
                  </p>
                  <button
                    onClick={() => navigate('/')}
                    className="mt-2 w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-all"
                  >
                    Return to Home
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-sm font-extrabold text-gray-800">
                    Day 1 Reward: ₹10 Bonus Credit
                  </h3>
                  <button
                    onClick={handleClaim}
                    disabled={claiming}
                    className="w-full py-3.5 bg-[#F36B16] hover:bg-[#C95C2D] text-white text-xs font-black rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-60"
                  >
                    {claiming ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#F6C445]" />
                        <span>Claim Today's Reward</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* 7 Day Streak Roadmap */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-[#F36B16]" />
                <span>7-Day Streak Roadmap</span>
              </h3>

              <div className="grid grid-cols-2 gap-2.5">
                {CHECKIN_REWARDS_BY_DAY.map((item) => (
                  <div
                    key={item.day}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      item.day === 1 && isCheckedIn
                        ? 'bg-emerald-50 border-emerald-200 text-[#16834A]'
                        : 'bg-gray-50 border-gray-100 text-gray-800'
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase tracking-wider block text-gray-400">
                      Day {item.day}
                    </span>
                    <span className="text-sm font-black mt-0.5 block">
                      ₹{item.amount}
                    </span>
                    {item.day === 7 && (
                      <span className="text-[9px] font-extrabold text-amber-600 block mt-0.5">
                        + VIP Pass
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};
