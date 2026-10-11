import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#EEF2F3] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 max-w-sm w-full space-y-4">
        <div className="w-16 h-16 rounded-full bg-orange-100 text-[#F36B16] flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-gray-900">404</h1>
        <h2 className="text-sm font-bold text-gray-700">Page Not Found</h2>
        <p className="text-xs text-gray-500 font-medium">
          The requested page or draw route does not exist or has been moved.
        </p>

        <button
          onClick={() => navigate('/')}
          className="w-full py-3 bg-[#F36B16] hover:bg-[#C95C2D] text-white text-xs font-black rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center space-x-2"
        >
          <Home className="w-4 h-4" />
          <span>Return to Home</span>
        </button>
      </div>
    </div>
  );
};
