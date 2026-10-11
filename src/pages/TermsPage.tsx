import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
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
          <h1 className="text-base font-extrabold tracking-tight">Terms & Conditions</h1>
          <div className="w-8" />
        </div>
      </div>

      <main className="max-w-md mx-auto p-4 space-y-4 text-xs font-medium text-gray-700 leading-relaxed">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-3">
          <FileText className="w-6 h-6 text-[#F36B16]" />
          <h2 className="text-base font-black text-gray-900">User Agreement</h2>
          <p>
            Welcome to Kerala Lottery Live. By accessing our web application, you agree to comply with and be bound by the following terms and conditions.
          </p>
          <h3 className="text-xs font-bold text-gray-900 pt-2">1. Eligibility</h3>
          <p>
            Users must be at least 18 years old and reside in states or territories where participation in lottery draws is legally permitted.
          </p>
          <h3 className="text-xs font-bold text-gray-900 pt-2">2. Official Verification</h3>
          <p>
            All draw winning numbers shown in the application are synchronized with published official gazettes.
          </p>
          <h3 className="text-xs font-bold text-gray-900 pt-2">3. Wallet & Balance Integrity</h3>
          <p>
            User balances are stored securely in Firebase Cloud Database. Unauthorized attempts to tamper with transactions or balances will result in immediate account suspension.
          </p>
        </div>
      </main>
    </div>
  );
};
