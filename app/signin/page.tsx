'use client';


import React, { useState } from 'react';

export default function SignIn() {
    const [error, setError] = useState(false);

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        // Handle form submission logic
        event.preventDefault();
        // Example: You can make a fetch request to your backend here
    };

    return (
        <div className="container">
            <h1>Welcome!</h1>
            <form action="/signin" method="POST" onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>Invalid username or password. Please try again.</p>}
                <div className="input-container">
                    <input type="text" name="username" placeholder="Username" required />
                </div>
                <div className="input-container">
                    <input type="password" id="passwordInput" name="password" placeholder="Password" required />
                </div>
                <button type="submit">Sign In</button>
            </form>
            <p className="create-account">Don't have an account? <a href="/create">Create one</a></p>
        </div>
    );
}

