'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';

export function useEmployee() {
  const { user } = useAuthStore();
  const [employee, setEmployee] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEmployee = useCallback(async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('employees')
        .select('*, profile:profiles(*)')
        .eq('profile_id', user.id)
        .maybeSingle();

      if (!error && data) {
        setEmployee(data);
      } else if (!data) {
        // Fallback default structure for mock/offline preview
        setEmployee({
          id: user.id,
          profile_id: user.id,
          employee_id: 'EMP-001',
          department: 'Engineering',
          job_title: 'Full Stack Engineer',
          joining_date: '2026-08-22',
          status: 'active',
          profile: {
            id: user.id,
            email: user.email || 'employee@dayflow.com',
            full_name: user.fullName || 'Demo Employee',
            role: user.role || 'employee',
            avatar_url: user.avatarUrl || null,
            phone: '+91 98765 43210',
            address: 'Bengaluru, India',
          },
        });
      }
    } catch (err) {
      console.error('Error in useEmployee:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  return { employee, isLoading, refreshEmployee: fetchEmployee };
}
