import React, {useState, useEffect} from 'react';

const GeneralDisplayComponent = ({ name, description }) => {
  return (
    <div>
      <h1>{name}</h1>
      <h4>{description}</h4>
    </div>
  )
};

export default GeneralDisplayComponent;