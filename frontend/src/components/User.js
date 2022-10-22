import React from 'react'
import '../styles/Users.css'
import picture from '../assets/papa-jules.png'
import { Link } from 'react-router-dom'
import {useStateValue} from '../utils/stateProvider'
import axios from 'axios'

export default function User({user,pic,lastMessage}){

    const [state,dispatch] = useStateValue()

    const handleUserClicked = () => {
        dispatch({type:'setCurrentContact',payload:user})

        axios.post('http://localhost:4000/messages',{
            senderId : state.user._id,
            receiverId : state.currentContact._id,
        })
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
    
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