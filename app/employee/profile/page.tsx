"use client";

import { ProfileView } from "@/components/employee/ProfileView";

export default function ProfilePage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and contact details.</p>
      </div>

      <ProfileView />
    </div>
  );
}
