import React, { Component } from 'react';
import Input from '../Input/Input';
import FormValidation from '../FormValidation';
import '../Form.css';

class Signin extends Component {
  state = {
    form: {
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
      }
    },
    formIsValid: false
  }

  onSubmitSignin = () => {
    this.props.setLoading();
    fetch('https://immense-waters-65123.herokuapp.com/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.form.email.value,
        password: this.state.form.password.value
      })
    })
    .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.setLoading();
          this.props.loadUser(user);
        }
      })
    }

  onInputChange = (event, element) => {
    const updatedState = {...this.state.form};
    const updatedElement = {...updatedState[element]};
    updatedElement.value = event.target.value;
    updatedElement.focused = true;
    updatedElement.valid = FormValidation(event.target.value, updatedElement.validation);
    updatedState[element] = updatedElement;
    let formIsValid = true;
    Object.keys(updatedState).map(elements => {
      return formIsValid = updatedState[elements].valid && formIsValid;
    })
    this.setState({form: updatedState, formIsValid: formIsValid});
  }
  
  render () {
    const form = Object.keys(this.state.form).map(element => {
      return <Input
        valid={this.state.form[element].valid}
        focused={this.state.form[element].focused}
        key={element}
        placeholder={this.state.form[element].placeholder}
        type={this.state.form[element].type}
        label={this.state.form[element].label}
        onChange={(event) => this.onInputChange(event, element)}
      />
    })
    
    return (
      <div className='form-container'>
        <div className='form'>
          <div className='form-header'>
            <h3 className='form-heading'>Signin</h3>
          </div>
          {form}
          <button disabled={!this.state.formIsValid} className='form-button' onClick={this.onSubmitSignin}>Signin</button>
        </div>
      </div>
    )
  }
}

export default Signin;
