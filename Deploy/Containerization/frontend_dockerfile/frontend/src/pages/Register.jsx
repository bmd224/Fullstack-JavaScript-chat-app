import {useState} from "react";
import axios from 'axios';

function Register({onLogin}) {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  // prevents a default form submission behavior
        setError('');  // clear the error message

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('/api/auth/register', {
                username: formData.username,
                password: formData.password
            });

            localStorage.setItem('token', response.data.token);

            onLogin();
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (<div className="container">
            <div className="login-form">
                <h2>Register for Chat</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={handleChange}
                            required
                            value={formData.username}
                            minLength="3"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            required
                            value={formData.password}
                            minLength="6"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={handleChange}
                            required
                            value={formData.confirmPassword}
                        />
                    </div>
                    <button type="submit"> Register </button>
                </form>
            </div>
        </div>);
}

export default Register;
