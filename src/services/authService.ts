import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from './firebase';
import { createUserProfile, getUserProfile } from './userService';
import { UserProfile } from '../types/user';

export async function signUpUser(email: string, pass: string, fullName: string): Promise<UserProfile> {
  const cred = await createUserWithEmailAndPassword(auth, email, pass);
  if (fullName && cred.user) {
    await updateProfile(cred.user, { displayName: fullName });
  }
  const profile = await createUserProfile(cred.user.uid, email, fullName);
  return profile;
}

export async function loginUser(email: string, pass: string): Promise<UserProfile> {
  const cred = await signInWithEmailAndPassword(auth, email, pass);
  let profile = await getUserProfile(cred.user.uid);
  if (!profile) {
    profile = await createUserProfile(cred.user.uid, email, cred.user.displayName || '');
  }
  return profile;
}

export async function sendResetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

export async function logoutUser(): Promise<void> {
  await firebaseSignOut(auth);
}

export function subscribeAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
