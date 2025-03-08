import React from 'react'
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from '../utls/APIRoutes';
import Contacts from '../components/Contacts';
import images from '../assets/assets';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { sendMessageRoute } from '../utls/APIRoutes';
import io from 'socket.io-client';

// const socket = io("http://localhost:5000");


function Chat() {

  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [currentChat, setCurrentChat] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
        if (!localStorage.getItem("chat-user")) {
            navigate("/login");
        } else {
            setCurrentUser(await JSON.parse(localStorage.getItem("chat-user")));
        }

      };
      
      fetchUser(); 
  }, [navigate]);

  // ✅ Wait for `currentUser` before emitting "add-user"
useEffect(() => {
  if (currentUser) {
      console.log("Current User:", currentUser);
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
  }
}, [currentUser]);  // ✅ Runs only when `currentUser` is updated


  useEffect(() => {
    const fetchContacts = async () => {
        if (currentUser) {
            if (currentUser.isAvatarImageSet) {
                try {
                    const  data  = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    setContacts(data.data);
                } catch (error) {
                    console.error("Error fetching contacts:", error);
                }
            } else {
                navigate("/setAvatar");
            }
        }
    };
    fetchContacts(); // Call the async function
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
}, [currentUser, navigate]);

  const handleChatChanges = (chat) => {
      setCurrentChat(chat);
  }


  return (
    <>
    {
      isLoading ? <Container>
        <img src={images.loader} alt='loader' className='loader' />
      </Container> : (
        <Container>
        <div className='container'>
          <Contacts contacts={contacts} currentUser={currentUser}  changeChat={handleChatChanges} />
          {
            currentChat === undefined ? (<Welcome  currentUser={currentUser}/> ) : (
              <ChatContainer currentChat={currentChat} currentUser={currentUser}  socket={socket} />
            ) 
          }
        </div>
      </Container>
      )
    }
    </>
  )
}


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  .container {
    height: 90vh;
    width: 90vw;
    background-color: #00000070;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 180px) {
      grid-template-columns: 35% 65%;
    }
  }
`;


export default Chat;
