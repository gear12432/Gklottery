import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Trophy, CheckCircle2, Calendar, ShieldCheck, Filter } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { RECENT_LOTTERY_RESULTS } from '../services/lotteryService';

export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedResult, setSelectedResult] = useState(RECENT_LOTTERY_RESULTS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrizes = selectedResult.prizes.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const rankMatch = p.rank.toLowerCase().includes(q);
    const amountMatch = p.amount.toLowerCase().includes(q);
    let numMatch = false;
    if (typeof p.winningNumber === 'string') {
      numMatch = p.winningNumber.toLowerCase().includes(q);
    } else if (Array.isArray(p.winningNumber)) {
      numMatch = p.winningNumber.some((n) => n.toLowerCase().includes(q));
    }
    return rankMatch || amountMatch || numMatch;
  });

  return (
    <div className="min-h-screen bg-[#EEF2F3] text-[#242424] pb-24 select-none">
      <AppHeader />

      <main className="max-w-md mx-auto px-3 pt-3 space-y-4">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#16834A] to-emerald-800 rounded-3xl p-4 text-white shadow-md flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-1 mb-1">
              <ShieldCheck className="w-4 h-4 text-[#F6C445]" />
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                OFFICIAL GAZETTE
              </span>
            </div>
            <h1 className="text-lg font-black tracking-tight">Verified Lottery Results</h1>
            <p className="text-xs text-emerald-100 font-medium mt-0.5">
              Official winning numbers published daily at 03:00 PM
            </p>
          </div>
          <Trophy className="w-12 h-12 text-[#F6C445] flex-shrink-0 opacity-90" />
        </div>

        {/* Draw Selector Chips */}
        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {RECENT_LOTTERY_RESULTS.map((res) => (
            <button
              key={res.id}
              onClick={() => setSelectedResult(res)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all active:scale-95 ${
                selectedResult.id === res.id
                  ? 'bg-[#F36B16] text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-orange-50'
              }`}
            >
              {res.lotteryName}
            </button>
          ))}
        </div>

        {/* Search Number Filter */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ticket number e.g. WA 849201"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:border-[#F36B16] focus:ring-2 focus:ring-orange-100 outline-none transition-all shadow-2xs"
          />
        </div>

        {/* Selected Result Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <div className="flex items-center space-x-1.5">
                <h2 className="text-base font-black text-gray-900">
                  {selectedResult.lotteryName}
                </h2>
                <span className="bg-emerald-100 text-[#16834A] text-[9px] font-black px-2 py-0.5 rounded-full flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium mt-0.5 flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-[#F36B16]" />
                <span>Draw Date: {selectedResult.drawDate}</span>
              </p>
            </div>
            <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
              {selectedResult.drawNumber}
            </span>
          </div>

          {/* Prize Tiers List */}
          <div className="space-y-3">
            {filteredPrizes.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">
                No matching prize numbers found for "{searchQuery}".
              </p>
            ) : (
              filteredPrizes.map((p, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border ${
                    idx === 0
                      ? 'bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-amber-300'
                      : 'bg-gray-50 border-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-extrabold text-gray-900">{p.rank}</span>
                    <span className="text-xs font-black text-[#C95C2D]">{p.amount}</span>
                  </div>

                  {p.winningNumber && (
                    <div className="mt-1">
                      {typeof p.winningNumber === 'string' ? (
                        <span className="inline-block bg-white text-gray-900 font-mono font-black text-xs px-3 py-1 rounded-lg border border-gray-200 shadow-2xs">
                          {p.winningNumber}
                        </span>
                      ) : (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {p.winningNumber.map((num, nIdx) => (
                            <span
                              key={nIdx}
                              className="bg-white text-gray-900 font-mono font-bold text-[11px] px-2.5 py-0.5 rounded-md border border-gray-200 shadow-2xs"
                            >
                              {num}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};
