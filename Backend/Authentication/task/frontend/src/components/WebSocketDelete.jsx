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
  background-color: #4c1d1d;
  color: #e4e4e4;
  border: 1px solid #822727;
  border-radius: 4px;
  cursor: pointer;
  flex-grow: 1;

  &:hover {
    background-color: #822727;
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

const WebSocketDelete = ({ onError, onResult }) => {
    const [messageId, setMessageId] = useState('');
    const [socket, setSocket] = useState(null);

    const initSocket = () => {
        const token = localStorage.getItem('token');
        const newSocket = io('/', {
            auth: { token }
        });

        // newSocket.on('messageDeleted', (data) => {
        //   onResult({
        //     status: 200,
        //     body: { messageId: data.messageId }
        //   });
        //   setMessageId('');
        // });

        newSocket.on('error', (error) => {
            onError(error.message);
        });

        newSocket.on('connect_error', (error) => {
            onError('WebSocket connection error: ' + error.message);
        });

        newSocket.on('connect', () => {
            onError('');
        });

        setSocket(newSocket);
        return newSocket;
    };

    useEffect(() => {
        let newSocket = initSocket();
        return () => {
            newSocket.close();
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!socket?.connected) {
                onError('WebSocket connection is not established');
                return;
            }
            const payload = { messageId };
            socket.emit('deleteMessage', payload);
            onResult({ sent: true, payload});
            onError('');
        } catch (error) {
            onError(`Failed to delete message via WebSocket: ${error.message}`);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                type={"text"}
                value={messageId}
                onChange={(e) => setMessageId(e.target.value)}
                placeholder="Enter message ID"
            />
            <ButtonContainer>
                <Button type="submit">Delete Message</Button>
                <RetryButton type="button" onClick={initSocket}>
                    Reconnect
                </RetryButton>
            </ButtonContainer>
        </Form>
    );
};

export default WebSocketDelete;