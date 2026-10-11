import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Bell, Headset, Wallet, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatCurrency';
import { getUserNotifications } from '../services/notificationService';

export const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user?.uid) {
      getUserNotifications(user.uid)
        .then((notifs) => {
          const unread = notifs.filter((n) => !n.read).length;
          setUnreadCount(unread);
        })
        .catch(() => {});
    }
  }, [user]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshProfile();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#F36B16] via-[#E85D08] to-[#C95C2D] text-white shadow-md">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Branding & Gold Icon */}
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center space-x-2 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner group-active:scale-95 transition-transform">
            <Sparkles className="w-5 h-5 text-[#F6C445] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <h1 className="text-base font-extrabold tracking-tight leading-none text-white drop-shadow-sm">
                Kerala Lottery
              </h1>
              <span className="bg-[#16834A] text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded text-white shadow-xs">
                Live
              </span>
            </div>
            <p className="text-[10px] text-orange-100/90 font-medium tracking-wide">
              Official Live Portal
            </p>
          </div>
        </div>

        {/* Right Actions: Wallet Balance, Refresh, Notifications, Support */}
        <div className="flex items-center space-x-2">
          {/* Wallet Balance Badge */}
          {user && (
            <button
              onClick={() => navigate('/wallet')}
              className="flex items-center space-x-1.5 bg-black/20 hover:bg-black/30 border border-white/20 px-2.5 py-1 rounded-full backdrop-blur-xs transition-all active:scale-95"
            >
              <Wallet className="w-3.5 h-3.5 text-[#F6C445]" />
              <span className="text-xs font-bold text-white tracking-tight">
                {formatCurrency(profile?.balance || 0)}
              </span>
            </button>
          )}

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            title="Refresh Data"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-xs active:scale-90 transition-all text-white"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#F6C445]' : ''}`} />
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => navigate('/notifications')}
            title="Notifications"
            className="relative w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-xs active:scale-90 transition-all text-white"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-black flex items-center justify-center border border-orange-500 shadow-sm animate-bounce">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Support Button */}
          <button
            onClick={() => navigate('/support')}
            title="Customer Support"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-xs active:scale-90 transition-all text-white"
          >
            <Headset className="w-4 h-4 text-[#F6C445]" />
          </button>
        </div>
      </div>
    </header>
  );
};
