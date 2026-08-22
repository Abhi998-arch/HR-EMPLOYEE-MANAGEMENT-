'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CheckCircle2, Clock, CalendarCheck, Ban, FileText } from 'lucide-react';
import { formatRelativeDate } from '@/utils/date';
import type { AttendanceRecord } from '@/types/attendance.types';
import type { LeaveRequest } from '@/types/leave.types';

interface RecentActivityProps {
  todayAttendance?: AttendanceRecord | any | null;
  recentLeaves?: LeaveRequest[] | any[];
}

export function RecentActivity({
  todayAttendance = null,
  recentLeaves = [],
}: RecentActivityProps) {
  const activities: Array<{
    id: string | number;
    title: string;
    desc: string;
    time: string | Date;
    icon: any;
    color: string;
  }> = [];

  if (todayAttendance?.check_in || todayAttendance?.checkIn) {
    activities.push({
      id: 'att-in',
      title: 'Checked in today',
      desc: todayAttendance?.check_out || todayAttendance?.checkOut
        ? 'Shift completed successfully'
        : 'Actively working today',
      time: todayAttendance?.check_in || todayAttendance?.checkIn || new Date(),
      icon: Clock,
      color: 'text-emerald-600 bg-emerald-500/10',
    });
  }

  (recentLeaves || []).slice(0, 4).forEach((req: any) => {
    if (req.status === 'approved') {
      activities.push({
        id: `leave-${req.id}`,
        title: 'Leave request approved',
        desc: `${req.total_days} day(s) • ${req.leave_types?.name || req.leave_type?.name || 'Leave'}`,
        time: req.updated_at || req.created_at || new Date(),
        icon: CheckCircle2,
        color: 'text-emerald-600 bg-emerald-500/10',
      });
    } else if (req.status === 'pending') {
      activities.push({
        id: `leave-${req.id}`,
        title: 'Leave request submitted',
        desc: `${req.total_days} day(s) awaiting HR review`,
        time: req.created_at || new Date(),
        icon: CalendarCheck,
        color: 'text-amber-600 bg-amber-500/10',
      });
    } else if (req.status === 'rejected') {
      activities.push({
        id: `leave-${req.id}`,
        title: 'Leave request rejected',
        desc: req.reviewer_comment || 'Reviewed by HR',
        time: req.updated_at || req.created_at || new Date(),
        icon: Ban,
        color: 'text-destructive bg-destructive/10',
      });
    }
  });

  return (
    <Card className="border border-border/60 shadow-sm flex flex-col justify-between">
      <div>
        <CardHeader className="px-5 py-3.5 border-b border-border/40 pb-3.5">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            RECENT ACTIVITY
          </CardTitle>
        </CardHeader>

        <CardContent className="p-5">
          {activities.length > 0 ? (
            <div className="space-y-4">
              {activities.map((act) => {
                const Icon = act.icon;
                return (
                  <div key={act.id} className="flex items-start gap-3 text-sm">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${act.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-xs leading-none">{act.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{act.desc}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0 font-mono">
                      {formatRelativeDate(act.time)}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-muted-foreground">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-muted-foreground/40" />
              <p className="font-medium">No recent activity</p>
              <p className="mt-0.5">Your work activities and leave updates will show here.</p>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
