import React, { Component } from 'react';
import './Form.css';
import Input from './Input/Input';
import Signin from './Signin/Signin';
import Register from './Register/Register';

class Form extends Component {
  state = {
    signin: {
      email: {
        label: 'Your email',
        type: 'text',
        placeholder: 'Your email',
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        focused: false
      },
      password: {
        label: 'Your password',
        type: 'password',
        placeholder: 'Your password',
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        focused: false
      },
    },
    register: {
      name: {
        label: 'Your name',
        type: 'text',
        placeholder: 'Your name',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        focused: false
      },
      email: {
        label: 'Your email',
        type: 'text',
        placeholder: 'Your email',
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        focused: false
      },
      password: {
        label: 'Your password',
        type: 'password',
        placeholder: 'Your password',
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        focused: false
      },
    },
    isValid: false
  }

  validateFormElement = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }
    return isValid;
  }

  inputChangedHandler = (event, inputElement, element) => {
    let updatedState = {};
    if (element === this.state.signin) {
      updatedState = {...this.state.signin};
    } else if (element === this.state.register) {
      updatedState = {...this.state.register};
    }
    const updatedElement = {...updatedState[inputElement]};
    updatedElement.value = event.target.value;
    updatedElement.focused = true;
    updatedElement.valid = this.validateFormElement(event.target.value, updatedElement.validation);
    updatedState[inputElement] = updatedElement;
    let formIsValid = true;
    for (inputElement in updatedState) {
      formIsValid = updatedState[inputElement].valid && formIsValid;
    }
    if (element === this.state.signin) {
      this.setState({signin: updatedState, isValid: formIsValid});
    } else if (element === this.state.register) {
      this.setState({register: updatedState, isValid: formIsValid});
    }
  }
  
  render () {
    let route = this.props.route;
    let form = null;

    form = Object.keys(this.state[route]).map(element => {
      return (
        <Input
          key={element}
          type={this.state[route][element].type}
          placeholder={this.state[route][element].placeholder}
          invalid={this.state[route][element].focused ? !this.state[route][element].valid : null}
          changed={(event) => this.inputChangedHandler(event, element, this.state[route])}
          label={this.state[route][element].label} />
        )
      })

    if (this.props.route === 'signin') {
      return (
        <Signin
          Signin={form}
          setLoading = {this.props.setLoading}
          loadUser = {this.props.loadUser}
          onRouteChange = {this.props.onRouteChange}
          invalid={!this.state.isValid}
          email = {this.state.signin.email.value}
          password = {this.state.signin.password.value}
        />
      )
    } else {
      return (
        <Register
          Register={form}
          setLoading = {this.props.setLoading}
          loadUser = {this.props.loadUser}
          onRouteChange = {this.props.onRouteChange}
          invalid={!this.state.isValid}
          email = {this.state.register.email.value}
          password = {this.state.register.password.value}
          name = {this.state.register.name.value}
        />
      )
    }
  }
}

export default Form;
