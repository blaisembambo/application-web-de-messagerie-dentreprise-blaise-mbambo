import '../styles/App.css';
import {io} from 'socket.io-client'
import {useEffect} from 'react'
import picture from '../assets/papa-jules.png'


function App() {
  
  useEffect(function(){
    const socket = io('http://localhost:4000')
  },[])

  return(
    <div className='app-container'>

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
              
            </div>
            <div className='recentConversations-container'>
              <h3>Recent</h3>
            </div>
        </div>
      {/*end of conversations and user search */}

      {/*begining of conversation */}
      <div className='conversation-container'>
        <div className='contactProfile-cotainer'>
          <div className='contactPicture-container'>
            <img src={picture} className='contact-profile-picture' />
          </div>
          <div className='contactNameAndStatus'>
            <p className='contact-name'>Swathi</p>
            <p className='contact-status'>online</p>
          </div>
        </div>
        <div className='messagescontainerandinputscontainer'>
          <div className='messages-container'>
                kk
          </div>
          <div className='inputscontainer'>
            <div className='textandfileinputs'>
              <input type='text' />
              <span className='file-input' style={{border:'1px solid black'}}>pic</span>
            </div>
            <div className='sendbuttoncontainer'>
              <button>send</button>
            </div>
          </div>
        </div>
      </div>
      {/*end of conversation */}
    </div>
  )
}

export default App;