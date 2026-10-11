import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, ArrowUpCircle, ArrowDownCircle, RefreshCw, Trophy, Sparkles, Filter, History } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { useAuth } from '../context/AuthContext';
import { getUserTransactions } from '../services/transactionService';
import { Transaction } from '../types/transaction';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDateTime } from '../utils/dateUtils';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';

export const WalletPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('ALL');

  const fetchTx = async () => {
    if (user?.uid) {
      setLoading(true);
      try {
        const txs = await getUserTransactions(user.uid);
        setTransactions(txs || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTx();
  }, [user]);

  const filteredTx = transactions.filter((tx) => {
    if (filter === 'ALL') return true;
    if (filter === 'DEPOSIT') return tx.type === 'DEPOSIT';
    if (filter === 'WINNINGS') return tx.type === 'WINNINGS' || tx.type === 'LUCKY_SPIN_REWARD';
    if (filter === 'PURCHASES') return tx.type === 'LOTTERY_PURCHASE';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#EEF2F3] text-[#242424] pb-24 select-none">
      <AppHeader />

      <main className="max-w-md mx-auto px-3 pt-3 space-y-4">
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-[#F36B16] via-[#E85D08] to-[#C95C2D] rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-orange-100 uppercase tracking-wider">
              Total Wallet Balance
            </span>
            <span className="bg-white/20 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full backdrop-blur-xs">
              VIP {profile?.vipLevel || 'BRONZE'}
            </span>
          </div>

          <div className="flex items-baseline space-x-2 my-1">
            <span className="text-3xl font-black text-white">
              {formatCurrency(profile?.balance || 0)}
            </span>
          </div>

          <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between">
            <button
              onClick={() => navigate('/deposit')}
              className="flex-1 mr-2 py-3 bg-white text-gray-900 font-black text-xs rounded-xl shadow-sm hover:bg-orange-50 active:scale-95 transition-all flex items-center justify-center space-x-1.5"
            >
              <ArrowUpCircle className="w-4 h-4 text-[#F36B16]" />
              <span>Deposit Funds</span>
            </button>

            <button
              onClick={() => navigate('/history')}
              className="px-4 py-3 bg-black/20 hover:bg-black/30 text-white font-bold text-xs rounded-xl border border-white/20 active:scale-95 transition-all flex items-center space-x-1"
            >
              <History className="w-4 h-4 text-[#F6C445]" />
              <span>Statement</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-gray-900">Transaction History</h2>
          <div className="flex space-x-1">
            {['ALL', 'DEPOSIT', 'WINNINGS', 'PURCHASES'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase transition-all ${
                  filter === f
                    ? 'bg-[#F36B16] text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions List */}
        {loading ? (
          <LoadingSpinner message="Fetching wallet transactions..." />
        ) : filteredTx.length === 0 ? (
          <EmptyState
            title="No Transactions Found"
            description="Your deposits, lottery tickets, and rewards history will appear here."
            actionText="Make First Deposit"
            onAction={() => navigate('/deposit')}
          />
        ) : (
          <div className="space-y-2.5">
            {filteredTx.map((tx) => {
              const isCredit = ['DEPOSIT', 'WINNINGS', 'CHECKIN_REWARD', 'LUCKY_SPIN_REWARD', 'VIP_BONUS'].includes(tx.type);

              return (
                <div
                  key={tx.id}
                  className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-2xs flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                        isCredit ? 'bg-emerald-100 text-[#16834A]' : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {isCredit ? (
                        <ArrowUpCircle className="w-5 h-5" />
                      ) : (
                        <ArrowDownCircle className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs font-black text-gray-900 capitalize">
                        {tx.type.replace('_', ' ')}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {formatDateTime(tx.createdAt)} • Ref: {tx.referenceId}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-sm font-black block ${
                        isCredit ? 'text-[#16834A]' : 'text-gray-900'
                      }`}
                    >
                      {isCredit ? '+' : '-'}{formatCurrency(tx.amount)}
                    </span>
                    <span className="text-[9px] font-bold uppercase text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                      {tx.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};
