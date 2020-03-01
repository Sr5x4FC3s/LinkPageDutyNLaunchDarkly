import React from 'react';

const Toggle = ({ changeToggleStatus, toggleStatus }) => {
  const options = ['Use Client SDK', 'Use Backend SDK']

  return (
    toggleStatus ? 
      <button id='toggle-button-client'
        onClick={changeToggleStatus}
      >{options[1]}</button> 
      : 
      <button id='toggle-button-backend'
        onClick={changeToggleStatus}
      >{options[0]}</button> 
  );
};

export default Toggle;