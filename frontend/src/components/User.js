import React, { useEffect } from 'react'
import '../styles/Users.css'
import picture from '../assets/papa-jules.png'
import { Link } from 'react-router-dom'
import {useStateValue} from '../utils/stateProvider'
import axios from 'axios'
import socket from '../utils/socketIo'

export default function User({user,pic,lastMessage}){

    const [state,dispatch] = useStateValue()

    const handleUserClicked = () => {
        dispatch({ type: 'setCurrentContact', payload: user })
        socket.on("getMessages", data => {
            dispatch({ type: 'setMessages', payload: data })
        })

    }
    useEffect(() => {
        let room = (state.user._id +""+ state.currentContact._id).split("").sort().join("");
        dispatch({ type: 'setRoom', payload: room })
        socket.emit("join-room", room)//state.user._id + "-" + state.currentContact._id
        axios.post('http://localhost:4000/messages/conversation',{
            senderId : state.user._id,
            receiverId : state.currentContact._id,
        })
        .then(res => {
            dispatch({type:'setMessages',payload:res.data})
          
        })
        .catch(err => err)
    }, [state.currentContact])
    
    return(
            <Link to={'' + user._id} id={''} onClick={handleUserClicked} className='userlinked'>
                <div className="userpicturecontainer">
                    <img src={picture} className='userpicture' />
                </div>
                <div className="userinfos">
                    <span className='contactname'>{user.firstName}</span>
                    <span className='contactlastmessage'>last message</span>
                </div>
            </Link>
    )
}