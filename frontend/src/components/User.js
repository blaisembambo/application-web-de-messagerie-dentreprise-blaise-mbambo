import React, { useEffect } from 'react'
import '../styles/Users.css'
import picture from '../assets/papa-jules.png'
import { Link } from 'react-router-dom'
import {useStateValue} from '../utils/stateProvider'
import axios from 'axios'
import socket from '../utils/socketIo'

export default function User({ user, setConversationIconIsRemoved, pic, lastMessage }) {
  const [state, dispatch] = useStateValue();

  const handleUserClicked = () => {
      dispatch({ type: "setCurrentContact", payload: user });
      setConversationIconIsRemoved(true);
    socket.on("getMessages", (data) => {
      dispatch({ type: "setMessages", payload: data });
    });
  };
  useEffect(() => {
    let room = (state.user._id + "" + state.currentContact._id)
      .split("")
      .sort()
      .join("");
    dispatch({ type: "setRoom", payload: room });
    socket.emit("join-room", room);
    axios
      .post(process.env.REACT_APP_ENDPOINT_TO_GET_A_CONVERSATION, {
        senderId: state.user._id,
        receiverId: state.currentContact._id
      })
      .then((res) => {
        dispatch({ type: "setMessages", payload: res.data });
      })
      .catch((err) => err);
  }, [state.currentContact]);

  return (
    <Link
      to={"" + user._id}
      id={""}
      onClick={handleUserClicked}
      className="userlinked"
    >
      <div className="userpicturecontainer">
        <img src={picture} className="userpicture" />
      </div>
      <div className="userinfos">
        <span className="contactname">{user.firstName}</span>
        <span className="contactlastmessage">last message</span>
      </div>
    </Link>
  );
}