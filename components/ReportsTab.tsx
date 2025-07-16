
import React, { useState, useMemo } from 'react';
import type { Transaction } from '../types';
import SummaryCard from './SummaryCard';
import { formatMoney } from '../utils/helpers';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ReportsTabProps {
    transactions: Transaction[];
}

const ReportsTab: React.FC<ReportsTabProps> = ({ transactions }) => {
    const [period, setPeriod] = useState('month');
    const [customFrom, setCustomFrom] = useState('');
    const [customTo, setCustomTo] = useState('');
    const [reportData, setReportData] = useState<any>(null);

    const generateReport = () => {
        let startDate, endDate;
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];

        switch (period) {
            case 'today':
                startDate = endDate = todayStr;
                break;
            case 'week':
                const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
                startDate = firstDayOfWeek.toISOString().split('T')[0];
                endDate = todayStr;
                break;
            case 'month':
                startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
                endDate = todayStr;
                break;
            case 'year':
                startDate = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0];
                endDate = todayStr;
                break;
            case 'custom':
                if (!customFrom || !customTo) {
                    alert('กรุณาเลือกช่วงวันที่');
                    return;
                }
                startDate = customFrom;
                endDate = customTo;
                break;
            default: return;
        }

        const filtered = transactions.filter(t => t.date >= startDate && t.date <= endDate);
        const totalIncome = filtered.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const totalExpense = filtered.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        
        const categoryData = filtered.reduce((acc, t) => {
            acc[t.category] = acc[t.category] || { name: t.category, income: 0, expense: 0 };
            acc[t.category][t.type] += t.amount;
            return acc;
        }, {} as Record<string, {name: string, income: number, expense: number}>);
        
        setReportData({
            totalIncome,
            totalExpense,
            netProfit: totalIncome - totalExpense,
            chartData: Object.values(categoryData)
        });
    };
    
    return (
        <div className="p-4 sm:p-6 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">📈 สร้างรายงาน</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">เลือกช่วงเวลา</label>
                        <select value={period} onChange={e => setPeriod(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
                            <option value="today">วันนี้</option>
                            <option value="week">สัปดาห์นี้</option>
                            <option value="month">เดือนนี้</option>
                            <option value="year">ปีนี้</option>
                            <option value="custom">กำหนดเอง</option>
                        </select>
                    </div>
                     {period === 'custom' && (
                        <div className="grid grid-cols-2 gap-2">
                             <div>
                                <label className="block text-sm font-medium text-gray-700">จากวันที่</label>
                                <input type="date" value={customFrom} onChange={e => setCustomFrom(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
                             </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">ถึงวันที่</label>
                                <input type="date" value={customTo} onChange={e => setCustomTo(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
                            </div>
                        </div>
                    )}
                </div>
                 <button onClick={generateReport} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">🔍 สร้างรายงาน</button>
            </div>
            {reportData && (
                 <div className="bg-white p-6 rounded-xl shadow-md animate-fade-in">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">📊 ผลสรุป</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <SummaryCard title="รายรับรวม" amount={formatMoney(reportData.totalIncome)} variant="income" />
                        <SummaryCard title="รายจ่ายรวม" amount={formatMoney(reportData.totalExpense)} variant="expense" />
                        <SummaryCard title="กำไร/ขาดทุน" amount={formatMoney(reportData.netProfit)} variant="profit" />
                    </div>
                     <div style={{ width: '100%', height: 400 }}>
                        <ResponsiveContainer>
                            <BarChart data={reportData.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis tickFormatter={(value) => formatMoney(value as number)}/>
                                <Tooltip formatter={(value) => formatMoney(value as number)}/>
                                <Legend />
                                <Bar dataKey="income" name="รายรับ" fill="#4ade80" />
                                <Bar dataKey="expense" name="รายจ่าย" fill="#f87171" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                 </div>
            )}
        </div>
    );
};

export default ReportsTab;
