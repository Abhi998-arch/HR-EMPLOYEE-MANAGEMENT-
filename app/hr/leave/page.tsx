"use client";

import { PendingLeaveList } from "@/components/hr/PendingLeaveList";

export default function LeavePage() {
  const mockPendingLeaves = [
    {
      id: "1",
      employeeName: "John Doe",
      department: "Engineering",
      leaveType: "Sick Leave",
      startDate: "2023-11-01",
      endDate: "2023-11-02",
      reason: "Flu",
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Leave Management</h1>
      <PendingLeaveList requests={mockPendingLeaves} onReview={() => {}} />
    </div>
  );
}
