import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpCircle, ArrowDownCircle, History } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUserTransactions } from '../services/transactionService';
import { Transaction } from '../types/transaction';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDateTime } from '../utils/dateUtils';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';

export const TransactionHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      getUserTransactions(user.uid)
        .then((items) => setTransactions(items || []))
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

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
          <h1 className="text-base font-extrabold tracking-tight">Statement & History</h1>
          <div className="w-8" />
        </div>
      </div>

      <main className="max-w-md mx-auto p-4 space-y-3">
        {loading ? (
          <LoadingSpinner message="Loading complete history..." />
        ) : transactions.length === 0 ? (
          <EmptyState
            title="No Records Found"
            description="Your transaction records will show here once you make deposits or purchase tickets."
          />
        ) : (
          transactions.map((tx) => {
            const isCredit = ['DEPOSIT', 'WINNINGS', 'CHECKIN_REWARD', 'LUCKY_SPIN_REWARD', 'VIP_BONUS'].includes(tx.type);

            return (
              <div
                key={tx.id}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs flex items-center justify-between"
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
                    <h3 className="text-xs font-black text-gray-900 capitalize">
                      {tx.type.replace('_', ' ')}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-medium">
                      {formatDateTime(tx.createdAt)}
                    </p>
                    <p className="text-[10px] text-gray-500 font-mono">Ref: {tx.referenceId}</p>
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
          })
        )}
      </main>
    </div>
  );
};
