"use client";

import { PayrollEditor } from "@/components/hr/PayrollEditor";

export default function PayrollPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Payroll Management</h1>
      <div className="max-w-xl">
        <PayrollEditor employeeId="1" />
      </div>
    </div>
  );
}
