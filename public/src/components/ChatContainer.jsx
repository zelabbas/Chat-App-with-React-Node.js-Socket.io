import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import Messeges from './Messeges';
import axios from 'axios';
import { sendMessageRoute } from '../utls/APIRoutes';
import { getAllMessagesRoute } from '../utls/APIRoutes';

function ChatContainer({currentChat, currentUser, socket}) {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
 
    const fetchAllMessage = async () => {
        const response = await axios.post(getAllMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id,
        });
        setMessages(response.data);
    }

    useEffect(() => {
        fetchAllMessage();
    }, [currentChat]);

    const handleSendMsg = async (msg) => {
        // alert(msg);
        // alert("message done!!");
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        })
        socket.current.emit("send-msg", {
            from: currentUser._id,
            to: currentChat._id,
            msg: msg,
        });
        // fetchAllMessage();
        const mesgs = [...messages];
        mesgs.push({
            fromSelf: true,
            message: msg
        });
        setMessages(mesgs);
    }

    useEffect(() => {
        if (!socket) return;
        socket.current.on("msg-recieve", (msg) => {
            setArrivalMessage({fromSelf: false, message: msg});
        });
    }
    , []);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
            <div className="avatar">
                <img src={currentChat.avatarImage} alt="" />
            </div>
            <div className="username">
                <h3>{currentChat.username}</h3>
            </div>
        </div>
        <Logout />
      </div>
      <div className="chat-users">
        {
            messages.map((message) => {
                return (
                    <div>
                        <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                            <div className='content'>
                                <p>{message.message}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        }
      </div>
      {/* <Messeges messages={messages} /> */}
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  )
}

const Container = styled.div`
    padding-top: 1rem;
    display: grid;
    grid-template-rows: 10% 78% 12%;
    gap: 0.1rem;
    .chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    background-color: #160946;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
}

.user-details {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.user-details img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 4px solid #6ad167;
    background: #47487c;
}

.user-details h3 {
    color: white;
}

.chat-users {
    /* background-color: white; */
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    background-color: red;
    .message {
        /* background-color: red; */
        display: flex;
        align-items: center;

        .content {
            /* background-color: green; */
            max-width: 40%;
            overflow-wrap: break-word;
            padding: 1rem;
            font-size: 1.1rem;
            border-radius: 1rem;
            color: #d1d1d1;
        }
    }

    .sended {
        justify-content: flex-end;
        .content {
            background-color: #4f04ff21;
        }
    }

    .recieved {
        justify-content: flex-start;

        .content {
            background-color: #9900ff20;
        }
    }



}


`;

export default ChatContainer;
