import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: '首页', icon: '🏠' },
        { path: '/discover', label: '发现', icon: '🔍' },
        { path: '/activities', label: '活动', icon: '🎯' },
        { path: '/profile', label: '我的', icon: '👤' },
    ];

    return (
        <nav className="bg-white shadow-sm border-t">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-2 py-4">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                            Z
                        </div>
                        <span className="text-lg font-semibold text-gray-800">活动平台</span>
                    </div>

                    {/* 导航链接 */}
                    <div className="flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                    location.pathname === item.path
                                        ? 'bg-green-100 text-green-700'
                                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                                }`}>
                                <span className="text-lg">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* 右侧按钮 */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <svg
                                className="w-6 h-6 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </button>
                        <button className="bg-yellow-400 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
                            发布活动
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
