import React from 'react';
import styled from 'styled-components';
import images from '../assets/assets';

function Welcome({currentUser}) {
  return (
    <Container>
        <img src={images.robot} alt="robot" />
        <h1>Welcome, <span>{currentUser.username}</span></h1>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-direction: column;

    img {
    width: 150px;
    height: 150px; /* Ensure height and width are the same */
    border-radius: 50%;
    object-fit: cover;
    }

    h1 {
        color: white;

        span {
            color: #1414c5;
        }
    }
`;

export default Welcome;
