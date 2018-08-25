import React from 'react';
import './Input.css';

const Input = (props) => {
  let style = {};
  if (props.focused) {
    if (props.valid) {
      style = {borderBottom: '3px solid #007e33'}
    } else {
      style = {borderBottom: '3px solid #ff3547'}
    }
  }
  
  return (
    <div className='input-container'>
      <input style={style} className='form-input' type={props.type} placeholder={props.placeholder} onChange={props.onChange} />
      <label className='input-label'>{props.label}</label>
    </div>
  )
}

export default Input;
