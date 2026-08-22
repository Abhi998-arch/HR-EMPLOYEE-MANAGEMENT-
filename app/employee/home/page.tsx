'use client';

import { useEmployee } from '@/hooks/useEmployee';
import { useAttendance } from '@/hooks/useAttendance';
import { useLeave } from '@/hooks/useLeave';
import { useRealtimeLeave } from '@/hooks/useRealtimeLeave';
import { GreetingHeader } from '@/components/employee/GreetingHeader';
import { TodayAttendance } from '@/components/employee/TodayAttendance';
import { WeeklyAttendance } from '@/components/employee/WeeklyAttendance';
import { LeaveBalanceCard } from '@/components/employee/LeaveBalanceCard';
import { RecentActivity } from '@/components/employee/RecentActivity';
import { Skeleton } from '@/components/ui/skeleton';

export default function EmployeeHomePage() {
  const { employee, isLoading: isEmpLoading } = useEmployee();
  const {
    todayAttendance,
    weeklyAttendance,
    isLoading: isAttLoading,
    checkIn,
    checkOut,
  } = useAttendance(employee?.id);

  const {
    leaveRequests,
    leaveBalance,
    isLoading: isLeaveLoading,
    refreshLeave,
  } = useLeave(employee?.id);

  // Subscribe to live leave approvals / status changes from HR
  useRealtimeLeave(() => {
    refreshLeave();
  });

  const isLoading = isEmpLoading || isAttLoading;

  if (isLoading && !employee) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
        <Skeleton className="h-40 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* 1. Top Greeting Header */}
      <GreetingHeader employee={employee} />

      {/* 2. Today's Workday & Weekly Attendance Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodayAttendance
          todayRecord={todayAttendance}
          isLoading={isAttLoading}
          onCheckIn={checkIn}
          onCheckOut={checkOut}
        />
        <WeeklyAttendance records={weeklyAttendance} />
      </div>

      {/* 3. Leave Balances & Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeaveBalanceCard balances={leaveBalance} />
        <RecentActivity
          todayAttendance={todayAttendance}
          recentLeaves={leaveRequests}
        />
      </div>
    </div>
  );
}
