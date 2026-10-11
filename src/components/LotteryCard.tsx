import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Ticket, Sparkles, ChevronRight } from 'lucide-react';
import { LotteryDraw } from '../types/lottery';
import { formatCurrency } from '../utils/formatCurrency';
import { formatCountdown } from '../utils/dateUtils';

export const LotteryCard: React.FC<{ draw: LotteryDraw }> = ({ draw }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(formatCountdown(draw.nextDrawTimestamp));

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(formatCountdown(draw.nextDrawTimestamp));
    }, 1000);
    return () => clearInterval(timer);
  }, [draw.nextDrawTimestamp]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group">
      {/* Category Ribbon */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-1.5">
          <span className="bg-orange-100 text-[#C95C2D] text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
            {draw.code}
          </span>
          <span className="text-xs font-bold text-gray-800">{draw.dayName}</span>
        </div>
        <span className="text-xs font-extrabold text-[#16834A] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
          Price: ₹{draw.ticketPrice}
        </span>
      </div>

      {/* Main Details */}
      <div className="my-1">
        <h3 className="text-base font-extrabold text-gray-900 leading-tight group-hover:text-[#F36B16] transition-colors">
          {draw.name}
        </h3>
        <p className="text-xs text-gray-500 font-medium mt-0.5">
          Draw Time: <span className="font-semibold text-gray-700">{draw.drawDate}</span>
        </p>

        {/* First Prize Banner */}
        <div className="my-2.5 p-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-200/80 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#F6C445]" />
            <div>
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                1st Guaranteed Prize
              </span>
              <span className="text-sm font-black text-[#C95C2D]">
                {draw.firstPrize}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown Clock & CTA */}
      <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-1 text-gray-500 text-xs">
          <Clock className="w-3.5 h-3.5 text-[#F36B16]" />
          {countdown.isExpired ? (
            <span className="text-red-600 font-bold">Draw Closed</span>
          ) : (
            <span className="font-mono font-bold text-gray-800">
              {countdown.hours}:{countdown.minutes}:{countdown.seconds}
            </span>
          )}
        </div>

        <button
          onClick={() => navigate(`/lottery/${draw.id}`)}
          className="inline-flex items-center space-x-1 bg-[#F36B16] hover:bg-[#C95C2D] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs active:scale-95 transition-all"
        >
          <Ticket className="w-3.5 h-3.5" />
          <span>Buy Ticket</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
