"use client";

import { PayrollBreakdown } from "@/components/employee/PayrollBreakdown";

export default function PayrollPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Payroll & Salary</h1>
        <p className="text-muted-foreground">View your salary breakdown and download payslips.</p>
      </div>

      <PayrollBreakdown />
    </div>
  );
}
