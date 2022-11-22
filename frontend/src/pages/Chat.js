import '../styles/Chat.css';
import socket from '../utils/socketIo';
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
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
import { FiSearch } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import 'emoji-picker-element';


function Chat() {

    const [state, dispatch] = useStateValue();
    const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("currentUser")) {
      navigate("/");
      dispatch({
        type: "setUser",
        payload: null
      });
      dispatch({ type: "setUserLoggedIn" });
    }

    if (JSON.parse(sessionStorage.getItem("currentUser"))) { 
      dispatch({
        type: "setUser",
        payload: JSON.parse(sessionStorage.getItem("currentUser"))
      });
      dispatch({ type: "setUserLoggedIn" });

    }
  },[])

  const [input,setInput] = useState({
    message:'',
    search:''
  })

  const handleInputChange = e => {
    setInput(prevState => ({...prevState,[e.target.name]:e.target.value}))
  }
  
  const handleLogout = () => {
    sessionStorage.clear();
    dispatch({
      type: "setUser",
      payload: null
    });
    dispatch({ type: "setUserLoggedIn" });
    navigate("/");
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
  const [userAllMessages, setUserAllMessages] = useState([])

  useEffect(() => {
    axios.get(process.env.REACT_APP_ENDPOINT_TO_CREATE_AND_GET_USERS)
    .then(users => setUsers(users.data))
      .catch(err => err)
    
    axios.post("http://localhost:4000/messages/",{userId:state.user._id})
      .then(messages => { setUserAllMessages(messages.data)})
      .catch(err => console.log(err))
  }, [])


  const [userConversations, setUserConversations] = useState([])
  
  
  useEffect(() => {
      
       const conversationsUsersIds = userAllMessages.reduce((conversationsContactsIds, message) => {
      if (message.receiverId !== state.user._id && !conversationsContactsIds.includes(message.receiverId)) {
        conversationsContactsIds.push({ contactId:message.receiverId })
      }

      if (message.senderId !== state.user._id && !conversationsContactsIds.includes(message.senderId)) {
        conversationsContactsIds.push({ contactId: message.senderId })
      }
         let newConversationsContactsIds = [];
         if (conversationsContactsIds.length > 0) {
        
        newConversationsContactsIds = conversationsContactsIds.map(conversation => {
          
        })
           
         }
      return conversationsContactsIds
        }, []);
    console.log("conversations user ids", conversationsUsersIds)
      conversationsUsersIds.map(conversationUserId => {/*setUserConversations();*/ 
          axios.get(`http://localhost:4000/users/1/${conversationUserId.contactId}`)
          .then(user => {setUserConversations(prev => [...prev,user.data])})
          .catch(err => console.log(err))
    })

  },[userAllMessages])
  
  const [emojiPickerContainerStyle, setEmojiPickerContainerStyle] = useState({
    display: 'none'
  })
  
  function handleEmojiIconOnClick() {
    setEmojiPickerContainerStyle(prev => prev.display === 'block' ? ({display:'none'}) : ({display:'block'}))
  }

  function handleFileInputOnchange(e) {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOADPRESSET);

    axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload`,formData)
            .then(res => {
              console.log(res.data)
              sendMessage(state.user._id,state.currentContact._id,{type:"image",url:res.data.url,public_id:res.data.public_id},state.room)
            })
            .catch(err =>err) 
  }

  useEffect(() => {
    document.querySelector('emoji-picker')
    .addEventListener('emoji-click', event => {
      setInput(prev => ({...prev,"message":prev.message + event.detail.unicode}))
    });
},[])
  console.log("outcome", userConversations)
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
        <div className='logout-icon-container' onClick={handleLogout}>
          <GoSignOut />
        </div>
      </div>
      {/*end of user profile */}

      {/*begining of conversations and user search */}
        <div className='recentConversations-userSearch-container'>
          <div className='search-container'>
              <div className='search-icon'>
                <FiSearch />
              </div>
              <div className='search-input-container'>
                <input type='text' placeholder='Rechercher un contact' onChange={handleInputChange} name='search' id='search' className='searchinput' />
              </div>
              <div className='three-dot-icon'>
                <BsThreeDotsVertical />
              </div>
          </div>
          <div className='recentConversations-wrapper'>
            <h3>Conversations</h3>
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
                    <label htmlFor='file-input' className='media-input-container'><AiOutlineCamera /><input type='file' id='file-input' name='file-input' className='file-input' onChange={handleFileInputOnchange} accept="image/*" /></label>
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