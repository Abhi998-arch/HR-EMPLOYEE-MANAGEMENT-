'use client';

import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, Check, CircleDot, Minus, Sun } from 'lucide-react';
import type { AttendanceRecord } from '@/types/attendance.types';
import { getWeekDates, isToday, isWeekend, formatDate } from '@/utils/date';

interface WeeklyAttendanceProps {
  records?: AttendanceRecord[] | any[];
}

export function WeeklyAttendance({ records = [] }: WeeklyAttendanceProps) {
  const weekDays = getWeekDates(new Date());

  const getDayStatus = (date: Date) => {
    const dateStr = formatDate(date, 'yyyy-MM-dd');
    const rec = (records || []).find(
      (r: any) => formatDate(new Date(r.date), 'yyyy-MM-dd') === dateStr
    );

    if (rec) {
      if (rec.status === 'present') return { type: 'present', label: 'Present' };
      if (rec.status === 'half_day') return { type: 'half_day', label: 'Half Day' };
      if (rec.status === 'leave') return { type: 'leave', label: 'On Leave' };
      if (rec.status === 'absent') return { type: 'absent', label: 'Absent' };
    }

    if (isWeekend(date)) return { type: 'weekend', label: 'Weekend' };
    if (date > new Date()) return { type: 'future', label: 'Upcoming' };
    return { type: 'unmarked', label: 'Not Marked' };
  };

  const presentCount = (records || []).filter((r: any) => r.status === 'present').length;
  const leaveCount = (records || []).filter((r: any) => r.status === 'leave').length;

  const dayLetters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <Card className="border border-border/60 shadow-sm flex flex-col justify-between">
      <div>
        <div className="px-5 py-3.5 border-b border-border/40 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span>WEEKLY ATTENDANCE</span>
          </div>
          <div className="text-xs text-muted-foreground font-medium">
            <span className="text-emerald-600 font-semibold">{presentCount}</span> Present •{' '}
            <span className="text-blue-600 font-semibold">{leaveCount}</span> Leave
          </div>
        </div>

        <CardContent className="p-5">
          <div className="grid grid-cols-7 gap-2 text-center">
            {weekDays.map((day, idx) => {
              const status = getDayStatus(day);
              const current = isToday(day);

              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center py-2.5 px-1 rounded-xl transition-all ${
                    current
                      ? 'bg-primary/10 border border-primary/30 ring-1 ring-primary/20'
                      : 'bg-muted/30 border border-border/30 hover:bg-muted/60'
                  }`}
                >
                  <span
                    className={`text-xs font-bold mb-1.5 ${
                      current ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {dayLetters[idx]}
                  </span>

                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold my-0.5">
                    {status.type === 'present' && (
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                    {status.type === 'half_day' && (
                      <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center">
                        <CircleDot className="w-3.5 h-3.5" />
                      </div>
                    )}
                    {status.type === 'leave' && (
                      <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">
                        L
                      </div>
                    )}
                    {status.type === 'absent' && (
                      <div className="w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center text-[10px]">
                        A
                      </div>
                    )}
                    {status.type === 'weekend' && (
                      <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground/60 flex items-center justify-center">
                        <Sun className="w-3.5 h-3.5" />
                      </div>
                    )}
                    {(status.type === 'future' || status.type === 'unmarked') && (
                      <div className="w-6 h-6 rounded-full bg-muted/80 text-muted-foreground/50 flex items-center justify-center">
                        <Minus className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-muted-foreground mt-1 font-mono">
                    {formatDate(day, 'd')}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
