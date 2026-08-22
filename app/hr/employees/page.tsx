"use client";

import { EmployeeList } from "@/components/hr/EmployeeList";

export default function EmployeesPage() {
  const mockEmployees = [
    {
      id: "1",
      name: "Alice Smith",
      email: "alice@dayflow.com",
      department: "Engineering",
      jobTitle: "Frontend Developer",
      status: "Active" as const,
    },
    {
      id: "2",
      name: "Bob Jones",
      email: "bob@dayflow.com",
      department: "Design",
      jobTitle: "UI/UX Designer",
      status: "On Leave" as const,
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Employees</h1>
      </div>
      <EmployeeList employees={mockEmployees} />
    </div>
  );
}
