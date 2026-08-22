"use client";

import { EmployeeDetail } from "@/components/hr/EmployeeDetail";
import { useParams } from "next/navigation";

export default function EmployeeDetailPage() {
  const params = useParams();
  
  const mockEmployee = {
    id: params.id as string,
    name: "Alice Smith",
    email: "alice@dayflow.com",
    department: "Engineering",
    jobTitle: "Frontend Developer",
    status: "Active",
    joinDate: "2022-01-15",
    phone: "+1 234 567 890",
    location: "New York, USA",
    manager: "John TechLead",
  };

  return (
    <div className="space-y-6">
      <EmployeeDetail employee={mockEmployee} />
    </div>
  );
}
