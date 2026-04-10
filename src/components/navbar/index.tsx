import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserStore from '../../store/user';
import {
    HomeIcon,
    PlusIcon,
    ChatBubbleLeftEllipsisIcon,
    UserIcon,
} from '@heroicons/react/24/outline';

interface NavItem {
    key: string;
    label: string;
    icon: React.ReactNode;
    path: string;
    hasNotification?: boolean;
}

const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userInfo } = useUserStore();

    const navItems: NavItem[] = [
        {
            key: 'discover',
            label: '发现',
            icon: <HomeIcon className="w-6 h-6" />,
            path: '/discover',
            hasNotification: true,
        },
        {
            key: 'publish',
            label: '发布',
            icon: <PlusIcon className="w-6 h-6" />,
            path: '/post-activity',
        },
        {
            key: 'notifications',
            label: '消息',
            icon: <ChatBubbleLeftEllipsisIcon className="w-6 h-6" />,
            path: '/notifications',
            hasNotification: true,
        },
        {
            key: 'profile',
            label: '我',
            icon: <UserIcon className="w-6 h-6" />,
            path: userInfo ? `/person/${userInfo.id}` : '/login',
        },
    ];

    const isActive = (path: string) => {
        if (path === '/discover') {
            return location.pathname === '/discover' || location.pathname === '/';
        }
        if (path.includes('/person/')) {
            return location.pathname.startsWith('/person/');
        }
        return location.pathname === path;
    };

    const handleNavClick = (path: string) => {
        if (path.includes('/person/') && !userInfo) {
            navigate('/login');
            return;
        }
        navigate(path);
    };

    return (
        <nav className="px-4 py-2 flex-shrink-0 z-50 w-[200px]">
            <div>
                {navItems.map((item) => (
                    <div
                        key={item.key}
                        onClick={() => handleNavClick(item.path)}
                        className={`flex items-center  py-2 px-3 my-2 rounded-full transition-all duration-200 ${
                            isActive(item.path)
                                ? 'bg-primary text-white'
                                : ' hover:text-gray-800 hover:bg-secondary '
                        }`}>
                        {item.icon}
                        <span className="font-medium ml-2 ">{item.label}</span>
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
