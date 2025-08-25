import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

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
        <div className="min-h-screen w-full flex flex-col bg-cover bg-center">
            {/* 顶部导航栏 */}
            <nav className="w-full flex items-center justify-between px-8 py-4">
                <div className="flex items-center space-x-1">
                    <img
                        src="/src/assets/logo.png"
                        alt="logo"
                        className="w-10 h-10"
                    />
                    <span className="text-3xl font-bold text-primary">
                        搭子
                    </span>
                </div>
            </nav>

            {/* 主体内容 */}
            <main className="flex-1 flex items-center justify-center mx-auto">
                <div className="flex flex-col items-center flex-1 bg-white rounded-lg p-12">
                    <p className="mb-6 text-center text-gray-700">
                        欢迎👏🏻，你的【
                        <span className="inline-block w-[160px] text-3xl border-b border-gray-400 align-middle transition-all duration-300 text-green-700 font-semibold">
                            {words[currentWordIndex]}
                        </span>
                        】正在等你 ~
                    </p>
                    <div className="mt-4 px-10">
                        {isLoginMode ? (
                            <LoginForm
                                onSwitchToRegister={() => setIsLoginMode(false)}
                            />
                        ) : (
                            <RegisterForm
                                onSwitchToLogin={() => setIsLoginMode(true)}
                            />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
