import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, StrictMode } from 'react';
import Home from './pages/home';
import Login from './pages/login';
import DiscoverPage from './pages/discover';
import ActivityDetailPage from './pages/ActivityDetail';
import PostActivity from './pages/PostActivity';
import useUserStore from './store/user';

function App() {
    const { getUserInfo, userInfo, isLoading } = useUserStore();

    useEffect(() => {
        getUserInfo().catch(() => {
            // 如果获取失败，说明用户未登录或token已过期，忽略错误
            console.log('获取用户信息失败，用户未登录');
        });
    }, []);

    // 显示加载状态
    if (isLoading && !userInfo) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">正在加载...</p>
                </div>
            </div>
        );
    }

    return (
        <StrictMode>
            <Router>
                <div className="min-h-screen bg-gray-50">
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/discover"
                                element={<DiscoverPage />}
                            />
                            <Route
                                path="/discover/activity/:id"
                                element={<ActivityDetailPage />}
                            />
                            <Route
                                path="/post-activity"
                                element={<PostActivity />}
                            />
                        </Routes>
                    </main>
                </div>
            </Router>
        </StrictMode>
    );
}

export default App;
