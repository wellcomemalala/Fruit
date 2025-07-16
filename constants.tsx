
import React from 'react';
import type { TabId } from './types';

const ChartBarIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125z" /></svg>);
const ArrowTrendingUpIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" /></svg>);
const ArrowTrendingDownIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0-3.182-5.511m3.182 5.51-5.511-3.182" /></svg>);
const DocumentChartBarIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>);
const CircleStackIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.03 1.125 0 1.131.094 1.976 1.057 1.976 2.192V7.5M8.25 7.5h7.5M8.25 7.5v9c0 1.135.845 2.098 1.976 2.192.373.03.748.03 1.125 0 1.131.094 1.976 1.057 1.976 2.192V16.5M16.5 16.5h-7.5m7.5 0v-9c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.125 0c-1.131.094-1.976 1.057-1.976 2.192V16.5" /></svg>);
const ArchiveBoxIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" /></svg>);

export const TABS: { id: TabId; label: string; icon: React.ReactNode; }[] = [
    { id: 'dashboard', label: 'แดชบอร์ด', icon: <ChartBarIcon className="w-5 h-5 mr-2" /> },
    { id: 'income', label: 'รายรับ', icon: <ArrowTrendingUpIcon className="w-5 h-5 mr-2" /> },
    { id: 'expense', label: 'รายจ่าย', icon: <ArrowTrendingDownIcon className="w-5 h-5 mr-2" /> },
    { id: 'reports', label: 'รายงาน', icon: <DocumentChartBarIcon className="w-5 h-5 mr-2" /> },
    { id: 'budget', label: 'งบประมาณ', icon: <CircleStackIcon className="w-5 h-5 mr-2" /> },
    { id: 'data', label: 'จัดการข้อมูล', icon: <ArchiveBoxIcon className="w-5 h-5 mr-2" /> },
];

export const INCOME_CATEGORIES = [
    'ขายอาหาร', 'ขายเครื่องดื่ม', 'ของหวาน', 'เดลิเวอรี่', 'อื่นๆ'
];

export const EXPENSE_CATEGORIES = {
    'รายจ่ายประจำ': ['ค่าวัตถุดิบ', 'ค่าแรงพนักงาน', 'ค่าแก๊ส', 'ค่าไฟฟ้า', 'ค่าเช่า', 'ค่าน้ำประปา'],
    'รายจ่ายไม่ประจำ': ['ซ่อมแซม', 'อุปกรณ์เพิ่มเติม', 'โปรโมชั่น', 'การตลาด', 'อื่นๆ']
};
