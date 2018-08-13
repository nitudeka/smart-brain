import React from 'react';
import './Input.css';

const Input = (props) => {
  let styles = {}
  if (props.invalid) {
    styles = {borderBottom: '3px solid #ff7730'}
  }
  if (props.invalid === false) {
    styles = {borderBottom: '3px solid #55c57a'}
  }

  return (
    <div className='input-div'>
      <input
        className='input'
        style={styles}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.changed} />
      <label className='input-label'>{props.label}</label>
    </div>
  )
}

export default Input;
