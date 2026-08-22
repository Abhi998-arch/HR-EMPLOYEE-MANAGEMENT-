'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getInitials } from '@/utils/formatters';
import { formatDate } from '@/utils/date';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Building2,
  Calendar,
  Lock,
  Edit2,
  CheckCircle2,
  Loader2,
  UploadCloud,
} from 'lucide-react';
import type { EmployeeWithProfile } from '@/types/employee.types';

interface ProfileViewProps {
  employee?: EmployeeWithProfile | any;
  isLoading?: boolean;
  onUpdateProfile?: (updates: { phone?: string; address?: string }) => Promise<void>;
  onUploadAvatar?: (file: File) => Promise<void>;
}

export function ProfileView({
  employee = null,
  isLoading = false,
  onUpdateProfile,
  onUploadAvatar,
}: ProfileViewProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [phone, setPhone] = useState(employee?.profile?.phone || '');
  const [address, setAddress] = useState(employee?.profile?.address || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const profile = employee?.profile;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg(null);
    try {
      if (onUpdateProfile) {
        await onUpdateProfile({ phone, address });
      }
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSuccessMsg(null), 3000);
      setEditOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      if (onUploadAvatar) {
        await onUploadAvatar(file);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 text-emerald-600 text-xs font-medium border border-emerald-500/20">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Profile Header Card */}
      <Card className="border border-border/60 shadow-sm overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-primary/20 via-indigo-500/20 to-purple-500/20" />
        <CardContent className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 mb-4">
            <div className="flex items-end gap-4">
              <div className="relative group">
                <Avatar className="w-24 h-24 border-4 border-background shadow-md">
                  <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || ''} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                    {getInitials(profile?.full_name || 'Dayflow User')}
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xs font-medium"
                >
                  {isUploading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <UploadCloud className="w-5 h-5" />
                  )}
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isUploading}
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {profile?.full_name || 'Arjun Kumar'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {employee?.job_title || 'Software Engineer'}
                </p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <Badge variant="secondary" className="font-mono text-xs">
                    {employee?.employee_id || 'EMP-001'}
                  </Badge>
                  <Badge variant="outline" className="text-xs text-primary border-primary/20 bg-primary/5">
                    {employee?.department || 'Engineering'}
                  </Badge>
                </div>
              </div>
            </div>

            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5 self-start sm:self-auto">
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit Contact Info
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Personal Contact Info</DialogTitle>
                  <DialogDescription>
                    Update your phone number and residential address. Protected job fields can only be modified by HR.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSave} className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Residential Address</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 104 Park Avenue, Bengaluru"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSaving} className="bg-primary">
                      {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      Save Changes
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Profile Details Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info */}
        <Card className="border border-border/60 shadow-sm">
          <div className="px-5 py-3.5 border-b border-border/40 flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Personal Information
            </span>
            <span className="text-xs text-muted-foreground">Self-managed</span>
          </div>
          <CardContent className="p-5 space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Official Email Address</p>
                <p className="text-sm font-medium text-foreground">{profile?.email || 'user@dayflow.com'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Phone Number</p>
                <p className="text-sm font-medium text-foreground">{profile?.phone || '+91 98765 43210'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Residential Address</p>
                <p className="text-sm font-medium text-foreground">{profile?.address || 'Bengaluru, Karnataka'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Information */}
        <Card className="border border-border/60 shadow-sm">
          <div className="px-5 py-3.5 border-b border-border/40 flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" />
              Job & Organization Details
            </span>
            <Badge variant="secondary" className="text-[10px] gap-1">
              <Lock className="w-2.5 h-2.5" />
              HR Protected
            </Badge>
          </div>
          <CardContent className="p-5 space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Department</p>
                <p className="text-sm font-medium text-foreground">{employee?.department || 'Engineering'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Briefcase className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Job Title</p>
                <p className="text-sm font-medium text-foreground">{employee?.job_title || 'Software Engineer'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Joining Date</p>
                <p className="text-sm font-medium text-foreground">
                  {employee?.joining_date ? formatDate(new Date(employee.joining_date), 'd MMMM yyyy') : '22 Aug 2026'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
