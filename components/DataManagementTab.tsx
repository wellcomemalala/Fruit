
import React, { useRef } from 'react';
import type { Transaction, Budget } from '../types';

interface DataManagementTabProps {
    transactions: Transaction[];
    budget: Budget;
    onClearAllData: () => void;
    onRestoreData: (data: { transactions?: Record<string, Omit<Transaction, 'id'>>, budget?: Budget }) => void;
}

const DataManagementTab: React.FC<DataManagementTabProps> = ({ transactions, budget, onClearAllData, onRestoreData }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleExport = () => {
        const transactionsObject = transactions.reduce((obj, item) => {
            const { id, ...rest } = item;
            obj[id] = rest;
            return obj;
        }, {} as Record<string, Omit<Transaction, 'id'>>);

        const dataToExport = {
            transactions: transactionsObject,
            budget: budget
        };
        const dataStr = JSON.stringify(dataToExport, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `restaurant_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const text = e.target?.result;
                    if (typeof text === 'string') {
                        const data = JSON.parse(text);
                        if (window.confirm('การนำเข้าข้อมูลจะเขียนทับข้อมูลปัจจุบันทั้งหมด คุณแน่ใจหรือไม่?')) {
                             onRestoreData(data);
                        }
                    }
                } catch (error) {
                    alert('ไฟล์ไม่ถูกต้องหรือไม่สามารถอ่านข้อมูลได้');
                } finally {
                    // Reset file input
                    if(fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                }
            };
            reader.readAsText(file);
        }
    };
    
    return (
        <div className="p-4 sm:p-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">💾 จัดการข้อมูล</h3>
                <p className="text-gray-600 mb-6">คุณสามารถสำรองข้อมูลทั้งหมดเป็นไฟล์ JSON หรือกู้คืนจากไฟล์ได้ ข้อมูลของคุณจะถูกบันทึกในระบบคลาวด์โดยอัตโนมัติ</p>
                <div className="flex flex-wrap gap-4">
                    <button onClick={handleExport} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                        💾 ส่งออกข้อมูล (Export)
                    </button>
                    <button onClick={handleImportClick} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                        🔄 นำเข้าข้อมูล (Import)
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
                     <button onClick={onClearAllData} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                        🗑️ ล้างข้อมูลทั้งหมด
                    </button>
                </div>
                 <div className="mt-6 p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg">
                    <p><strong>หมายเหตุ:</strong> การ "ล้างข้อมูลทั้งหมด" จะลบข้อมูลทั้งหมดออกจากฐานข้อมูลอย่างถาวรและไม่สามารถกู้คืนได้ โปรดใช้ความระมัดระวัง</p>
                </div>
            </div>
        </div>
    );
};

export default DataManagementTab;
