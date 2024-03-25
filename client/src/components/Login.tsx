import React from 'react';
import './Login.css';

function Login() {
    const inputText = (event) => {
        const input = event.target;
        input.placeholder = '';
    };

    const inputFocus = (event) => {
        const input = event.target;
        if (!input.value) {
            if (input.id === 'email') {
                input.placeholder = 'Enter email:';
            } else if (input.id === 'password') {
                input.placeholder = 'Enter password:';
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className='login-container'>
            <form className='login-form' onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className='input-group'>
                    <input type='text' id='email' name='email' placeholder='Enter email:' 
                    onClick={inputText} onBlur={inputFocus} required></input>
                    <input type='password' id='password' name='password' placeholder='Enter password:' 
                    onClick={inputText} onBlur={inputFocus} required></input>
                </div>
                <div className='input-group button-container'>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
