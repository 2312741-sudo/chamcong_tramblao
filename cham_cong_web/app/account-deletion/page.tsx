import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PublicNav from '../components/PublicNav';
import PublicFooter from '../components/PublicFooter';

export const metadata: Metadata = {
  title: 'Yêu Cầu Xóa Tài Khoản & Dữ Liệu | Chấm Công Trạm BLAO',
  description: 'Hướng dẫn quy trình xóa tài khoản và xóa dữ liệu người dùng ứng dụng Chấm Công Trạm BLAO',
};

export default function AccountDeletionPage() {
  const supportEmail = 'nthanhtam.402@gmail.com';
  const hotline = '0865.062.205';

  return (
    <div className="min-h-screen bg-[#FAF4E8] text-[#1C1A2D] flex flex-col font-sans">
      <PublicNav />

      <main className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-[#D8CFBD] p-6 sm:p-12">
          {/* Header */}
          <div className="border-b border-[#D8CFBD]/60 pb-8 mb-8 text-center">
            <span className="inline-block px-3.5 py-1.5 bg-[#143A2F] text-[#7FE3C7] text-xs font-bold rounded-full uppercase tracking-wider mb-3 border border-[#0E382B]">
              Tuân Thủ Chuẩn Apple App Store & Google Play
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0E382B] tracking-tight mb-2">
              Quy Trình & Hướng Dẫn Xóa Dữ Liệu Tài Khoản
            </h1>
            <p className="text-sm text-[#5D5B63]">
              Ứng dụng <strong>Chấm Công Trạm BLAO</strong> cam kết tôn trọng quyền kiểm soát dữ liệu cá nhân của người dùng.
            </p>
          </div>

          <div className="space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
            <p className="bg-[#FAF4E8]/60 p-5 rounded-2xl border border-[#D8CFBD]/50 text-slate-800 font-medium">
              Người dùng ứng dụng <strong>Chấm Công Trạm BLAO</strong> có quyền yêu cầu xóa toàn bộ thông tin cá nhân và dữ liệu liên quan đến tài khoản của mình bất cứ lúc nào. Bạn có thể chọn 1 trong 2 phương thức dưới đây:
            </p>

            {/* Cách 1 */}
            <div className="bg-[#FAF4E8] border border-[#D8CFBD] rounded-2xl p-6">
              <h2 className="text-base sm:text-lg font-bold text-[#0E382B] mb-3 flex items-center gap-2">
                <span className="w-2 h-5 bg-[#7FE3C7] rounded-full inline-block" />
                <span>Cách 1: Tự xóa tài khoản trực tiếp trong ứng dụng di động (Tức thì)</span>
              </h2>
              <ol className="list-decimal pl-5 space-y-2.5 text-slate-700 text-sm">
                <li>Mở ứng dụng <strong>Chấm Công Trạm BLAO</strong> trên điện thoại và đăng nhập tài khoản của bạn.</li>
                <li>Tại thanh điều hướng dưới cùng, chọn tab <strong>Hồ sơ</strong> (Profile) hoặc <strong>Cài đặt</strong>.</li>
                <li>Chọn mục <strong>Quản lý tài khoản</strong> ➔ <strong>Xóa tài khoản</strong>.</li>
                <li>Đọc kỹ cảnh báo xác nhận và bấm <strong>Xác nhận xóa tài khoản</strong>.</li>
                <li>Hệ thống sẽ lập tức xóa thông tin xác thực Firebase Auth và toàn bộ hồ sơ của bạn trên máy chủ.</li>
              </ol>
            </div>

            {/* Cách 2 */}
            <div className="bg-[#FAF4E8] border border-[#D8CFBD] rounded-2xl p-6">
              <h2 className="text-base sm:text-lg font-bold text-[#0E382B] mb-3 flex items-center gap-2">
                <span className="w-2 h-5 bg-[#7FE3C7] rounded-full inline-block" />
                <span>Cách 2: Gửi yêu cầu hỗ trợ xóa qua Email</span>
              </h2>
              <p className="text-sm mb-3">
                Nếu bạn đã gỡ cài đặt ứng dụng hoặc không thể đăng nhập, vui lòng gửi email từ chính địa chỉ email bạn đã dùng để đăng ký tài khoản đến bộ phận hỗ trợ của chúng tôi:
              </p>
              <div className="bg-white p-4 rounded-xl border border-[#D8CFBD] mb-3 text-xs sm:text-sm font-mono space-y-1">
                <div><strong>Tới:</strong> {supportEmail}</div>
                <div><strong>Tiêu đề:</strong> Yêu cầu xóa tài khoản - Chấm Công Trạm BLAO</div>
                <div><strong>Nội dung:</strong> Tôi yêu cầu xóa vĩnh viễn tài khoản và toàn bộ dữ liệu cá nhân gắn với email này khỏi hệ thống.</div>
              </div>
              <p className="text-xs text-slate-500">
                Đội ngũ kỹ thuật sẽ xác minh và hoàn tất quy trình xóa dữ liệu trong vòng 24–48 giờ làm việc.
              </p>
            </div>

            {/* Dữ liệu bị xóa */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
                Những Dữ Liệu Nào Sẽ Bị Xóa?
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                <li><strong>Thông tin xác thực đăng nhập:</strong> Tài khoản Firebase Auth (Email, Mật khẩu, Apple UID, Google ID) bị hủy vĩnh viễn.</li>
                <li><strong>Hồ sơ người dùng:</strong> Họ tên, số điện thoại, ảnh đại diện và vai trò liên kết tại các cửa hàng.</li>
                <li><strong>Mã thông báo thiết bị:</strong> FCM Token nhận thông báo đẩy được thu hồi.</li>
                <li><strong>Dữ liệu lưu vết:</strong> Lịch sử chấm công cũ của cửa hàng sẽ được ẩn danh hóa (anonymized) theo đúng luật kế toán và thuế doanh nghiệp.</li>
              </ul>
            </div>

            {/* Contact Box */}
            <div className="bg-[#FAF4E8] border border-[#D8CFBD] p-6 rounded-2xl text-center">
              <h3 className="font-extrabold text-base text-[#0E382B] mb-1">
                Cần Trợ Giúp Thêm?
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                Nếu bạn có bất kỳ băn khoăn nào về dữ liệu cá nhân, vui lòng liên hệ trực tiếp:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold">
                <a href={`tel:${hotline.replace(/\./g, '')}`} className="px-4 py-2 bg-[#143A2F] text-white rounded-xl hover:bg-[#0E382B]">
                  Hotline: {hotline}
                </a>
                <a href={`mailto:${supportEmail}`} className="px-4 py-2 bg-white text-[#0E382B] border border-[#D8CFBD] rounded-xl hover:bg-slate-50">
                  Email: {supportEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
