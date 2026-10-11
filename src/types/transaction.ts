export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'LOTTERY_PURCHASE' | 'WINNINGS' | 'CHECKIN_REWARD' | 'LUCKY_SPIN_REWARD' | 'VIP_BONUS';

export type TransactionStatus = 'COMPLETED' | 'PENDING' | 'FAILED';

export type PaymentMethod = 'UPI' | 'GPAY' | 'PHONEPE' | 'PAYTM' | 'NET_BANKING' | 'WALLET_BALANCE';

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  createdAt: string;
  referenceId: string;
  paymentMethod?: PaymentMethod;
  notes?: string;
}

export interface CheckInRecord {
  dateKey: string; // YYYY-MM-DD
  createdAt: string;
  dayNumber: number;
  rewardAmount: number;
  status: 'claimed';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  type: 'info' | 'reward' | 'draw' | 'deposit';
}
