import React from 'react';
import logo from '@/assets/dz.png';

const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
            <div className="flex items-center">
                <img
                    src={logo}
                    alt="Logo"
                    className="h-12 w-auto"
                />
            </div>
            <div className="text-3xl font-semibold text-dark-theme">搭子</div>
        </header>
    );
};

export default Header;
