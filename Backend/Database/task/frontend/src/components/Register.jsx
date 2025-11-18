import { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #653008;
  color: #e4e4e4;
  border: 1px solid #9c4501;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #9c4501;
  }
`;

const Register = ({ onError, onResult }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('api/auth/register', {
                username,
                password
            });

            const { token } = response.data;
            localStorage.setItem('token', token);

            onResult({
                status: response.status,
                body: response.data
            });
            onError('');
            setUsername('');
            setPassword('');
        } catch (error) {
            let errorMessage = error.response?.status || '';
            if (errorMessage) errorMessage += ': ';
            errorMessage += error.response?.data?.message || 'Registration failed'
            onError(errorMessage);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <Input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <Button type="submit">Register</Button>
        </Form>
    );
};

export default Register;