import React from 'react';

const ClientLDAPIComponent = () => {
  
  return (
    <div>
      <h1>API TEST COMPONENT</h1>
      <button 
        id='test-api-button'
        onClick={() => console.log('API')}
      >Get Flag Status - LD API</button>
    </div>
  )
};

export default ClientLDAPIComponent;