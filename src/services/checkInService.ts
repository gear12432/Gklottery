import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { CheckInRecord } from '../types/transaction';
import { getTodayDateKey } from '../utils/dateUtils';
import { createTransaction } from './transactionService';
import { handleFirestoreError, OperationType } from './firestoreError';

export const CHECKIN_REWARDS_BY_DAY = [
  { day: 1, amount: 10, label: 'Day 1: ₹10 Bonus' },
  { day: 2, amount: 15, label: 'Day 2: ₹15 Bonus' },
  { day: 3, amount: 25, label: 'Day 3: ₹25 Bonus' },
  { day: 4, amount: 40, label: 'Day 4: ₹40 Bonus' },
  { day: 5, amount: 60, label: 'Day 5: ₹60 Bonus' },
  { day: 6, amount: 80, label: 'Day 6: ₹80 Bonus' },
  { day: 7, amount: 150, label: 'Day 7: ₹150 + Free Bumper Pass' },
];

export async function getTodayCheckIn(userId: string): Promise<CheckInRecord | null> {
  const dateKey = getTodayDateKey();
  const path = `checkIns/${userId}/history/${dateKey}`;
  try {
    const ref = doc(db, 'checkIns', userId, 'history', dateKey);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data() as CheckInRecord;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function performDailyCheckIn(userId: string, dayNumber: number = 1): Promise<{ record: CheckInRecord; rewardAmount: number }> {
  const dateKey = getTodayDateKey();
  const path = `checkIns/${userId}/history/${dateKey}`;

  const dayReward = CHECKIN_REWARDS_BY_DAY.find(r => r.day === dayNumber) || CHECKIN_REWARDS_BY_DAY[0];
  const rewardAmount = dayReward.amount;

  const record: CheckInRecord = {
    dateKey,
    createdAt: new Date().toISOString(),
    dayNumber,
    rewardAmount,
    status: 'claimed',
  };

  try {
    const ref = doc(db, 'checkIns', userId, 'history', dateKey);
    await setDoc(ref, record);

    // Add reward credit transaction
    await createTransaction(userId, 'CHECKIN_REWARD', rewardAmount, 'WALLET_BALANCE', `Daily Check-In Day ${dayNumber} Reward`);

    return { record, rewardAmount };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}
