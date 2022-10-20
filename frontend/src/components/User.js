import React from 'react'
import '../styles/Users.css'
import picture from '../assets/papa-jules.png'

export default function User({userName,pic,lastMessage}){
    
    return(
        <div className="usercontainer">
            <div className="userpicturecontainer">
                <img src={picture} className='userpicture' />
            </div>
            <div className="userinfos">
                <span>{userName}</span>
                <span>last message</span>
            </div>
        </div>
    )
}