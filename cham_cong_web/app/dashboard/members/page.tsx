'use client';
import { useState } from 'react';
import { useApp } from '../layout';
import {
  setMemberStatus,
  updateMemberRole,
  transferStoreOwnershipOnWeb,
  updateMemberSalary,
  updateMemberInfo,
  updateMemberOrder,
  toggleHideMemberSchedule,
} from '@/lib/firestore';
import {
  Member,
  UserRole,
  getRoleLabel,
  normalizeRole,
  formatJoinedDate,
  canApproveMembers,
  sortMembersByOrder,
} from '@/lib/types';

export default function MembersPage() {
  const { user, storeId, store, members, role } = useApp();
  const [activeTab, setActiveTab] = useState<'active' | 'pending'>('active');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [editingSalary, setEditingSalary] = useState<Member | null>(null);

  // Edit salary/info state
  const [empType, setEmpType] = useState<'fulltime' | 'parttime'>('fulltime');
  const [salaryAmt, setSalaryAmt] = useState(0);
  const [stdHours, setStdHours] = useState(208);
  const [employeeCode, setEmployeeCode] = useState('');
  const [joinedAt, setJoinedAt] = useState('');
  const [department, setDepartment] = useState<string>('');
  const [hideSchedule, setHideSchedule] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const isOwner = normalizeRole(role) === 'owner';
  const canApprove = canApproveMembers(role);

  const activeMembers = members.filter((m) => m.status === 'active');
  const pendingMembers = members.filter((m) => m.status === 'pending');

  const sortedActiveMembers = sortMembersByOrder(activeMembers, store?.memberOrder);

  const filteredActiveMembers = sortedActiveMembers.filter((m) => {
    const norm = normalizeRole(m.role);
    const matchesRole =
      roleFilter === 'all' ||
      (roleFilter === 'owner' && norm === 'owner') ||
      (roleFilter === 'manager1' && norm === 'manager1') ||
      (roleFilter === 'manager2' && norm === 'manager2') ||
      (roleFilter === 'employee' && norm === 'employee');

    if (!matchesRole) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const dept = store?.departments?.find((d) => d.id === m.department || d.name === m.department);
    const deptName = (dept?.name || m.department || '').toLowerCase();

    return (
      m.name.toLowerCase().includes(q) ||
      (m.phone || '').toLowerCase().includes(q) ||
      (m.employeeCode || '').toLowerCase().includes(q) ||
      deptName.includes(q)
    );
  });

  const handleRoleChange = async (userId: string, newRole: string) => {
    if (!storeId || !isOwner) return;

    if (userId === user?.uid) {
      alert('Bạn đang là Chủ cửa hàng. Bạn không thể tự hạ quyền của chính mình tại đây.');
      return;
    }

    if (newRole === 'owner') {
      const target = members.find((m) => m.userId === userId);
      const targetName = target?.name || 'thành viên này';
      const confirmed = window.confirm(
        `XÁC NHẬN CHUYỂN QUYỀN CHỦ CỬA HÀNG:\n\n` +
          `Bạn có chắc chắn muốn chuyển quyền Chủ cửa hàng cho "${targetName}"?\n\n` +
          `- "${targetName}" sẽ trở thành Chủ cửa hàng mới.\n` +
          `- Bạn sẽ trở thành Quản lý 1.\n\n` +
          `Hành động này sẽ cập nhật quyền hạn ngay lập tức.`
      );
      if (!confirmed) return;

      try {
        await transferStoreOwnershipOnWeb(storeId, userId, user?.uid || '', targetName);
        alert(`Đã chuyển giao quyền Chủ cửa hàng cho ${targetName} thành công.`);
      } catch (e) {
        console.error('Error transferring store ownership:', e);
        alert('Lỗi khi chuyển quyền chủ cửa hàng. Vui lòng thử lại.');
      }
      return;
    }

    try {
      const firestoreRole = newRole === 'manager1' ? 'manager_1' : newRole === 'manager2' ? 'manager_2' : newRole;
      await updateMemberRole(storeId, userId, firestoreRole);
    } catch (e) {
      alert('Lỗi khi đổi vai trò');
    }
  };

  const handleStatusChange = async (userId: string, newStatus: 'active' | 'kicked') => {
    if (!storeId || !canApprove) return;
    if (newStatus === 'kicked' && !confirm('Bạn có chắc chắn muốn xóa/từ chối nhân viên này?')) return;
    try {
      await setMemberStatus(storeId, userId, newStatus);
    } catch (e) {
      alert('Lỗi khi cập nhật trạng thái');
    }
  };

  const handleToggleHide = async (userId: string, currentlyHidden: boolean) => {
    if (!storeId || !isOwner) return;
    try {
      await toggleHideMemberSchedule(storeId, userId, !currentlyHidden);
    } catch (e) {
      alert('Lỗi khi thay đổi trạng thái ẩn lịch');
    }
  };

  const handleMoveOrder = async (fromIdx: number, toIdx: number) => {
    if (!storeId || !isOwner || toIdx < 0 || toIdx >= sortedActiveMembers.length) return;
    const items = [...sortedActiveMembers];
    const [moved] = items.splice(fromIdx, 1);
    items.splice(toIdx, 0, moved);
    const newOrder = items.map((m) => m.userId);
    try {
      await updateMemberOrder(storeId, newOrder);
    } catch (e) {
      alert('Lỗi khi lưu thứ tự nhân viên');
    }
  };

  const openSalaryModal = (m: Member) => {
    setEditingSalary(m);
    setEmpType(m.employeeType || 'fulltime');
    setSalaryAmt(m.employeeType === 'fulltime' ? m.baseMonthlySalary : m.baseHourlyRate);
    setStdHours(m.standardHoursPerMonth || 208);
    setEmployeeCode(m.employeeCode || '');
    setJoinedAt(m.joinedAt || '');
    setDepartment(m.department || '');
    setHideSchedule((store?.hiddenScheduleUserIds || []).includes(m.userId));
  };

  const saveSalary = async () => {
    if (!storeId || !editingSalary || !isOwner) return;
    setSaving(true);
    try {
      await updateMemberSalary(storeId, editingSalary.userId, empType, salaryAmt, stdHours);
      await updateMemberInfo(storeId, editingSalary.userId, {
        employeeCode,
        joinedAt,
        department: department || null,
      });
      await toggleHideMemberSchedule(storeId, editingSalary.userId, hideSchedule);
      setEditingSalary(null);
    } catch (e) {
      alert('Lỗi khi lưu thông tin');
    } finally {
      setSaving(false);
    }
  };

  const copyStoreCode = () => {
    if (!store?.code) return;
    navigator.clipboard.writeText(store.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getRoleBadgeStyle = (memberRole: UserRole | string) => {
    const norm = normalizeRole(memberRole);
    switch (norm) {
      case 'owner':
        return { background: '#143A2F', color: '#7FE3C7', border: '1px solid #0E382B' };
      case 'manager1':
        return { background: '#E0F2FE', color: '#0369A1', border: '1px solid #BAE6FD' };
      case 'manager2':
        return { background: '#F0F9FF', color: '#0284C7', border: '1px solid #E0F2FE' };
      case 'employee':
      default:
        return { background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0' };
    }
  };

  const fulltimeCount = activeMembers.filter((m) => m.employeeType === 'fulltime').length;
  const parttimeCount = activeMembers.filter((m) => m.employeeType === 'parttime').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Header & Store Code Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--neutral)', letterSpacing: '-0.3px' }}>
              Quản Lý Nhân Viên
            </h1>
            <span style={{
              background: 'var(--primary-light)',
              color: '#0E382B',
              fontSize: 12,
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 8,
              border: '1px solid var(--primary)'
            }}>
              {store?.name || 'Cửa hàng'}
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>
            Theo dõi danh sách nhân sự, phân quyền vai trò (Chủ quán, Quản lý 1, Quản lý 2) và phê duyệt thành viên mới.
          </p>
        </div>

        {/* Store Code Copy Card */}
        {store?.code && (
          <div style={{
            background: 'white',
            border: '1.5px solid var(--border)',
            borderRadius: 14,
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600 }}>Mã vào cửa hàng:</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#0E382B', letterSpacing: 1.5, fontFamily: 'monospace' }}>
                {store.code}
              </div>
            </div>
            <button
              onClick={copyStoreCode}
              type="button"
              style={{
                background: copiedCode ? 'var(--success)' : 'var(--surface)',
                color: copiedCode ? 'white' : '#0E382B',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '6px 10px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
              title="Sao chép mã cửa hàng để gửi cho nhân viên mới"
            >
              {copiedCode ? '✓ Đã chép' : 'Sao chép mã'}
            </button>
          </div>
        )}
      </div>

      {/* Summary KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14 }}>
        <div className="card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: '#E8FAF4', color: '#146A65', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
            👥
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Tổng nhân sự</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--neutral)' }}>{members.length}</div>
          </div>
        </div>

        <div className="card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
            ✅
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Đang hoạt động</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#0369A1' }}>{activeMembers.length}</div>
          </div>
        </div>

        <div className="card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
            ⏳
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Chờ xét duyệt</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: pendingMembers.length > 0 ? '#B45309' : 'var(--neutral)' }}>
              {pendingMembers.length}
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: '#F1F5F9', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
            ⏱️
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Phân loại</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--neutral)', marginTop: 2 }}>
              {fulltimeCount} FT / {parttimeCount} PT
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Controls: Tabs + Search + Filter Chips */}
        <div style={{
          background: 'white',
          borderRadius: 16,
          padding: 16,
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}>
          {/* Tabs row & Search */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', gap: 8, background: 'var(--surface)', padding: 4, borderRadius: 10 }}>
              <button
                onClick={() => setActiveTab('active')}
                style={{
                  background: activeTab === 'active' ? '#143A2F' : 'transparent',
                  color: activeTab === 'active' ? 'white' : 'var(--text-secondary)',
                  padding: '8px 16px',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 13,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                Đang hoạt động ({activeMembers.length})
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                style={{
                  background: activeTab === 'pending' ? '#7FE3C7' : 'transparent',
                  color: activeTab === 'pending' ? '#0E382B' : 'var(--text-secondary)',
                  padding: '8px 16px',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 13,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                Chờ xét duyệt {pendingMembers.length > 0 && <span style={{ background: '#B4232C', color: 'white', borderRadius: '50%', padding: '1px 6px', fontSize: 11, marginLeft: 4 }}>{pendingMembers.length}</span>}
              </button>
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', minWidth: 260, flex: '1 1 260px', maxWidth: 360 }}>
              <span style={{ position: 'absolute', left: 12, top: 10, fontSize: 14, color: 'var(--text-disabled)' }}>
                🔍
              </span>
              <input
                type="text"
                placeholder="Tìm theo tên, SĐT, mã NV..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 34px',
                  borderRadius: 10,
                  border: '1.5px solid var(--border)',
                  fontSize: 13,
                  outline: 'none',
                  background: 'var(--surface)',
                  color: 'var(--text-primary)'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 14,
                    color: 'var(--text-disabled)'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Role Filter Chips (When activeTab === 'active') */}
          {activeTab === 'active' && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600, marginRight: 4 }}>
                Lọc vai trò:
              </span>
              {[
                { key: 'all', label: 'Tất cả' },
                { key: 'owner', label: '👑 Chủ quán' },
                { key: 'manager1', label: '👔 Quản lý 1' },
                { key: 'manager2', label: '👔 Quản lý 2' },
                { key: 'employee', label: '👤 Nhân viên' },
              ].map((chip) => (
                <button
                  key={chip.key}
                  onClick={() => setRoleFilter(chip.key)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 16,
                    fontSize: 12,
                    fontWeight: roleFilter === chip.key ? 700 : 500,
                    background: roleFilter === chip.key ? '#143A2F' : 'var(--surface)',
                    color: roleFilter === chip.key ? 'white' : 'var(--text-secondary)',
                    border: `1px solid ${roleFilter === chip.key ? '#0E382B' : 'var(--border)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tab 1: Active Members Table */}
        {activeTab === 'active' && (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="touch-scroll" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <table className="table" style={{ minWidth: 800 }}>
                <thead>
                  <tr>
                    {isOwner && roleFilter === 'all' && (
                      <th style={{ width: 44, textAlign: 'center' }}>Thứ tự</th>
                    )}
                    <th>Nhân viên</th>
                    <th>Mã NV / Ngày vào</th>
                    <th>Bộ phận</th>
                    <th>Vai trò</th>
                    <th>Loại hợp đồng</th>
                    <th>Mức lương</th>
                    {isOwner && <th style={{ textAlign: 'center' }}>Lịch cửa hàng</th>}
                    {isOwner && <th style={{ textAlign: 'right' }}>Thao tác</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredActiveMembers.map((m, idx) => {
                    const currentRoleValue = normalizeRole(m.role);
                    const badgeStyle = getRoleBadgeStyle(m.role);
                    const isHidden = (store?.hiddenScheduleUserIds || []).includes(m.userId);

                    return (
                      <tr
                        key={m.userId}
                        draggable={isOwner && roleFilter === 'all'}
                        onDragStart={() => setDraggedIdx(idx)}
                        onDragOver={(e) => {
                          if (isOwner && roleFilter === 'all') e.preventDefault();
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (draggedIdx !== null && draggedIdx !== idx) {
                            handleMoveOrder(draggedIdx, idx);
                          }
                          setDraggedIdx(null);
                        }}
                        style={{
                          background: draggedIdx === idx ? 'rgba(127, 227, 199, 0.15)' : undefined,
                          transition: 'background 0.2s',
                        }}
                      >
                        {/* Order Reorder Handle */}
                        {isOwner && roleFilter === 'all' && (
                          <td style={{ textAlign: 'center', width: 44 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                              <button
                                type="button"
                                title="Di chuyển lên"
                                disabled={idx === 0}
                                onClick={() => handleMoveOrder(idx, idx - 1)}
                                style={{
                                  border: 'none',
                                  background: 'transparent',
                                  cursor: idx === 0 ? 'default' : 'pointer',
                                  opacity: idx === 0 ? 0.2 : 0.7,
                                  padding: '2px 4px',
                                  fontSize: 11,
                                }}
                              >
                                ▲
                              </button>
                              <span style={{ cursor: 'grab', fontSize: 13, opacity: 0.5, userSelect: 'none' }} title="Kéo để đổi thứ tự">
                                ☰
                              </span>
                              <button
                                type="button"
                                title="Di chuyển xuống"
                                disabled={idx === filteredActiveMembers.length - 1}
                                onClick={() => handleMoveOrder(idx, idx + 1)}
                                style={{
                                  border: 'none',
                                  background: 'transparent',
                                  cursor: idx === filteredActiveMembers.length - 1 ? 'default' : 'pointer',
                                  opacity: idx === filteredActiveMembers.length - 1 ? 0.2 : 0.7,
                                  padding: '2px 4px',
                                  fontSize: 11,
                                }}
                              >
                                ▼
                              </button>
                            </div>
                          </td>
                        )}

                        {/* Name & Avatar */}
                        <td>
                          <div className="flex items-center gap-3">
                            {m.avatarUrl ? (
                              <img
                                src={m.avatarUrl}
                                alt={m.name}
                                style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--border)' }}
                              />
                            ) : (
                              <div className="avatar" style={{ width: 38, height: 38, fontSize: 14 }}>
                                {m.name[0]}
                              </div>
                            )}
                            <div>
                              <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, color: '#1C1A2D' }}>
                                {m.name}
                                {m.userId === user?.uid && (
                                  <span style={{ fontSize: 10, background: '#E8FAF4', color: '#146A65', padding: '1px 6px', borderRadius: 6, fontWeight: 700 }}>
                                    Bạn
                                  </span>
                                )}
                                {isHidden && (
                                  <span style={{ fontSize: 10, background: '#FFF3BF', color: '#D9480F', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>
                                    Ẩn lịch
                                  </span>
                                )}
                              </div>
                              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                                {m.phone || 'Chưa cập nhật SĐT'}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Employee Code & Joined Date */}
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--neutral)', fontFamily: 'monospace' }}>
                            {m.employeeCode || '—'}
                          </div>
                          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                            {formatJoinedDate(m.joinedAt)}
                          </div>
                        </td>

                        {/* Department */}
                        <td>
                          {(() => {
                            const dept = store?.departments?.find((d) => d.id === m.department || d.name === m.department);
                            const deptName = dept?.name || m.department;
                            if (deptName) {
                              return (
                                <span
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 4,
                                    padding: '4px 10px',
                                    borderRadius: 8,
                                    fontSize: 12,
                                    fontWeight: 600,
                                    background: '#F0F9FF',
                                    color: '#0369A1',
                                    border: '1px solid #BAE6FD',
                                  }}
                                >
                                  🏢 {deptName}
                                </span>
                              );
                            }
                            return <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>—</span>;
                          })()}
                        </td>

                        {/* Role */}
                        <td>
                          {isOwner && m.userId !== user?.uid && m.userId !== store?.ownerId ? (
                            <select
                              className="select"
                              style={{ padding: '6px 10px', fontSize: 13, width: 'auto', fontWeight: 600 }}
                              value={currentRoleValue}
                              onChange={(e) => handleRoleChange(m.userId, e.target.value)}
                            >
                              <option value="employee">👤 Nhân viên</option>
                              <option value="manager1">👔 Quản lý 1 (Xếp lịch & Duyệt NV)</option>
                              <option value="manager2">👔 Quản lý 2 (Xem lịch)</option>
                              <option value="owner">👑 Chuyển quyền Chủ quán</option>
                            </select>
                          ) : (
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '4px 10px',
                                borderRadius: 10,
                                fontSize: 12,
                                fontWeight: 700,
                                ...badgeStyle,
                              }}
                            >
                              {getRoleLabel(m.role)}
                            </span>
                          )}
                        </td>

                        {/* Contract Type */}
                        <td>
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              padding: '3px 8px',
                              borderRadius: 6,
                              background: m.employeeType === 'fulltime' ? '#EDE9FE' : '#FEF3C7',
                              color: m.employeeType === 'fulltime' ? '#6D28D9' : '#B45309',
                            }}
                          >
                            {m.employeeType === 'fulltime' ? 'Toàn thời gian (FT)' : 'Bán thời gian (PT)'}
                          </span>
                        </td>

                        {/* Salary */}
                        <td>
                          <div style={{ fontWeight: 700, color: '#0E382B' }}>
                            {(m.employeeType === 'fulltime' ? m.baseMonthlySalary || 0 : m.baseHourlyRate || 0).toLocaleString('vi-VN')} đ
                            <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 400, marginLeft: 3 }}>
                              {m.employeeType === 'fulltime' ? '/tháng' : '/giờ'}
                            </span>
                          </div>
                        </td>

                        {/* Hide from schedule toggle */}
                        {isOwner && (
                          <td style={{ textAlign: 'center' }}>
                            <button
                              type="button"
                              onClick={() => handleToggleHide(m.userId, isHidden)}
                              title={isHidden ? 'Đang ẩn khỏi Lịch cửa hàng (Chỉ Chủ thấy). Bấm để hiện lại.' : 'Đang hiện trên Lịch cửa hàng. Bấm để ẩn khỏi người khác.'}
                              style={{
                                padding: '4px 10px',
                                borderRadius: 8,
                                fontSize: 11,
                                fontWeight: 700,
                                border: `1px solid ${isHidden ? '#FFC9C9' : '#D0EBFF'}`,
                                background: isHidden ? '#FFF5F5' : '#E7F5FF',
                                color: isHidden ? '#C8102E' : '#1C7ED6',
                                cursor: 'pointer',
                              }}
                            >
                              {isHidden ? '🙈 Đã ẩn' : '👁️ Hiển thị'}
                            </button>
                          </td>
                        )}

                        {/* Actions */}
                        {isOwner && (
                          <td style={{ textAlign: 'right' }}>
                            <div className="flex gap-2" style={{ justifyContent: 'flex-end' }}>
                              <button
                                className="btn btn-ghost btn-sm"
                                onClick={() => openSalaryModal(m)}
                                title="Cài đặt thông tin & lương"
                              >
                                ⚙️ Cài đặt
                              </button>
                              {m.userId !== user?.uid && (
                                <button
                                  className="btn btn-ghost btn-sm"
                                  style={{ color: 'var(--danger)', borderColor: '#FCA5A5' }}
                                  onClick={() => handleStatusChange(m.userId, 'kicked')}
                                  title="Xóa nhân viên khỏi cửa hàng"
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}

                  {filteredActiveMembers.length === 0 && (
                    <tr>
                      <td colSpan={isOwner ? 9 : 6} style={{ textAlign: 'center', padding: 48, color: 'var(--text-secondary)' }}>
                        <div style={{ fontSize: 24, marginBottom: 8 }}>🔍</div>
                        <div style={{ fontWeight: 600 }}>Không tìm thấy nhân viên nào</div>
                        <div style={{ fontSize: 12, marginTop: 4 }}>
                          {searchQuery ? 'Thử tìm với từ khóa khác' : 'Chưa có nhân viên nào trong vai trò này'}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Pending Members */}
        {activeTab === 'pending' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {pendingMembers.map((m) => (
              <div key={m.userId} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="flex items-center gap-3">
                  <div className="avatar" style={{ width: 48, height: 48, fontSize: 18 }}>
                    {m.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: '#1C1A2D' }}>{m.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Đăng ký gia nhập qua mã cửa hàng</div>
                    {m.phone && (
                      <div style={{ fontSize: 12, color: '#0E382B', fontWeight: 600, marginTop: 2 }}>
                        📞 SĐT: {m.phone}
                      </div>
                    )}
                  </div>
                </div>

                {canApprove ? (
                  <div className="flex gap-2" style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                    <button
                      className="btn btn-primary flex-1"
                      style={{ justifyContent: 'center' }}
                      onClick={() => handleStatusChange(m.userId, 'active')}
                    >
                      ✓ Phê duyệt vào làm
                    </button>
                    <button
                      className="btn btn-ghost flex-1"
                      style={{ justifyContent: 'center', color: 'var(--danger)', borderColor: '#FCA5A5' }}
                      onClick={() => handleStatusChange(m.userId, 'kicked')}
                    >
                      Từ chối
                    </button>
                  </div>
                ) : (
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center', fontStyle: 'italic' }}>
                    Chỉ Chủ quán và Quản lý 1 mới có quyền duyệt thành viên
                  </div>
                )}
              </div>
            ))}

            {pendingMembers.length === 0 && (
              <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 24px' }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--neutral)' }}>Không có yêu cầu chờ duyệt</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                  Khi nhân viên nhập mã <strong>{store?.code}</strong> trên ứng dụng điện thoại, yêu cầu tham gia sẽ xuất hiện tại đây.
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Salary & Info Modal */}
      {editingSalary && isOwner && (
        <div className="modal-overlay" onClick={() => setEditingSalary(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title">Cài Đặt Nhân Viên</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
                  {editingSalary.name}
                </div>
              </div>
              <button className="modal-close" onClick={() => setEditingSalary(null)}>
                ×
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label className="label">Mã nhân viên</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="VD: NV001"
                    value={employeeCode}
                    onChange={(e) => setEmployeeCode(e.target.value)}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="label">Ngày vào làm</label>
                  <input
                    type="date"
                    className="input"
                    value={joinedAt}
                    onChange={(e) => setJoinedAt(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="label">Bộ phận làm việc</label>
                <select className="select" value={department} onChange={(e) => setDepartment(e.target.value)}>
                  <option value="">-- Chưa phân bộ phận --</option>
                  {(store?.departments || []).map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name} {dept.shortName ? `(${dept.shortName})` : ''}
                    </option>
                  ))}
                </select>
                {(!store?.departments || store.departments.length === 0) && (
                  <div style={{ fontSize: 12, color: '#b45309', marginTop: 4 }}>
                    ⚠️ Cửa hàng chưa thiết lập danh mục bộ phận. Bạn có thể vào Cài đặt cửa hàng để thêm các bộ phận (Pha chế, Bếp, Thu ngân...).
                  </div>
                )}
              </div>

              <div>
                <label className="label">Loại hợp đồng</label>
                <div style={{ display: 'flex', gap: 8, background: 'var(--surface)', padding: 4, borderRadius: 10 }}>
                  <button
                    type="button"
                    onClick={() => setEmpType('fulltime')}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: 8,
                      border: 'none',
                      fontSize: 13,
                      fontWeight: empType === 'fulltime' ? 700 : 500,
                      background: empType === 'fulltime' ? 'white' : 'transparent',
                      color: empType === 'fulltime' ? '#143A2F' : 'var(--text-secondary)',
                      boxShadow: empType === 'fulltime' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Toàn thời gian (Lương tháng)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmpType('parttime')}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: 8,
                      border: 'none',
                      fontSize: 13,
                      fontWeight: empType === 'parttime' ? 700 : 500,
                      background: empType === 'parttime' ? 'white' : 'transparent',
                      color: empType === 'parttime' ? '#143A2F' : 'var(--text-secondary)',
                      boxShadow: empType === 'parttime' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Bán thời gian (Lương giờ)
                  </button>
                </div>
              </div>

              <div>
                <label className="label">
                  {empType === 'fulltime' ? 'Mức lương cơ bản (VNĐ / Tháng)' : 'Mức lương theo giờ (VNĐ / Giờ)'}
                </label>
                <input
                  type="number"
                  className="input"
                  value={salaryAmt}
                  onChange={(e) => setSalaryAmt(Number(e.target.value))}
                />
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0E382B', marginTop: 4 }}>
                  Hiển thị: {salaryAmt.toLocaleString('vi-VN')} VNĐ {empType === 'fulltime' ? '/ tháng' : '/ giờ'}
                </div>
              </div>

              {empType === 'fulltime' && (
                <div>
                  <label className="label">Số giờ công chuẩn / tháng</label>
                  <input
                    type="number"
                    className="input"
                    value={stdHours}
                    onChange={(e) => setStdHours(Number(e.target.value))}
                  />
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
                    Chuẩn F&B: 208 giờ (tương đương 26 ngày công × 8 tiếng/ngày)
                  </div>
                </div>
              )}

              {/* Hide schedule checkbox */}
              <div
                style={{
                  padding: '12px 16px',
                  background: '#F8F9FA',
                  borderRadius: 10,
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--neutral)' }}>
                    Ẩn lịch trên Lịch Cửa Hàng
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    Khi bật, các nhân viên khác sẽ không thấy lịch của nhân sự này (Chỉ Chủ quán thấy).
                  </div>
                </div>
                <input
                  type="checkbox"
                  style={{ width: 18, height: 18, cursor: 'pointer' }}
                  checked={hideSchedule}
                  onChange={(e) => setHideSchedule(e.target.checked)}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button className="btn btn-ghost" onClick={() => setEditingSalary(null)}>
                Hủy
              </button>
              <button className="btn btn-primary" onClick={saveSalary} disabled={saving}>
                {saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
