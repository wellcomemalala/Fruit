
import React from 'react';
import type { TabId } from '../types';
import { TABS } from '../constants';

interface TabsProps {
    activeTab: TabId;
    onTabChange: (tabId: TabId) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="flex bg-gray-50 border-b border-gray-200 overflow-x-auto">
            {TABS.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center justify-center px-4 py-3 font-medium text-sm sm:text-base whitespace-nowrap border-b-4 transition-colors duration-200 ease-in-out focus:outline-none ${
                        activeTab === tab.id
                            ? 'border-blue-500 text-blue-600 bg-white'
                            : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                >
                    {tab.icon}
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
