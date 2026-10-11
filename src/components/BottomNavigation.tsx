import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Trophy, Wallet, User } from 'lucide-react';

export const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Results', path: '/results', icon: Trophy },
    { label: 'Wallet', path: '/wallet', icon: Wallet },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
      <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 active:scale-90 ${
                isActive
                  ? 'text-[#F36B16] font-bold'
                  : 'text-gray-400 hover:text-gray-600 font-medium'
              }`}
            >
              <div className={`relative p-1 rounded-full ${isActive ? 'bg-orange-50' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#F36B16] scale-110' : ''}`} />
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F36B16]" />
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
