import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserStore from '../../store/user';
import { HomeIcon, PlusIcon, BellIcon, UserIcon } from '@heroicons/react/24/outline';
import LiquidGlassButton from '@/components/liquid';

interface NavbarProps {
    left?: React.ReactNode;
    right?: React.ReactNode;
    title?: string;
    onClickRight?: () => void;
    onClickLeft?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ left, right, title, onClickRight, onClickLeft }) => {
    return (
        <nav className="z-50 w-full flex fixed left-0 top-0 px-[16px] h-[44px] bg-white items-center border-b border-gray-200">
            {left && <div onClick={onClickLeft}>{left}</div>}
            <span className="px-4 flex-1 font-bold text-center">{title}</span>
            {right && <div onClick={onClickRight}>{right}</div>}
        </nav>
    );
};

export default Navbar;
