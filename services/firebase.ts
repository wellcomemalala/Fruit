
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push, remove, Unsubscribe } from "firebase/database";
import type { Transaction, Budget } from '../types';

// This configuration was provided by the user.
const firebaseConfig = {
    apiKey: "AIzaSyAMRFYOKQ5s-apq7aeVRlJTrDpMIgoN5LI",
    authDomain: "project-1334432856828062315.firebaseapp.com",
    databaseURL: "https://project-1334432856828062315-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "project-1334432856828062315",
    storageBucket: "project-1334432856828062315.firebasestorage.app",
    messagingSenderId: "491251658331",
    appId: "1:491251658331:web:b542190e23594d109b597e"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const transactionsRef = ref(db, 'transactions');
const budgetRef = ref(db, 'budget');

export const onTransactionsChange = (callback: (transactions: Transaction[]) => void): Unsubscribe => {
    return onValue(transactionsRef, (snapshot) => {
        const data = snapshot.val();
        const transactionsArray: Transaction[] = data ? Object.entries(data).map(([id, value]) => ({
            id,
            ...(value as Omit<Transaction, 'id'>)
        })) : [];
        callback(transactionsArray);
    });
};

export const onBudgetChange = (callback: (budget: Budget) => void): Unsubscribe => {
    return onValue(budgetRef, (snapshot) => {
        const data = snapshot.val();
        const defaultBudget: Budget = {
            monthlyIncomeTarget: 0,
            monthlyExpenseBudget: 0,
            monthlyProfitTarget: 0,
            materialBudget: 0
        };
        callback(data || defaultBudget);
    });
};

export const addTransaction = async (transaction: Omit<Transaction, 'id'>): Promise<void> => {
    const newTransactionRef = push(transactionsRef);
    await set(newTransactionRef, transaction);
};

export const deleteTransaction = async (id: string): Promise<void> => {
    const transactionToDeleteRef = ref(db, `transactions/${id}`);
    await remove(transactionToDeleteRef);
};

export const updateBudget = async (budget: Budget): Promise<void> => {
    await set(budgetRef, budget);
};

export const clearAllData = async (): Promise<void> => {
    await set(ref(db), null); // Removes all data at the root
};

export const restoreData = async (data: { transactions?: Record<string, Omit<Transaction, 'id'>>, budget?: Budget }): Promise<void> => {
    await set(ref(db), data);
};
