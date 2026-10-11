import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Heart, AlertTriangle, Lock } from 'lucide-react';

export const ResponsiblePlayPage: React.FC = () => {
  const navigate = useNavigate();

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
          <h1 className="text-base font-extrabold tracking-tight">Responsible Play</h1>
          <div className="w-8" />
        </div>
      </div>

      <main className="max-w-md mx-auto p-4 space-y-4 text-xs font-medium text-gray-700 leading-relaxed">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#16834A] flex items-center justify-center mb-2">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-base font-black text-gray-900">Play Responsibly & Safely</h2>
          <p>
            Kerala Lottery Live encourages all players to treat lottery draws and games purely as entertainment. Always maintain strict control over your budget and time.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-3">
          <h3 className="text-sm font-black text-gray-900 flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-[#F36B16]" />
            <span>Guiding Principles</span>
          </h3>
          <ul className="list-disc pl-4 space-y-1.5 text-gray-600">
            <li>Set a strict budget before purchasing any lottery ticket or entering draws.</li>
            <li>Never attempt to chase losses or spend money allocated for essential family expenses.</li>
            <li>Lotteries are games of chance; winning can never be guaranteed by any system or tool.</li>
            <li>Players must be 18 years of age or older in permitted legal jurisdictions.</li>
          </ul>
        </div>

        <div className="bg-amber-50 rounded-3xl p-5 border border-amber-200 text-amber-900 space-y-2">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
          <h3 className="text-xs font-black">Need Support or Self-Exclusion?</h3>
          <p className="text-[11px]">
            If you feel you need a break or wish to set daily spending limits, contact our support team at any time for assistance.
          </p>
        </div>
      </main>
    </div>
  );
};
