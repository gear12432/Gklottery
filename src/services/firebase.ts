import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

let app;
try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
} catch (e) {
  console.warn('Firebase init fallback:', e);
  app = getApp();
}

export const auth = getAuth(app);

let firestoreDb;
try {
  if (firebaseConfig.firestoreDatabaseId) {
    firestoreDb = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  } else {
    firestoreDb = getFirestore(app);
  }
} catch (e) {
  console.warn('Firestore init fallback:', e);
  firestoreDb = getFirestore(app);
}

export const db = firestoreDb;

// Non-blocking connection test
setTimeout(() => {
  try {
    getDocFromServer(doc(db, 'test', 'connection')).catch((err) => {
      console.warn('Firebase connection status:', err?.message || err);
    });
  } catch (err) {
    console.warn('Firebase test connection caught:', err);
  }
}, 1000);
