
export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  date: string; // YYYY-MM-DD
  category: string;
  amount: number;
  description: string;
}

export interface Budget {
  monthlyIncomeTarget: number;
  monthlyExpenseBudget: number;
  monthlyProfitTarget: number;
  materialBudget: number;
}

export type TabId = 'dashboard' | 'income' | 'expense' | 'reports' | 'budget' | 'data';

export type NotificationType = 'success' | 'danger' | 'warning';

export interface Notification {
    message: string;
    type: NotificationType;
}
