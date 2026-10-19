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
      <div style={{ textAlign: 'center', color: '#1B4D3E' }}>
        <img
          src="/logo.jpg"
          alt="Logo Chấm Công Trạm Blao"
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            objectFit: 'cover',
            margin: '0 auto 16px',
            border: '1.5px solid rgba(27, 77, 62, 0.15)',
            boxShadow: '0 8px 24px rgba(27, 77, 62, 0.1)',
            display: 'block',
          }}
        />
        <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#1B4D3E', letterSpacing: '-0.5px' }}>
          Chấm Công Trạm Blao
        </div>
        <div style={{ color: '#5D5B63', fontSize: 14, fontWeight: 500 }}>
          Đang tải dữ liệu...
        </div>
      </div>
    </div>
  );
}
