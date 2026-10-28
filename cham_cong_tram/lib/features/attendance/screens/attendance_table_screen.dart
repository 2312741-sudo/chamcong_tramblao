import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../app/router.dart';
import '../../../core/constants/app_colors.dart';
import '../../../core/widgets/avatar_widget.dart';
import '../../../core/utils/excel_export_service.dart';
import '../../../core/widgets/export_modal.dart';
import '../../../core/auth/app_permissions.dart';
import '../../../models/member_model.dart';
import '../../auth/providers/auth_provider.dart';
import '../../store/providers/store_provider.dart';
import '../repositories/attendance_repository.dart';

final selectedDateProvider = StateProvider<DateTime>((ref) => DateTime.now());

final dailyAttendancesProvider =
    StreamProvider.family<List<dynamic>, DateTime>((ref, date) {
  final storeId = ref.watch(currentStoreIdProvider);
  if (storeId == null || storeId.isEmpty) return Stream.value([]);
  final repo = ref.watch(attendanceRepositoryProvider);
  final dateString =
      '${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}';
  return repo.watchAllAttendances(storeId, dateString);
});

class AttendanceTableScreen extends ConsumerWidget {
  const AttendanceTableScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final storeId = ref.watch(currentStoreIdProvider);
    final membersAsync = ref.watch(storeMembersProvider);
    final store = ref.watch(currentStoreProvider).valueOrNull;
    final currentMember = ref.watch(currentMemberProvider);
    final currentUid = ref.watch(currentUserIdProvider);

