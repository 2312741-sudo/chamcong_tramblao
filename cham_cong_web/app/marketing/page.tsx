import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Chấm Công Trạm BLAO • Ứng Dụng Chấm Công & Quản Trị Nhân Sự F&B Thông Minh',
  description:
    'Hệ thống chấm công định vị GPS và WiFi cho Quán Cà phê, Trà sữa, Nhà hàng và Chuỗi Bán lẻ. Chống gian lận chấm công hộ, tự động tính bảng lương, xếp ca làm và giao nhiệm vụ theo ca thông minh.',
};

export default function MarketingPage() {
  const features = [
    {
      badge: 'Chống gian lận 100%',
      title: 'Chấm Công Kép GPS & Wi-Fi',
      desc: 'Xác thực đồng thời tọa độ GPS bán kính cửa hàng và địa chỉ phần cứng Wi-Fi (BSSID). Ngăn chặn hoàn toàn tình trạng chấm công hộ từ xa.',
    },
    {
      badge: 'Linh hoạt ca kíp',
      title: 'Xếp Ca & Đăng Ký Lịch Làm',
      desc: 'Nhân viên chủ động đăng ký ca rảnh theo tuần. Quản lý phê duyệt và xếp lịch trực quan, nhận thông báo đẩy tức thì trên điện thoại.',
    },
    {
      badge: 'Kiểm soát vận hành',
      title: 'Giao Việc & Báo Cáo Tiến Độ Ca',
      desc: 'Tự động tạo danh sách việc cần làm theo ca (mở quán, dọn quầy, kiểm tra tủ lạnh). Nhân viên tick hoàn thành và báo cáo tiến độ minh bạch.',
    },
    {
      badge: 'Tiết kiệm 90% thời gian',
      title: 'Bảng Công & Tính Lương Tự Động',
      desc: 'Tự động tính giờ công chuẩn, ca gãy, tăng ca (OT), trừ đi muộn/về sớm. Xuất file bảng công Excel chuyên nghiệp chỉ với một thao tác.',
    },
    {
      badge: 'Tạo động lực làm việc',
      title: 'Hiệu Suất & Đánh Giá KPI',
      desc: 'Hệ thống chấm điểm thưởng/phạt theo hành vi làm việc, bảng xếp hạng nhân viên xuất sắc trong tháng tạo môi trường làm việc tích cực.',
    },
    {
      badge: 'Hệ sinh thái đồng bộ',
      title: 'Liên Kết POS Trạm BLAO',
      desc: 'Dùng chung tài khoản nhân sự với hệ thống bán hàng POS Trạm BLAO. Đồng bộ thông suốt giữa vận hành thu ngân và quản lý nhân sự chuỗi.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-12">
        {/* Navigation Bar */}
        <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500 mb-8 pb-4 border-b border-slate-100">
          <Link href="/marketing" className="text-[#143A2F] font-bold">
            Giới thiệu sản phẩm
          </Link>
          <Link href="/support" className="hover:text-[#143A2F] transition-colors">
            Trung tâm hỗ trợ
          </Link>
          <Link href="/privacy-policy" className="hover:text-[#143A2F] transition-colors">
            Chính sách quyền riêng tư
          </Link>
          <Link href="/account-deletion" className="hover:text-[#143A2F] transition-colors">
            Xóa tài khoản
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center pb-10 mb-10 border-b border-slate-100">
          <span className="inline-block px-4 py-1.5 bg-[#7FE3C7] text-[#143A2F] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 border border-[#5BD1B3]">
            CHẤM CÔNG THẾ HỆ MỚI • F&B & BÁN LẺ
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
            Chấm Công Trạm BLAO
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Giải pháp chấm công định vị GPS & WiFi thông minh, quản lý ca kíp và tính lương tự động cho Quán Cà phê, Trà sữa, Nhà hàng và Chuỗi Bán lẻ.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#7FE3C7] rounded-full inline-block" />
            Tính Năng Nổi Bật Dành Cho Doanh Nghiệp F&B
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, index) => (
              <div
                key={index}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-[#7FE3C7] hover:shadow-sm transition-all"
              >
                <span className="inline-block px-2.5 py-1 bg-white text-[#143A2F] text-[11px] font-bold rounded-lg border border-slate-200 mb-3">
                  {feat.badge}
                </span>
                <h3 className="font-bold text-slate-900 text-base mb-2">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call To Action Box */}
        <div className="bg-gradient-to-br from-[#E8FAF4] to-white border border-[#7FE3C7] rounded-3xl p-8 sm:p-10 text-center">
          <h2 className="text-2xl font-extrabold text-[#143A2F] mb-3">
            Sẵn Sàng Tối Ưu Hóa Quản Lý Nhân Sự Quán Của Bạn?
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mb-6">
            Liên hệ ngay với chúng tôi để được tư vấn thiết lập cửa hàng, phân quyền nhân sự và trải nghiệm ứng dụng Chấm Công Trạm BLAO.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:nthanhtam.402@gmail.com?subject=T%C6%B0%20v%E1%BA%A5n%20Ch%E1%BA%A5m%20C%C3%B4ng%20Tr%E1%BA%A1m%20BLAO"
              className="inline-block px-6 py-3 bg-[#7FE3C7] text-[#143A2F] text-sm font-extrabold rounded-xl shadow-sm hover:brightness-95 transition-all"
            >
              Liên Hệ Qua Email: nthanhtam.402@gmail.com
            </a>
            <a
              href="tel:0865062205"
              className="inline-block px-6 py-3 bg-white text-slate-800 border border-slate-300 text-sm font-bold rounded-xl hover:bg-slate-50 transition-all"
            >
              Hotline: 0865.062.205
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 mt-12 border-t border-slate-100 text-xs text-slate-500">
          <p>Bản quyền © 2026 Nguyễn Thanh Tâm • Chấm Công Trạm BLAO</p>
          <p className="mt-1">
            Email hỗ trợ: <a href="mailto:nthanhtam.402@gmail.com" className="text-[#143A2F] font-semibold">nthanhtam.402@gmail.com</a> | Hotline: 0865.062.205
          </p>
        </div>
      </div>
    </div>
  );
}
