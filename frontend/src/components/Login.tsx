import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
    inputText(event) {
        const input = event.target;
        input.placeholder = '';
    }

    inputFocus(event) {
        const input = event.target;
        if (!input.value) {
            if (input.id === 'username') {
                input.placeholder = 'Enter email:';
            } else if (input.id === 'password') {
                input.placeholder = 'Enter password:';
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        // Обработка на формата
    }

    render() {
        return (
            <div className="login-container">
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <h2>Login</h2>
                    <div className="input-group">
                        <input type="text" id="username" name="username" placeholder="Enter email:" 
                        onClick={this.inputText} onBlur={this.inputFocus} required></input>
                    </div>
                    <div className="input-group">
                        <input type="password" id="password" name="password" placeholder="Enter password:" 
                        onClick={this.inputText} onBlur={this.inputFocus} required></input>
                    </div>
                    <div className="input-group button-container">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
