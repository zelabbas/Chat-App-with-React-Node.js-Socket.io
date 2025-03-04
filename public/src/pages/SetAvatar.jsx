import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import images from '../assets/assets';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { SetAvatarRoute } from '../utls/APIRoutes';
import { Buffer } from 'buffer';

function SetAvatar() {

    const api = "https://robohash.org";
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastoptions = {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark'
    };


    const setProfile = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastoptions);
        } else {
            const user = JSON.parse(localStorage.getItem("chat-user"));
            console.log(user, user._id);
            const { data } = await axios.post(`${SetAvatarRoute}/${user._id}`, {
                image : avatars[selectedAvatar],
            });
            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem('chat-user', JSON.stringify(user));
                console.log("all goode");
                navigate("/");
            } else {
                toast.error("Error setting avatar. Please try again", toastoptions);
            }
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            const data = [];
            for (let i = 0; i < 5; i++) {
                let requrl = `${api}/${Math.round(Math.random() * 1000)}`;
                const image = await axios.get(requrl);
                data.push(requrl);
            }

            setAvatars(data);
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);
            
        };
        fetchData();
    }, []); 
 
  return ( 
    <>
        {
            isLoading ? <Container>
                    <img src={images.loader} alt='loader' className='loader' />
                </ Container> : (
                     <Container>
                     <div className="title-container">
                       <h1>Pick an avatar as your profile</h1>
                     </div> 
           
                     <div className="avatars">
                       {
                           avatars.map((avatar, index) => {
                               return (
                               <div key={index} 
                                    className={`avatar ${selectedAvatar === index ? "selected" : "" }`}>
                                   <img src={avatar} alt="avatar" onClick={() => setSelectedAvatar(index)} />
                               </div>
                               );
                           })
                       }
                     </div>
                     <button className='submit-btn' onClick={setProfile}>Set as Profile</button>
                   </Container>
                )
        }
       
        <ToastContainer /> 
    </>
  )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;

    .title-container {
        h1 {
            font-size: 2rem;
            font-weight: bold;
            color: white;
        }
    }

    .avatars {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 3rem;


        .avatar {
            cursor: pointer; 
            border: 0.2rem solid red;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.2s ease-in-out;
            box-sizing: border-box;

            img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                cursor: pointer; 
            }
        }

        .selected {
            border: 0.2rem solid #4e0eff;
            outline: 0.2rem solid #4e0eff;
        }
    }
    .submit-btn {
        width: 10%;
        padding: 10px;
        background: #333;
        color: #fff;
        border: 2px solid transparent; /* Transparent border to prevent layout shift */
        border-radius: 5px;
        cursor: pointer;
        font-size: 18px;
        font-weight: bold;
        transition: all 0.3s ease-in-out; /* Smooth transition */
    }

    .submit-btn:hover {
        border: 2px solid #4e0eff; /* Border instead of outline */
        box-shadow: 0 0 10px rgba(78, 14, 255, 0.7); /* Glowing effect */
        scale: 1.1;
    }
`;


export default SetAvatar 
