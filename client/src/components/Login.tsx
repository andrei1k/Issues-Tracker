import React, { useState } from 'react';
import './Login.css';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await fetch('http://88.203.234.166:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => response.json())
        .then(data => {
            setMessage(`Logged: ${data?.firstName}`);
        })
        .catch(error => {
            setMessage('Wrong email or password!');
            console.error('Logging error:', error);
        });
    };

    return (
        <div className='login-container'>
            <form className='login-form' onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className='input-group'>
                    <input type='text' id='email' name='email' placeholder='Enter email:' 
                        onChange={(e) => setEmail(e.target.value)} required></input>
                    <input type='password' id='password' name='password' placeholder='Enter password:' 
                        onChange={(e) => setPassword(e.target.value)} required></input>
                </div>
                <div className='input-group button-container'>
                    <button type='submit'>Login</button>
                </div>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Login;
