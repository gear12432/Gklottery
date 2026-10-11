import { collection, doc, setDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import { Transaction, TransactionType, PaymentMethod } from '../types/transaction';
import { updateUserBalance, getUserProfile } from './userService';
import { handleFirestoreError, OperationType } from './firestoreError';

export async function createTransaction(
  userId: string,
  type: TransactionType,
  amount: number,
  paymentMethod: PaymentMethod = 'UPI',
  notes: string = ''
): Promise<Transaction> {
  const transactionId = 'tx_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const path = `transactions/${userId}/history/${transactionId}`;
  
  const referenceId = 'KL' + Date.now().toString().slice(-8) + Math.floor(1000 + Math.random() * 9000);

  const tx: Transaction = {
    id: transactionId,
    userId,
    type,
    amount,
    status: 'COMPLETED',
    createdAt: new Date().toISOString(),
    referenceId,
    paymentMethod,
    notes,
  };

  try {
    // 1. Save transaction doc in subcollection
    const txRef = doc(db, 'transactions', userId, 'history', transactionId);
    await setDoc(txRef, tx);

    // 2. Adjust user balance
    const currentProfile = await getUserProfile(userId);
    const currentBalance = currentProfile?.balance || 0;

    let balanceDelta = 0;
    if (['DEPOSIT', 'WINNINGS', 'CHECKIN_REWARD', 'LUCKY_SPIN_REWARD', 'VIP_BONUS'].includes(type)) {
      balanceDelta = amount;
    } else if (['WITHDRAWAL', 'LOTTERY_PURCHASE'].includes(type)) {
      balanceDelta = -amount;
    }

    await updateUserBalance(userId, currentBalance + balanceDelta);

    return tx;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function getUserTransactions(userId: string): Promise<Transaction[]> {
  const path = `transactions/${userId}/history`;
  try {
    const colRef = collection(db, 'transactions', userId, 'history');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    
    return snap.docs.map(docSnap => docSnap.data() as Transaction);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}
