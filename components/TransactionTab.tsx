
import React, { useState, FormEvent } from 'react';
import type { Transaction } from '../types';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../constants';
import { formatMoney, formatDate, getTodayDateString } from '../utils/helpers';

interface TransactionTabProps {
    type: 'income' | 'expense';
    transactions: Transaction[];
    onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    onDeleteTransaction: (id: string) => void;
}

const TransactionTab: React.FC<TransactionTabProps> = ({ type, transactions, onAddTransaction, onDeleteTransaction }) => {
    const [date, setDate] = useState(getTodayDateString());
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const config = {
        income: {
            title: 'รายรับ',
            icon: '💰',
            buttonClass: 'bg-green-500 hover:bg-green-600',
            categories: INCOME_CATEGORIES,
            amountColor: 'text-green-600',
        },
        expense: {
            title: 'รายจ่าย',
            icon: '💸',
            buttonClass: 'bg-red-500 hover:bg-red-600',
            categories: EXPENSE_CATEGORIES,
            amountColor: 'text-red-600',
        },
    };

    const currentConfig = config[type];
    const filteredTransactions = transactions
        .filter(t => t.type === type)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!category || !amount || parseFloat(amount) <= 0) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน');
            return;
        }

        onAddTransaction({
            type,
            date,
            category,
            amount: parseFloat(amount),
            description,
        });

        // Reset form
        setDate(getTodayDateString());
        setCategory('');
        setAmount('');
        setDescription('');
    };

    return (
        <div className="p-4 sm:p-6 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{currentConfig.icon} บันทึก{currentConfig.title}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">วันที่</label>
                            <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">ประเภท{currentConfig.title}</label>
                            <select value={category} onChange={e => setCategory(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2">
                                <option value="">เลือกประเภท</option>
                                {type === 'income' ? 
                                    (currentConfig.categories as string[]).map(cat => <option key={cat} value={cat}>{cat}</option>) :
                                    Object.entries(currentConfig.categories).map(([group, cats]) => (
                                        <optgroup key={group} label={group}>
                                            {(cats as string[]).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </optgroup>
                                    ))
                                }
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">จำนวนเงิน (บาท)</label>
                            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required min="0.01" step="0.01" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"/>
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700">รายละเอียด</label>
                            <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="รายละเอียดเพิ่มเติม" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"/>
                        </div>
                    </div>
                    <button type="submit" className={`w-full sm:w-auto text-white font-bold py-2 px-6 rounded-lg transition-colors ${currentConfig.buttonClass}`}>
                        {currentConfig.icon} บันทึก{currentConfig.title}
                    </button>
                </form>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-2">📋 รายการ{currentConfig.title}</h3>
                <div className="max-h-96 overflow-y-auto">
                    {filteredTransactions.length > 0 ? filteredTransactions.map(tx => (
                        <div key={tx.id} className="flex justify-between items-center p-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                            <div className="flex-1">
                                <h5 className="font-semibold text-gray-800">{tx.category}</h5>
                                <p className="text-sm text-gray-500">{formatDate(tx.date)} - {tx.description || 'ไม่มีรายละเอียด'}</p>
                            </div>
                            <div className={`font-bold text-lg ${currentConfig.amountColor}`}>{type === 'income' ? '+' : '-'}{formatMoney(tx.amount)}</div>
                            <button onClick={() => onDeleteTransaction(tx.id)} className="ml-4 text-gray-400 hover:text-red-500 transition-colors">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    )) : <p className="text-center text-gray-500 py-8">ยังไม่มีรายการ</p>}
                </div>
            </div>
        </div>
    );
};

export default TransactionTab;
