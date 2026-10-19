import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCxW87rArTmuqORZbyuE9ey5Zc7PgWPLhQ',
  authDomain: 'chamcongtramblao.firebaseapp.com',
  projectId: 'chamcongtramblao',
  storageBucket: 'chamcongtramblao.firebasestorage.app',
  messagingSenderId: '744729032681',
  appId: '1:744729032681:web:28ccb45858b290db333d78',
  measurementId: 'G-3BPJQ9V47Y',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);

let dbInstance;
try {
  dbInstance = initializeFirestore(app, { ignoreUndefinedProperties: true });
} catch {
  dbInstance = getFirestore(app);
}
export const db = dbInstance;
export default app;
