import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App.jsx';

import {customizeError} from "#utils/utils.js";


describe('App Component', () => {
    it('renders the input fields correctly', () => {
        try {
            render(<App/>);
            expect(screen.getByLabelText('Enter Text:')).toBeInTheDocument();
            expect(screen.getByLabelText('Duplicated Text:')).toBeInTheDocument();
        } catch (e) {
            customizeError(e, 'Failed to find fields', true);
            throw e;
        }
    });

    it('updates the duplicated text field when typing in the main input', () => {
        try {
            render(<App/>);
            const userInput = screen.getByLabelText('Enter Text:');
            const duplicatedText = screen.getByLabelText('Duplicated Text:');

            // Simulate typing into the input field
            fireEvent.change(userInput, {target: {value: 'Hello, React'}});
            expect(userInput.value).toBe('Hello, React');
            expect(duplicatedText.value).toBe('Hello, React');
        } catch (e) {
            customizeError(e, 'Failed to compare input/output', true);
            throw e;
        }
    });
});



