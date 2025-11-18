import styled from '@emotion/styled';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-json';
import { useEffect, useRef } from 'react';

const TileContainer = styled.div`
    border: 1px solid #3a3a3a;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    
    flex-direction: column;
    gap: 10px;
    background: #2a2a2a;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    max-height: 410px; /* Define a maximum height, for instance, to fit within the viewport */
`;

const ErrorContainer = styled.div`
    color: ${props => props.hasError ? '#ff6b6b' : '#888'};
    background-color: ${props => props.hasError ? '#3d2828' : '#222'};
    padding: 8px;
    border-radius: 4px;
    min-height: 20px;
    font-size: 14px;
    border: 1px solid ${props => props.hasError ? '#4d2828' : '#333'};
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

const Tile = ({title, children, error, jsonData}) => {
    const codeRef = useRef(null);

    useEffect(() => {
        if (jsonData && codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    }, [jsonData]);

    return (
        <TileContainer>
            <h3>{title}</h3>
            {children}
            {error && (
                <ErrorContainer hasError={true}>
                    {error}
                </ErrorContainer>
            )}
            {!error && jsonData && (
                <JsonContainer>
                    <pre>
                        <code ref={codeRef} className="language-json">
                            {JSON.stringify(jsonData, null, 2)}
                        </code>
                    </pre>
                </JsonContainer>
            )}
        </TileContainer>
    );
};

export default Tile;