    // 1. Khi đang khởi tạo hoặc store chưa tải xong, hiển thị trạng thái đang tải
    if (storeId == null || store == null) {
      return Scaffold(
        backgroundColor: AppColors.surface,
        appBar: AppBar(
          title: const Text('Bảng công',
              style: TextStyle(
                  fontFamily: 'BeVietnamPro',
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF143A2F))),
          backgroundColor: AppColors.primary,
          foregroundColor: const Color(0xFF143A2F),
          elevation: 0,
        ),
        body: const Center(
          child: CircularProgressIndicator(color: AppColors.primary),
        ),
      );
    }

    // 2. Chủ cửa hàng luôn có toàn quyền xem bảng công.
    // Nếu không phải là chủ cửa hàng, kiểm tra phân quyền từ member role.
    final isStoreOwner = store.isOwnerUid(currentUid);
    final canView = isStoreOwner || AppPermissions.canViewAllAttendance(currentMember?.role);

    // 3. Nếu chưa xác định được quyền và dữ liệu thành viên đang tải, tiếp tục hiển thị loading (tránh flash lỗi không có quyền)
    if (!canView && currentMember == null) {
      return Scaffold(
        backgroundColor: AppColors.surface,
        appBar: AppBar(
          title: const Text('Bảng công',
              style: TextStyle(
                  fontFamily: 'BeVietnamPro',
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF143A2F))),
          backgroundColor: AppColors.primary,
          foregroundColor: const Color(0xFF143A2F),
          elevation: 0,
        ),
        body: const Center(
          child: CircularProgressIndicator(color: AppColors.primary),
        ),
      );
    }

    // 4. Nếu chắc chắn không có quyền (ví dụ: Nhân viên hoặc Quản lý 2)
    if (!canView) {
      return Scaffold(
        backgroundColor: AppColors.surface,
        appBar: AppBar(
          title: const Text('Bảng công',
              style: TextStyle(
                  fontFamily: 'BeVietnamPro',
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF143A2F))),
          backgroundColor: AppColors.primary,
          foregroundColor: const Color(0xFF143A2F),
        ),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(32),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    color: AppColors.primary.withValues(alpha: 0.1),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.lock_rounded, size: 40, color: AppColors.primary),
                ),
                const SizedBox(height: 20),
                const Text(
                  'Không có quyền truy cập',
                  style: TextStyle(
                    fontFamily: 'BeVietnamPro',
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: AppColors.neutral,
                  ),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Bạn không có quyền xem bảng chấm công của nhân viên khác.',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontFamily: 'BeVietnamPro',
                    fontSize: 13,
                    color: AppColors.textSecondary,
                  ),
                ),
                const SizedBox(height: 24),
                ElevatedButton(
                  onPressed: () {
                    if (Navigator.of(context).canPop()) {
                      Navigator.of(context).pop();
                    } else {
                      context.go(AppRoutes.splash);
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    foregroundColor: const Color(0xFF143A2F),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: const Text('Quay lại', style: TextStyle(fontFamily: 'BeVietnamPro', fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          ),
        ),
      );
    }

    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(
        title: const Text('Bảng công',
            style: TextStyle(
                fontFamily: 'BeVietnamPro',
                fontWeight: FontWeight.bold,
                color: Color(0xFF143A2F))),
        backgroundColor: AppColors.primary,
        foregroundColor: const Color(0xFF143A2F),
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.download_rounded),
            tooltip: 'Xuất Excel Tháng',
            onPressed: () {
              final membersData = membersAsync.valueOrNull;
              if (storeId.isNotEmpty && membersData != null) {
                final activeMembers = membersData
                    .where((m) => m.status == MemberStatus.active)
                    .toList();
                if (store.memberOrder.isNotEmpty) {
                  activeMembers.sort((a, b) {
                    final idxA = store.memberOrder.indexOf(a.userId);
                    final idxB = store.memberOrder.indexOf(b.userId);
                    if (idxA != -1 && idxB != -1) return idxA.compareTo(idxB);
                    if (idxA != -1) return -1;
                    if (idxB != -1) return 1;
                    return a.name.compareTo(b.name);
                  });
                }
                showModalBottomSheet(
                  context: context,
                  isScrollControlled: true,
                  backgroundColor: Colors.transparent,
                  builder: (_) => ExportModal(
                    title: 'Xuất Bảng Công',
                    members: activeMembers,
                    onExport: ({memberId, required isMonth, monthDate, startDate, endDate}) async {
                      try {
                        final repo = ref.read(attendanceRepositoryProvider);
                        List<dynamic> attendances = [];
                        
                        if (isMonth && monthDate != null) {
                          final monthStr = '${monthDate.year}-${monthDate.month.toString().padLeft(2, '0')}';
                          attendances = await repo.getMonthAttendances(storeId, monthStr);
                        } else if (!isMonth && startDate != null && endDate != null) {
                          final startStr = '${startDate.year}-${startDate.month.toString().padLeft(2, '0')}-${startDate.day.toString().padLeft(2, '0')}';
                          final endStr = '${endDate.year}-${endDate.month.toString().padLeft(2, '0')}-${endDate.day.toString().padLeft(2, '0')}';
                          attendances = await repo.getAttendancesInRange(storeId, startStr, endStr);
                        }
                        
                        final filteredMembers = memberId != null 
                            ? activeMembers.where((m) => m.userId == memberId).toList()
                            : activeMembers;
                            
                        await ExcelExportService.exportMonthlyAttendance(
                          members: filteredMembers,
                          attendances: attendances.cast(),
                          month: isMonth ? '${monthDate!.year}-${monthDate.month.toString().padLeft(2, '0')}' : '',
                          store: store,
                          startDate: !isMonth ? startDate : null,
                          endDate: !isMonth ? endDate : null,
                          memberName: memberId != null ? filteredMembers.first.name : null,
                          context: context,
                        );
                      } catch (e) {
                        if (context.mounted) {
                          ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                              content: Text('Lỗi xuất file: $e'),
                              backgroundColor: AppColors.primary));
                        }
                      }
                    },
                  ),
                );
              }
            },
          ),
          TextButton(
            onPressed: () => context.push(AppRoutes.salaryOverview),
            child: const Text('Lương',
                style: TextStyle(
                    color: Colors.white,
                    fontFamily: 'BeVietnamPro',
                    fontWeight: FontWeight.bold)),
          ),
        ],
      ),
      body: membersAsync.when(
        loading: () => const Center(
            child: CircularProgressIndicator(color: AppColors.primary)),
        error: (e, _) => Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.info_outline_rounded,
                    size: 48, color: AppColors.textSecondary),
                const SizedBox(height: 12),
                const Text(
                  'Chưa thể tải danh sách nhân viên',
                  style: TextStyle(
                    fontFamily: 'BeVietnamPro',
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: AppColors.neutral,
                  ),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Vui lòng bấm Thử lại để tải lại dữ liệu.',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontFamily: 'BeVietnamPro',
                    fontSize: 13,
                    color: AppColors.textSecondary,
                  ),
                ),
                const SizedBox(height: 16),
                ElevatedButton.icon(
                  onPressed: () => ref.invalidate(storeMembersProvider),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    foregroundColor: const Color(0xFF143A2F),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12)),
                  ),
                  icon: const Icon(Icons.refresh_rounded, size: 18),
                  label: const Text('Thử lại',
                      style: TextStyle(
                          fontFamily: 'BeVietnamPro',
                          fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          ),
        ),
        data: (allMembers) {
          final members =
              allMembers.where((m) => m.status == MemberStatus.active).toList();
          if (store.memberOrder.isNotEmpty) {
            members.sort((a, b) {
              final idxA = store.memberOrder.indexOf(a.userId);
              final idxB = store.memberOrder.indexOf(b.userId);
              if (idxA != -1 && idxB != -1) return idxA.compareTo(idxB);
              if (idxA != -1) return -1;
              if (idxB != -1) return 1;
              return a.name.compareTo(b.name);
            });
          }

          if (members.isEmpty) {
            return RefreshIndicator(
              onRefresh: () async => ref.invalidate(storeMembersProvider),
              child: ListView(
                physics: const AlwaysScrollableScrollPhysics(),
                children: [
                  SizedBox(
                    height: MediaQuery.of(context).size.height * 0.6,
                    child: Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.group_off_rounded,
                              size: 64, color: AppColors.textSecondary.withValues(alpha: 0.6)),
                          const SizedBox(height: 16),
                          const Text(
                            'Cửa hàng chưa có nhân viên nào',
                            style: TextStyle(
                                fontFamily: 'BeVietnamPro',
                                color: AppColors.textSecondary,
                                fontSize: 15,
                                fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: 8),
                          const Text(
                            'Thêm nhân viên mới tại tab Nhân viên để theo dõi bảng công',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                                fontFamily: 'BeVietnamPro',
                                color: AppColors.textSecondary,
                                fontSize: 13),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            );
          }

          return RefreshIndicator(
            onRefresh: () async => ref.invalidate(storeMembersProvider),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Header hint
                Container(
                  width: double.infinity,
                  color: Colors.white,
                  padding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  child: Row(
                    children: [
                      const Icon(Icons.touch_app_rounded,
                          size: 16, color: AppColors.textSecondary),
                      const SizedBox(width: 6),
                      const Text(
                        'Chọn nhân viên để xem bảng công tháng',
                        style: TextStyle(
                            fontFamily: 'BeVietnamPro',
                            fontSize: 13,
                            color: AppColors.textSecondary),
                      ),
                      const Spacer(),
                      Text('${members.length} NV',
                          style: const TextStyle(
                              fontFamily: 'BeVietnamPro',
                              fontSize: 13,
                              fontWeight: FontWeight.bold,
                              color: AppColors.primaryDark)),
                    ],
                  ),
                ),
                const Divider(height: 1, color: AppColors.divider),

                // Member list
                Expanded(
                  child: ListView.separated(
                    padding: const EdgeInsets.all(16),
                    itemCount: members.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 10),
                    itemBuilder: (context, index) {
                      final member = members[index];
                      return _MemberCard(member: member);
                    },
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

class _MemberCard extends StatelessWidget {
  final MemberModel member;

  const _MemberCard({required this.member});

  @override
  Widget build(BuildContext context) {
    final roleColors = {
      UserRole.owner: AppColors.ownerBadge,
      UserRole.manager1: AppColors.managerBadge,
      UserRole.manager2: AppColors.managerBadge,
      UserRole.legacyManager: const Color(0xFFE65100),
      UserRole.employee: AppColors.textSecondary,
    };
    final roleColor = roleColors[member.role] ?? AppColors.textSecondary;

    return GestureDetector(
      onTap: () {
        context.push(AppRoutes.monthlyAttendance, extra: {
          'memberId': member.userId,
          'memberName': member.name,
        });
      },
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(14),
          boxShadow: [
            BoxShadow(
                color: Colors.black.withOpacity(0.04),
                blurRadius: 10,
                offset: const Offset(0, 3))
          ],
        ),
        child: Row(
          children: [
            // Avatar
            CircleAvatar(
              radius: 24,
              backgroundColor: AppColors.primary.withOpacity(0.12),
              backgroundImage: getAvatarImageProvider(member.avatarUrl),
              child: getAvatarImageProvider(member.avatarUrl) == null
                  ? Text(member.initials,
                      style: const TextStyle(
                          fontFamily: 'BeVietnamPro',
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF143A2F),
                          fontSize: 16))
                  : null,
            ),
            const SizedBox(width: 14),

            // Info
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(member.name,
                      style: const TextStyle(
                          fontFamily: 'BeVietnamPro',
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: AppColors.neutral)),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: roleColor.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(member.role.label,
                            style: TextStyle(
                                fontFamily: 'BeVietnamPro',
                                fontSize: 11,
                                fontWeight: FontWeight.w600,
                                color: roleColor)),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            // Chevron
            const Icon(Icons.calendar_month_rounded,
                color: AppColors.primary, size: 22),
            const SizedBox(width: 4),
            const Icon(Icons.chevron_right_rounded,
                color: AppColors.textSecondary),
          ],
        ),
      ),
    );
  }
}
