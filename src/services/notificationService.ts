import { collection, doc, setDoc, getDocs, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import { AppNotification } from '../types/transaction';
import { handleFirestoreError, OperationType } from './firestoreError';

export async function getUserNotifications(userId: string): Promise<AppNotification[]> {
  const path = `notifications/${userId}/items`;
  try {
    const colRef = collection(db, 'notifications', userId, 'items');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);

    if (snap.empty) {
      // Seed default welcome notification
      const welcomeId = 'notif_welcome';
      const welcomeNotif: AppNotification = {
        id: welcomeId,
        title: 'Welcome to Kerala Lottery Live!',
        message: 'Claim your ₹50 sign-up bonus credit and join daily lucky draws & Kerala State lottery updates.',
        createdAt: new Date().toISOString(),
        read: false,
        type: 'reward',
      };
      await setDoc(doc(db, 'notifications', userId, 'items', welcomeId), welcomeNotif);
      return [welcomeNotif];
    }

    return snap.docs.map(d => d.data() as AppNotification);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function markNotificationAsRead(userId: string, notificationId: string): Promise<void> {
  const path = `notifications/${userId}/items/${notificationId}`;
  try {
    const ref = doc(db, 'notifications', userId, 'items', notificationId);
    await updateDoc(ref, { read: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}
