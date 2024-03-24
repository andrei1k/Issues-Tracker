import React, { Component } from 'react';
import './Register.css';

class Register extends Component {
  inputText(event) {
      const input = event.target;
      input.placeholder = '';
  }

  inputFocus(event) {
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
  }
  handleSubmit(event) {
    event.preventDefault();
  }
    render() {
      return (
        <div className='register-container'>
                <form className='register-form' onSubmit={this.handleSubmit}>
                    <h2>Register</h2>
                    <div className='input-group'>
                      <input type='text' id='first-name' name='first-name' placeholder='Enter first name:' 
                          onClick={this.inputText} onBlur={this.inputFocus} required></input>
                      <input type='text' id='last-name' name='last-name' placeholder='Enter last name:' 
                          onClick={this.inputText} onBlur={this.inputFocus} required></input>
                      <input type='text' id='email' name='email' placeholder='Enter email:' 
                          onClick={this.inputText} onBlur={this.inputFocus} required></input>
                      <input type='password' id='password' name='password' placeholder='Enter password:' 
                          onClick={this.inputText} onBlur={this.inputFocus} required></input>
                      <input type='password' id='confirm-password' name='confirm-password' placeholder='Confirm password:' 
                          onClick={this.inputText} onBlur={this.inputFocus} required></input>
                    </div>
                    <div className='input-group button-container'>
                        <button type='submit'>Register</button>
                    </div>
                </form>
        </div>
        );
    }
}

export default Register;
