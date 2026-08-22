"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formatCurrency } from "@/utils/formatters";

export function PayrollEditor({ employeeId }: { employeeId: string }) {
  const [baseSalary, setBaseSalary] = useState(5000);
  const [allowances, setAllowances] = useState(1000);
  const [deductions, setDeductions] = useState(500);

  const grossSalary = baseSalary + allowances;
  const netSalary = grossSalary - deductions;
  const annualCtc = grossSalary * 12;

  const handleSave = () => {
    // Save logic
    console.log("Saved", { baseSalary, allowances, deductions });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salary Structure Editor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="base">Base Salary (Monthly)</Label>
          <Input 
            id="base" 
            type="number" 
            value={baseSalary} 
            onChange={(e) => setBaseSalary(Number(e.target.value))} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="allowances">Allowances (Monthly)</Label>
          <Input 
            id="allowances" 
            type="number" 
            value={allowances} 
            onChange={(e) => setAllowances(Number(e.target.value))} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deductions">Deductions (Monthly)</Label>
          <Input 
            id="deductions" 
            type="number" 
            value={deductions} 
            onChange={(e) => setDeductions(Number(e.target.value))} 
          />
        </div>

        <div className="mt-6 space-y-2 border-t pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Monthly Gross:</span>
            <span className="font-medium">{formatCurrency(grossSalary)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Monthly Deductions:</span>
            <span className="font-medium text-red-500">-{formatCurrency(deductions)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Net Monthly Salary:</span>
            <span>{formatCurrency(netSalary)}</span>
          </div>
          <div className="flex justify-between text-sm mt-4 text-muted-foreground">
            <span>Annual CTC:</span>
            <span>{formatCurrency(annualCtc)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="w-full">Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
