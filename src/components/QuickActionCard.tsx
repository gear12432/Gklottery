import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, Dices, Trophy, ArrowUpCircle } from 'lucide-react';

export const QuickActionCard: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'check-in',
      title: 'Check In',
      subtitle: 'Daily Rewards',
      icon: CalendarCheck,
      path: '/check-in',
      bgGradient: 'from-orange-500 to-amber-600',
      badge: 'FREE ₹',
    },
    {
      id: 'lucky-spin',
      title: 'Lucky Spin',
      subtitle: 'Wheel Bonus',
      icon: Dices,
      path: '/lucky-spin',
      bgGradient: 'from-amber-500 to-yellow-600',
      badge: 'SPIN',
    },
    {
      id: 'result',
      title: 'Result',
      subtitle: 'Official Live',
      icon: Trophy,
      path: '/results',
      bgGradient: 'from-[#16834A] to-emerald-700',
      badge: 'LIVE',
    },
    {
      id: 'deposit',
      title: 'Deposit',
      subtitle: 'Add Funds',
      icon: ArrowUpCircle,
      path: '/deposit',
      bgGradient: 'from-indigo-600 to-purple-700',
      badge: 'FAST',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2.5 my-3">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <button
            key={act.id}
            onClick={() => navigate(act.path)}
            className="flex flex-col items-center justify-between bg-white rounded-2xl p-2.5 shadow-xs border border-gray-100 hover:shadow-md hover:border-orange-200 active:scale-95 transition-all relative overflow-hidden group min-h-[96px]"
          >
            {/* Top Badge */}
            <span className="bg-orange-100 text-[#C95C2D] text-[8px] font-black tracking-wider uppercase px-1.5 py-0.2 rounded-full mb-1">
              {act.badge}
            </span>

            {/* Icon Bubble */}
            <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${act.bgGradient} flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform`}>
              <Icon className="w-5 h-5" />
            </div>

            {/* Label */}
            <div className="mt-1.5 text-center">
              <span className="block text-xs font-extrabold text-gray-800 tracking-tight leading-none">
                {act.title}
              </span>
              <span className="text-[9px] text-gray-400 font-medium block mt-0.5">
                {act.subtitle}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
