import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import {useState} from "react";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div className="app">
            <Routes>
                <Route
                    path="/login"
                    element={
                        !isAuthenticated ? (
                            <Login onLogin={() => setIsAuthenticated(true)} />
                        ) : (
                            <Navigate to="/chat" replace />
                        )
                    }
                />
                <Route
                    path="/register"
                    element={
                        !isAuthenticated ? (
                            <Register onLogin={() => setIsAuthenticated(true)} />
                        ) : (
                            <Navigate to="/chat" replace />
                        )
                    }
                />
                <Route
                    path="/chat"
                    element={
                        isAuthenticated ? (
                            <Chat onLogout={() => setIsAuthenticated(false)} />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
        </div>
    );
}

export default App;
