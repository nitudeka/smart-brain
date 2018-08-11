import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  state = {
    signin: {
      email: {
        label: 'Your email',
        type: 'text',
        placeholder: 'Your email',
        value: ''
      },
      password: {
        label: 'Your password',
        type: 'password',
        placeholder: 'Your password',
        value: ''
      }
    },
    register: {
      name: {
        label: 'Your name',
        type: 'text',
        placeholder: 'Your name',
        value: ''
      },
      email: {
        label: 'Your email',
        type: 'text',
        placeholder: 'Your email',
        value: ''
      },
      password: {
        label: 'Your password',
        type: 'password',
        placeholder: 'Your password',
        value: ''
      }
    }
  }

  onSubmitSignin = () => {
    this.props.setLoading();
    fetch('https://immense-waters-65123.herokuapp.com/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signin.email.value,
        password: this.state.signin.password.value
      })
    })
    .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.setLoading();
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      })
    }
  
  onSubmitRegister = () => {
    this.props.setLoading();
    fetch('https://immense-waters-65123.herokuapp.com/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.register.email.value,
        password: this.state.register.password.value,
        name: this.state.register.name.value
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.setLoading();
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      }
    )
  }

  signinInputChanged = (event, inputElement) => {
    const updatedState = {...this.state.signin};
    const updatedElement = {...updatedState[inputElement]};
    updatedElement.value = event.target.value;
    updatedState[inputElement] = updatedElement;
    this.setState({signin: updatedState});
  }

  registerInputChanged = (event, inputElement) => {
    const updatedState = {...this.state.register};
    const updatedElement = {...updatedState[inputElement]};
    updatedElement.value = event.target.value;
    updatedState[inputElement] = updatedElement;
    this.setState({register: updatedState});
  }

  Signin = Object.keys(this.state.signin).map(element => {
    return (
      <div className='inputDiv' key={element}>
        <input
          className='input'
          type={this.state.signin[element].type}
          placeholder={this.state.signin[element].placeholder}
          onChange={(event) => this.signinInputChanged(event, element)} />
        <label className='inputLabel'>{this.state.signin[element].label}</label>
      </div>
    )
  })

  Register = Object.keys(this.state.register).map(element => {
    return (
      <div className='inputDiv' key={element}>
        <input
          className='input'
          type={this.state.register[element].type}
          placeholder={this.state.register[element].placeholder}
          onChange={(event) => this.registerInputChanged(event, element)} />
        <label className='inputLabel'>{this.state.register[element].label}</label>
      </div>
    )
  })
  
  render () {
    if (this.props.route === 'signin') {
      return (
        <div className='form'>
          <h2 className='form-heading'>Signin</h2>
          {this.Signin}
          <button onClick={this.onSubmitSignin} className='input-btn'>Signin</button>
        </div>
      )
    } else {
      return (
        <div className='form'>
          <h2 className='form-heading'>Register</h2>
          {this.Register}
          <button onClick={this.onSubmitRegister} className='input-btn'>Register</button>
        </div>
      )
    }
  }
}

export default Form;
