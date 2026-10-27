'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PublicNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/marketing', label: 'Giới thiệu', badge: 'Hot' },
    { href: '/support', label: 'Trung tâm hỗ trợ' },
    { href: '/privacy-policy', label: 'Quyền riêng tư' },
    { href: '/account-deletion', label: 'Xóa tài khoản' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF4E8]/90 backdrop-blur-md border-b border-[#D8CFBD]/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Name */}
          <Link href="/marketing" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/logo.jpg"
                alt="Logo Chấm Công Trạm BLAO"
                className="w-11 h-11 rounded-2xl object-cover border-2 border-[#7FE3C7] shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#7FE3C7] border-2 border-white rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-[#143A2F] rounded-full"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl text-[#0E382B] tracking-tight group-hover:text-[#146A65] transition-colors">
                  Trạm BLAO
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-[#7FE3C7]/30 text-[#0E382B] border border-[#7FE3C7] rounded-md">
                  Chấm Công
                </span>
              </div>
              <p className="text-[12px] font-medium text-[#5D5B63] -mt-0.5">
                Trạm trà - Trạm bánh
              </p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => {
              const isActive = pathname === item.href || (item.href === '/privacy-policy' && pathname === '/privacy') || (item.href === '/account-deletion' && pathname === '/delete-account');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all relative flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#143A2F] text-white shadow-sm'
                      : 'text-[#1C1A2D] hover:bg-white/70 hover:text-[#0E382B]'
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[10px] font-bold bg-[#7FE3C7] text-[#0E382B] rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#7FE3C7] text-[#0E382B] hover:bg-[#5BD1B3] shadow-sm hover:shadow transition-all flex items-center gap-2 border border-[#5BD1B3]"
            >
              <span>Dashboard Web</span>
              <span className="text-xs">→</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/login"
              className="px-3 py-1.5 text-xs font-bold bg-[#7FE3C7] text-[#0E382B] rounded-lg border border-[#5BD1B3]"
            >
              Đăng nhập
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="w-10 h-10 rounded-xl bg-white/80 border border-[#D8CFBD] flex items-center justify-center text-[#0E382B] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-[#D8CFBD] px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#143A2F] text-white'
                    : 'text-[#1C1A2D] hover:bg-[#FAF4E8]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-[#7FE3C7] text-[#0E382B] rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-3 rounded-xl text-sm font-bold bg-[#7FE3C7] text-[#0E382B] border border-[#5BD1B3]"
            >
              Đăng nhập Cổng Quản Trị Web →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
