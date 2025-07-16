
import React, { useMemo } from 'react';
import type { Transaction, Budget } from '../types';
import SummaryCard from './SummaryCard';
import { formatMoney, formatDate, getTodayDateString } from '../utils/helpers';

interface TransactionItemProps {
    transaction: Transaction;
    onDelete: (id: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onDelete }) => (
    <div className="flex justify-between items-center p-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
        <div className="flex-1">
            <h5 className="font-semibold text-gray-800">{transaction.category}</h5>
            <p className="text-sm text-gray-500">
                {formatDate(transaction.date)} - {transaction.description || 'ไม่มีรายละเอียด'}
            </p>
        </div>
        <div className={`font-bold text-lg ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
            {transaction.type === 'income' ? '+' : '-'}{formatMoney(transaction.amount)}
        </div>
        <button onClick={() => onDelete(transaction.id)} className="ml-4 text-gray-400 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
    </div>
);

interface DashboardTabProps {
    transactions: Transaction[];
    budget: Budget;
    onDeleteTransaction: (id: string) => void;
}

const DashboardTab: React.FC<DashboardTabProps> = ({ transactions, budget, onDeleteTransaction }) => {
    const summary = useMemo(() => {
        const today = getTodayDateString();
        const currentMonth = today.substring(0, 7);

        const todayIncome = transactions.filter(t => t.type === 'income' && t.date === today).reduce((sum, t) => sum + t.amount, 0);
        const todayExpense = transactions.filter(t => t.type === 'expense' && t.date === today).reduce((sum, t) => sum + t.amount, 0);
        const monthIncome = transactions.filter(t => t.type === 'income' && t.date.startsWith(currentMonth)).reduce((sum, t) => sum + t.amount, 0);
        const monthExpense = transactions.filter(t => t.type === 'expense' && t.date.startsWith(currentMonth)).reduce((sum, t) => sum + t.amount, 0);
        
        const profitProgress = budget.monthlyProfitTarget > 0 ? Math.min((monthIncome - monthExpense) / budget.monthlyProfitTarget * 100, 100) : 0;

        return {
            todayIncome,
            todayExpense,
            todayProfit: todayIncome - todayExpense,
            monthIncome,
            monthExpense,
            monthProfit: monthIncome - monthExpense,
            remainingBudget: budget.monthlyExpenseBudget - monthExpense,
            profitProgress: Math.round(profitProgress)
        };
    }, [transactions, budget]);

    const recentTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

    return (
        <div className="p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <SummaryCard title="รายรับวันนี้" amount={formatMoney(summary.todayIncome)} variant="income" />
                <SummaryCard title="รายจ่ายวันนี้" amount={formatMoney(summary.todayExpense)} variant="expense" />
                <SummaryCard title="กำไรวันนี้" amount={formatMoney(summary.todayProfit)} variant="profit" />
                <SummaryCard title="งบประมาณคงเหลือ (เดือนนี้)" amount={formatMoney(summary.remainingBudget)} variant="budget" />
            </div>
            
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <SummaryCard title="รายรับเดือนนี้" amount={formatMoney(summary.monthIncome)} variant="income" />
                <SummaryCard title="รายจ่ายเดือนนี้" amount={formatMoney(summary.monthExpense)} variant="expense" />
                <SummaryCard title="กำไรเดือนนี้" amount={formatMoney(summary.monthProfit)} variant="profit" />
                <SummaryCard title="เป้าหมายกำไร" amount={formatMoney(budget.monthlyProfitTarget)} variant="profit" />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">ความคืบหน้าเป้าหมายกำไรเดือนนี้: {summary.profitProgress}%</h3>
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-gradient-to-r from-blue-400 to-indigo-500 h-4 rounded-full" style={{ width: `${summary.profitProgress}%` }}></div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-2">รายการล่าสุด</h3>
                <div className="max-h-96 overflow-y-auto">
                    {recentTransactions.length > 0 ? (
                        recentTransactions.map(tx => <TransactionItem key={tx.id} transaction={tx} onDelete={onDeleteTransaction} />)
                    ) : (
                        <p className="text-center text-gray-500 py-8">ยังไม่มีรายการ</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardTab;
