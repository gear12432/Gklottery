import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ChevronRight, Ticket, Flame, ShieldAlert, Award } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { PromotionalCarousel } from '../components/PromotionalCarousel';
import { WinnerTicker } from '../components/WinnerTicker';
import { QuickActionCard } from '../components/QuickActionCard';
import { LotteryCard } from '../components/LotteryCard';
import { GameCard, POPULAR_GAMES } from '../components/GameCard';
import { DepositButton } from '../components/DepositButton';
import { KERALA_LOTTERIES, DEMO_VIP_TICKETS } from '../services/lotteryService';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#EEF2F3] text-[#242424] pb-24 font-sans select-none">
      {/* Top Header */}
      <AppHeader />

      {/* Main Content Area */}
      <main className="max-w-md mx-auto px-3 pt-2">
        {/* Promotional Banner Carousel */}
        <PromotionalCarousel />

        {/* Winner Ticker Strip */}
        <WinnerTicker />

        {/* Four Shortcuts Grid */}
        <QuickActionCard />

        {/* VIP Ticket Promotional Banner */}
        <div className="my-3 p-4 rounded-2xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
            <Award className="w-32 h-32 text-white" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-1.5 mb-1">
                <span className="bg-[#F6C445] text-gray-900 text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                  VIP PASS
                </span>
                <span className="text-[10px] text-amber-100 font-bold">Limited Slots</span>
              </div>
              <h3 className="text-base font-extrabold tracking-tight">
                Thiruvonam VIP Pass 2026
              </h3>
              <p className="text-xs text-orange-100 font-medium mt-0.5">
                Claim ₹250 Direct Wallet Cashback + 2x Free Draw Entry
              </p>
            </div>

            <button
              onClick={() => navigate('/vip-tickets')}
              className="bg-white text-gray-900 hover:bg-orange-50 font-black text-xs px-3.5 py-2 rounded-xl shadow-md active:scale-95 transition-all flex-shrink-0 ml-2"
            >
              Claim Pass
            </button>
          </div>
        </div>

        {/* Section: Kerala State Lotteries */}
        <section className="my-4">
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <h2 className="text-base font-extrabold text-gray-900 tracking-tight flex items-center space-x-1.5">
                <Ticket className="w-4 h-4 text-[#F36B16]" />
                <span>Kerala Lotteries</span>
              </h2>
              <p className="text-[11px] text-gray-500 font-medium">
                Official weekly draws authorized by Directorate of State Lotteries
              </p>
            </div>
            <button
              onClick={() => navigate('/lotteries')}
              className="inline-flex items-center space-x-0.5 text-xs font-bold text-[#F36B16] hover:underline"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Horizontal Scrolling Cards */}
          <div className="flex space-x-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-none -mx-3 px-3">
            {KERALA_LOTTERIES.map((draw) => (
              <div key={draw.id} className="w-[280px] flex-shrink-0 snap-start">
                <LotteryCard draw={draw} />
              </div>
            ))}
          </div>
        </section>

        {/* Section: Most Popular Games */}
        <section className="my-4">
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <h2 className="text-base font-extrabold text-gray-900 tracking-tight flex items-center space-x-1.5">
                <Flame className="w-4 h-4 text-red-500 animate-bounce" />
                <span>Most Popular</span>
              </h2>
              <p className="text-[11px] text-gray-500 font-medium">
                Instant match mini-games and daily lucky draws
              </p>
            </div>
            <span className="text-[10px] font-bold bg-orange-100 text-[#C95C2D] px-2 py-0.5 rounded-full">
              24/7 ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {POPULAR_GAMES.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Non-Affiliation Legal Notice Footer */}
        <footer className="my-6 text-center text-[10px] text-gray-400 font-medium space-y-1.5 px-4 bg-white/60 p-3 rounded-2xl border border-gray-100">
          <p>
            Kerala Lottery Live is an independent information, results & verified ticket assistant portal.
          </p>
          <div className="flex justify-center space-x-3 text-[#F36B16] font-bold">
            <button onClick={() => navigate('/terms')} className="hover:underline">Terms</button>
            <span>•</span>
            <button onClick={() => navigate('/privacy')} className="hover:underline">Privacy</button>
            <span>•</span>
            <button onClick={() => navigate('/responsible-play')} className="hover:underline">Responsible Play</button>
          </div>
        </footer>
      </main>

      {/* Floating Deposit Shortcut */}
      <DepositButton />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};
