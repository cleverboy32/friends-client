import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '@/store/user';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const words = ['饭搭子', '游戏搭子', '自习搭子', '旅行搭子'];

export default function Login() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const navigate = useNavigate();
    const { getUserInfo } = useUserStore();

    useEffect(() => {
        const checkLoginState = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    await getUserInfo();
                    navigate('/discover', { replace: true });
                } catch {
                    // 获取失败时 user store 中已自动清除 token
                }
            }
        };
        checkLoginState();
    }, [getUserInfo, navigate]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 1500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex-1 w-full flex flex-col bg-cover bg-center">
            {/* 主体内容 */}
            <div className="flex-1 flex items-center justify-center mx-auto my-[100px]">
                <div className="flex flex-col items-center flex-1 bg-white rounded-lg p-12">
                    <p className="mb-6 text-center text-gray-700">
                        欢迎👏🏻，你的【
                        <span className="inline-block w-[160px] text-3xl border-b border-gray-200 align-middle transition-all duration-300 text-green-700 font-semibold">
                            {words[currentWordIndex]}
                        </span>
                        】正在等你 ~
                    </p>
                    <div className="mt-4 px-10">
                        {isLoginMode ? (
                            <LoginForm onSwitchToRegister={() => setIsLoginMode(false)} />
                        ) : (
                            <RegisterForm onSwitchToLogin={() => setIsLoginMode(true)} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
