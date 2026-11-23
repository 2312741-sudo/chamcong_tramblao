import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyB6Sk10Xy9tIi4uYgdpT5ohyajr6863ybk',
  authDomain: 'postramblao.firebaseapp.com',
  databaseURL: 'https://postramblao-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'postramblao',
  storageBucket: 'postramblao.firebasestorage.app',
  messagingSenderId: '351954155486',
  appId: '1:351954155486:web:4dbd4ecf4cff30f3a10f4f',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const functions = getFunctions(app, 'asia-southeast1');

let dbInstance;
try {
  dbInstance = initializeFirestore(app, { ignoreUndefinedProperties: true });
} catch {
  dbInstance = getFirestore(app);
}
export const db = dbInstance;
export { firebaseConfig };
export default app;
