
import React, { useState, useEffect, FormEvent } from 'react';
import type { Budget, Transaction } from '../types';
import { formatMoney } from '../utils/helpers';

interface BudgetTabProps {
    budget: Budget;
    transactions: Transaction[];
    onUpdateBudget: (budget: Budget) => void;
}

const BudgetTab: React.FC<BudgetTabProps> = ({ budget, transactions, onUpdateBudget }) => {
    const [formState, setFormState] = useState<Budget>(budget);

    useEffect(() => {
        setFormState(budget);
    }, [budget]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onUpdateBudget(formState);
    };
    
    const currentMonth = new Date().toISOString().substring(0, 7);
    const monthIncome = transactions.filter(t => t.type === 'income' && t.date.startsWith(currentMonth)).reduce((sum, t) => sum + t.amount, 0);
    const monthExpense = transactions.filter(t => t.type === 'expense' && t.date.startsWith(currentMonth)).reduce((sum, t) => sum + t.amount, 0);
    const monthProfit = monthIncome - monthExpense;

    const renderBudgetProgress = (title: string, current: number, target: number) => {
        const progress = target > 0 ? Math.min((current / target) * 100, 100) : 0;
        const isExceeded = current > target;
        return (
            <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-semibold text-gray-700">{title}</h4>
                <p className="text-xl font-bold text-gray-900">{formatMoney(current)} / <span className="text-gray-500">{formatMoney(target)}</span></p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className={`${isExceeded ? 'bg-red-500' : 'bg-green-500'} h-2.5 rounded-full`} style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="p-4 sm:p-6 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 ตั้งงบประมาณและเป้าหมาย</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">เป้าหมายรายรับรายเดือน (บาท)</label>
                            <input type="number" name="monthlyIncomeTarget" value={formState.monthlyIncomeTarget} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">งบประมาณรายจ่ายรายเดือน (บาท)</label>
                            <input type="number" name="monthlyExpenseBudget" value={formState.monthlyExpenseBudget} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm"/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">เป้าหมายกำไรรายเดือน (บาท)</label>
                            <input type="number" name="monthlyProfitTarget" value={formState.monthlyProfitTarget} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm"/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">งบประมาณค่าวัตถุดิบ (บาท)</label>
                            <input type="number" name="materialBudget" value={formState.materialBudget} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm"/>
                        </div>
                    </div>
                     <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">💾 บันทึกงบประมาณ</button>
                </form>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
                 <h3 className="text-xl font-bold text-gray-800 mb-4">📊 สถานะงบประมาณปัจจุบัน</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderBudgetProgress("รายรับเทียบกับเป้าหมาย", monthIncome, budget.monthlyIncomeTarget)}
                    {renderBudgetProgress("รายจ่ายเทียบกับงบประมาณ", monthExpense, budget.monthlyExpenseBudget)}
                    {renderBudgetProgress("กำไรเทียบกับเป้าหมาย", monthProfit, budget.monthlyProfitTarget)}
                 </div>
            </div>
        </div>
    );
};

export default BudgetTab;
