import React from 'react';

const Input = (props) => {
  let styles = {}
  if (props.focused) {
    if (props.isValid) {
      styles = {borderBottom: '3px solid #55c57a'}
    }
    if (props.isValid === false) {
      styles = {borderBottom: '3px solid #ff7730'}
    }
  }
  
  return (
    <div className='form__component'>
      <input style={styles} onChange={props.onInputChange} type={props.type} placeholder={props.placeholder} className='form__input' />
      <label className='form__label'>{props.label}</label>
    </div>
  )
}

export default Input;
