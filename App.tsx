
import React, { useState, useEffect } from 'react';
import type { TabId, Transaction, Budget, Notification as NotificationData } from './types';
import {
    onTransactionsChange,
    onBudgetChange,
    addTransaction,
    deleteTransaction,
    updateBudget,
    clearAllData,
    restoreData,
} from './services/firebase';

import Header from './components/Header';
import Tabs from './components/Tabs';
import DashboardTab from './components/DashboardTab';
import TransactionTab from './components/TransactionTab';
import ReportsTab from './components/ReportsTab';
import BudgetTab from './components/BudgetTab';
import DataManagementTab from './components/DataManagementTab';
import Notification from './components/Notification';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('dashboard');
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [budget, setBudget] = useState<Budget>({ monthlyIncomeTarget: 0, monthlyExpenseBudget: 0, monthlyProfitTarget: 0, materialBudget: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState<NotificationData | null>(null);
    
    useEffect(() => {
        setIsLoading(true);
        const unsubscribeTransactions = onTransactionsChange((data) => {
            setTransactions(data);
            setIsLoading(false);
        });
        const unsubscribeBudget = onBudgetChange((data) => {
            setBudget(data);
        });

        return () => {
            unsubscribeTransactions();
            unsubscribeBudget();
        };
    }, []);

    const showNotification = (message: string, type: 'success' | 'danger' | 'warning') => {
        setNotification({ message, type });
    };

    const handleAddTransaction = async (transaction: Omit<Transaction, 'id'>) => {
        try {
            await addTransaction(transaction);
            showNotification(`บันทึก${transaction.type === 'income' ? 'รายรับ' : 'รายจ่าย'}เรียบร้อย!`, 'success');
        } catch (error) {
            console.error("Error adding transaction:", error);
            showNotification('เกิดข้อผิดพลาดในการบันทึก', 'danger');
        }
    };
    
    const handleDeleteTransaction = async (id: string) => {
        if (window.confirm('คุณต้องการลบรายการนี้หรือไม่?')) {
            try {
                await deleteTransaction(id);
                showNotification('ลบรายการเรียบร้อย!', 'success');
            } catch (error) {
                console.error("Error deleting transaction:", error);
                showNotification('เกิดข้อผิดพลาดในการลบ', 'danger');
            }
        }
    };
    
    const handleUpdateBudget = async (newBudget: Budget) => {
        try {
            await updateBudget(newBudget);
            showNotification('บันทึกงบประมาณเรียบร้อย!', 'success');
        } catch (error) {
            console.error("Error updating budget:", error);
            showNotification('เกิดข้อผิดพลาดในการบันทึกงบประมาณ', 'danger');
        }
    };

    const handleClearAllData = async () => {
        if (window.confirm('คุณแน่ใจหรือไม่ที่จะล้างข้อมูลทั้งหมด? การกระทำนี้ไม่สามารถย้อนกลับได้')) {
            try {
                await clearAllData();
                showNotification('ล้างข้อมูลทั้งหมดเรียบร้อย!', 'success');
            } catch (error) {
                console.error("Error clearing data:", error);
                showNotification('เกิดข้อผิดพลาดในการล้างข้อมูล', 'danger');
            }
        }
    };

    const handleRestoreData = async (data: { transactions?: Record<string, Omit<Transaction, 'id'>>, budget?: Budget }) => {
        try {
            await restoreData(data);
            showNotification('กู้คืนข้อมูลเรียบร้อย!', 'success');
        } catch(error) {
            console.error("Error restoring data:", error);
            showNotification('เกิดข้อผิดพลาดในการกู้คืนข้อมูล', 'danger');
        }
    }

    const renderTabContent = () => {
        if (isLoading) {
            return <div className="p-10 text-center text-gray-500">กำลังโหลดข้อมูล...</div>;
        }
        switch (activeTab) {
            case 'dashboard':
                return <DashboardTab transactions={transactions} budget={budget} onDeleteTransaction={handleDeleteTransaction} />;
            case 'income':
                return <TransactionTab type="income" transactions={transactions} onAddTransaction={handleAddTransaction} onDeleteTransaction={handleDeleteTransaction} />;
            case 'expense':
                return <TransactionTab type="expense" transactions={transactions} onAddTransaction={handleAddTransaction} onDeleteTransaction={handleDeleteTransaction} />;
            case 'reports':
                return <ReportsTab transactions={transactions} />;
            case 'budget':
                return <BudgetTab budget={budget} transactions={transactions} onUpdateBudget={handleUpdateBudget} />;
            case 'data':
                return <DataManagementTab transactions={transactions} budget={budget} onClearAllData={handleClearAllData} onRestoreData={handleRestoreData} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen p-2 sm:p-4 lg:p-6">
            <div className="container mx-auto max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                <Header />
                <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
                <main className="bg-gray-50">
                    {renderTabContent()}
                </main>
                <Notification notification={notification} />
            </div>
        </div>
    );
};

export default App;
