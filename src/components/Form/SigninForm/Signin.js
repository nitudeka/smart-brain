import React from 'react';

const Signin = (props) => {
  const onSubmitSignin = () => {
    props.setLoading();
    fetch('https://immense-waters-65123.herokuapp.com/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: props.email,
        password: props.password
      })
    })
    .then(response => response.json())
      .then(user => {
        if (user.id) {
          props.setLoading();
          props.loadUser(user);
          props.onRouteChange('home');
        }
      })
  }
  
  return (
    <div className='form-container'>
      <div className='form'>
        <h2 className='form__heading'>Signin</h2>
        {props.form}
        <button disabled={!props.formIsValid} onClick={onSubmitSignin} className='form__button'>Signin</button>
      </div>
    </div>
  )
}

export default Signin;
