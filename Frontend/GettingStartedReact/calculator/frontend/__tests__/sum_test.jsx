import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App.jsx';
import { customizeError } from "#utils/utils.js";

describe('App Component', () => {
    it('renders the input fields correctly', () => {
        try {
            render(<App />);
            expect(screen.getByLabelText('Enter 1st number:')).toBeInTheDocument();
            expect(screen.getByLabelText('Enter 2nd number:')).toBeInTheDocument();
            expect(screen.getByLabelText('Sum:')).toBeInTheDocument();
        } catch (e) {
            customizeError(e, 'Failed to find input fields', true);
            throw e;
        }
    });

    it('updates the sum field when entering numbers in both inputs', () => {
        try {
            render(<App />);
            const num1Input = screen.getByLabelText('Enter 1st number:');
            const num2Input = screen.getByLabelText('Enter 2nd number:');
            const sumField = screen.getByLabelText('Sum:');

            // Input in the first number field
            fireEvent.change(num1Input, { target: { value: '5' } });
            expect(num1Input.value).toBe('5');
            expect(sumField.value).toBe('5'); // Only num1 is set

            // Input in the second number field
            fireEvent.change(num2Input, { target: { value: '-20' } });
            expect(num2Input.value).toBe('-20');
            expect(sumField.value).toBe('-15'); // Sum is updated
        } catch (e) {
            customizeError(e, 'Failed to validate calculator functionality', true);
            throw e;
        }
    });

});