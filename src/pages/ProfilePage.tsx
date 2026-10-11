import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  LogOut,
  Wallet,
  History,
  ShieldCheck,
  FileText,
  Headset,
  Edit,
  Award,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/dateUtils';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#EEF2F3] text-[#242424] pb-24 select-none">
      <AppHeader />

      <main className="max-w-md mx-auto px-3 pt-3 space-y-4">
        {/* User Card */}
        <div className="bg-gradient-to-r from-[#F36B16] via-[#E85D08] to-[#C95C2D] rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-xl font-black shadow-inner">
              {profile?.displayName?.charAt(0).toUpperCase() || 'U'}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1.5">
                <h2 className="text-base font-black truncate">{profile?.displayName || 'Lottery Player'}</h2>
                <span className="bg-[#F6C445] text-gray-900 text-[9px] font-black uppercase px-2 py-0.2 rounded-full">
                  {profile?.vipLevel || 'BRONZE'}
                </span>
              </div>
              <p className="text-xs text-orange-100 font-medium truncate">{user?.email}</p>
              <p className="text-[10px] text-orange-200/80 font-medium mt-0.5">
                Member since {formatDate(profile?.createdAt || Date.now())}
              </p>
            </div>

            <button
              onClick={() => navigate('/edit-profile')}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center active:scale-90 transition-all text-white"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-orange-100 uppercase tracking-wider block font-bold">
                Wallet Balance
              </span>
              <span className="text-lg font-black text-[#F6C445]">
                {formatCurrency(profile?.balance || 0)}
              </span>
            </div>

            <button
              onClick={() => navigate('/deposit')}
              className="bg-white text-gray-900 font-black text-xs px-3.5 py-1.5 rounded-xl shadow-xs active:scale-95 transition-all"
            >
              Deposit Funds
            </button>
          </div>
        </div>

        {/* Links Menu */}
        <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100 divide-y divide-gray-100">
          {[
            { label: 'Edit Profile & Details', icon: Edit, path: '/edit-profile' },
            { label: 'Wallet & Transaction History', icon: History, path: '/history' },
            { label: 'VIP Pass Membership', icon: Award, path: '/vip-tickets' },
            { label: 'Customer Support & Help', icon: Headset, path: '/support' },
            { label: 'Responsible Play Policy', icon: ShieldCheck, path: '/responsible-play' },
            { label: 'Terms & Conditions', icon: FileText, path: '/terms' },
            { label: 'Privacy Policy', icon: FileText, path: '/privacy' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => navigate(item.path)}
                className="w-full p-3.5 flex items-center justify-between hover:bg-orange-50/50 transition-colors rounded-xl text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#F36B16] flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-gray-800">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            );
          })}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-3.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-black rounded-2xl active:scale-98 transition-all flex items-center justify-center space-x-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out Account</span>
        </button>
      </main>

      <BottomNavigation />
    </div>
  );
};
