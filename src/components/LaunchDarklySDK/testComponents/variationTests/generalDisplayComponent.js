import React, {useState, useEffect} from 'react';

const GeneralDisplayComponent = ({ name, description }) => {
  return (
    <div>
      <h2>{name}</h2>
      <h4>{description}</h4>
    </div>
  )
};

export default GeneralDisplayComponent;