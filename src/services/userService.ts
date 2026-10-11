import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { UserProfile, UserPreferences } from '../types/user';
import { handleFirestoreError, OperationType } from './firestoreError';

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const path = `users/${uid}`;
  try {
    const userDocRef = doc(db, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function createUserProfile(uid: string, email: string, displayName: string): Promise<UserProfile> {
  const path = `users/${uid}`;
  const newProfile: UserProfile = {
    uid,
    displayName: displayName || email.split('@')[0],
    email,
    balance: 50, // Welcome bonus ₹50 credit
    vipLevel: 'BRONZE',
    vipStatus: 'active',
    createdAt: new Date().toISOString(),
    profileUpdatedAt: new Date().toISOString(),
  };

  try {
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, newProfile);
    return newProfile;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  const path = `users/${uid}`;
  try {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, {
      ...data,
      profileUpdatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function updateUserBalance(uid: string, newBalance: number): Promise<void> {
  const path = `users/${uid}`;
  try {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, {
      balance: Math.max(0, newBalance),
      profileUpdatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function getUserPreferences(uid: string): Promise<UserPreferences> {
  const path = `userPreferences/${uid}`;
  try {
    const ref = doc(db, 'userPreferences', uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data() as UserPreferences;
    }
    const defaultPref: UserPreferences = {
      language: 'en',
      notificationsEnabled: true,
      soundEnabled: true,
    };
    await setDoc(ref, defaultPref);
    return defaultPref;
  } catch (error) {
    return {
      language: 'en',
      notificationsEnabled: true,
      soundEnabled: true,
    };
  }
}

export async function updateUserPreferences(uid: string, prefs: Partial<UserPreferences>): Promise<void> {
  const path = `userPreferences/${uid}`;
  try {
    const ref = doc(db, 'userPreferences', uid);
    await setDoc(ref, prefs, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}
