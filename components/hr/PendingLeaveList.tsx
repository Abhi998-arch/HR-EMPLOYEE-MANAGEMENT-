"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { formatDate } from "@/utils/formatters";

interface LeaveRequest {
  id: string;
  employeeName: string;
  avatarUrl?: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}

interface PendingLeaveListProps {
  requests: LeaveRequest[];
  onReview: (request: LeaveRequest, action: 'approve' | 'reject') => void;
}

export function PendingLeaveList({ requests, onReview }: PendingLeaveListProps) {
  if (requests.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pending Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No pending leave requests.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Leave Requests</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={request.avatarUrl} />
                <AvatarFallback>{request.employeeName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-sm">{request.employeeName}</h4>
                <p className="text-xs text-muted-foreground">{request.department}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px]">{request.leaveType}</Badge>
                  <span className="text-xs font-medium">
                    {formatDate(request.startDate)} - {formatDate(request.endDate)}
                  </span>
                </div>
                <p className="text-xs mt-2 text-muted-foreground line-clamp-1">{request.reason}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="h-8 w-8 text-green-600 hover:text-green-700" onClick={() => onReview(request, 'approve')}>
                <Check className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="h-8 w-8 text-red-600 hover:text-red-700" onClick={() => onReview(request, 'reject')}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
