import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import images  from '../assets/assets';

function Contacts({contacts, currentUser, changeChat}) {
  
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);

    const ChangeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    }


    return (
    <>
        {
            currentUser && currentUserName && (
                <Container>
                    <div className="brand">
                        <img src={images.logo} alt='logo'/>
                    </div>
                    <div className="contacts">
                        {
                            contacts.map((contact, index) => {
                                return (
                                    <div className={`contact ${index === currentSelected ? "selected" : ""}`} key={index}
                                        onClick={() => ChangeCurrentChat(index, contact)}
                                    >
                                        <div className='avatar'>
                                            <img src={contact.avatarImage} alt="profile Img" />
                                        </div>
                                        <div className="username">
                                            <h3>{contact.username}</h3>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>

                    <div className="current-user contact">
                        <div className='avatar'>
                            <img src={currentUser.avatarImage} alt="profile Img" />
                        </div>
                        <div className="username">
                            <h3>{currentUserName}</h3>
                        </div>
                    </div>
                </Container>
            )
        }
    </>
  )
}

const Container = styled.div`
    background-color: #0f0a2c;
    display: grid;
    grid-template-rows: 8% 75% 15%;
    overflow: hidden;
    .brand {
        display: flex;
        background-color: white;
        border-radius: 10px;
    }

    img {
        height: 100%;
        width: 100%;
    }

    .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1rem;
    overflow: auto;
    padding: 1rem 0;

    &::-webkit-scrollbar {
        width: 0.3rem;
        /* background-color: red; */
        &-thumb {
            background-color: #000000;
            width: 0.1rem;
            border-radius: 5px;
        }
    }
}

.contact {
    background-color: #080420;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem;
    border-radius: 10px;
    cursor: pointer;
    gap: 1rem;
    transition: 0.2s ease-in-out;
    /* border-radius: 50%; */
}

.contact:hover {
    background-color:#170b53;   
}

.avatar img {
    border: 4px solid white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #d6cccc;
}

.username h3 {
    /* text-align: left; */
    color: white;
}

.selected {
    background-color:#170b53;
}

.current-user {
    background-color: #96b6c5;
    height: 50%;
    margin: auto;
}


`;


export default Contacts;

