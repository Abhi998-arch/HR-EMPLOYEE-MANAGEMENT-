"use client";

import { OrgOverview } from "@/components/hr/OrgOverview";
import { TodayAttendanceCard } from "@/components/hr/TodayAttendanceCard";
import { PendingLeaveList } from "@/components/hr/PendingLeaveList";
import { LeaveReviewDialog } from "@/components/hr/LeaveReviewDialog";
import { useState } from "react";

export default function HRDashboard() {
  const [reviewDialog, setReviewDialog] = useState<{ open: boolean; request: any; action: 'approve' | 'reject' | null }>({
    open: false,
    request: null,
    action: null,
  });

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

  const handleReview = (request: any, action: 'approve' | 'reject') => {
    setReviewDialog({ open: true, request, action });
  };

  const handleConfirmReview = async (id: string, action: 'approve' | 'reject', comment: string) => {
    console.log("Reviewed:", { id, action, comment });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">HR Dashboard</h1>
      
      <OrgOverview 
        totalEmployees={150} 
        presentToday={142} 
        onLeaveToday={5} 
        pendingRequests={12} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PendingLeaveList requests={mockPendingLeaves} onReview={handleReview} />
        </div>
        <div>
          <TodayAttendanceCard present={142} absent={3} onLeave={5} total={150} />
        </div>
      </div>

      <LeaveReviewDialog
        open={reviewDialog.open}
        request={reviewDialog.request}
        action={reviewDialog.action}
        onOpenChange={(open) => setReviewDialog(prev => ({ ...prev, open }))}
        onConfirm={handleConfirmReview}
      />
    </div>
  );
}
