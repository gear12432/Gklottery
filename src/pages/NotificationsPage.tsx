import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, CheckCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUserNotifications, markNotificationAsRead } from '../services/notificationService';
import { AppNotification } from '../types/transaction';
import { formatDateTime } from '../utils/dateUtils';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      getUserNotifications(user.uid)
        .then((items) => setNotifications(items || []))
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleRead = async (id: string) => {
    if (!user) return;
    await markNotificationAsRead(user.uid, id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

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
          <h1 className="text-base font-extrabold tracking-tight">Notifications</h1>
          <div className="w-8" />
        </div>
      </div>

      <main className="max-w-md mx-auto p-4 space-y-3">
        {loading ? (
          <LoadingSpinner message="Loading notifications..." />
        ) : notifications.length === 0 ? (
          <EmptyState
            title="No Notifications Yet"
            description="You are all caught up! Updates about draws and rewards will appear here."
          />
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleRead(notif.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                notif.read ? 'bg-white border-gray-100' : 'bg-orange-50/70 border-orange-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-[#F36B16] flex items-center justify-center flex-shrink-0">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-gray-900">{notif.title}</h3>
                    <p className="text-[10px] text-gray-400 font-medium">
                      {formatDateTime(notif.createdAt)}
                    </p>
                  </div>
                </div>

                {!notif.read && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F36B16] flex-shrink-0" />
                )}
              </div>

              <p className="text-xs text-gray-600 font-medium mt-2 leading-snug">
                {notif.message}
              </p>
            </div>
          ))
        )}
      </main>
    </div>
  );
};
