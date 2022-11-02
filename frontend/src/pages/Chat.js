import '../styles/Chat.css';
import socket from '../utils/socketIo';
import {useEffect, useState} from 'react'
import picture from '../assets/papa-jules.png'
import axios from 'axios';
import User from '../components/User';
import {useStateValue} from '../utils/stateProvider'
import { Outlet } from 'react-router-dom';
import { BsChatDotsFill } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineCamera } from "react-icons/ai";
import { BiSend } from "react-icons/bi";
import 'emoji-picker-element';


function Chat() {
  const [state,dispatch] = useStateValue()

  const [input,setInput] = useState({
    message:'',
    search:''
  })

  const handleInputChange = e => {
    setInput(prevState => ({...prevState,[e.target.name]:e.target.value}))
  }
  
  
  const sendMessage = (senderId, receiverId, content, room) => {
    
    if(content.content === "") return
    socket.emit("sendMessage", { senderId, receiverId, content, room })
    socket.on("getMessages", data => {
      dispatch({ type: 'setMessages', payload: data })
    })

        setInput(prev => ({...prev,['message']:''}))

  }

  const [users, setUsers] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost:4000/users/')
    .then(users => setUsers(users.data))
    .catch(err => err)
  }, [])
  
  const [emojiPickerContainerStyle, setEmojiPickerContainerStyle] = useState({
    display:'none'
  })
  
  function handleEmojiIconOnClick() {
    setEmojiPickerContainerStyle(prev => prev.display === 'block' ? ({display:'none'}) : ({display:'block'}))
  }

  function handleCameraIconOnclick() {
  const myWidget = window.cloudinary.createUploadWidget({
  cloudName: 'bintole', 
  uploadPreset: 'sds1g2ni'}, (error, result) => { 
    if (!error && result && result.event === "success") { 
      console.log('Done! Here is the image info: ', result.info);
      sendMessage(state.user._id,state.currentContact._id,{type:"image",url:result.info.url,public_id:result.info.public_id},state.room)
    }
  }
  )
    myWidget.open();
  }

  useEffect(() => {
    document.querySelector('emoji-picker')
    .addEventListener('emoji-click', event => {
      setInput(prev => ({...prev,"message":prev.message + event.detail.unicode}))
    });
},[])
  // console.log(state.messages)
  return(
    <div className='chat-container'>

      {/*begining of user profile */}
      <div className='user-profile'>
        <div className='user-picture-container'>
          <img src={picture} className='user-picture profile-picture' />
        </div>
        <div title='cliquez pour ouvrir les conversations' className='conversation-icon-container'>
          <BsChatDotsFill />
        </div>
        <div className='logout-icon-container'>
          <GoSignOut />
        </div>
      </div>
      {/*end of user profile */}

      {/*begining of conversations and user search */}
        <div className='recentConversations-userSearch-container'>
            <div className='search-container'>
              <input type='text' onChange={handleInputChange} name='search' id='search' className='searchinput' />
            </div>
          <div className='recentConversations-wrapper'>
            <h3>Utilisateurs</h3>
            <div className='recentConversations-container'>
              {users.map((user,index) => user._id === state.user._id ? '' : <User key={user + '' + index} user = {user}/>)}
            </div>
          </div>
        </div>
      {/*end of conversations and user search */}

      {/*begining of conversation */}
      <div className='conversation-container'>
        <div className='contactProfile-cotainer'>
          <div className='contactPicture-container'>
            <img src={picture} className='user-profile-picture-in-conversation' />
          </div>
          <div className='contactNameAndStatus'>
            <p className='contact-name'>{state.currentContact ? state.currentContact.firstName : ''}</p>
            <p className='contact-status'>online</p>
          </div>
        </div>
        <div className='messagescontainerandinputscontainer'>
          <div className='messagescontainerandinputswrapper'>
              <div className='messages-container'>
                  <div className='messages-wrapper'>
                    <Outlet/>
                  </div>
              </div>
              <div className='inputscontainer'>
                <div className='textemojiandfileinputs'>
                  <input type='text' onChange={handleInputChange} name='message' id='message' className='messageinput' value={input.message} />
                  <div className='emojiandphotoicons'>
                    <span className='emoji-icon-container' onClick={handleEmojiIconOnClick}><BsEmojiSmile /></span>
                    <span className='media-input-container' onClick={handleCameraIconOnclick}><AiOutlineCamera /></span>
                  <div className='emoji-picker-container' style={emojiPickerContainerStyle}>
                    <emoji-picker></emoji-picker>
                  </div>
                </div>
                </div>
                {/* <div className='sendbuttoncontainer'> */}
                  <button className='sendbutton' onClick={() => sendMessage(state.user._id,state.currentContact._id,{type:"text",content:input.message},state.room)}><BiSend /></button>
                {/* </div> */}
              </div>
          </div>
        </div>
      </div>
      {/*end of conversation */}
    </div>
  )
}

export default Chat;