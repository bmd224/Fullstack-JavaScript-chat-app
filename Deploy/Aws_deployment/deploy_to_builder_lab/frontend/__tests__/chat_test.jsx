import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { jest } from '@jest/globals';
import {act} from "react";

const socketMock = {
    connect: jest.fn(),
    disconnect: jest.fn(),
    emit: jest.fn(),
    on: jest.fn(),
};

jest.unstable_mockModule("socket.io-client", () => ({
    __esModule: true,
    default: (...args) => {
        socketMock.params.url = args[0] ?? null;
        socketMock.params.opts = args[1] ?? null;
        return socketMock;
    },
}));

const chat_module = await import('../src/pages/Chat.jsx');
const { default: Chat } = chat_module;

describe('Chat tests', () => {
    let onLogoutMock= jest.fn();

    beforeEach(() => {
        onLogoutMock = jest.fn();
        socketMock.connect = jest.fn();
        socketMock.disconnect = jest.fn();
        socketMock.emit = jest.fn();
        socketMock.on = jest.fn();
        socketMock.params = {};
        jest.clearAllMocks();
        localStorage.clear();
        localStorage.setItem('token', 'mockToken');
    });

    it('creating a new WebSocket connection', async () => {
        const mockMessages = [
            { id: 1, username: 'User1', content: 'First message' },
            { id: 2, username: 'User2', content: 'Second message' }
        ];

        axios.get = jest.fn().mockResolvedValue({ data: mockMessages });
        render(<Chat onLogout={onLogoutMock} />);
        await waitFor(() => {
            expect(socketMock.params.url).toBe('/');
            expect(socketMock.params.opts).toStrictEqual({ auth: { token: "mockToken" } });
        }, { timeout: 1000 }); // Timeout of 1 second

    })

    it('sending a new message', async () => {
        const mockMessages = [
            { id: 1, username: 'User1', content: 'First message' },
            { id: 2, username: 'User2', content: 'Second message' }
        ];

        axios.get = jest.fn().mockResolvedValue({ data: mockMessages });

        render(<Chat onLogout={onLogoutMock} />);

        const inputField = screen.getByPlaceholderText('Type a message...');
        fireEvent.change(inputField, { target: { value: 'New test message' } });

        const sendButton = screen.getByText('Send');
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(socketMock.emit).toHaveBeenCalledWith('message',
                { content: 'New test message' },
            );
        }, { timeout: 1000 }); // Timeout of 1 second

        expect(inputField.value).toBe('');
    });

    it('displays new messages received via WebSocket', async () => {
        const mockMessages = [
            { id: 1, username: 'User1', content: 'First message' },
            { id: 2, username: 'User2', content: 'Second message' },
        ];

        // Mock Axios `get` response for initial messages
        axios.get = jest.fn().mockResolvedValue({ data: mockMessages });

        render(<Chat onLogout={onLogoutMock} />);

        // Check that initial mock messages are displayed
        await screen.findByText('First message');
        expect(screen.getByText('Second message')).toBeInTheDocument();

        // Simulate receiving a new "message" event via the WebSocket
        const newMessage = { id: 3, username: 'User3', content: 'New incoming message' };
        const messageCallback = socketMock.on.mock.calls.find(call => call[0] === 'message')[1];
        act(() => {
            messageCallback(newMessage);
        });

        expect(await screen.getByText('User3:')).toBeInTheDocument();
        expect(screen.getByText('New incoming message')).toBeInTheDocument();
    });

    it('deletes a message when delete button is clicked', async () => {
        const mockMessages = [
            { id: 1, username: 'User1', content: 'First message' },
            { id: 2, username: 'User2', content: 'Second message' }
        ];

        axios.get = jest.fn().mockResolvedValue({ data: mockMessages });

        render(<Chat onLogout={onLogoutMock} />);

        // Wait until the mock messages are displayed
        await screen.findByText('First message');
        expect(screen.getByText('Second message')).toBeInTheDocument();

        // Locate and click the delete button for the first message
        const deleteButton = screen.getAllByAltText('Delete')[0];
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(socketMock.emit).toHaveBeenCalledWith('deleteMessage', { messageId: 1 });
        });
    });

    it('removes a message from the list when messageDeleted event is received', async () => {
        const mockMessages = [
            { id: 1, username: 'User1', content: 'First message' },
            { id: 2, username: 'User2', content: 'Second message' }
        ];

        axios.get = jest.fn().mockResolvedValue({ data: mockMessages });
        render(<Chat onLogout={onLogoutMock} />);

        // Wait until the mock messages are displayed
        await screen.findByText('First message');
        expect(screen.getByText('Second message')).toBeInTheDocument();

        // Simulate receiving a "messageDeleted" event
        const messageDeletedCallback = socketMock.on.mock.calls.find(call => call[0] === 'messageDeleted')[1];
        act(() => {
            messageDeletedCallback({ messageId: 1 });
        });

        // Verify that the first message is removed
        expect(screen.queryByText('First message')).not.toBeInTheDocument();
        expect(screen.getByText('Second message')).toBeInTheDocument();
    });


});
