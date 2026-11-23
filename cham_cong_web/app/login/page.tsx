'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPosAccount, posSignInErrorMessage } from '@/lib/auth';
import PublicNav from '../components/PublicNav';
import PublicFooter from '../components/PublicFooter';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  // Đăng nhập trực tiếp bằng tài khoản POS (mã cửa hàng + tên đăng nhập / mã NV + mật khẩu)
  const [storeCode, setStoreCode] = useState('');
  const [posUsername, setPosUsername] = useState('');
  const [posPassword, setPosPassword] = useState('');
  const [posLoading, setPosLoading] = useState(false);

  async function handlePosSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setPosLoading(true);
    try {
      await signInWithPosAccount(storeCode, posUsername, posPassword);
      router.replace('/dashboard');
    } catch (err: unknown) {
      setError(posSignInErrorMessage(err));
    } finally {
      setPosLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF4E8] text-[#1C1A2D] flex flex-col font-sans">
      <PublicNav />
      <div style={{
        flex: 1,
        background: 'radial-gradient(120% 120% at 50% 10%, #FAF4E8 0%, #F4E9D5 60%, #EBDDC2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '36px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative ambient lighting - Trạm BLAO Palette */}
        <div style={{
          position: 'fixed',
          top: -120,
          right: -100,
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(127, 227, 199, 0.25) 0%, rgba(244, 233, 213, 0) 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'fixed',
          bottom: -150,
          left: -120,
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(127, 227, 199, 0.15) 0%, rgba(244, 233, 213, 0) 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }} />

        <div style={{ width: '100%', maxWidth: 420, zIndex: 1 }}>
          {/* Logo & Brand Header */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{
              display: 'inline-block',
              position: 'relative',
              marginBottom: 14,
            }}>
              <img
                src="/logo.jpg"
                alt="Logo Chấm Công Trạm BLAO"
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 20,
                  objectFit: 'cover',
                  border: '2px solid #7FE3C7',
                  boxShadow: '0 8px 24px rgba(127, 227, 199, 0.25)',
                  display: 'block',
                }}
              />
            </div>
            <h1 style={{
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: '-0.5px',
              color: '#0E382B',
              marginBottom: 4,
            }}>
              Chấm Công Trạm BLAO
            </h1>
            <div style={{
              color: '#143A2F',
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 6,
              letterSpacing: '0.02em',
            }}>
              Trạm trà - Trạm bánh
            </div>
            <p style={{
              color: '#5D5B63',
              fontSize: 14,
              fontWeight: 500,
            }}>
              Cổng quản lý dành cho chủ cửa hàng &amp; quản lý
            </p>
          </div>

          {/* Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 24,
            padding: 32,
            border: '1px solid rgba(216, 207, 189, 0.8)',
            boxShadow: '0 20px 60px -15px rgba(20, 58, 47, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)',
          }}>
            <h2 style={{
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 24,
              color: '#1C1A2D',
              letterSpacing: '-0.3px',
            }}>
              Đăng nhập bằng tài khoản POS
            </h2>

            {error && (
              <div style={{
                background: '#FFF5F5',
                color: '#C91506',
                padding: '12px 16px',
                borderRadius: 12,
                fontSize: 13,
                marginBottom: 20,
                border: '1px solid #FED7D7',
                borderLeft: '4px solid #C91506',
                lineHeight: 1.5,
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handlePosSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label className="label" style={{ color: '#1C1A2D', fontWeight: 600, fontSize: 13, marginBottom: 6 }}>
                  Mã cửa hàng
                </label>
                <input
                  className="input"
                  placeholder="VD: BLAO"
                  value={storeCode}
                  onChange={e => setStoreCode(e.target.value.toUpperCase())}
                  required
                  autoFocus
                  autoCapitalize="characters"
                  disabled={posLoading}
                  style={{ height: 46, borderRadius: 12, border: '1.5px solid #D8CFBD', background: '#FFFFFF', color: '#1C1A2D', fontSize: 14, padding: '0 14px', width: '100%' }}
                />
              </div>
              <div>
                <label className="label" style={{ color: '#1C1A2D', fontWeight: 600, fontSize: 13, marginBottom: 6 }}>
                  Tên đăng nhập hoặc Mã nhân viên
                </label>
                <input
                  className="input"
                  placeholder="Tài khoản POS của bạn"
                  value={posUsername}
                  onChange={e => setPosUsername(e.target.value)}
                  required
                  autoComplete="username"
                  autoCapitalize="none"
                  disabled={posLoading}
                  style={{ height: 46, borderRadius: 12, border: '1.5px solid #D8CFBD', background: '#FFFFFF', color: '#1C1A2D', fontSize: 14, padding: '0 14px', width: '100%' }}
                />
              </div>
              <div>
                <label className="label" style={{ color: '#1C1A2D', fontWeight: 600, fontSize: 13, marginBottom: 6 }}>
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="input"
                  placeholder="••••••••"
                  value={posPassword}
                  onChange={e => setPosPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  disabled={posLoading}
                  style={{ height: 46, borderRadius: 12, border: '1.5px solid #D8CFBD', background: '#FFFFFF', color: '#1C1A2D', fontSize: 14, padding: '0 14px', width: '100%' }}
                />
              </div>
              <button
                type="submit"
                disabled={posLoading}
                className="btn btn-primary"
                style={{ justifyContent: 'center', height: 48, padding: '0 20px', marginTop: 6, fontSize: 15, fontWeight: 700, borderRadius: 12, background: '#7FE3C7', color: '#143A2F', border: 'none', cursor: posLoading ? 'not-allowed' : 'pointer' }}
              >
                {posLoading ? <span className="spinner" style={{ borderColor: 'rgba(20, 58, 47, 0.25)', borderTopColor: '#143A2F' }} /> : null}
                {posLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
              <p style={{ margin: 0, fontSize: 12, color: '#5D5B63', lineHeight: 1.5 }}>
                Dùng chính tài khoản đăng nhập app <strong>POS Trạm BLAO</strong>. Quên mật khẩu? Liên hệ Chủ quán hoặc Quản lý để đặt lại mật khẩu trên hệ thống POS.
              </p>
            </form>

            <p style={{ textAlign: 'center', marginTop: 22, fontSize: 13, color: '#5D5B63' }}>
              Chỉ dành cho <strong style={{ color: '#0E382B' }}>chủ cửa hàng</strong> và <strong style={{ color: '#1C4E6B' }}>quản lý</strong>
            </p>
          </div>

          {/* Tip for Staff */}
          <div style={{
            marginTop: 18,
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(10px)',
            borderRadius: 16,
            border: '1px solid rgba(216, 207, 189, 0.8)',
            textAlign: 'center',
            fontSize: 12,
            color: '#5D5B63',
            lineHeight: 1.5,
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
          }}>
            📱 <strong>Bạn là nhân viên chấm công?</strong> Mở app <strong>POS Trạm BLAO</strong>, đăng nhập rồi vào mục <strong>Chấm công</strong> để chấm công GPS &amp; Wi-Fi tại quán.
          </div>
        </div>
      </div>
      <PublicFooter />
    </div>
  );
}
