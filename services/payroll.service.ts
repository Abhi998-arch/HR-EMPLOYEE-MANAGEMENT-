import { createClient } from '@/lib/supabase';

export async function getMyPayroll(employeeId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('payroll')
    .select('*')
    .eq('employee_id', employeeId)
    .maybeSingle();
  if (error && error.code !== 'PGRST116') throw new Error(error.message);
  return data;
}

export async function updatePayroll(
  employeeId: string,
  updates: {
    base_salary?: number;
    allowances?: number;
    benefits?: number;
    deductions?: number;
  }
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('payroll')
    .upsert({
      employee_id: employeeId,
      ...updates,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'employee_id' })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function getAllPayroll() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('payroll')
    .select('*, employees(*, profiles(*))');
  if (error) throw new Error(error.message);
  return data || [];
}
