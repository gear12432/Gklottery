import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpCircle, Plus } from 'lucide-react';

export const DepositButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-16 right-4 z-30">
      <button
        onClick={() => navigate('/deposit')}
        className="flex items-center space-x-1.5 bg-gradient-to-r from-[#F36B16] to-[#C95C2D] text-white font-extrabold text-xs px-4 py-2.5 rounded-full shadow-lg border border-white/30 hover:scale-105 active:scale-95 transition-all animate-bounce"
      >
        <Plus className="w-4 h-4 stroke-[3]" />
        <span>Deposit</span>
      </button>
    </div>
  );
};
