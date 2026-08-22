"use client";

import { TodayAttendance } from "@/components/employee/TodayAttendance";
import { AttendanceTimeline } from "@/components/employee/AttendanceTimeline";

export default function AttendancePage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Attendance</h1>
        <p className="text-muted-foreground">Manage your daily check-ins and view your attendance history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <TodayAttendance />
        </div>
        <div className="md:col-span-2">
          <AttendanceTimeline />
        </div>
      </div>
    </div>
  );
}
