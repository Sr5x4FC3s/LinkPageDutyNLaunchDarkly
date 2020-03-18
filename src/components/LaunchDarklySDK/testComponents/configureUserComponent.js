import React, {useState, useEffect} from 'react';

const ConfigureUserComponent = ({ retrieveUserConfiguration }) => {
  const [ipAddress, setIpAddress] = useState('');
  const [key, setKey] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  return (
    <div>
      <h2>Configure User Data and Options</h2>
      <div>Anonymous (On/Off)</div>
      {!anonymous ? 
        <div style={{width: '100px', height: '50px', backgroundColor: 'red'}}>Anonymous Indicator: {anonymous}</div>
        : 
        <div style={{width: '100px', height: '50px', backgroundColor: 'green'}}>Anonymous Indicator: {anonymous}</div>
      }
      <button               
        onClick={() => setAnonymous(!anonymous)}
      >Toggle
      </button>
      <form>
        <label>
          IP Address
          <input 
            type='text'
            onChange={e => setIpAddress(e.target.value)}
            placeholder='IP Address'
          />
        </label>
        <label>
          Key
          <input 
            type='text'
            onChange={e => setKey(e.target.value)}
            placeholder='Key'
          />
        </label>
        <label>
          First Name
          <input 
            type='text'
            onChange={e => setFirstName(e.target.value)}
            placeholder='First Name'
          />
        </label>
        <label>
          Last Name
          <input 
            type='text'
            onChange={e => setLastName(e.target.value)}
            placeholder='Last Name'
          />
        </label>
        <label>
          Email
          <input 
            type='text'
            onChange={e => setEmail(e.target.value)}
            placeholder='Email'
          />
        </label>
        <label>
          Country
          <input 
            type='text'
            onChange={e => setCountry(e.target.value)}
            placeholder='Country'
          />
        </label>
        <label>
          Name
          <input 
            type='text'
            onChange={e => setCountry(e.target.value)}
            placeholder='Name'
          />
        </label>
        <label>
          Anonymous
          <button               
            onClick={() => setAnonymous(!anonymous)}
          >Toggle
          </button>
        </label>
        <input 
          type='submit'
          value='submit'
          onSubmit={() => retrieveUserConfiguration({
            ip: ipAddress,
            key,
            firstName,
            lastName,
            email, 
            country,
            name,
            anonymous
          })}
        />
      </form>
    </div>
  )
};

export default ConfigureUserComponent;