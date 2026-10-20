'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthChanged } from '@/lib/auth';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const unsub = onAuthChanged(user => {
      router.replace(user ? '/dashboard' : '/login');
    });
    return unsub;
  }, [router]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'radial-gradient(120% 120% at 50% 10%, #FAF4E8 0%, #F4E9D5 60%, #EBDDC2 100%)',
    }}>
      <div style={{ textAlign: 'center', color: '#0E382B' }}>
        <img
          src="/logo.jpg"
          alt="Logo Chấm Công Trạm BLAO"
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            objectFit: 'cover',
            margin: '0 auto 16px',
            border: '2px solid #7FE3C7',
            boxShadow: '0 8px 24px rgba(127, 227, 199, 0.25)',
            display: 'block',
          }}
        />
        <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 4, color: '#0E382B', letterSpacing: '-0.5px' }}>
          Chấm Công Trạm BLAO
        </div>
        <div style={{ color: '#143A2F', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
          Trạm trà - Trạm bánh
        </div>
        <div style={{ color: '#5D5B63', fontSize: 14, fontWeight: 500 }}>
          Đang tải dữ liệu...
        </div>
      </div>
    </div>
  );
}
