'use client';

import { motion } from 'framer-motion';
import { getGreeting, formatDate } from '@/utils/date';
import { Badge } from '@/components/ui/badge';
import type { EmployeeWithProfile } from '@/types/employee.types';
import { Sparkles } from 'lucide-react';
import { useEmployee } from '@/hooks/useEmployee';

interface GreetingHeaderProps {
  employee?: EmployeeWithProfile | any;
}

export function GreetingHeader({ employee: propEmployee }: GreetingHeaderProps) {
  const { employee: hookEmployee } = useEmployee();
  const employee = propEmployee || hookEmployee;

  const greeting = getGreeting();
  const today = formatDate(new Date(), 'EEEE, d MMMM yyyy');
  const name =
    employee?.profile?.full_name ||
    employee?.full_name ||
    (employee?.first_name ? `${employee.first_name} ${employee.last_name || ''}` : 'Team Member');

  const empId = employee?.employee_id || employee?.employee_code || 'EMP-001';
  const dept = employee?.department?.name || employee?.department || 'Engineering';
  const status = employee?.status || 'active';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-2 border-b border-border/40"
    >
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            {greeting} 👋
          </h1>
        </div>
        <p className="text-lg font-medium text-foreground/80 mt-0.5">{name}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{today}</p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="secondary" className="font-mono text-xs px-2.5 py-1">
          {empId}
        </Badge>
        <Badge variant="outline" className="text-xs px-2.5 py-1 border-primary/20 text-primary bg-primary/5">
          <Sparkles className="w-3 h-3 mr-1" />
          {dept}
        </Badge>
        <Badge
          className={`text-xs px-2.5 py-1 capitalize ${
            status === 'active'
              ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20'
              : 'bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20'
          }`}
          variant="outline"
        >
          {String(status).replace('_', ' ')}
        </Badge>
      </div>
    </motion.div>
  );
}
