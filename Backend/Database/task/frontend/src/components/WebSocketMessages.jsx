import {useState, useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-json';
import io from 'socket.io-client';
import axios from 'axios';

const MessagesContainer = styled.div`
    max-height: 350px;
    overflow-y: auto;
    border: 1px solid #333;
    border-radius: 4px;
    padding: 10px;
    background-color: #222222;
`;

const Message = styled.div`
    margin-bottom: 8px;
    padding: 4px 0;
    border-bottom: 1px solid #eee;

    &:last-child {
        border-bottom: none;
    }
`;


const JsonContainer = styled.div`
    border: 1px solid #3a3a3a;
    border-radius: 4px;
    padding: 8px;
    background: #222;
    overflow-y: auto;
    min-height: 21px;
    margin: 0;
    font-size: 14px;
    flex-grow: 1; /* Allow the element to grow if there's available space */
    flex-shrink: 1; /* Allow the element to shrink if needed */
    max-height: 100%; /* Prevent exceeding the parent's height (TileContainer) */
    //width: 100%;
    //box-sizing: border-box;
    overflow-x: hidden;

    pre {
        margin: 0;
        background: transparent;
        padding: 0;
        white-space: pre-wrap;
        word-wrap: break-word;
        width: 100%;
    }

    code {
        font-family: 'Fira Code', monospace;
        font-size: 14px;
        background: transparent !important;
        white-space: pre-wrap !important;
        word-break: break-all;
        width: 100%;
        display: inline-block;
    }
`;

const RetryButton = styled.button`
  padding: 8px 16px;
  background-color: #444;
  color: #e4e4e4;
  border: 1px solid #555;
  border-radius: 4px;
  cursor: pointer;
  width: fit-content;
  flex-shrink: 0;

  &:hover {
    background-color: #555;
  }
`;

const WebSocketMessages = ({onError, error}) => {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    };

    const initSocket = () => {
        const token = localStorage.getItem('token');
        const newSocket = io('/', {
            auth: {token}
        });

        newSocket.on('message', (message) => {
            setMessages(prev => [...prev, message]);
        });

        newSocket.on('messageDeleted', (data) => {
            setMessages(prev => prev.filter(message => message.id !== data.messageId));
        });

        newSocket.on('connect_error', (error) => {
            onError('WebSocket connection error: ' + error.message);
        });

        newSocket.on('connect', () => {
            onError('');
        });

        setSocket(newSocket);
        return newSocket;
    }

    useEffect(() => {
        let newSocket = initSocket()

        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        scrollToBottom();

        const codeBlocks = document.querySelectorAll("code.language-json");
        codeBlocks.forEach((block) => {
            Prism.highlightElement(block);
        });

    }, [messages]);

    return (
        <div>
            {error && (
                <RetryButton type="button" onClick={initSocket}>
                    Reconnect
                </RetryButton>
            )}
            {!error && (
                <MessagesContainer>
                    {messages.map((message, index) => (
                        <Message key={index}>
                            <JsonContainer>
                        <pre>
                            <code className="language-json">
                            {JSON.stringify({
                                message
                            }, null, 2)
                            }
                            </code>
                        </pre>
                            </JsonContainer>
                        </Message>
                    ))}
                    <div ref={messagesEndRef}/>
                </MessagesContainer>
            )}

        </div>
    );
};

export default WebSocketMessages;