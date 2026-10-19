import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hỗ Trợ Khách Hàng & Hướng Dẫn Sử Dụng • Chấm Công Trạm BLAO',
  description:
    'Trung tâm hỗ trợ kỹ thuật chính thức của Chấm Công Trạm BLAO. Hướng dẫn sử dụng, xử lý lỗi GPS, WiFi, quên mật khẩu và giải đáp thắc mắc cho nhân viên và chủ cửa hàng.',
};

export default function SupportPage() {
  const supportEmail = 'nthanhtam.402@gmail.com';
  const hotline = '0865.062.205';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10">
        {/* Navigation Bar */}
        <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500 mb-6 pb-4 border-b border-slate-100">
          <Link href="/marketing" className="hover:text-[#143A2F] transition-colors">
            ← Giới thiệu sản phẩm
          </Link>
          <Link href="/privacy-policy" className="hover:text-[#143A2F] transition-colors">
            Chính sách quyền riêng tư
          </Link>
          <Link href="/account-deletion" className="hover:text-[#143A2F] transition-colors">
            Xóa tài khoản
          </Link>
          <Link href="/support" className="text-[#143A2F] font-bold">
            Trung tâm hỗ trợ
          </Link>
        </div>

        {/* Header */}
        <div className="text-center pb-8 mb-8 border-b border-slate-100">
          <span className="inline-block px-3 py-1 bg-[#7FE3C7] text-[#143A2F] text-xs font-bold rounded-full uppercase tracking-wider mb-3 border border-[#5BD1B3]">
            App Store Support • Kỹ Thuật 24/7
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Trung Tâm Hỗ Trợ Khách Hàng
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            Ứng dụng <strong>Chấm Công Trạm BLAO</strong> — Hệ thống chấm công định vị GPS, xác thực WiFi và quản lý nhân sự chuyên nghiệp cho F&B & Bán lẻ.
          </p>
        </div>

        {/* Support Channels */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-[#7FE3C7] rounded-full inline-block" />
            Kênh Liên Hệ Trực Tiếp
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-[#7FE3C7] transition-all">
              <h3 className="font-bold text-slate-900 text-sm mb-1">Hotline Kỹ Thuật</h3>
              <p className="text-xs text-slate-500 mb-3">Hỗ trợ khẩn cấp sự cố gián đoạn chấm công.</p>
              <a href={`tel:${hotline.replace(/\./g, '')}`} className="text-base font-extrabold text-[#143A2F] hover:underline">
                {hotline}
              </a>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-[#7FE3C7] transition-all">
              <h3 className="font-bold text-slate-900 text-sm mb-1">Email Hỗ Trợ</h3>
              <p className="text-xs text-slate-500 mb-3">Giải đáp nghiệp vụ, khiếu nại công & quản trị.</p>
              <a href={`mailto:${supportEmail}?subject=${encodeURIComponent('Yêu cầu hỗ trợ - Chấm Công Trạm BLAO')}`} className="text-sm font-extrabold text-[#143A2F] hover:underline break-all">
                {supportEmail}
              </a>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-[#7FE3C7] transition-all">
              <h3 className="font-bold text-slate-900 text-sm mb-1">Khung Giờ Trực</h3>
              <p className="text-xs text-slate-500 mb-3">Trực kỹ thuật các ca sáng, chiều và tối.</p>
              <p className="text-sm font-bold text-slate-800">08:00 – 22:00 (Hàng ngày, kể cả Lễ, Tết)</p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-4 mb-10">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-[#7FE3C7] rounded-full inline-block" />
            Câu Hỏi Thường Gặp (FAQ) & Xử Lý Sự Cố
          </h2>

          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
            <h3 className="font-bold text-slate-900 text-sm mb-2">
              1. Ứng dụng báo lỗi "Ngoài phạm vi GPS cửa hàng" thì xử lý thế nào?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              • Đảm bảo bạn đã cấp quyền <strong>Vị trí chính xác (Precise Location)</strong> cho ứng dụng Chấm Công Trạm BLAO trong Cài đặt của điện thoại.<br />
              • Mở ứng dụng Bản đồ (Google Maps hoặc Apple Maps) để điện thoại cập nhật lại tọa độ GPS hiện tại.<br />
              • Đứng gần khu vực cửa hàng trong bán kính cho phép (thường là 50m – 100m do Chủ cửa hàng quy định).
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
            <h3 className="font-bold text-slate-900 text-sm mb-2">
              2. Ứng dụng báo lỗi "Sai mạng Wi-Fi của cửa hàng"?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              • Kiểm tra điện thoại của bạn đã bật Wi-Fi và đang kết nối đúng tên mạng Wi-Fi nội bộ của cửa hàng.<br />
              • Nếu cửa hàng có 2 sóng (2.4GHz và 5GHz) hoặc đổi router mạng mới, hãy báo Quản lý / Chủ cửa hàng vào mục <em>Cài đặt cửa hàng ➔ Lấy WiFi hiện tại</em> để cập nhật lại mã BSSID mới.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
            <h3 className="font-bold text-slate-900 text-sm mb-2">
              3. Tôi bị quên mật khẩu tài khoản thì lấy lại bằng cách nào?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tại màn hình Đăng nhập ứng dụng, bấm vào liên kết <strong>"Quên mật khẩu?"</strong>, nhập địa chỉ email bạn đã dùng để đăng ký tài khoản và bấm gửi. Kiểm tra hộp thư đến (hoặc hòm thư Spam) để nhấn link đặt lại mật khẩu mới.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
            <h3 className="font-bold text-slate-900 text-sm mb-2">
              4. Làm thế nào để xóa tài khoản cá nhân khỏi hệ thống?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Bạn có thể tự xóa tài khoản trong app tại: <strong>Hồ sơ của tôi ➔ Quản lý tài khoản ➔ Xóa tài khoản</strong>. Hoặc xem chi tiết tại trang{' '}
              <Link href="/account-deletion" className="text-[#143A2F] font-bold underline">
                Hướng dẫn & Quy định xóa tài khoản
              </Link>{' '}
              để gửi yêu cầu qua email.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
            <h3 className="font-bold text-slate-900 text-sm mb-2">
              5. Tôi đổi điện thoại mới thì có bị mất dữ liệu chấm công không?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Không. Toàn bộ lịch sử chấm công, bảng công và nhiệm vụ ca của bạn được lưu trữ an toàn trên đám mây Firebase. Khi đăng nhập vào máy mới, mọi dữ liệu sẽ hiển thị đầy đủ ngay lập tức.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-6 border-t border-slate-100 text-xs text-slate-500">
          <p>Bản quyền © 2026 Nguyễn Thanh Tâm • Chấm Công Trạm BLAO</p>
          <p className="mt-1">
            Email hỗ trợ: <a href={`mailto:${supportEmail}`} className="text-[#143A2F] font-semibold">{supportEmail}</a> | Hotline: {hotline}
          </p>
        </div>
      </div>
    </div>
  );
}
