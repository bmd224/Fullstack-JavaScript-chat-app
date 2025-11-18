import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';
import { jest } from '@jest/globals';
import {BrowserRouter} from "react-router-dom";

const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test Page', route);
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Token management tests', () => {

    beforeEach(() => {
        localStorage.clear(); // Clear localStorage to avoid persistence issues across tests
    });

    it('App verifies token presence in localStorage and updates authentication state', () => {
        // Simulate token existence in localStorage
        localStorage.setItem('token', 'mockToken');

        renderWithRouter(<App />, { route: '/login' });

        expect(localStorage.getItem('token')).toBe('mockToken');
        expect(screen.getByText('Chat will be here.')).toBeInTheDocument();
    });

    it('App handles absence of token: updates authentication state to false', () => {

        renderWithRouter(<App />, { route: '/login' });

        expect(localStorage.getItem('token')).toBe(null);
        expect(screen.getByText('Login to Chat')).toBeInTheDocument();
    });

    it('Chat removes token from localStorage upon logout', () => {
        const removeItemSpy = jest.spyOn(localStorage, 'removeItem');

        // Simulate token existence in localStorage
        localStorage.setItem('token', 'mockToken');

        renderWithRouter(<App />, { route: '/chat' });

        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton); // Simulate logout

        expect(localStorage.getItem('token')).toBe(null); // Verify token is removed
        expect(screen.getByText('Login to Chat')).toBeInTheDocument();
    });
});