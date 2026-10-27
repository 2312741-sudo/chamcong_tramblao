import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PublicNav from '../components/PublicNav';
import PublicFooter from '../components/PublicFooter';

export const metadata: Metadata = {
  title: 'Chấm Công Trạm BLAO • Ứng Dụng Chấm Công & Quản Trị Nhân Sự F&B Thông Minh',
  description:
    'Hệ thống chấm công định vị GPS và WiFi cho Quán Cà phê, Trà sữa, Nhà hàng và Chuỗi Bán lẻ. Chống gian lận chấm công hộ, tự động tính bảng lương, xếp ca làm và giao nhiệm vụ theo ca thông minh.',
};

export default function MarketingPage() {
  const pillars = [
    {
      icon: '📍',
      badge: 'Chống gian lận 100%',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      title: 'Chấm Công Kép GPS & Wi-Fi BSSID',
      desc: 'Xác thực đồng thời tọa độ GPS bán kính cửa hàng (50m-100m) và địa chỉ phần cứng Wi-Fi (BSSID). Ngăn chặn triệt để tình trạng chấm công hộ từ xa hoặc dùng phần mềm giả lập vị trí.',
      bullets: ['Định vị GPS độ chính xác cao', 'Khóa theo mã BSSID router cửa hàng', 'Tự động phát hiện đi muộn, về sớm'],
    },
    {
      icon: '🗓️',
      badge: 'Linh hoạt ca kíp',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      title: 'Xếp Ca & Đăng Ký Lịch Làm Trực Quan',
      desc: 'Nhân viên chủ động đăng ký ca rảnh theo tuần ngay trên điện thoại. Quản lý kéo thả duyệt ca, xếp ca thông minh và gửi thông báo đẩy (Push Notification) đến từng nhân viên.',
      bullets: ['Phân ca sáng, trưa, tối, ca gãy', 'Đổi ca linh hoạt giữa các nhân viên', 'Cảnh báo trùng ca hoặc thiếu người'],
    },
    {
      icon: '📋',
      badge: 'Kiểm soát vận hành',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      title: 'Giao Việc & Checklist Ca Chuẩn Hóa',
      desc: 'Tự động tạo danh sách việc cần làm cho từng ca (mở quán, dọn quầy, kiểm tra tủ lạnh, chốt két). Nhân viên tick hoàn thành và báo cáo tiến độ minh bạch theo thời gian thực.',
      bullets: ['Quy trình bàn giao ca rõ ràng', 'Đánh giá tỷ lệ hoàn thành checklist', 'Báo cáo ngay sự cố thiết bị tại quán'],
    },
    {
      icon: '💰',
      badge: 'Tiết kiệm 90% thời gian',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
      title: 'Bảng Công & Tính Lương Tự Động',
      desc: 'Hệ thống tự động quy đổi ca làm ra giờ công thực tế, tính lương theo giờ (Part-time) hoặc lương tháng (Full-time), tự động tính tăng ca (OT), phụ cấp và phạt đi muộn.',
      bullets: ['Xuất Excel bảng công chuẩn kế toán 1 chạm', 'Theo dõi ứng lương & tạm ứng minh bạch', 'Điều chỉnh giờ công có lưu vết lịch sử'],
    },
    {
      icon: '⚡',
      badge: 'Tạo động lực nhân sự',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
      title: 'Đo Hiệu Năng KPI & Thưởng Phạt',
      desc: 'Chấm điểm tác phong làm việc, tính đúng giờ, tinh thần hỗ trợ đồng đội và bảng xếp hạng nhân viên xuất sắc trong tháng tạo môi trường làm việc tích cực, gắn kết.',
      bullets: ['Bảng vàng vinh danh nhân viên tháng', 'Ghi nhận điểm thưởng / phạt minh bạch', 'Thống kê tỷ lệ đi làm chuyên cần'],
    },
    {
      icon: '🏪',
      badge: 'Đồng bộ hệ sinh thái',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
      title: 'Liên Kết POS & Quản Lý Chuỗi Trạm BLAO',
      desc: 'Dùng chung một tài khoản nhân sự với hệ thống bán hàng POS Trạm BLAO. Dữ liệu nhân viên, phân quyền cửa hàng và vai trò được đồng bộ xuyên suốt từ quầy thu ngân đến bảng lương.',
      bullets: ['Đăng nhập 1 tài khoản cho cả POS & Chấm công', 'Hỗ trợ chuỗi đa chi nhánh', 'Phân quyền Chủ quán, Quản lý 1, Quản lý 2'],
    },
  ];

  const comparisons = [
    {
      criteria: 'Chi phí đầu tư',
      traditional: 'Mua máy chấm công vân tay (2-5 triệu/máy), chi phí dây mạng, bảo trì',
      blao: '0đ phần cứng! Dùng ngay điện thoại của nhân viên và Router Wi-Fi sẵn có',
    },
    {
      criteria: 'Chống chấm công hộ',
      traditional: 'Vân tay mờ do ướt, đeo găng tay khó quét, gian lận giờ khi đông khách',
      blao: 'Bảo mật kép GPS bán kính + Mã Wi-Fi BSSID phần cứng, không thể giả lập',
    },
    {
      criteria: 'Tổng hợp bảng công cuối tháng',
      traditional: 'Mất 2-3 ngày cắm USB tải file .dat, nhập Excel thủ công, dễ nhầm lẫn',
      blao: 'Tự động tính từng giây, 1 bấm xuất Excel đầy đủ công, OT, tạm ứng, thưởng phạt',
    },
    {
      criteria: 'Xếp ca & Giao việc',
      traditional: 'Nhắn qua Zalo/Facebook trôi tin, khó quản lý ai đã nhận việc, ai vắng',
      blao: 'Đăng ký ca trên app, xếp lịch trực quan, checklist nhiệm vụ theo từng ca',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF4E8] text-[#1C1A2D] flex flex-col font-sans">
      <PublicNav />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7FE3C7]/25 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#FAF4E8] rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#143A2F] text-[#7FE3C7] text-xs font-bold tracking-wide uppercase shadow-sm mb-6 border border-[#0E382B]">
              <span className="w-2 h-2 rounded-full bg-[#7FE3C7] animate-ping" />
              <span>Giải Pháp Quản Trị Nhân Sự F&B & Bán Lẻ Thế Hệ Mới</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-black text-[#0E382B] tracking-tight leading-[1.15] mb-6">
              Chấm Công Thông Minh. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#146A65] via-[#0E382B] to-[#143A2F] bg-clip-text text-transparent">
                Xếp Ca Nhanh. Tính Lương Tự Động.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-[#5D5B63] font-normal leading-relaxed mb-10 max-w-2xl mx-auto">
              Hệ thống chấm công định vị <strong>GPS & Wi-Fi kép</strong>, giao việc theo ca và tính lương chuẩn kế toán dành riêng cho Quán Cà phê, Trà sữa, Nhà hàng và Chuỗi Bán lẻ.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#7FE3C7] text-[#0E382B] font-extrabold text-base hover:bg-[#5BD1B3] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border border-[#5BD1B3]"
              >
                <span>Mở Web Dashboard Quản Lý</span>
                <span className="text-lg">→</span>
              </Link>
              <Link
                href="/support"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-[#1C1A2D] font-bold text-base hover:bg-slate-50 shadow-sm border border-[#D8CFBD] transition-all flex items-center justify-center gap-2"
              >
                <span>Trung Tâm Hỗ Trợ & Hướng Dẫn</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-[#D8CFBD]/50 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-bold text-[#5D5B63]">
              <div className="flex items-center gap-2">
                <span className="text-[#146A65] text-base">✓</span>
                <span>Chống gian lận 100%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#146A65] text-base">✓</span>
                <span>Tiết kiệm 90% giờ chốt lương</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#146A65] text-base">✓</span>
                <span>Xuất file Excel kế toán 1 chạm</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#146A65] text-base">✓</span>
                <span>Hỗ trợ iOS 27 & Android</span>
              </div>
            </div>
          </div>

          {/* Interactive Feature Showcase Mockup */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-[#D8CFBD] shadow-xl">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Mobile Preview Mock */}
                <div className="w-full lg:w-5/12 bg-[#FAF4E8] rounded-2xl p-5 border border-[#D8CFBD] shadow-inner">
                  <div className="flex items-center justify-between pb-3 border-b border-[#D8CFBD]/60 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-[11px] font-bold text-[#0E382B] uppercase tracking-wider">
                      App Điện Thoại • Nhân Viên
                    </span>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-500">Ca sáng hôm nay</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                        HỢP LỆ
                      </span>
                    </div>
                    <div className="text-lg font-black text-[#0E382B]">07:00 – 15:00</div>
                    <div className="text-xs text-slate-600 mt-1">Cửa hàng: <strong>Trạm BLAO - Chi nhánh 1</strong></div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                      <span className="flex items-center gap-1.5 font-bold text-emerald-900">
                        <span>📍 GPS Cửa Hàng:</span>
                      </span>
                      <span className="text-emerald-700 font-bold">18m (Bán kính &lt; 50m ✓)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-blue-50 border border-blue-200">
                      <span className="flex items-center gap-1.5 font-bold text-blue-900">
                        <span>📶 Wi-Fi Nội Bộ:</span>
                      </span>
                      <span className="text-blue-700 font-bold">BLAO_TEA_5G (Đã khớp BSSID ✓)</span>
                    </div>
                  </div>

                  <button className="w-full mt-4 py-3 rounded-xl bg-[#7FE3C7] text-[#0E382B] font-extrabold text-sm shadow flex items-center justify-center gap-2">
                    <span>✓ VÀO CA LÀM THÀNH CÔNG (06:58)</span>
                  </button>
                </div>

                {/* Web Dashboard Preview Mock */}
                <div className="w-full lg:w-7/12">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs font-bold uppercase text-[#146A65] tracking-wider">
                        Cổng Quản Trị Web (Owner & Manager)
                      </span>
                      <h3 className="text-xl font-extrabold text-[#0E382B]">
                        Theo Dõi Toàn Diện Mọi Ca Làm & Bảng Lương
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#143A2F] text-[#7FE3C7] text-xs font-bold">
                      Real-time
                    </span>
                  </div>

                  <p className="text-sm text-[#5D5B63] leading-relaxed mb-5">
                    Chủ cửa hàng và Quản lý theo dõi trực tiếp ai đang trong ca, số giờ công tích lũy, các việc phát sinh trong ca và tự động kết xuất bảng tính lương hàng tháng.
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="p-3 bg-white rounded-xl border border-[#D8CFBD] text-center">
                      <div className="text-xs text-slate-500 font-medium">Đang trong ca</div>
                      <div className="text-xl font-extrabold text-emerald-600 mt-0.5">8 / 10</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-[#D8CFBD] text-center">
                      <div className="text-xs text-slate-500 font-medium">Giờ công tháng</div>
                      <div className="text-xl font-extrabold text-[#0E382B] mt-0.5">1,248.5h</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-[#D8CFBD] text-center">
                      <div className="text-xs text-slate-500 font-medium">Checklist hoàn thành</div>
                      <div className="text-xl font-extrabold text-blue-600 mt-0.5">96.8%</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href="/login"
                      className="px-5 py-2.5 rounded-xl bg-[#143A2F] text-white text-xs font-bold hover:bg-[#0E382B] transition-colors"
                    >
                      Đăng Nhập Quản Lý →
                    </Link>
                    <Link
                      href="/support"
                      className="px-5 py-2.5 rounded-xl bg-white border border-[#D8CFBD] text-xs font-bold text-[#1C1A2D] hover:bg-slate-50 transition-colors"
                    >
                      Xem Hướng Dẫn Kỹ Thuật
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Pillars Bento Grid */}
      <section className="py-16 sm:py-24 bg-white border-y border-[#D8CFBD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold tracking-wider text-[#146A65] uppercase bg-[#E8FAF4] px-3.5 py-1.5 rounded-full border border-[#7FE3C7]">
              TÍNH NĂNG VƯỢT TRỘI
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E382B] tracking-tight mt-4 mb-3">
              Mọi Thứ Cần Thiết Để Vận Hành Chuỗi F&B Mượt Mà
            </h2>
            <p className="text-sm sm:text-base text-[#5D5B63]">
              Thiết kế chuyên sâu cho đặc thù ca gãy, nhân sự part-time và quản lý nhiều chi nhánh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-[#FAF4E8]/60 hover:bg-[#FAF4E8] rounded-3xl p-7 border border-[#D8CFBD] hover:border-[#7FE3C7] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl p-3 bg-white rounded-2xl shadow-sm border border-[#D8CFBD] group-hover:scale-110 transition-transform">
                      {pillar.icon}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${pillar.badgeColor}`}>
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#0E382B] mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5D5B63] leading-relaxed mb-5">
                    {pillar.desc}
                  </p>
                </div>

                <div className="border-t border-[#D8CFBD]/60 pt-4 space-y-1.5">
                  {pillar.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs font-semibold text-[#143A2F]">
                      <span className="text-[#146A65]">✓</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 sm:py-24 bg-[#FAF4E8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0E382B] tracking-tight mb-3">
              Vì Sao Nên Chọn Chấm Công Trạm BLAO?
            </h2>
            <p className="text-sm text-[#5D5B63]">
              So sánh hiệu quả với các phương pháp chấm công truyền thống
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#D8CFBD] shadow-sm overflow-hidden">
            <div className="overflow-x-auto touch-scroll">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#143A2F] text-white">
                    <th className="py-4 px-6 font-bold w-1/4">Tiêu Chí</th>
                    <th className="py-4 px-6 font-semibold w-3/8 text-slate-300">Máy Vân Tay / Zalo Truyền Thống</th>
                    <th className="py-4 px-6 font-extrabold w-3/8 text-[#7FE3C7] bg-[#0E382B]">
                      Chấm Công Trạm BLAO
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisons.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-[#0E382B]">{c.criteria}</td>
                      <td className="py-4 px-6 text-slate-500 leading-relaxed text-xs sm:text-sm">
                        {c.traditional}
                      </td>
                      <td className="py-4 px-6 text-[#143A2F] font-semibold bg-[#E8FAF4]/40 leading-relaxed text-xs sm:text-sm">
                        {c.blao}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 sm:py-20 bg-white border-t border-[#D8CFBD]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#143A2F] to-[#0E382B] rounded-3xl p-8 sm:p-14 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7FE3C7]/15 rounded-full blur-2xl" />
            <h2 className="text-2xl sm:text-4xl font-black mb-4 tracking-tight leading-tight">
              Sẵn Sàng Nâng Tầm Quản Trị Cửa Hàng Của Bạn?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Trải nghiệm ngay hệ thống quản lý ca kíp và tính lương tự động. Dễ dàng triển khai chỉ trong 5 phút mà không cần đầu tư máy móc phức tạp.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/login"
                className="px-8 py-3.5 rounded-xl bg-[#7FE3C7] text-[#0E382B] font-extrabold text-sm hover:bg-[#5BD1B3] transition-all shadow-md"
              >
                Đăng Nhập Cổng Quản Lý Web
              </Link>
              <Link
                href="/support"
                className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
              >
                Liên Hệ Trung Tâm Hỗ Trợ
              </Link>
            </div>

            <div className="mt-8 text-xs text-slate-400">
              Hotline Kỹ Thuật: <a href="tel:0865062205" className="text-[#7FE3C7] font-bold hover:underline">0865.062.205</a> • Email: <a href="mailto:nthanhtam.402@gmail.com" className="text-[#7FE3C7] font-bold hover:underline">nthanhtam.402@gmail.com</a>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
