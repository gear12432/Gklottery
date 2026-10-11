import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 1800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F36B16] via-[#E85D08] to-[#C95C2D] flex flex-col items-center justify-between p-8 text-white select-none">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl animate-pulse">
            <Sparkles className="w-14 h-14 text-[#F6C445]" />
          </div>
          <span className="absolute -bottom-2 -right-2 bg-[#16834A] text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-white">
            LIVE
          </span>
        </div>

        <h1 className="text-2xl font-black tracking-tight drop-shadow-md">
          Kerala Lottery Live
        </h1>
        <p className="text-xs text-orange-100 font-medium max-w-xs mt-1.5 leading-relaxed">
          Official Live Draw Results, Daily Check-In & VIP Bumper Passes
        </p>
      </div>

      <div className="flex flex-col items-center space-y-2 pb-6">
        <div className="w-6 h-6 rounded-full border-2 border-white border-t-transparent animate-spin" />
        <div className="flex items-center space-x-1 text-[11px] text-orange-100 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-[#F6C445]" />
          <span>Secure Verified Data Connection</span>
        </div>
      </div>
    </div>
  );
};
