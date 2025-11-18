import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';

function App() {

    return (
        <div className="app">
            <Routes>
                <Route
                    path="/login"
                    element={
                        <Login onLogin={() => {}} />
                    }
                />
                <Route
                    path="/register"
                    element={
                            <Register onLogin={() => {}} />
                    }
                />
                <Route
                    path="/chat"
                    element={
                            <Chat onLogout={() => {}} />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
