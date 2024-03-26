import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Login.css';

interface LoginProps {
    onLogin: (localData: LocalData) => void;
}

interface LocalData {
    firstName: string;
    lastName: string;
    email: string;
}

function Login({ onLogin }: LoginProps) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [successLogin, setSuccessLogin] = useState(false);

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
            const localData:LocalData = {firstName: data.firstName, lastName: data.lastName, email:data.email};
            console.log(localData);
            setSuccessLogin(true);
            onLogin(localData);     
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
                    <input type='email' id='email' name='email' placeholder='Enter email:' 
                        onChange={(e) => setEmail(e.target.value)} required></input>
                    <input type='password' id='password' name='password' placeholder='Enter password:' 
                        onChange={(e) => setPassword(e.target.value)} required></input>
                </div>
                <div className='input-group button-container'>
                    <button type='submit'>Login</button>
                </div>
                {successLogin && <Navigate to='/dashboard'/>}
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Login;
