'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Loader2, Calendar } from 'lucide-react';
import type { LeaveType } from '@/types/leave.types';
import { calculateDaysBetween } from '@/utils/date';

const leaveSchema = z.object({
  leaveTypeId: z.string().min(1, 'Please select a leave type.'),
  startDate: z.string().min(1, 'Please choose a start date.'),
  endDate: z.string().min(1, 'Please choose an end date.'),
  reason: z.string().min(3, 'Please provide a reason (at least 3 characters).'),
});

type LeaveFormData = z.infer<typeof leaveSchema>;

interface LeaveApplicationFormProps {
  leaveTypes?: LeaveType[] | any[];
  onSubmitLeave?: (data: {
    leaveTypeId: string;
    startDate: string;
    endDate: string;
    totalDays: number;
    reason: string;
  }) => Promise<void>;
  onSuccess?: () => void;
}

export function LeaveApplicationForm({
  leaveTypes = [],
  onSubmitLeave,
  onSuccess,
}: LeaveApplicationFormProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<LeaveFormData>({
    resolver: zodResolver(leaveSchema),
  });

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  let calculatedDays = 0;
  if (startDate && endDate) {
    calculatedDays = calculateDaysBetween(new Date(startDate), new Date(endDate));
  }

  const defaultTypes = [
    { id: '11111111-1111-1111-1111-111111111111', name: 'Paid Leave', default_days: 18 },
    { id: '22222222-2222-2222-2222-222222222222', name: 'Sick Leave', default_days: 12 },
    { id: '33333333-3333-3333-3333-333333333333', name: 'Unpaid Leave', default_days: 10 },
  ];

  const typesList = leaveTypes && leaveTypes.length > 0 ? leaveTypes : defaultTypes;

  const onSubmit = async (values: LeaveFormData) => {
    if (calculatedDays <= 0) {
      setErrorMsg('End date must be on or after start date.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      if (onSubmitLeave) {
        await onSubmitLeave({
          leaveTypeId: values.leaveTypeId,
          startDate: values.startDate,
          endDate: values.endDate,
          totalDays: calculatedDays,
          reason: values.reason,
        });
      }
      reset();
      setOpen(false);
      onSuccess?.();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to submit leave request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm">
          <Plus className="w-4 h-4 mr-1.5" />
          Apply for Leave
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Apply for Leave</DialogTitle>
          <DialogDescription>
            Submit your time off request for HR review.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-xs font-medium">
              {errorMsg}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="leaveTypeId">Leave Type</Label>
            <Select onValueChange={(val) => setValue('leaveTypeId', val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type of leave" />
              </SelectTrigger>
              <SelectContent>
                {typesList.map((type: any) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name} ({type.default_days ?? type.days_per_year ?? 12} days/yr)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.leaveTypeId && (
              <p className="text-xs text-destructive">{errors.leaveTypeId.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="startDate">From Date</Label>
              <Input
                id="startDate"
                type="date"
                {...register('startDate')}
              />
              {errors.startDate && (
                <p className="text-xs text-destructive">{errors.startDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">To Date</Label>
              <Input
                id="endDate"
                type="date"
                {...register('endDate')}
              />
              {errors.endDate && (
                <p className="text-xs text-destructive">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          {calculatedDays > 0 && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-primary/5 border border-primary/20 text-primary text-xs font-semibold">
              <Calendar className="w-4 h-4" />
              <span>Total Duration: {calculatedDays} {calculatedDays === 1 ? 'day' : 'days'}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="reason">Reason / Remarks</Label>
            <Textarea
              id="reason"
              placeholder="e.g. Attending a family wedding / Medical recovery"
              rows={3}
              {...register('reason')}
            />
            {errors.reason && (
              <p className="text-xs text-destructive">{errors.reason.message}</p>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary">
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
