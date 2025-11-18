import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Chat from '../src/pages/Chat.jsx';
import { jest } from '@jest/globals';

describe('Chat tests', () => {
    let onLogoutMock= jest.fn();

    beforeEach(() => {
        onLogoutMock = jest.fn();
        jest.clearAllMocks();
        localStorage.clear();
    });

    it('retrieving messages', async () => {
        const mockMessages = [
            { id: 1, username: 'User1', content: 'First message' },
            { id: 2, username: 'User2', content: 'Second message' }
        ];
        axios.get = jest.fn().mockResolvedValue({ data: mockMessages });

        localStorage.setItem('token', 'mockToken');

        render(<Chat onLogout={onLogoutMock} />);

        expect(axios.get).toHaveBeenCalledWith('/api/messages', {
            headers: { Authorization: `Bearer mockToken` }
        });

        // Ensure messages are displayed correctly
        for (const message of mockMessages) {
            await screen.findByText(`${message.username}:`);
            expect(screen.getByText(message.content)).toBeInTheDocument();
        }
    });

    it('sending a new message', async () => {
        const mockMessages = [
            { id: 1, username: 'User1', content: 'First message' }
        ];

        // Mock backend API calls
        axios.get = jest.fn().mockResolvedValue({ data: mockMessages });
        axios.post = jest.fn().mockResolvedValue();

        localStorage.setItem('token', 'mockToken');

        render(<Chat onLogout={onLogoutMock} />);

        // Simulate message input
        const inputField = screen.getByPlaceholderText('Type a message...');
        fireEvent.change(inputField, { target: { value: 'New test message' } });

        // Simulate form submission (sending a message)
        const sendButton = screen.getByText('Send');
        fireEvent.click(sendButton);

        // Verify POST request
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('/api/messages',
                { content: 'New test message' },
                { headers: { Authorization: `Bearer mockToken` } }
            );
        }, { timeout: 1000 }); // Timeout of 1 second

        // Verify input field is cleared
        expect(inputField.value).toBe('');
    });

});
