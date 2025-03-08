import React from 'react';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from "react-icons/bs"; 


function ChatInput({handleSendMsg}) {

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");
    const emojiPickerRef = useRef(null);

    const handleEmojiPickerShowHide = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (emojiObject) => {
        setMsg((prevMsg) => prevMsg + emojiObject.emoji);
    };

    const handleChange = ({target}) => {
        setMsg(target.value);
    }

     // Close emoji picker when clicking outside
     useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        };

        if (showEmojiPicker) {
            window.addEventListener("click", handleClickOutside);
        }

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [showEmojiPicker]);

    const sendChat = (event) => {
        event.preventDefault();
        // alert("the message will be send !!");
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg('');
        }
    }

    return (
    <Container>
        <div className="button-container">
            <div className="emoji" ref={emojiPickerRef}>
                <BsEmojiSmileFill onClick={handleEmojiPickerShowHide} />
                { showEmojiPicker && <Picker  onEmojiClick={handleEmojiClick}/> }
            </div>
        </div>

        <form className='input-container' onSubmit={sendChat}>
            <input type="text" onChange={handleChange} value={msg} placeholder='send your message...' />
            <button type="submit" >
                <IoMdSend />
            </button>
        </form>
    </Container>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    padding: 0 2rem;
    padding-bottom: 0.3rem;

    .button-container {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        
        .emoji {
            position: relative;

            svg {
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
                transition: all 0.3s linear;
            }

            svg:hover {
                scale: 1.4;
            }

            .EmojiPickerReact {
                position: absolute;
                top: -470px;
                left: 5px;
                background-color: #080430;
                box-shadow: 2px 2px 5px #9a86f3;

            }
        }

    }

    .input-container {
        width: 100%;
        border-radius: 2rem;
        background-color: #ffffff34;
        display: flex;
        align-content: center;
        gap: 2rem;
        padding: 0.5rem;

        input {
            width: 90%;
            /* height: 60%; */
            background-color: transparent;
            border: none;
            color:  white;
            padding-left: 1rem;
            font-size: 1.2rem;
            &:focus {
                outline: none;
            }
            &::selection {
                background-color: #9186f3;
            }
        }

        button {
            width: 9%;
            background-color: white;
            padding: 0.4rem 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 2rem;
            background-color: #9186f3;
            border: none;

            svg {
                font-size: 1.5rem;
                color: white;
            }
        }
    }
`;

export default ChatInput;
