import React from 'react';
import './Spinner.css';

const Spinner = (props) => {
  if (props.show) {
    return (
      <div className='spinner'>
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    )
  } else {
    return <div></div>
  }
}

export default Spinner;
