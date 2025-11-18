function Register({onLogin}) {

    const handleSubmit = async (e) => {
        onLogin();
    };

    return (<div className="container">
            <div className="login-form">
                <h2>Register for Chat</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            minLength="3"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            minLength="6"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                        />
                    </div>
                    <button type="submit"> Register </button>
                </form>
            </div>
        </div>);
}

export default Register;
