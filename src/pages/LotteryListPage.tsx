import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Ticket, Search, Filter } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { LotteryCard } from '../components/LotteryCard';
import { KERALA_LOTTERIES } from '../services/lotteryService';

export const LotteryListPage: React.FC = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<'all' | 'daily' | 'bumper'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = KERALA_LOTTERIES.filter((l) => {
    const matchCat = category === 'all' || l.category === category;
    const matchSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#EEF2F3] text-[#242424] pb-24 select-none">
      <AppHeader />

      <main className="max-w-md mx-auto px-3 pt-3 space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-1 text-xs font-bold text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <h1 className="text-base font-extrabold text-gray-900">Kerala Lotteries Catalog</h1>
          <div className="w-12" />
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2">
          {[
            { id: 'all', label: 'All Draws' },
            { id: 'daily', label: 'Weekly Daily' },
            { id: 'bumper', label: 'Mega Bumpers' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCategory(tab.id as any)}
              className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all ${
                category === tab.id
                  ? 'bg-[#F36B16] text-white shadow-xs'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lottery name e.g. Win-Win"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:border-[#F36B16] focus:ring-2 focus:ring-orange-100 outline-none transition-all shadow-2xs"
          />
        </div>

        {/* Catalog List */}
        <div className="space-y-3">
          {filtered.map((draw) => (
            <LotteryCard key={draw.id} draw={draw} />
          ))}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};
