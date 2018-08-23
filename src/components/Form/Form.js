import React, { Component } from 'react';
import './Form.css';

import Input from './Input/Input';
import Signin from './SigninForm/Signin';
import Register from './RegisterForm/Register';

class Form extends Component {
  state = {
    signin: {
      email: {
        type: 'email',
        placeholder: 'Your Email',
        label: 'Your Email',
        value: '',
        valid: false,
        focused: false,
        validation: {
          required: true,
          isEmail: true
        }
      },
      password: {
        type: 'password',
        placeholder: 'Your Password',
        label: 'Your Password',
        value: '',
        valid: false,
        focused: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    },
    register: {
      name: {
        type: 'text',
        placeholder: 'Your Name',
        label: 'Your Name',
        value: '',
        valid: false,
        focused: false,
        validation: {
          required: true
        }
      },
      email: {
        type: 'email',
        placeholder: 'Your Email',
        label: 'Your Email',
        value: '',
        valid: false,
        focused: false,
        validation: {
          required: true,
          isEmail: true
        }
      },
      password: {
        type: 'password',
        placeholder: 'Your Password',
        label: 'Your Password',
        value: '',
        valid: false,
        focused: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    },
    formIsValid: false
  }

  validateForm = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.length > 0 && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }

  onInputChange = (event, element) => {
    const updatedState = {...this.state};
    const elementState = {...updatedState[this.props.form]};
    const updatedElement = elementState[element];
    let isValid = this.validateForm(event.target.value, updatedElement.validation);
    updatedElement.value = event.target.value;
    updatedElement.valid = isValid;
    updatedElement.focused = true;
    elementState[element] = updatedElement;
    let formIsValid = true;
    Object.keys(this.state[this.props.form]).map(elements => {
      return formIsValid = this.state[this.props.form][elements].valid && formIsValid;
    })
    this.setState({ signin: elementState, formIsValid: formIsValid });
  }
  
  render () {
    const form = Object.keys(this.state[this.props.form]).map(element => {
      return (
        <Input
          focused={this.state[this.props.form][element].focused}
          isValid={this.state[this.props.form][element].valid}
          onInputChange={(event) => this.onInputChange(event, element)}
          key={element}
          type={this.state[this.props.form][element].type}
          placeholder={this.state[this.props.form][element].placeholder}
          label={this.state[this.props.form][element].label}
        />
      )
    })

    if (this.props.form === 'signin') {
      return <Signin
        formIsValid={this.state.formIsValid} form={form} 
        setLoading = {this.props.setLoading}
        loadUser = {this.props.loadUser}
        onRouteChange = {this.props.onRouteChange}
        invalid={!this.state.isValid}
        email = {this.state.signin.email.value}
        password = {this.state.signin.password.value}
      />
    } else if (this.props.form === 'register') {
      return <Register
        formIsValid={this.state.formIsValid} form={form}
        setLoading = {this.props.setLoading}
        loadUser = {this.props.loadUser}
        onRouteChange = {this.props.onRouteChange}
        invalid={!this.state.isValid}
        email = {this.state.signin.email.value}
        password = {this.state.signin.password.value}
      />
    } else {
      return null
    }
  }
}

export default Form;
