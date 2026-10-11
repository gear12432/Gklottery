import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Gift } from 'lucide-react';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  bgGradient: string;
  ctaText: string;
  link: string;
  icon: React.ReactNode;
}

const SLIDES: Slide[] = [
  {
    id: 'thiruvonam-bumper',
    title: 'Thiruvonam Bumper 2026',
    subtitle: 'Mega 1st Prize ₹25 Crore + 20 Sub-Jackpots!',
    badge: 'GRAND BUMPER',
    bgGradient: 'from-amber-600 via-orange-600 to-red-700',
    ctaText: 'Buy Ticket Now',
    link: '/lottery/draw-thiruvonam-bumper',
    icon: <Sparkles className="w-8 h-8 text-[#F6C445]" />,
  },
  {
    id: 'daily-winwin',
    title: 'Win-Win Draw (W-782)',
    subtitle: 'Live Today at 3:00 PM • 1st Prize ₹75 Lakhs',
    badge: 'TODAY LIVE',
    bgGradient: 'from-[#F36B16] via-[#E85D08] to-[#C95C2D]',
    ctaText: 'View Draw Details',
    link: '/lottery/draw-win-win',
    icon: <Gift className="w-8 h-8 text-yellow-200" />,
  },
  {
    id: 'vip-pass',
    title: 'VIP Platinum Pass',
    subtitle: 'Claim 50% Cashback + Free Bumper Entries',
    badge: 'LIMITED OFFER',
    bgGradient: 'from-purple-800 via-indigo-700 to-blue-800',
    ctaText: 'Claim Pass',
    link: '/vip-tickets',
    icon: <ShieldCheck className="w-8 h-8 text-amber-300" />,
  },
];

export const PromotionalCarousel: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentIndex];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-md my-3 select-none">
      <div
        className={`bg-gradient-to-r ${slide.bgGradient} p-5 text-white transition-all duration-500 min-h-[140px] flex flex-col justify-between relative overflow-hidden`}
      >
        {/* Background decorative circles */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-12 top-2 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl pointer-events-none" />

        {/* Top bar: Badge & Icon */}
        <div className="flex items-center justify-between z-10">
          <span className="bg-black/30 border border-white/20 text-[#F6C445] text-[10px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full backdrop-blur-xs">
            {slide.badge}
          </span>
          {slide.icon}
        </div>

        {/* Middle text */}
        <div className="z-10 my-2">
          <h2 className="text-lg font-black tracking-tight leading-tight drop-shadow-sm">
            {slide.title}
          </h2>
          <p className="text-xs text-white/90 font-medium mt-1 leading-snug">
            {slide.subtitle}
          </p>
        </div>

        {/* Bottom CTA & Slide Indicators */}
        <div className="flex items-center justify-between z-10 pt-1">
          <button
            onClick={() => navigate(slide.link)}
            className="inline-flex items-center space-x-1.5 bg-white text-gray-900 hover:bg-orange-50 font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-sm active:scale-95 transition-all"
          >
            <span>{slide.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F36B16]" />
          </button>

          {/* Dots */}
          <div className="flex items-center space-x-1.5">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-5 bg-[#F6C445]' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
