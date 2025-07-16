
import React from 'react';

interface SummaryCardProps {
    title: string;
    amount: string;
    variant: 'income' | 'expense' | 'profit' | 'budget';
    footer?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, variant, footer }) => {
    const variants = {
        income: 'from-green-400 to-teal-500',
        expense: 'from-red-400 to-pink-500',
        profit: 'from-blue-400 to-indigo-500',
        budget: 'from-yellow-400 to-orange-500',
    };

    return (
        <div className={`bg-gradient-to-br ${variants[variant]} text-white p-6 rounded-xl shadow-lg transform hover:-translate-y-1 transition-transform duration-300`}>
            <h4 className="font-semibold text-lg opacity-90">{title}</h4>
            <div className="text-4xl font-bold my-2">{amount}</div>
            <small className="opacity-80">{footer || 'บาท'}</small>
        </div>
    );
};

export default SummaryCard;
