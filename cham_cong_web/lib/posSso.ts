/**
 * Đăng nhập web Chấm Công BLAO bằng TÀI KHOẢN POS (mã cửa hàng + tên đăng nhập + mật khẩu), giống app POS.
 *
 * 1. Gọi Cloud Function `staffSignIn` của dự án POS (postramblao) → custom token POS.
 * 2. Đăng nhập Firebase app phụ "pos" bằng token đó, gọi `chamCongBlaoSignIn({ storeCode })`
 *    → custom token của dự án chấm công (máy chủ tự nối tài khoản chấm công cũ cùng tên / tạo mới).
 * 3. Đăng nhập Firebase chấm công (app mặc định của web) rồi đăng xuất phiên POS (không cần giữ).
 * Máy chủ: pos_tramblao/functions/src/chamCongBlao.ts — cấu hình: pos_tramblao/docs/CHAMCONG_BLAO_SSO.md
 */
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signOut } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { auth } from './firebase';

// Cấu hình web công khai của dự án POS (giống web quản lý POS)
const posFirebaseConfig = {
  apiKey: 'AIzaSyB6Sk10Xy9tIi4uYgdpT5ohyajr6863ybk',
  authDomain: 'postramblao.firebaseapp.com',
  databaseURL: 'https://postramblao-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'postramblao',
  storageBucket: 'postramblao.firebasestorage.app',
  messagingSenderId: '351954155486',
  appId: '1:351954155486:web:4dbd4ecf4cff30f3a10f4f',
};
const POS_APP_NAME = 'pos';
const POS_REGION = 'asia-southeast1';

function posApp(): FirebaseApp {
  return getApps().find((a) => a.name === POS_APP_NAME) ?? initializeApp(posFirebaseConfig, POS_APP_NAME);
}

/** Chuẩn hóa mã cửa hàng / tên đăng nhập giống app & web POS */
export function normalizeStoreCode(v: string): string {
  return v.trim().toUpperCase();
}
export function normalizeUsername(v: string): string {
  return v.trim().toLowerCase();
}

/** Lỗi máy chủ → thông báo tiếng Việt (staffSignIn / chamCongBlaoSignIn đã trả sẵn thông báo tiếng Việt) */
export function posSignInErrorMessage(err: unknown): string {
  const e = err as { code?: string; message?: string; details?: { remainingSeconds?: number } };
  const code = (e?.code || '').replace(/^functions\//, '');
  if (code === 'resource-exhausted') {
    const s = typeof e.details?.remainingSeconds === 'number' ? e.details.remainingSeconds : 0;
    return s > 0
      ? `Tài khoản đang bị khóa tạm do nhập sai mật khẩu nhiều lần. Thử lại sau ${Math.max(1, Math.ceil(s / 60))} phút.`
      : e.message || 'Đăng nhập tạm bị hạn chế. Vui lòng thử lại sau.';
  }
  if (code === 'unavailable' || code === 'deadline-exceeded') return 'Không kết nối được máy chủ. Kiểm tra mạng rồi thử lại.';
  if (code === 'internal' && !e.message) return 'Lỗi máy chủ. Vui lòng thử lại.';
  return e?.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
}

export async function signInWithPosAccount(storeCodeInput: string, usernameInput: string, passwordInput: string) {
  const storeCode = normalizeStoreCode(storeCodeInput);
  const username = normalizeUsername(usernameInput);
  const password = passwordInput.trim();
  if (!storeCode || !username || !password) throw new Error('Vui lòng nhập đủ mã cửa hàng, tên đăng nhập và mật khẩu.');

  const app = posApp();
  const posAuth = getAuth(app);
  const functions = getFunctions(app, POS_REGION);

  const staffSignIn = httpsCallable<{ storeCode: string; username: string; password: string }, { token?: string }>(functions, 'staffSignIn');
  const posRes = await staffSignIn({ storeCode, username, password });
  const posToken = posRes.data?.token;
  if (!posToken) throw new Error('Máy chủ POS không trả về phiên đăng nhập hợp lệ.');
  await signInWithCustomToken(posAuth, posToken);

  try {
    const sso = httpsCallable<{ storeCode: string }, { customToken?: string }>(functions, 'chamCongBlaoSignIn');
    const ccRes = await sso({ storeCode });
    const ccToken = ccRes.data?.customToken;
    if (!ccToken) throw new Error('Máy chủ không trả về phiên đăng nhập Chấm Công hợp lệ.');
    return await signInWithCustomToken(auth, ccToken);
  } finally {
    // Web chấm công chỉ cần phiên chấm công; không giữ phiên POS trên trình duyệt
    await signOut(posAuth).catch(() => undefined);
  }
}
