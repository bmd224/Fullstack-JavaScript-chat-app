function Chat({ onLogout }) {

    const handleLogout = () => {
        onLogout();
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <button
                    onClick={handleLogout}
                    className="logout-button"
                >
                    Logout
                </button>
            </div>
            <div>
                <h3>Chat will be here.</h3>
            </div>
        </div>
    );
}

export default Chat;
