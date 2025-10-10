import React, { useCallback, useState } from 'react';
import { Tab as HeadlessTab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import './index.scss';

export interface TabItem {
    id: string;
    label: string;
    content: string | React.ReactNode;
}

export interface TabProps {
    tabs: TabItem[];
    defaultIndex?: number;
    className?: string;
    variant?: 'default' | 'pills' | 'underline';
    onChange?: (tab: TabItem) => void;
}

const Tab: React.FC<TabProps> = ({
    tabs,
    defaultIndex = 0,
    className = '',
    variant = 'pills',
    onChange,
}) => {
    const [selected, setSelected] = useState(tabs[defaultIndex]?.id);

    const handleChangeTab = useCallback((index: number) => {
        setSelected(tabs[index].id);
        onChange?.(tabs[index]);
    }, []);

    return (
        <div className={`tab-component ${className}`}>
            <TabGroup defaultIndex={defaultIndex}>
                <TabList className="tab-list flex space-x-1">
                    {tabs.map((tab, index) => (
                        <HeadlessTab
                            onClick={() => handleChangeTab(index)}
                            key={tab.id}
                            className={`px-4 py-1 text-sm font-medium focus:outline-none transition-colors ${
                                tab.id === selected
                                    ? variant === 'pills'
                                        ? 'bg-primary text-white'
                                        : variant === 'underline'
                                          ? 'text-primary border-b-2 border-primary '
                                          : 'bg-primary/10 text-primary'
                                    : 'text-gray-500 hover:text-gray-700'
                            } ${variant === 'pills' ? 'rounded' : ''}`}>
                            {tab.label}
                        </HeadlessTab>
                    ))}
                </TabList>
                <TabPanels className="tab-panels mt-4">
                    {tabs.map((tab) => (
                        <TabPanel
                            key={tab.id}
                            className="tab-panel focus:outline-none">
                            {typeof tab.content === 'string' ? (
                                <div className="text-gray-700">{tab.content}</div>
                            ) : (
                                tab.content
                            )}
                        </TabPanel>
                    ))}
                </TabPanels>
            </TabGroup>
        </div>
    );
};

export default Tab;
