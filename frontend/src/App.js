import './styles/App.css';
import {io} from 'socket.io-client'
import {useEffect, useState,useReducer,useContext} from 'react'
import picture from './assets/papa-jules.png'
import Signup from './pages/Signup'
import Login from './pages/Login.js'
import Chat from './pages/Chat';
import { Routes, Route, useNavigate } from 'react-router-dom';
import reducer from './utils/reducer';
import stateContext from './utils/stateProvider';
import {useStateValue} from './utils/stateProvider'
import NavigateToChat from './pages/NavigateToChat';
import NavigateToLogin from './pages/NavigateToLoggin';




function App() {

  const [state,dispatch] = useStateValue()
  
  // useEffect(function(){
  //   const socket = io('http://localhost:4000')
  // },[])

  const navigate = useNavigate()

  console.log('state : ',state)
  return(

 
    <div className='app-container'>
      
       <button onClick={() => {dispatch({type:'setUserLoggedIn'})}}>update state</button>
            <Routes>
              {console.log(state.userLoggedIn)}
                    <Route path='/' element={<NavigateToLogin />}/>
                    <Route path='/' element={<NavigateToChat />}/>
                    <Route  path='/app' element={<Chat /> }>
                      <Route path='/:id' ></Route>
                    </Route>
                    <Route  path='/signup' element={<Signup /> }/>
                    <Route  path='/login' element={<Login /> }/>
            </Routes>
        </div>

    
  )
}

export default App;