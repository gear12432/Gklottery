import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Sparkles, Flame, ShieldAlert } from 'lucide-react';

export interface GameItem {
  id: string;
  title: string;
  category: string;
  playersCount: string;
  minEntry: string;
  tag: string;
  bgGradient: string;
  iconName: string;
}

export const POPULAR_GAMES: GameItem[] = [
  {
    id: 'game-fast-3min',
    title: 'Fast 3 Min Win',
    category: 'Instant Result',
    playersCount: '14.2k Online',
    minEntry: '₹10',
    tag: 'HOT',
    bgGradient: 'from-orange-500 to-red-600',
    iconName: 'Flame',
  },
  {
    id: 'game-number-match',
    title: 'Kerala Number Match',
    category: '3-Digit Guess',
    playersCount: '8.9k Online',
    minEntry: '₹20',
    tag: 'POPULAR',
    bgGradient: 'from-amber-500 to-orange-600',
    iconName: 'Sparkles',
  },
  {
    id: 'game-golden-matka',
    title: 'Golden Matka Live',
    category: 'Daily Jackpot',
    playersCount: '21.5k Online',
    minEntry: '₹50',
    tag: 'HIGH PAYOUT',
    bgGradient: 'from-yellow-600 to-amber-700',
    iconName: 'Sparkles',
  },
  {
    id: 'game-bumper-pass',
    title: 'VIP Bumper Pass',
    category: 'Guaranteed Multiplier',
    playersCount: '5.1k Online',
    minEntry: '₹100',
    tag: 'VIP ONLY',
    bgGradient: 'from-purple-600 to-indigo-800',
    iconName: 'ShieldAlert',
  },
];

export const GameCard: React.FC<{ game: GameItem }> = ({ game }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/game/${game.id}`)}
      className="bg-white rounded-2xl p-3 border border-gray-100 shadow-xs hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
    >
      <div className="flex items-center space-x-3">
        {/* Game Badge Icon */}
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${game.bgGradient} flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform flex-shrink-0`}>
          <Flame className="w-6 h-6 text-yellow-200" />
        </div>

        <div>
          <div className="flex items-center space-x-1.5">
            <h4 className="text-sm font-extrabold text-gray-900 group-hover:text-[#F36B16] transition-colors">
              {game.title}
            </h4>
            <span className="bg-red-100 text-red-700 text-[8px] font-black tracking-wider uppercase px-1.5 py-0.2 rounded-full">
              {game.tag}
            </span>
          </div>
          <p className="text-[11px] text-gray-500 font-medium">
            {game.category} • <span className="text-emerald-600 font-semibold">{game.playersCount}</span>
          </p>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <span className="text-[10px] text-gray-400 block font-medium">Entry</span>
        <span className="text-xs font-black text-gray-800 block">{game.minEntry}</span>
        <div className="mt-1 w-6 h-6 rounded-full bg-orange-100 text-[#F36B16] flex items-center justify-center ml-auto group-hover:bg-[#F36B16] group-hover:text-white transition-all">
          <Play className="w-3 h-3 fill-current ml-0.5" />
        </div>
      </div>
    </div>
  );
};
