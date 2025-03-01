import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Register() {

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
  }

  const handleChange = (event) => {
    console.log(event.target.value);
  }

  return (
    <>
    <p>Register page</p>
    <FormContainer>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
          <img src="logo192.png" alt="logo" />
          <h1>Chat</h1>
        </div>
        <input type="text"
               placeholder='Username' 
               name='username'
               onChange={e => handleChange(e)}
        /> 
        <input type="text"
               placeholder='Email' 
               name='email'
               onChange={e => handleChange(e)}
        />
         <input type="password"
               placeholder='Password' 
               name='password'
               onChange={e => handleChange(e)}
        />
         <input type="password"
               placeholder='Confirm Password' 
               name='confirmPassword'
               onChange={e => handleChange(e)}
        />
        <button type='submit'>Create User</button>
        <span>
          already have an account ? <Link to="/login">Login</Link>
        </span>
      </form>
    </FormContainer>
  </>
  );
}

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default Register;
