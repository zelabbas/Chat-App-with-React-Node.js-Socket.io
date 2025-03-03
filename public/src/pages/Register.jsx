import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import images from '../assets/assets';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utls/APIRoutes';

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const toastoptions = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark'
  };

  const handleValidation = () => {
    const {username, email, password, confirmPassword} = values;
    if (!username || !email || !password || !confirmPassword) {
      toast.error('All fields are required', toastoptions);
      return false;
    }

    if (username.length < 3) {
      toast.error('Username must be at least 3 characters', toastoptions);
      return false;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match', toastoptions);
      return false;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters', toastoptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert('Form submitted');

    if (!handleValidation()) {
      return;
    }

    console.log("we are in validation data:", registerRoute);
    const {username, email, password} = values;
    try {
        const {data} =  await axios.post(registerRoute, {
          username,
          email,
          password
        });
    console.log(data);
    if (data.status === false) {
      toast.error(data.message, toastoptions);
      return;
    }

    if (data.status === true) {
      toast.success('User created successfully', toastoptions);
      localStorage.setItem('chat-app-user', JSON.stringify(data.user));
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }

    alert('Form1111 submitted');
  }catch(err) {
    console.log(err);
  }

  }



  const handleChange = (event) => {
    console.log(event.target.value);
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  return (
    <>
    <p>Register page</p>
    <FormContainer>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
          <img src={images.logo} alt="logo" />
        </div>
        <input type="text"
               placeholder='Username' 
               name='username'
               value={values.username}
               onChange={e => handleChange(e)}
        /> 
        <input type="Email"
               placeholder='Email' 
               name='email'
               value={values.email}
               onChange={e => handleChange(e)}
        />
         <input type="password"
               placeholder='Password' 
               name='password'
               value={values.password}
               onChange={e => handleChange(e)}
        />
         <input type="password"
               placeholder='Confirm Password' 
               name='confirmPassword'
               value={values.confirmPassword}
               onChange={e => handleChange(e)}
        />
        <button type='submit'>Create User</button>
        <span>
          already have an account ? <Link to="/login">Login</Link>
        </span>
      </form>
    </FormContainer>
    <ToastContainer />
  </>
  );
}

const FormContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    width: 100%;
    max-width: 500px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background: #fff;
  }

  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .brand img {
    width: 50%;
    height: 50%;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    color: #1D1F39;
  }

  button {
    width: 100%;
    padding: 10px;
    background: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }

  span {
    display: block;
    margin-top: 10px;
    text-align: center;
  }

  span a {
    color: #333;
    text-decoration: none;
    transition: all 0.3s;
    font-weight: bold;
    text-transform: uppercase;
  }

  input:focus {
    outline: none;
    border-color: #1D1F39;
  }

  input::placeholder {
    color: A9A9A9;
  }
  
  button:hover {
    background: #1D1F39;
    scale: 1.01;
  }

  span a:hover {
    color: #1D1F39;
    text-decoration: underline;
  }

`;

export default Register;
