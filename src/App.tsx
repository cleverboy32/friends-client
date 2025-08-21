import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/home';
import Login from './pages/login';
import DiscoverPage from './pages/discover';
import ActivityDetailPage from './pages/ActivityDetail';
import PostActivity from './pages/PostActivity';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/discover" element={<DiscoverPage />} />
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
    );
}

export default App;
