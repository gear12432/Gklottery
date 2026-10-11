import React from 'react';
import { Volume2, Trophy } from 'lucide-react';
import { WINNER_TICKER_ITEMS } from '../services/lotteryService';

export const WinnerTicker: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-amber-500/10 via-orange-500/15 to-amber-500/10 border border-amber-200/80 rounded-xl p-2.5 my-3 flex items-center space-x-2 overflow-hidden shadow-2xs">
      <div className="flex items-center space-x-1.5 bg-[#F36B16] text-white px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider flex-shrink-0 shadow-xs">
        <Trophy className="w-3 h-3 text-[#F6C445]" />
        <span>WINNERS</span>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <div className="flex items-center space-x-6 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
          {WINNER_TICKER_ITEMS.concat(WINNER_TICKER_ITEMS).map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="inline-flex items-center space-x-1.5 text-xs text-gray-800">
              <span className="font-bold text-gray-900">{item.winnerName}</span>
              <span className="text-gray-500 text-[10px]">({item.district})</span>
              <span className="text-gray-400">•</span>
              <span className="font-extrabold text-[#16834A]">{item.prizeAmount}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 font-medium">{item.lotteryName}</span>
              <span className="bg-orange-100 text-[#C95C2D] text-[10px] font-bold px-1.5 py-0.2 rounded">
                {item.timeAgo}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Volume2 className="w-4 h-4 text-[#F36B16] flex-shrink-0 animate-pulse" />
    </div>
  );
};
