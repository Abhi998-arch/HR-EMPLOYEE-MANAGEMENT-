'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatAnnualCTC } from '@/utils/currency';
import { Wallet, ShieldCheck, Lock, TrendingUp } from 'lucide-react';
import type { PayrollRecord } from '@/types/payroll.types';

interface PayrollBreakdownProps {
  payroll?: PayrollRecord | any;
  isLoading?: boolean;
}

export function PayrollBreakdown({ payroll = null, isLoading = false }: PayrollBreakdownProps) {
  const base = payroll?.base_salary || 35000;
  const allowances = payroll?.allowances || 7000;
  const benefits = payroll?.benefits || 3000;
  const deductions = payroll?.deductions || 0;

  const monthlyNet = base + allowances + benefits - deductions;
  const annualCTC = monthlyNet * 12;

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <Card className="border-0 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white shadow-lg overflow-hidden relative">
        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <CardContent className="p-6 md:p-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs px-2.5 py-1 backdrop-blur-xs">
                  <Lock className="w-3 h-3 mr-1 text-emerald-400" />
                  Read-Only • Confidential
                </Badge>
              </div>
              <p className="text-sm font-medium text-indigo-200">Monthly Net Salary</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-1">
                {formatCurrency(monthlyNet)}
              </h2>
              <p className="text-xs text-indigo-300/80 mt-1">
                Credited on the last working day of every calendar month
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md self-start md:self-auto min-w-[200px]">
              <p className="text-xs text-indigo-200 font-medium">Estimated Annual CTC</p>
              <p className="text-2xl font-bold text-white mt-0.5">
                {formatAnnualCTC(monthlyNet)}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-300 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>Standard full-time contract</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Breakdown Breakdown Grid */}
      <Card className="border border-border/60 shadow-sm">
        <div className="px-5 py-4 border-b border-border/40 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Wallet className="w-4 h-4 text-primary" />
            <span>Salary Structure & Components</span>
          </div>
          <span className="text-xs text-muted-foreground">Currency: INR (₹)</span>
        </div>

        <CardContent className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-muted/30 border border-border/30 space-y-1">
              <span className="text-xs font-medium text-muted-foreground">Base Salary</span>
              <p className="text-xl font-bold text-foreground">{formatCurrency(base)}</p>
              <p className="text-[11px] text-muted-foreground">Core guaranteed monthly compensation</p>
            </div>

            <div className="p-4 rounded-xl bg-muted/30 border border-border/30 space-y-1">
              <span className="text-xs font-medium text-muted-foreground">Allowances (HRA & Special)</span>
              <p className="text-xl font-bold text-emerald-600">{formatCurrency(allowances)}</p>
              <p className="text-[11px] text-muted-foreground">Housing, conveyance & flex allowances</p>
            </div>

            <div className="p-4 rounded-xl bg-muted/30 border border-border/30 space-y-1">
              <span className="text-xs font-medium text-muted-foreground">Company Benefits</span>
              <p className="text-xl font-bold text-blue-600">{formatCurrency(benefits)}</p>
              <p className="text-[11px] text-muted-foreground">Medical insurance & wellness stipends</p>
            </div>

            <div className="p-4 rounded-xl bg-muted/30 border border-border/30 space-y-1">
              <span className="text-xs font-medium text-muted-foreground">Deductions (TDS / PF)</span>
              <p className="text-xl font-bold text-amber-600">{formatCurrency(deductions)}</p>
              <p className="text-[11px] text-muted-foreground">Statutory contributions & deductions</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/40 border border-border/40 text-xs text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
            <span>
              Payroll components are securely configured by the HR department. Contact your HR representative for tax exemption declarations or structure queries.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
