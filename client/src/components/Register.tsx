import React, { useState } from 'react';
import './Register.css';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const inputText = (event) => {
        const input = event.target;
        input.placeholder = '';
    };

    const inputFocus = (event) => {
        const input = event.target;
        if (!input.value) {
            if (input.id === 'first-name') {
                input.placeholder = 'Enter first name:';
            } else if (input.id === 'last-name') {
                input.placeholder = 'Enter last name:';
            } else if (input.id === 'email') {
                input.placeholder = 'Enter email:';
            } else if (input.id === 'password') {
                input.placeholder = 'Enter password:';
            } else if (input.id === 'confirm-password') {
                input.placeholder = 'Confirm password:';
            }
        }
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        const confirmPassword = event.target.value;
        setConfirmPassword(confirmPassword);
        setPasswordsMatch(confirmPassword === password);
        
        if (password === '') {
            setPasswordsMatch(true); 
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const reqData = { firstName, lastName, email, password };
        fetch('http://88.203.234.166:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqData)      
        })
        .then(response => response.json())
        .then(data => {
            console.log('Callback from server:', data);
        })
        .catch(error => {
            console.error('Error sending query:', error);
        });
    };

    return (
        <div className='register-container'>
            <form className='register-form' onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className='input-group'>
                    <input type='text' id='first-name' name='first-name' placeholder='Enter first name:' 
                        onClick={inputText} onBlur={inputFocus} required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type='text' id='last-name' name='last-name' placeholder='Enter last name:' 
                        onClick={inputText} onBlur={inputFocus} required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input type='text' id='email' name='email' placeholder='Enter email:' 
                        onClick={inputText} onBlur={inputFocus} required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type='password' id='password' name='password' placeholder='Enter password:' 
                        onClick={inputText} onBlur={inputFocus} required value={password} onChange={handlePasswordChange} />
                    <input type='password' id='confirm-password' name='confirm-password' placeholder='Confirm password:' 
                        onClick={inputText} onBlur={inputFocus} required value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    {!passwordsMatch && <p id="p-match">Passwords do not match</p>}
                </div>
                <div className='input-group button-container'>
                    <button type='submit'>Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
