import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import { useState, useEffect } from "react";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if a token exists in localStorage on page load
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);  // user stays logged in
        } else {
            setIsAuthenticated(false); // ensure logout if token missing
        }
    }, []); // runs ONLY on first render
    }, []);

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
