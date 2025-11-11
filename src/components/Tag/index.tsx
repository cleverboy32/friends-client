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
  showBottomBorder = true
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  // 分组标签
  const groupedTabs = tabs.reduce((acc, tab) => {
    const category = tab.category || 'default';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tab);
    return acc;
  }, {} as Record<string, TabItem[]>);

  const hasCategories = Object.keys(groupedTabs).length > 1 || (Object.keys(groupedTabs).length === 1 && !groupedTabs.default);

  if (hasCategories) {
    // 分组显示模式
    return (
      <div className={`${className}`}>
        {Object.entries(groupedTabs).map(([category, categoryTabs]) => (
          <div key={category} className="mb-4 last:mb-0">
            <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize">
              {category === 'type' && '活动类型'}
              {category === 'distance' && '距离范围'}
              {category === 'timeRange' && '时间范围'}
              {category === 'default' && '选项'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`
                    px-4 py-2 text-sm font-medium transition-all duration-200 relative rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                    ${
                      activeTab === tab.id
                        ? 'text-gray-900 font-semibold bg-blue-50 border border-blue-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 原始水平标签模式
  return (
    <div className={`bg-white ${showBottomBorder ? 'border-b border-gray-200' : ''} ${className}`}>
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
            `}
          >
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

// 示例使用组件
const NavigationTabBarExample: React.FC = () => {
  const sampleTabs = [
    { id: 'home', label: '首页' },
    { id: 'products', label: '产品' },
    { id: 'services', label: '服务' },
    { id: 'about', label: '关于我们' },
    { id: 'contact', label: '联系我们' }
  ];

  const handleTabChange = (tabId: string) => {
    console.log('切换到标签:', tabId);
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">导航标签栏示例</h2>

      {/* 基础版本 */}
      <div className="mb-8">
        <h3 className="text-base font-medium mb-3 text-gray-700">基础导航标签栏</h3>
        <NavigationTabBar
          tabs={sampleTabs}
          onTabChange={handleTabChange}
        />
      </div>

      {/* 无边框版本 */}
      <div className="mb-8">
        <h3 className="text-base font-medium mb-3 text-gray-700">无边框版本</h3>
        <NavigationTabBar
          tabs={sampleTabs}
          onTabChange={handleTabChange}
          showBottomBorder={false}
        />
      </div>

      {/* 自定义样式版本 */}
      <div className="mb-8">
        <h3 className="text-base font-medium mb-3 text-gray-700">自定义样式版本</h3>
        <NavigationTabBar
          tabs={sampleTabs}
          onTabChange={handleTabChange}
          className="shadow-sm rounded-lg"
          defaultActiveTab="services"
        />
      </div>

      {/* 状态显示 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-base font-medium mb-2 text-gray-700">样式规格说明：</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• 字体大小：14-16px (使用 text-sm)</li>
          <li>• 字重：400-500 (使用 font-medium 到 font-semibold)</li>
          <li>• 默认文字颜色：#666 (text-gray-600)</li>
          <li>• 标签间距：左右 20-24px (使用 px-5)</li>
          <li>• 背景颜色：白色 (bg-white)</li>
          <li>• 高度：48-56px (使用 h-14)</li>
          <li>• 悬停效果：文字变深色 + 下划线</li>
          <li>• 选中状态：文字加粗 + 底部指示条</li>
        </ul>
      </div>
    </div>
  );
};

export default NavigationTabBar;
export { NavigationTabBarExample };