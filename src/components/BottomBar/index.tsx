import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserStore from '../../store/user';
import { HomeIcon, PlusIcon, BellIcon, UserIcon } from '@heroicons/react/24/outline';
import LiquidGlassButton from '@/components/liquid';

interface NavItem {
    key: string;
    label: string;
    icon: React.ReactNode;
    path: string;
    hasNotification?: boolean;
}

const BottomBar: React.FC = () => {
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
            label: '通知',
            icon: <BellIcon className="w-6 h-6" />,
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
        <nav className="z-50 w-[full] fixed bottom-0 left-0 bg-theme/60">
            <LiquidGlassButton
                height={68}
                width={window.innerWidth}
                borderRadius={0}
                surfaceType="squircle"
                glassThickness={0.1}
                bezelWidth={0.2}>
                <div className="flex">
                    {navItems.map((item) => (
                        <div
                            key={item.key}
                            onClick={() => handleNavClick(item.path)}
                            className={`flex flex-1 flex-col items-center py-[10px]  rounded-full transition-all duration-200 ${
                                isActive(item.path) ? 'text-primary' : ''
                            }`}>
                            {item.icon}
                            <div className="font-medium ml-2 ">{item.label}</div>
                        </div>
                    ))}
                </div>
            </LiquidGlassButton>
        </nav>
    );
};

export default BottomBar;
