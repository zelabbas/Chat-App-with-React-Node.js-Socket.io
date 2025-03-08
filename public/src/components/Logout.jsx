import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from 'react-icons/bi';


function Logout() {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.clear();
        navigate("/login");
    }
  return (
    <div>
       <Button onClick={handleClick}>
            <BiPowerOff />
       </Button>
    </div>
  )
}

const Button = styled.div`
background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #882fe0;
    border: none;
    cursor: pointer;

    svg {
        font-size: 1.2rem;
        color: #ebe7ff;
    }
`;
export default Logout;
