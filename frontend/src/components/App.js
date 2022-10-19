import '../styles/App.css';
import {io} from 'socket.io-client'
import {useEffect} from 'react'
import picture from '../assets/papa-jules.png'
import Signup from './Signup'
import Login from './Login.js'


function App() {
  
  // useEffect(function(){
  //   const socket = io('http://localhost:4000')
  // },[])

  return(
    <div className='app-container'>
        <Login />
    </div>
  )
}

export default App;