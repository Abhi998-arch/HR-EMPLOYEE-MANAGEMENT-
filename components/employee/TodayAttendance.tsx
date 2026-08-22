'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatTime } from '@/utils/date';
import { Clock, LogIn, LogOut, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import type { AttendanceRecord } from '@/types/attendance.types';

interface TodayAttendanceProps {
  todayRecord?: AttendanceRecord | null;
  isLoading?: boolean;
  onCheckIn?: () => Promise<void>;
  onCheckOut?: () => Promise<void>;
}

export function TodayAttendance({
  todayRecord = null,
  isLoading = false,
  onCheckIn,
  onCheckOut,
}: TodayAttendanceProps) {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setCurrentTime(formatTime(new Date()));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const isCheckedIn = !!todayRecord?.check_in;
  const isCheckedOut = !!todayRecord?.check_out;

  const handleAction = async (action: 'in' | 'out') => {
    setActionLoading(true);
    setErrorMessage(null);
    try {
      if (action === 'in' && onCheckIn) {
        await onCheckIn();
      } else if (action === 'out' && onCheckOut) {
        await onCheckOut();
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Action failed. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden border border-border/60 shadow-sm hover:shadow transition-shadow flex flex-col justify-between">
      <div>
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-5 py-3.5 border-b border-border/40 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Clock className="w-4 h-4" />
            <span>TODAY'S ATTENDANCE</span>
          </div>
          <span className="text-xs font-mono font-medium text-muted-foreground bg-background/80 px-2.5 py-1 rounded-full border border-border/50">
            {currentTime || '--:--'}
          </span>
        </div>

        <CardContent className="p-5 space-y-4">
          {errorMessage && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-destructive/10 text-destructive text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block w-2.5 h-2.5 rounded-full ${
                    isCheckedOut
                      ? 'bg-muted-foreground'
                      : isCheckedIn
                      ? 'bg-emerald-500 animate-pulse'
                      : 'bg-amber-500'
                  }`}
                />
                <span className="text-base font-semibold text-foreground">
                  {isCheckedOut
                    ? 'Shift Completed'
                    : isCheckedIn
                    ? 'Currently Working'
                    : 'Not Checked In Yet'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {isCheckedIn && todayRecord?.check_in
                  ? `Checked in at ${formatTime(todayRecord.check_in)}`
                  : 'Mark your arrival for today'}
                {isCheckedOut && todayRecord?.check_out
                  ? ` • Left at ${formatTime(todayRecord.check_out)}`
                  : ''}
              </p>
            </div>

            <Badge
              variant="outline"
              className={`capitalize font-medium text-xs px-2.5 py-1 ${
                isCheckedOut
                  ? 'bg-slate-100 text-slate-700 border-slate-200'
                  : isCheckedIn
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              {isCheckedOut ? 'Checked Out' : isCheckedIn ? 'Checked In' : 'Pending'}
            </Badge>
          </div>

          <div className="pt-2">
            {!isCheckedIn ? (
              <Button
                onClick={() => handleAction('in')}
                disabled={isLoading || actionLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm transition-all h-11"
              >
                {actionLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <LogIn className="w-4 h-4 mr-2" />
                )}
                Check In Now
              </Button>
            ) : !isCheckedOut ? (
              <Button
                onClick={() => handleAction('out')}
                disabled={isLoading || actionLoading}
                variant="outline"
                className="w-full border-primary/30 hover:bg-primary/5 text-primary font-medium h-11 transition-all"
              >
                {actionLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4 mr-2" />
                )}
                Check Out
              </Button>
            ) : (
              <div className="flex items-center justify-center gap-2 py-2 text-xs font-medium text-emerald-600 bg-emerald-50/50 rounded-lg border border-emerald-100">
                <CheckCircle2 className="w-4 h-4" />
                <span>Great job! Today's workday is recorded.</span>
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
