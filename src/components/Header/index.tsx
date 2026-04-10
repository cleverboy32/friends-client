import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/dz.png';

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
            <div className="flex items-end cursor-pointer" onClick={() => navigate('/')}>
                <img
                    src={logo}
                    alt="Logo"
                    className="h-12 w-auto"
                />
                <div className="text-[16px] font-semibold  text-dark-theme mt-2">搭子</div>
            </div>
        </header>
    );
};

export default Header;
