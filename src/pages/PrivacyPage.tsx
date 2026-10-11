import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, ShieldCheck } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
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
          <h1 className="text-base font-extrabold tracking-tight">Privacy Policy</h1>
          <div className="w-8" />
        </div>
      </div>

      <main className="max-w-md mx-auto p-4 space-y-4 text-xs font-medium text-gray-700 leading-relaxed">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-3">
          <Lock className="w-6 h-6 text-[#16834A]" />
          <h2 className="text-base font-black text-gray-900">Your Data Protection</h2>
          <p>
            Kerala Lottery Live values user privacy and is committed to safeguarding personal information using Firebase Security Rules and zero-trust encryption protocols.
          </p>
          <h3 className="text-xs font-bold text-gray-900 pt-2">Data Collection</h3>
          <p>
            We collect basic profile information (Full Name, Email Address, Phone Number) purely for account identity, security, and transaction recording.
          </p>
          <h3 className="text-xs font-bold text-gray-900 pt-2">Security Rules</h3>
          <p>
            Your private user documents and transactions are strictly isolated under Firestore security rules (`request.auth.uid == userId`) and never shared with third parties.
          </p>
        </div>
      </main>
    </div>
  );
};
