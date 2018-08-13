import React from 'react';

const Register = (props) => {
  const onSubmitRegister = () => {
    props.setLoading();
    fetch('https://immense-waters-65123.herokuapp.com/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: props.email,
        password: props.password,
        name: props.name
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          props.setLoading();
          props.loadUser(user);
          props.onRouteChange('home');
        }
      }
    )
  }
  
  return (
    <div className='form-container'>
      <div className='form'>
        <h2 className='form-heading'>Register</h2>
        {props.Register}
        <button disabled={props.invalid} onClick={onSubmitRegister} className='form-btn'>Register</button>
      </div>
    </div>
  )
}

export default Register;
