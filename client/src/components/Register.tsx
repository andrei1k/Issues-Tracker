import React, { Component } from 'react';
import './Register.css';

interface RegisterState {
  firstName: string,
  lastName: string,
  email: string,
  password: string;
  confirmPassword: string;
  passwordsMatch: boolean;
}

class Register extends Component<{}, RegisterState> {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordsMatch: true
    };

    // this.inputText = this.inputText.bind(this);
    // this.inputFocus = this.inputFocus.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleConfirmPasswordChange(event) {
    const confirmPassword = event.target.value;
    this.setState((prevState) => ({
      confirmPassword,
      passwordsMatch: confirmPassword === prevState.password,
    }));

    if (this.state.password === '') {
      this.setState({passwordsMatch: true}); 
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const firstName = event.target.elements['first-name'].value;
    const lastName = event.target.elements['last-name'].value;
    const email = event.target.elements['email'].value;
    // console.log({ firstName, lastName, email });

    const dataE = { firstName, lastName, email };
    fetch('http://10.108.4.127:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataE)      
    })
    .then(response => response.json())
    .then(data => {
      console.log('Callback from server:', data);
    })
    .catch(error => {
      console.error('Error sending query:', error);
    });
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
                          onClick={this.inputText} onBlur={this.inputFocus} onChange={this.handlePasswordChange} required></input>
                      <input type='password' id='confirm-password' name='confirm-password' placeholder='Confirm password:' 
                          onClick={this.inputText} onBlur={this.inputFocus} onChange={this.handleConfirmPasswordChange} required></input>
                      {!this.state.passwordsMatch && <p id="p-match">Passwords do not match</p>}
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