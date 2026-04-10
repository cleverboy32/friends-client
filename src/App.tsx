import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, StrictMode } from 'react';
import Home from './pages/home';
import Login from './pages/login';
import DiscoverPage from './pages/discover';
import ActivityDetailPage from './pages/ActivityDetail';
import PostActivity from './pages/PostActivity/index.tsx';
import PersonPage from './pages/person';
import NotificationsPage from './pages/Notifications';
import Header from './components/Header';
import Toast from './components/Toast';
import useUserStore from './store/user';
import { connectWebSocket } from './utils/websocket';

function App() {
    const location = useLocation();
    const { userInfo, getUserInfo } = useUserStore();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (location.pathname !== '/login' && location.pathname !== '/' && token) {
            getUserInfo();
        }
    }, [getUserInfo, location.pathname]);

    useEffect(() => {
        if (userInfo && userInfo.id) {
            console.log('User logged in, connecting WebSocket...');
            connectWebSocket();
        }
    }, [userInfo]);

    return (
        <StrictMode>
            <div className="min-h-screen bg-gray-50">
                <Header />
                <Toast />
                    <Routes>
                        <Route
                            path="/"
                            element={<Home />}
                        />
                        <Route
                            path="/login"
                            element={<Login />}
                        />
                        <Route
                            path="/discover"
                            element={<DiscoverPage />}
                        />
                        <Route
                            path="/activity/:id"
                            element={<ActivityDetailPage />}
                        />
                        <Route
                            path="/post-activity"
                            element={<PostActivity />}
                        />
                        <Route
                            path="/person/:userId"
                            element={<PersonPage />}
                        />
                        <Route
                            path="/notifications"
                            element={<NotificationsPage />}
                        />
                    </Routes>
            </div>
        </StrictMode>
    );
}

export default App;
