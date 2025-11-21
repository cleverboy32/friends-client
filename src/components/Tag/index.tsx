import React, { useState } from 'react';

interface TabItem {
    id: string;
    label: string;
    category?: string;
    value?: string;
}

interface NavigationTabBarProps {
    tabs: TabItem[];
    defaultActiveTab?: string;
    onTabChange?: (tabId: string) => void;
    className?: string;
    showBottomBorder?: boolean;
}

const NavigationTabBar: React.FC<NavigationTabBarProps> = ({
    tabs,
    defaultActiveTab,
    onTabChange,
    className = '',
    showBottomBorder = true,
}) => {
    const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        onTabChange?.(tabId);
    };

    // 分组标签
    const groupedTabs = tabs.reduce(
        (acc, tab) => {
            const category = tab.category || 'default';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(tab);
            return acc;
        },
        {} as Record<string, TabItem[]>,
    );

    const hasCategories =
        Object.keys(groupedTabs).length > 1 ||
        (Object.keys(groupedTabs).length === 1 && !groupedTabs.default);

    if (hasCategories) {
        // 分组显示， 但依然是水平标签模式
        return (
            <div className="w-full overflow-y-hidden h-[40px] px-[16px]">
                <div className="w-full overflow-x-auto">
                    <div className={`${className} flex gap-[32px]`}>
                        {Object.entries(groupedTabs).map(([category, categoryTabs]) => (
                            <>
                                {categoryTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => handleTabClick(tab.id)}
                                        className={`
                    text-sm py-[12px] font-bold transition-all duration-200 relative whitespace-nowrap
                    focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-opacity-50
                    ${activeTab === tab.id ? ' bg-light-primary  text-primary' : 'text-gray-700'}
                  `}>
                                        {tab.label}
                                    </button>
                                ))}
                            </>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // 原始水平标签模式
    return (
        <div
            className={`bg-white ${showBottomBorder ? 'border-b border-gray-200' : ''} ${className}`}>
            <div className="flex h-14 items-center">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`
              px-6 py-4 text-[15px] font-medium transition-all duration-200 relative
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              ${
                  activeTab === tab.id
                      ? 'text-gray-900 font-semibold'
                      : 'text-gray-600 hover:text-gray-900 hover:font-semibold'
              }
            `}>
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default NavigationTabBar;
