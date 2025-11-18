import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import io from 'socket.io-client';

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

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #2d5a27;
  color: #e4e4e4;
  border: 1px solid #3d7a37;
  border-radius: 4px;
  cursor: pointer;
  flex-grow: 1;

  &:hover {
    background-color: #3d7a37;
  }
`;

const RetryButton = styled.button`
  padding: 8px 16px;
  background-color: #444;
  color: #e4e4e4;
  border: 1px solid #555;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  width: fit-content;
  flex-shrink: 0;

  &:hover {
    background-color: #555;
  }
`;

const WebSocketSender = ({ onError, onResult, error }) => {
    const [content, setContent] = useState('');
    const [socket, setSocket] = useState(null);

    const initSocket = () => {
        const token = localStorage.getItem('token');
        const newSocket = io('/', {
            auth: {token}
        });

        // newSocket.on('message', (message) => {
        //   setMessages(prev => [...prev, message]);
        // });

        newSocket.on('connect_error', (error) => {
            onError('WebSocket connection error: ' + error.message);
        });

        newSocket.on('connect', () => {
            onError('');
        });

        setSocket(newSocket);
        return newSocket;
    }

    // Initialize socket connection
    useEffect(() => {
        let newSocket = initSocket()

        return () => {
            newSocket.close();
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!socket.connected){
            onError('WebSocket connection is not established');
            return;
        }

        try {
            const payload = { content };
            socket.emit('message', payload);
            onResult({ sent: true, payload });
            onError('');
            setContent('');
        } catch (error) {
            onError(`Failed to send message via WebSocket: ${error.message}`);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter message content"
            />
            <ButtonContainer>
                <Button type="submit">Send Message</Button>
                {error && (
                    <RetryButton type="button" onClick={initSocket}>
                        Reconnect
                    </RetryButton>
                )}
            </ButtonContainer>
        </Form>
    );
};

export default WebSocketSender;