"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { formatDate } from "@/utils/formatters";

interface LeaveRequest {
  id: string;
  employeeName: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}

interface LeaveReviewDialogProps {
  request: LeaveRequest | null;
  action: 'approve' | 'reject' | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (id: string, action: 'approve' | 'reject', comment: string) => Promise<void>;
}

export function LeaveReviewDialog({ request, action, open, onOpenChange, onConfirm }: LeaveReviewDialogProps) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!request || !action) return null;

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm(request.id, action, comment);
    setLoading(false);
    onOpenChange(false);
    setComment("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{action === 'approve' ? 'Approve' : 'Reject'} Leave Request</DialogTitle>
          <DialogDescription>
            Reviewing request for {request.employeeName}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Type</p>
              <p className="font-medium">{request.leaveType}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Dates</p>
              <p className="font-medium">{formatDate(request.startDate)} - {formatDate(request.endDate)}</p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground">Reason</p>
              <p className="font-medium">{request.reason}</p>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">HR Comment (Optional)</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button 
            variant={action === 'approve' ? 'default' : 'destructive'} 
            onClick={handleConfirm} 
            disabled={loading}
          >
            {loading ? 'Confirming...' : 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
