'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import type { LeaveBalance } from '@/types/leave.types';

interface LeaveBalanceCardProps {
  balances?: LeaveBalance[] | any[];
}

export function LeaveBalanceCard({ balances = [] }: LeaveBalanceCardProps) {
  const totalAvailable = Array.isArray(balances)
    ? balances.reduce((acc, b) => acc + (b.remaining_days || b.remainingDays || 0), 0)
    : 18;

  return (
    <Card className="border border-border/60 shadow-sm overflow-hidden flex flex-col justify-between">
      <div>
        <div className="px-5 py-3.5 border-b border-border/40 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>LEAVE BALANCE</span>
          </div>
          <Link href="/employee/leave">
            <Button variant="ghost" size="sm" className="text-xs h-7 text-primary hover:text-primary/80 px-2 -mr-2">
              View details <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>

        <CardContent className="p-5 space-y-4">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-3xl font-bold tracking-tight text-foreground">
                {totalAvailable}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Total days available for 2026</p>
            </div>
            <Link href="/employee/leave">
              <Button size="sm" className="bg-primary text-primary-foreground text-xs h-8">
                Apply Leave
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/40">
            {balances && balances.length > 0 ? (
              balances.map((b: any, idx: number) => (
                <div key={b.leave_type_id || b.id || idx} className="p-2.5 rounded-lg bg-muted/30 border border-border/20 text-center">
                  <p className="text-[11px] font-medium text-muted-foreground truncate">
                    {b.leave_type_name || b.name || 'Leave'}
                  </p>
                  <p className="text-base font-bold text-foreground mt-0.5">
                    {b.remaining_days ?? b.remainingDays ?? 0}{' '}
                    <span className="text-[10px] font-normal text-muted-foreground">
                      / {b.total_days ?? b.totalDays ?? 12}
                    </span>
                  </p>
                </div>
              ))
            ) : (
              <>
                <div className="p-2.5 rounded-lg bg-muted/30 border border-border/20 text-center">
                  <p className="text-[11px] font-medium text-muted-foreground">Paid Leave</p>
                  <p className="text-base font-bold text-foreground mt-0.5">18 <span className="text-[10px] font-normal text-muted-foreground">days</span></p>
                </div>
                <div className="p-2.5 rounded-lg bg-muted/30 border border-border/20 text-center">
                  <p className="text-[11px] font-medium text-muted-foreground">Sick Leave</p>
                  <p className="text-base font-bold text-foreground mt-0.5">12 <span className="text-[10px] font-normal text-muted-foreground">days</span></p>
                </div>
                <div className="p-2.5 rounded-lg bg-muted/30 border border-border/20 text-center">
                  <p className="text-[11px] font-medium text-muted-foreground">Unpaid Leave</p>
                  <p className="text-base font-bold text-foreground mt-0.5">10 <span className="text-[10px] font-normal text-muted-foreground">days</span></p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
