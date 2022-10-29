import '../styles/Login.css'
import axios from 'axios'
import { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {useStateValue} from '../utils/stateProvider'

export default function Login() {

    const [state,dispatch] = useStateValue()
    const navigate = useNavigate()

    const [input,setInput] = useState({
        email:'',
        password:''
    })

    const handleInputChange = e => {
        setInput(prevState => ({...prevState,[e.target.name]:e.target.value}))
    }

    const handleClickToSubmit = () => {
        
            axios.post('http://localhost:4000/users/1',{
                email :input.email,
                password : input.password
            })
            .then(res => {
                if(res.data){
                    navigate('/app/'+res.data._id)
                    dispatch({type:'setUser',payload:res.data})
                    dispatch({type:'setUserLoggedIn'})
                }
                if(res.data == null){
                    navigate('/')
                }
            })
            .catch(err =>err)

    }
    
   
    return(
        <div className='login-wrapper'>
            <div className='login-container'>
                <h2 className='login-title'>CONNECTEZ-VOUS</h2>
                <hr className='underline' />
                <div className='login-form'>
                <label htmlFor='email' className='inputlabel'>
                        <span className='labeltext'>E-mail</span>
                        <input type="email" onChange={handleInputChange} name='email' id='email' className='forminput' />
                    </label>
                    <label htmlFor='password' className='inputlabel'>
                        <span className='labeltext'>Mot de passe</span>
                        <input type="password" onChange={handleInputChange} name='password' id='password' className='forminput' />
                    </label>
                    <div><span>Vous n'avez pas de compte ? </span><a href='#' className="">inscivez-vous</a></div>
                    <div className="connection-button-container">
                        <button onClick={handleClickToSubmit}>SE CONNECTER</button>
                    </div>
                </div>
            </div>
        </div>
    )
}