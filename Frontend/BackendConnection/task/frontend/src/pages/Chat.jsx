import { useState, useEffect } from 'react';
import axios from 'axios';

function Chat({ onLogout }) {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');


    const handleLogout = () => {
        // delete the token from the `localStorage`
        localStorage.removeItem('token');
        onLogout();
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // retrieve a token
                const token = localStorage.getItem('token');

                // GET request to the /api/messages route
                const response = await axios.get('/api/messages', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // use setMessages to update a messages array
                setMessages(response.data)
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            }
        };

        fetchMessages().then(() => console.log('Successfully fetched messages!'));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // does not allow sending empty messages:
        if (!newMessage.trim()) return;

        try {
            // retrieve a token
            const token = localStorage.getItem('token');

            // make a POST request to the /api/messages route
            await axios.post(
                '/api/messages',
                { content: newMessage },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // clear a newMessage variable
            setNewMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
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
