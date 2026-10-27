'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import PublicNav from '../components/PublicNav';
import PublicFooter from '../components/PublicFooter';

export default function SupportPage() {
  const supportEmail = 'nthanhtam.402@gmail.com';
  const hotline = '0865.062.205';

  const [activeCategory, setActiveCategory] = useState<'all' | 'gps' | 'wifi' | 'attendance' | 'account'>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      category: 'gps',
      q: '1. Ứng dụng báo lỗi "Ngoài phạm vi GPS cửa hàng" thì xử lý thế nào?',
      a: (
        <div className="space-y-2 text-slate-600 text-sm leading-relaxed">
          <p>Lỗi này xảy ra khi khoảng cách GPS đo được vượt quá bán kính hợp lệ của cửa hàng (thường là 50m – 100m do Chủ cửa hàng cấu hình). Hãy thực hiện theo các bước sau:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Cấp quyền Vị trí chính xác:</strong> Mở <em>Cài đặt điện thoại ➔ Quyền riêng tư ➔ Dịch vụ định vị ➔ Chấm Công Trạm BLAO</em> ➔ Chọn <strong>"Khi dùng ứng dụng"</strong> và bật công tắc <strong>"Vị trí chính xác" (Precise Location)</strong>.</li>
            <li><strong>Làm mới chip GPS:</strong> Mở Google Maps hoặc Apple Maps trên máy khoảng 3-5 giây để thiết bị hiệu chuẩn lại tín hiệu vệ tinh trước khi chấm công.</li>
            <li><strong>Nếu cửa hàng mới dời địa điểm:</strong> Chủ cửa hàng hoặc Quản lý 1 hãy vào mục <em>Cài đặt ➔ Cài đặt cửa hàng ➔ Lấy tọa độ hiện tại</em> để cập nhật tọa độ mới nhất.</li>
          </ul>
        </div>
      ),
    },
    {
      category: 'wifi',
      q: '2. Ứng dụng báo lỗi "Sai mạng Wi-Fi của cửa hàng"?',
      a: (
        <div className="space-y-2 text-slate-600 text-sm leading-relaxed">
          <p>Hệ thống Trạm BLAO xác thực cả tên mạng (SSID) và địa chỉ phần cứng router (BSSID) để chống gian lận chấm công hộ từ xa:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Đảm bảo điện thoại của bạn đang kết nối trực tiếp vào đúng mạng Wi-Fi nội bộ của quán, không dùng 4G/5G khi chấm công nếu quán cài đặt bắt buộc Wi-Fi.</li>
            <li><strong>Cấp quyền Mạng cục bộ (Local Network) & Vị trí:</strong> Trên iOS, hệ thống cần quyền vị trí để đọc được tên SSID của mạng Wi-Fi hiện tại.</li>
            <li><strong>Khi quán đổi router mạng hoặc có 2 băng tần (2.4GHz & 5GHz):</strong> Quản lý chỉ cần kết nối điện thoại vào mạng mới và bấm nút <em>"Lấy thông tin WiFi hiện tại"</em> trong Cài đặt cửa hàng.</li>
          </ul>
        </div>
      ),
    },
    {
      category: 'attendance',
      q: '3. Tab "Bảng công" (Attendance) hiển thị dữ liệu như thế nào?',
      a: (
        <div className="space-y-2 text-slate-600 text-sm leading-relaxed">
          <p>Tab <strong>Bảng công</strong> là tính năng cốt lõi cho phép theo dõi lịch sử giờ làm theo tháng:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Nhân viên:</strong> Xem chi tiết từng ngày công trong tháng của chính mình: giờ vào, giờ ra, ca làm, số giờ tính công và trạng thái tăng ca (OT).</li>
            <li><strong>Chủ quán & Quản lý:</strong> Xem bảng tổng hợp toàn bộ nhân sự theo dạng ma trận lịch ngày hoặc danh sách chi tiết. Có thể lọc theo nhân viên, tìm kiếm và xuất file Excel kế toán chuẩn chỉ với một chạm.</li>
            <li><strong>Chế độ tải an toàn:</strong> Khi bạn vừa tham gia cửa hàng mới hoặc tạo cửa hàng chưa có dữ liệu, bảng công sẽ tự động hiển thị trạng thái hướng dẫn thân thiện và nút làm mới dữ liệu.</li>
          </ul>
        </div>
      ),
    },
    {
      category: 'account',
      q: '4. Tôi bị quên mật khẩu tài khoản thì khôi phục như thế nào?',
      a: (
        <div className="space-y-2 text-slate-600 text-sm leading-relaxed">
          <p>Tại màn hình Đăng nhập của ứng dụng di động hoặc Web Dashboard:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Bấm vào liên kết <strong>"Quên mật khẩu?"</strong> dưới ô mật khẩu.</li>
            <li>Nhập chính xác địa chỉ email bạn đã đăng ký và bấm <strong>"Gửi email đặt lại"</strong>.</li>
            <li>Mở hộp thư đến (kiểm tra cả mục <em>Thư rác / Spam</em>), nhấn vào liên kết từ Firebase Auth để đặt mật khẩu mới.</li>
            <li><em>Lưu ý:</em> Nếu bạn đăng nhập bằng <strong>Google</strong> hoặc <strong>Apple Sign-In</strong>, bạn không cần mật khẩu riêng mà chỉ cần bấm nút đăng nhập bằng tài khoản liên kết.</li>
          </ul>
        </div>
      ),
    },
    {
      category: 'account',
      q: '5. Làm thế nào để xóa tài khoản và dữ liệu cá nhân?',
      a: (
        <div className="space-y-2 text-slate-600 text-sm leading-relaxed">
          <p>Chúng tôi tôn trọng tối đa quyền riêng tư của bạn theo tiêu chuẩn Apple & Google:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Tự xóa ngay trên app:</strong> Vào <em>Hồ sơ ➔ Quản lý tài khoản ➔ Xóa tài khoản</em>. Sau khi xác nhận, toàn bộ tài khoản đăng nhập và dữ liệu định danh sẽ được xóa vĩnh viễn khỏi máy chủ.</li>
            <li><strong>Yêu cầu qua email:</strong> Bạn cũng có thể gửi yêu cầu xóa đến <a href={`mailto:${supportEmail}`} className="text-[#146A65] font-bold underline">{supportEmail}</a> từ email tài khoản của bạn, chúng tôi sẽ xử lý trong vòng 24 giờ làm việc.</li>
            <li>Xem hướng dẫn chi tiết tại <Link href="/account-deletion" className="text-[#146A65] font-bold underline">Quy trình xóa tài khoản</Link>.</li>
          </ul>
        </div>
      ),
    },
    {
      category: 'attendance',
      q: '6. Đổi điện thoại mới thì dữ liệu chấm công cũ có mất không?',
      a: (
        <div className="space-y-2 text-slate-600 text-sm leading-relaxed">
          <p><strong>Hoàn toàn không mất dữ liệu.</strong> Toàn bộ lịch sử chấm công, bảng công và nhiệm vụ ca của bạn được đồng bộ tức thì lên hệ cơ sở dữ liệu thời gian thực Firebase Firestore trên đám mây. Khi bạn đăng nhập vào thiết bị mới, mọi thông tin sẽ hiển thị đầy đủ ngay lập tức.</p>
        </div>
      ),
    },
  ];

  const filteredFaqs = activeCategory === 'all' ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAF4E8] text-[#1C1A2D] flex flex-col font-sans">
      <PublicNav />

      {/* Header Banner */}
      <section className="pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-[#D8CFBD] bg-gradient-to-b from-white to-[#FAF4E8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#143A2F] text-[#7FE3C7] text-xs font-bold uppercase tracking-wider mb-4 border border-[#0E382B]">
            <span className="w-2 h-2 rounded-full bg-[#7FE3C7] animate-pulse" />
            <span>Hỗ Trợ Kỹ Thuật Chính Thức • 24/7</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#0E382B] tracking-tight mb-4">
            Trung Tâm Hỗ Trợ Khách Hàng
          </h1>
          <p className="text-base sm:text-lg text-[#5D5B63] max-w-2xl mx-auto leading-relaxed">
            Giải đáp thắc mắc, hướng dẫn sử dụng và hỗ trợ kỹ thuật trực tiếp cho người dùng ứng dụng <strong>Chấm Công Trạm BLAO</strong>.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#D8CFBD] shadow-xs text-xs font-semibold text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Hệ thống máy chủ đám mây: <strong>Đang hoạt động bình thường (Uptime 99.9%)</strong></span>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-white border-b border-[#D8CFBD]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-[#0E382B] mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#7FE3C7] rounded-full inline-block" />
            <span>Kênh Liên Hệ Kỹ Thuật Trực Tiếp</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#FAF4E8] border border-[#D8CFBD] rounded-2xl p-6 hover:border-[#7FE3C7] shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#143A2F] text-white flex items-center justify-center text-xl mb-4">
                  📞
                </div>
                <h3 className="font-extrabold text-base text-[#0E382B] mb-1">Hotline Kỹ Thuật</h3>
                <p className="text-xs text-[#5D5B63] mb-4">
                  Xử lý khẩn cấp sự cố gián đoạn chấm công hoặc hỗ trợ đăng ký cửa hàng mới.
                </p>
              </div>
              <div>
                <a
                  href={`tel:${hotline.replace(/\./g, '')}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#7FE3C7] text-[#0E382B] font-extrabold text-sm hover:bg-[#5BD1B3] transition-colors w-full justify-center"
                >
                  <span>Gọi {hotline}</span>
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#FAF4E8] border border-[#D8CFBD] rounded-2xl p-6 hover:border-[#7FE3C7] shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#143A2F] text-white flex items-center justify-center text-xl mb-4">
                  ✉️
                </div>
                <h3 className="font-extrabold text-base text-[#0E382B] mb-1">Email Hỗ Trợ</h3>
                <p className="text-xs text-[#5D5B63] mb-4">
                  Giải đáp thắc mắc nghiệp vụ, xuất file bảng lương và yêu cầu quản lý tài khoản.
                </p>
              </div>
              <div>
                <a
                  href={`mailto:${supportEmail}?subject=${encodeURIComponent('Yêu cầu hỗ trợ - Chấm Công Trạm BLAO')}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#D8CFBD] text-[#0E382B] font-bold text-xs hover:bg-slate-50 transition-colors w-full justify-center break-all"
                >
                  <span>{supportEmail}</span>
                </a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#FAF4E8] border border-[#D8CFBD] rounded-2xl p-6 hover:border-[#7FE3C7] shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#143A2F] text-white flex items-center justify-center text-xl mb-4">
                  ⏰
                </div>
                <h3 className="font-extrabold text-base text-[#0E382B] mb-1">Khung Giờ Trực</h3>
                <p className="text-xs text-[#5D5B63] mb-4">
                  Đội ngũ kỹ thuật túc trực đồng hành cùng mọi ca sáng, ca chiều và ca tối của quán.
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#D8CFBD] text-center text-xs font-extrabold text-[#0E382B]">
                08:00 – 22:00 (Hàng ngày, kể cả Lễ, Tết)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-14 sm:py-20 flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0E382B] mb-2">
              Câu Hỏi Thường Gặp & Xử Lý Sự Cố
            </h2>
            <p className="text-sm text-[#5D5B63]">
              Chọn chuyên mục để xem hướng dẫn khắc phục nhanh chóng
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {[
              { id: 'all', label: 'Tất cả câu hỏi' },
              { id: 'gps', label: '📍 Định vị GPS' },
              { id: 'wifi', label: '📶 Kết nối Wi-Fi' },
              { id: 'attendance', label: '📅 Bảng công & Ca kíp' },
              { id: 'account', label: '👤 Tài khoản & Bảo mật' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#143A2F] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-[#D8CFBD] hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="space-y-4 max-w-3xl mx-auto">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[#D8CFBD] shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                  >
                    <span className="font-extrabold text-sm sm:text-base text-[#0E382B]">
                      {faq.q}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#FAF4E8] flex items-center justify-center text-xs font-bold text-[#143A2F] shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 border-t border-slate-100 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
