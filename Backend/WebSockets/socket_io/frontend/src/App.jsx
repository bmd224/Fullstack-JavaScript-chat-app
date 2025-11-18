import {useState} from 'react';
import styled from '@emotion/styled';
import Tile from './components/Tile.jsx';
import GetMessages from './components/GetMessages.jsx';
import PostMessage from './components/PostMessage.jsx';
import DeleteMessage from './components/DeleteMessage.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import WebSocketDelete from './components/WebSocketDelete.jsx';
import WebSocketMessages from './components/WebSocketMessages.jsx';
import WebSocketSender from './components/WebSocketSender.jsx';
import './App.css';

const DashboardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const AppContainer = styled.div`
    min-height: 100vh;
    background-color: #121212;
    padding: 0;
    color: #e4e4e4;
`;

const Title = styled.h1`
    text-align: center;
    color: #555;
    margin-bottom: 0;
`;

function App() {
    // State for each tile
    const [getMessagesError, setGetMessagesError] = useState('');
    const [getMessagesResult, setGetMessagesResult] = useState(null);

    const [postMessageError, setPostMessageError] = useState('');
    const [postMessageResult, setPostMessageResult] = useState(null);

    const [deleteMessageError, setDeleteMessageError] = useState('');
    const [deleteMessageResult, setDeleteMessageResult] = useState(null);

    const [registerError, setRegisterError] = useState('');
    const [registerResult, setRegisterResult] = useState(null);

    const [loginError, setLoginError] = useState('');
    const [loginResult, setLoginResult] = useState(null);

    const [wsDeleteError, setWsDeleteError] = useState('');
    const [wsDeleteResult, setWsDeleteResult] = useState(null);

    const [wsError, setWsError] = useState('');

    const [wsSenderError, setWsSenderError] = useState('');
    const [wsSenderResult, setWsSenderResult] = useState(null);

    return (
        <AppContainer>
            <Title>Developer dashboard</Title>
            <DashboardGrid>
                <Tile title="GET Messages" error={getMessagesError} jsonData={getMessagesResult}>
                    <GetMessages
                        onError={setGetMessagesError}
                        onResult={setGetMessagesResult}
                    />
                </Tile>

                <Tile title="POST Message" error={postMessageError} jsonData={postMessageResult}>
                    <PostMessage
                        onError={setPostMessageError}
                        onResult={setPostMessageResult}
                    />
                </Tile>

                <Tile title="DELETE Message" error={deleteMessageError} jsonData={deleteMessageResult}>
                    <DeleteMessage
                        onError={setDeleteMessageError}
                        onResult={setDeleteMessageResult}
                    />
                </Tile>

                <Tile title="Register" error={registerError} jsonData={registerResult}>
                    <Register
                        onError={setRegisterError}
                        onResult={setRegisterResult}
                    />
                </Tile>

                <Tile title="Login" error={loginError} jsonData={loginResult}>
                    <Login
                        onError={setLoginError}
                        onResult={setLoginResult}
                    />
                </Tile>

                <Tile title="WebSocket Messages" error={wsError}>
                    <WebSocketMessages
                        onError={setWsError}
                        error={wsError}
                    />
                </Tile>

                <Tile title="WebSocket Sender" error={wsSenderError} jsonData={wsSenderResult}>
                    <WebSocketSender
                        onError={setWsSenderError}
                        onResult={setWsSenderResult}
                        error={wsSenderError}
                    />
                </Tile>

                <Tile title="WebSocket Delete" error={wsDeleteError} jsonData={wsDeleteResult}>
                    <WebSocketDelete
                        onError={setWsDeleteError}
                        onResult={setWsDeleteResult}
                    />
                </Tile>
            </DashboardGrid>
        </AppContainer>
    );
}

export default App;
