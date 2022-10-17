import '../styles/App.css';
import {io} from 'socket.io-client'
import {useEffect} from 'react'


function App() {
  
  useEffect(function(){
    const socket = io('http://localhost:4000')
  },[])

  return(
    <div className='app-container'>

      /*begining of user profile */
      <div className='user-profile'>
        <div className='user-picture-container'>
          <img src='' className='user-picture' />
        </div>
        <div className='conversation-icon-container'>
          <img src='' className='user-picture' />
        </div>
        <div className='logout-icon-container'>
          <img src='' className='user-picture' />
        </div>
      </div>
      /*end of user profile */

      /*begining of conversations and user search */
        <div className='recentConversations-userSearch-container'>
            <div className='search-container'>
              <h3>Recent</h3>
            </div>
            <div className='recentConversations-container'>

            </div>
        </div>
      /*end of conversations and user search */

      /*begining of conversation */
      <div className='conversation-container'>
        <div className='contactProfile-cotainer'>
          <div className='contactPicture-container'>
            <img src='' />
          </div>
          <div className='contactNameAndStatus'>
            <p className='contact-name'>Swathi</p>
            <p className='contact-status'>online</p>
          </div>
        </div>
      </div>
      /*end of conversation */
    </div>
  )
}

export default App;