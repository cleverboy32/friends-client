import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, StrictMode } from 'react';
import Home from './pages/home';
import Login from './pages/login';
import DiscoverPage from './pages/discover';
import ActivityDetailPage from './pages/ActivityDetail';
import PostActivity from './pages/PostActivity';
import PersonPage from './pages/person';
import NotificationsPage from './pages/Notifications';
import Header from './components/Header';
import useUserStore from './store/user';
import { connectWebSocket } from './utils/websocket';

function App() {
    const location = useLocation();
    const showHeader = location.pathname !== '/login';
    const { userInfo, getUserInfo } = useUserStore();

    useEffect(() => {
        if (location.pathname !== '/login') {
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
                {showHeader && <Header />}
                <main>
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
                </main>
            </div>
        </StrictMode>
    );
}

export default App;
