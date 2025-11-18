import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Register from '../src/pages/Register';
import { jest }  from '@jest/globals';


describe('Register component tests', () => {
    let onLoginMock= jest.fn();

    beforeEach(() => {
        onLoginMock = jest.fn();
    });

    it('displays an error when passwords do not match', async () => {
        render(<Register onLogin={jest.fn()} />);

        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'user' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password456' } });

        fireEvent.click(screen.getByText('Register'));

        const errorMessage = await screen.findByText('Passwords do not match');

        expect(errorMessage).toBeInTheDocument();
    });

    it('calls the backend API on successful registration', async () => {
        axios.post = jest.fn().mockResolvedValue({ data: { token: 'mockToken' } });

        render(<Register onLogin={onLoginMock} />);

        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'user' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password123' } });

        fireEvent.click(screen.getByText('Register'));

        await screen.findByText(/Register for Chat/i); // Wait for any re-render

        expect(axios.post).toHaveBeenCalledWith('/api/auth/register', {
            username: 'user',
            password: 'password123',
        });

        expect(localStorage.getItem('token')).toBe('mockToken');
        expect(onLoginMock).toHaveBeenCalledTimes(1);
    });

});