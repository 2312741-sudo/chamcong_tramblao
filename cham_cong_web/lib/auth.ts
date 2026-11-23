import { auth, db, functions } from './firebase';
import {
  signInWithCustomToken,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { getDoc, doc } from 'firebase/firestore';

export function normalizeStoreCode(v: string): string {
  return v.trim().toUpperCase();
}

export function normalizeUsername(v: string): string {
  return v.trim().toLowerCase();
}

/** Hiển thị tên / tài khoản gọn gàng (ẩn hậu tố @tram.local của tài khoản nội bộ POS) */
export function formatPosAccountLabel(user: User | null | undefined, fallback = 'Tài khoản POS'): string {
  if (!user) return fallback;
  const display = (user.displayName || '').trim();
  if (display) return display;
  const rawEmail = (user.email || '').trim();
  if (!rawEmail) return fallback;
  if (rawEmail.endsWith('@tram.local')) {
    return rawEmail.split('.')[0] || fallback;
  }
  return rawEmail;
}

export function posSignInErrorMessage(err: unknown): string {
  const e = err as { code?: string; message?: string; details?: { remainingSeconds?: number } };
  const code = (e?.code || '').replace(/^functions\//, '');
  if (code === 'resource-exhausted') {
    const s = typeof e.details?.remainingSeconds === 'number' ? e.details.remainingSeconds : 0;
    return s > 0
      ? `Tài khoản đang bị khóa tạm do nhập sai mật khẩu nhiều lần. Thử lại sau ${Math.max(1, Math.ceil(s / 60))} phút.`
      : e.message || 'Đăng nhập tạm bị hạn chế. Vui lòng thử lại sau.';
  }
  if (code === 'unavailable' || code === 'deadline-exceeded') {
    return 'Không kết nối được máy chủ. Kiểm tra mạng rồi thử lại.';
  }
  if (code === 'internal' && !e.message) {
    return 'Lỗi máy chủ. Vui lòng thử lại.';
  }
  return e?.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
}

/**
 * Đăng nhập web Chấm Công BLAO trực tiếp bằng tài khoản POS (`postramblao`):
 * 1. `staffSignIn` (region `asia-southeast1`) → custom token POS (uid POS)
 * 2. `signInWithCustomToken(auth, token)`
 * 3. `chamCongEnsureMember({ storeCode })` → đảm bảo cửa hàng `stores/{storeCode}` & thành viên tồn tại trên Firestore
 */
export async function signInWithPosAccount(
  storeCodeInput: string,
  usernameInput: string,
  passwordInput: string
) {
  const storeCode = normalizeStoreCode(storeCodeInput);
  const username = normalizeUsername(usernameInput);
  const password = passwordInput.trim();
  if (!storeCode || !username || !password) {
    throw new Error('Vui lòng nhập đủ mã cửa hàng, tên đăng nhập và mật khẩu.');
  }

  const staffSignIn = httpsCallable<
    { storeCode: string; username: string; password: string },
    { token?: string }
  >(functions, 'staffSignIn');
  const posRes = await staffSignIn({ storeCode, username, password });
  const posToken = posRes.data?.token;
  if (!posToken) {
    throw new Error('Máy chủ POS không trả về phiên đăng nhập hợp lệ.');
  }

  const credential = await signInWithCustomToken(auth, posToken);

  const ensureMember = httpsCallable<
    { storeCode: string },
    { storeId: string; isNewMember: boolean }
  >(functions, 'chamCongEnsureMember');
  await ensureMember({ storeCode });

  return credential;
}

export async function signOut() {
  return firebaseSignOut(auth);
}

export function onAuthChanged(cb: (user: User | null) => void) {
  return onAuthStateChanged(auth, cb);
}

export async function getUserCurrentStoreId(uid: string): Promise<string | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.data()?.currentStoreId ?? null;
}
