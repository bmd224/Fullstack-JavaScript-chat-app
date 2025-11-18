import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from '../src/App';
import { act } from 'react-dom/test-utils';

// Helper function to render components in Router context
const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test Page', route);
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Routing Logic in App Component', () => {
    beforeEach(() => {
        // Reset/cleanup route before every test

        window.history.pushState({}, '', '/login');
    });

    it('navigates to the Register page and renders the Register form', () => {
        renderWithRouter(<App />, { route: '/register' });

        expect(screen.getByText('Register for Chat')).toBeInTheDocument();
    });

    it('redirects to login if trying to access chat page while unauthenticated', () => {
        renderWithRouter(<App />, { route: '/chat' });

        // Ensure unauthenticated users are redirected back to login
        expect(screen.getByText('Login to Chat')).toBeInTheDocument();
    });

    it('navigates to chat page after successful login', async () => {
        const { container } = renderWithRouter(<App />);

        // Fill out login form fields
        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

        // Simulate form submission
        fireEvent.click(screen.getByText('Login'));

        // Ensure navigation to chat page
        expect(screen.getByText('Chat will be here.')).toBeInTheDocument();

        // Ensure the login form is no longer rendered
        expect(container.querySelectorAll('.login-form').length).toBe(0);
    });

    it('logs out from the chat page and returns to the login page', async () => {
        const { container } = renderWithRouter(<App />);

        // Simulate login
        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('Login'));

        // Verify navigation to chat page
        expect(screen.getByText('Chat will be here.')).toBeInTheDocument();

        // Simulate a logout action
        const logoutButton = screen.getByRole('button', { name: /logout/i });
        fireEvent.click(logoutButton);

        // Ensure the user is redirected to login
        expect(screen.getByText('Login to Chat')).toBeInTheDocument();

        // Verify no duplicate rendering happens
        expect(container.querySelectorAll('.login-form').length).toBe(1);
    });

    it('redirects authenticated users trying to access Register page back to chat', async () => {
        const { container } = renderWithRouter(<App />);

        // Simulate login
        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('Login'));

        // Verify navigation to chat page
        expect(screen.getByText('Chat will be here.')).toBeInTheDocument();

        // Attempt to access Register page directly
        act(() => {
            window.history.pushState({}, '', '/register');
        });
        renderWithRouter(<App />, { route: '/register' });

        // Ensure the user stays on the chat page
        expect(screen.getByText('Chat will be here.')).toBeInTheDocument();

        // Ensure the login form is not rendered
        expect(container.querySelectorAll('.login-form').length).toBe(0);
    });

    it('navigates to the Register page and proceeds to chat page after registration', () => {
        renderWithRouter(<App />, { route: '/register' });

        expect(screen.getByText('Register for Chat')).toBeInTheDocument();

        // Fill out the Register form
        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'newuser' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'newpassword123' } });
        fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'newpassword123' } });

        // Simulate form submission
        fireEvent.click(screen.getByText('Register'));

        // Ensure navigation to chat page
        expect(screen.getByText('Chat will be here.')).toBeInTheDocument();
    });
});