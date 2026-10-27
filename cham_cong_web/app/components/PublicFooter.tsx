import React from 'react';
import Link from 'next/link';

export default function PublicFooter() {
  return (
    <footer className="bg-[#143A2F] text-slate-200 border-t border-[#0E382B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="Logo Trạm BLAO"
                className="w-12 h-12 rounded-2xl object-cover border-2 border-[#7FE3C7] shadow-sm"
              />
              <div>
                <h3 className="text-white font-extrabold text-xl tracking-tight">
                  Chấm Công Trạm BLAO
                </h3>
                <p className="text-[#7FE3C7] text-xs font-semibold">
                  Trạm trà - Trạm bánh • Giải pháp F&B & Bán lẻ
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Hệ thống quản lý chấm công kép GPS & WiFi, xếp ca thông minh, giao checklist vận hành và tự động tính lương chuyên nghiệp cho chuỗi cửa hàng trà, cà phê, nhà hàng và bán lẻ.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7FE3C7] animate-pulse"></span>
              <span className="text-xs text-[#7FE3C7] font-semibold">
                Máy chủ thời gian thực hoạt động 99.9%
              </span>
            </div>
          </div>

          {/* Column 2: Sản phẩm */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Sản Phẩm
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/marketing" className="hover:text-[#7FE3C7] transition-colors">
                  Giới thiệu tính năng
                </Link>
              </li>
              <li>
                <Link href="/marketing#anti-cheat" className="hover:text-[#7FE3C7] transition-colors">
                  Chống gian lận GPS & WiFi
                </Link>
              </li>
              <li>
                <Link href="/marketing#payroll" className="hover:text-[#7FE3C7] transition-colors">
                  Tính lương & Xuất Excel
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#7FE3C7] transition-colors">
                  Cổng Quản Trị Web (Owner/Manager)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hỗ trợ & Pháp lý */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Hỗ Trợ & Pháp Lý
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/support" className="hover:text-[#7FE3C7] transition-colors">
                  Trung tâm hỗ trợ kỹ thuật
                </Link>
              </li>
              <li>
                <Link href="/support#faq" className="hover:text-[#7FE3C7] transition-colors">
                  Câu hỏi thường gặp (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#7FE3C7] transition-colors">
                  Chính sách quyền riêng tư
                </Link>
              </li>
              <li>
                <Link href="/account-deletion" className="hover:text-[#7FE3C7] transition-colors">
                  Hướng dẫn xóa tài khoản
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Liên hệ */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Liên Hệ Kỹ Thuật
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Hotline Kỹ Thuật</div>
                <a href="tel:0865062205" className="text-base font-bold text-[#7FE3C7] hover:underline">
                  0865.062.205
                </a>
              </li>
              <li>
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Email Hỗ Trợ</div>
                <a href="mailto:nthanhtam.402@gmail.com" className="text-sm font-medium hover:text-[#7FE3C7] break-all">
                  nthanhtam.402@gmail.com
                </a>
              </li>
              <li>
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Khung Giờ Trực</div>
                <div className="text-xs text-slate-300">
                  08:00 – 22:00 (Hàng ngày kể cả Lễ, Tết)
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            Bản quyền © 2026 <strong className="text-white">Nguyễn Thanh Tâm</strong> • <strong>Trạm BLAO</strong>. Bảo lưu mọi quyền.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Quyền riêng tư
            </Link>
            <span>•</span>
            <Link href="/account-deletion" className="hover:text-white transition-colors">
              Xóa tài khoản
            </Link>
            <span>•</span>
            <Link href="/support" className="hover:text-white transition-colors">
              Hỗ trợ
            </Link>
            <span>•</span>
            <span className="text-[#7FE3C7]">Apple App Store Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
