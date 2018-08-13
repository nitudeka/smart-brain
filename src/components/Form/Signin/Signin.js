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
        <h2 className='form-heading'>Signin</h2>
        {props.Signin}
        <button disabled={props.invalid} onClick={onSubmitSignin} className='form-btn'>Signin</button>
      </div>
    </div>
  )
}

export default Signin;
