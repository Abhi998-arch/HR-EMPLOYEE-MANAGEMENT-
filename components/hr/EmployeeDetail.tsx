"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  jobTitle: string;
  status: string;
  joinDate: string;
  phone: string;
  location: string;
  manager: string;
}

export function EmployeeDetail({ employee }: { employee: Employee }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl">{employee.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{employee.name}</h1>
                  <p className="text-muted-foreground">{employee.jobTitle} • {employee.department}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              <div className="flex gap-2 mt-2">
                <Badge>{employee.status}</Badge>
                <Badge variant="outline">ID: {employee.id}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="job">Job</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leave">Leave</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="docs">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{employee.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{employee.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{employee.location}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="job" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Join Date</p>
                <p className="font-medium">{employee.joinDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Manager</p>
                <p className="font-medium">{employee.manager}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Placeholder for other tabs */}
        <TabsContent value="attendance" className="mt-6">
           <Card><CardContent className="p-6 text-muted-foreground">Attendance history will be displayed here.</CardContent></Card>
        </TabsContent>
        <TabsContent value="leave" className="mt-6">
           <Card><CardContent className="p-6 text-muted-foreground">Leave history will be displayed here.</CardContent></Card>
        </TabsContent>
        <TabsContent value="payroll" className="mt-6">
           <Card><CardContent className="p-6 text-muted-foreground">Payroll structure will be displayed here.</CardContent></Card>
        </TabsContent>
        <TabsContent value="docs" className="mt-6">
           <Card><CardContent className="p-6 text-muted-foreground">Employee documents will be displayed here.</CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
