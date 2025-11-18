import { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

function Chat({ onLogout }) {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);

    const handleLogout = () => {
        socket?.close();
        localStorage.removeItem('token');
        onLogout();
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/messages', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            }
        };

        if(! socket){
            const newSocket = io('/', {
                auth: {
                    token: localStorage.getItem('token')
                }
            });

            newSocket.on('error', (error) => {
                console.error('Socket error:', error);
            });

            newSocket.on('message', (message) => {
                setMessages(prev => [...prev, message]);
            });

            newSocket.on('messageDeleted', (data) => {
                setMessages(prev => prev.filter(message => message.id !== data.messageId));
            });

            setSocket(newSocket);
        }

        fetchMessages().then(() => console.log('Successfully fetched messages!'));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // does not allow sending empty messages:
        if (!newMessage.trim()) return;

        try {
            socket?.emit('message', { content: newMessage });
            setNewMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    const handleDelete = async (messageId) => {
        try {
            socket?.emit('deleteMessage', { messageId });
        } catch (error) {
            console.error('Failed to delete message:', error);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <button
                    onClick={handleLogout}
                    className="logout-button"
                >
                    Logout
                </button>
            </div>
            <div className="messages-container">
                {messages.map((message) => (
                    <div key={message.id} className="message">
                        <strong>{message.username}: </strong>
                        <span>{message.content}</span>
                        <img
                            src="/src/assets/delete.svg"
                            alt="Delete"
                            onClick={() => handleDelete(message.id)}
                            className="delete-button"
                        />
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="message-form">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Chat;
