import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import bg from '@/assets/dz.png';

const words = ['饭搭子', '游戏搭子', '自习搭子', '旅行搭子'];

export default function Login() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isLoginMode, setIsLoginMode] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 1500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen w-full flex flex-col bg-white">
            {/* 顶部导航栏 */}
            <nav className="w-full flex items-center justify-between px-[16px] py-4 box-border">
                <div className="flex items-center space-x-1 px-[12px] py-[4px] bg-theme rounded-2xl">
                    <span className=" font-bold text-white">搭子</span>
                </div>
            </nav>

            <p className="mt-[150px] text-center text-gray-700 text-xl px-[32px]">
                欢迎👏🏻, 你的【
                <span className="inline-block w-[160px] wrap-break-word text-3xl border-b border-gray-200 align-middle transition-all duration-300 text-green-700 font-semibold">
                    {words[currentWordIndex]}
                </span>
                】正在等你 ~
            </p>

            {/* 主体内容 */}
            <div
                className="flex flex-col items-center flex-1 rounded-lg mt-[100px] px-[32px] box-border"
                style={{ background: `no-repeat center/cover url(${bg})` }}>
                <>
                    {isLoginMode ? (
                        <LoginForm onSwitchToRegister={() => setIsLoginMode(false)} />
                    ) : (
                        <RegisterForm onSwitchToLogin={() => setIsLoginMode(true)} />
                    )}
                </>
            </div>
        </div>
    );
}
