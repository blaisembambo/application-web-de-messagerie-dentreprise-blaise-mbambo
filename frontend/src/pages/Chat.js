import '../styles/Chat.css';
import {io} from 'socket.io-client'
import {useEffect, useState} from 'react'
import picture from '../assets/papa-jules.png'
import axios from 'axios';
import User from '../components/User';
import {useStateValue} from '../utils/stateProvider'
import { Outlet } from 'react-router-dom';


function Chat() {
  const [state,dispatch] = useStateValue()

  const [input,setInput] = useState({
    message:'',
    search:''
  })

  const handleInputChange = e => {
    setInput(prevState => ({...prevState,[e.target.name]:e.target.value}))
  }

  const sendMessage = (senderId,receiverId,message) => {
    axios.post('http://localhost:4000/messages',{
                senderId : senderId,
                receiverId : receiverId,
                content : message
            })
            .then(res => {
              console.log(res.data)
            })
            .catch(err => {
              console.log(err)
            })

    axios.post('http://localhost:4000/messages/conversation',{
            senderId : state.user._id,
            receiverId : state.currentContact._id,
        })
        .then(res => {
            dispatch({type:'setMessages',payload:res.data})
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })

        setInput(prev => ({...prev,['message']:''}))

  }
  
  // useEffect(function(){
  //   const socket = io('http://localhost:4000')
  // },[])

  const [users,setUsers] = useState([])
  console.log('from chat ',state.user)
  useEffect(() => {
    axios.get('http://localhost:4000/users/')
    .then(users => setUsers(users.data))
    .catch(err => console.log(err))
  },[])

console.log(input)
  return(
    <div className='chat-container'>

      {/*begining of user profile */}
      <div className='user-profile'>
        <div className='user-picture-container'>
          <img src={picture} className='user-picture profile-picture' />
        </div>
        <div className='conversation-icon-container'>
          <img src='' className='user-picture' />
        </div>
        <div className='logout-icon-container'>
          <img src='' className='user-picture' />
        </div>
      </div>
      {/*end of user profile */}

      {/*begining of conversations and user search */}
        <div className='recentConversations-userSearch-container'>
            <div className='search-container'>
              <input type='text' onChange={handleInputChange} name='search' id='search' className='searchinput' />
            </div>
          <div className='recentConversations-wrapper'>
            <h3>Recent</h3>
            <div className='recentConversations-container'>
              {users.map((user,index) =><User key={user + '' + index} user = {user}/>)}
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
                    <Outlet/>
              </div>
              <div className='inputscontainer'>
                <div className='textandfileinputs'>
                  <input type='text' onChange={handleInputChange} name='message' id='message' className='messageinput' value={input.message} />
                  <span className='file-input' style={{border:'1px solid black'}}>pic</span>
                </div>
                <div className='sendbuttoncontainer'>
                  <button onClick={() => sendMessage(state.user._id,state.currentContact._id,input.message)}>send</button>
                </div>
              </div>
          </div>
        </div>
      </div>
      {/*end of conversation */}
    </div>
  )
}

export default Chat;