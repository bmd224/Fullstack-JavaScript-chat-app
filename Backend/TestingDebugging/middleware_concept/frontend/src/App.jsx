import {useState} from 'react';
import styled from '@emotion/styled';
import Tile from './components/Tile.jsx';
import SumCalculator from './components/SumCalculator.jsx';
import StrConcat from './components/StrConcat.jsx';
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
    const [sumError, setSumError] = useState('');
    const [sumResult, setSumResult] = useState(null);

    const [concatError, setConcatError] = useState('');
    const [concatResult, setConcatResult] = useState(null);

    return (
        <AppContainer>
            <Title>Developer dashboard</Title>
            <DashboardGrid>
                <Tile title="/sum route tester" error={sumError} jsonData={sumResult}>
                    <SumCalculator
                        onError={setSumError}
                        onResult={setSumResult}
                    />
                </Tile>
                <Tile title="/concat route tester" error={concatError} jsonData={concatResult}>
                    <StrConcat
                        onError={setConcatError}
                        onResult={setConcatResult}
                    />
                </Tile>
            </DashboardGrid>
        </AppContainer>
    );
}

export default App;
