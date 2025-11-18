import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Login from '../src/pages/Login';
import { jest } from '@jest/globals';

describe('Login component tests', () => {
    let onLoginMock= jest.fn();

    beforeEach(() => {
        onLoginMock = jest.fn();
        jest.clearAllMocks();
    });

    it('calls the backend API and logs in successfully', async () => {
        axios.post = jest.fn().mockResolvedValue({
            data: { token: 'mockToken' },
        });

        let {container} = render(<Login onLogin={onLoginMock} />);

        fireEvent.change(screen.getByLabelText('Username'), {
            target: { value: 'user' },
        });
        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'password123' },
        });

        console.log(container.innerHTML)

        fireEvent.click(screen.getByText('Login'));

        expect(axios.post).toHaveBeenCalledWith('/api/auth/login', {
            username: 'user',
            password: 'password123',
        });
        await screen.findByText('Login to Chat'); // Wait for any potential render update

        expect(localStorage.getItem('token')).toBe('mockToken');
        expect(onLoginMock).toHaveBeenCalledTimes(1);
    });
});
