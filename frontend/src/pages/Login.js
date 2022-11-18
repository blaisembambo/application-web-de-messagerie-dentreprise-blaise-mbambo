import '../styles/Login.css'
import axios from 'axios'
import { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStateValue } from '../utils/stateProvider'
import { Link } from 'react-router-dom'
import { BsChatDotsFill } from "react-icons/bs";


export default function Login() {

    const [state,dispatch] = useStateValue()
    const navigate = useNavigate()

    const [input,setInput] = useState({
        email:'',
        password:''
    })

    const handleInputChange = e => {
        setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
        
    }

    const handleOnSubmit = e => {
      axios
        .post("http://localhost:4000/users/1", {
          email: input.email,
          password: input.password
        })
        .then((res) => {
          if (res.data) {
            navigate("/app/" + res.data._id);
            dispatch({ type: "setUser", payload: res.data });
            dispatch({ type: "setUserLoggedIn" });
          }
          if (res.data == null) {
            navigate("/");
          }
        })
          .catch((err) => err);
        e.preventDefault();
    };

    return (
      <div className="login-wrapper">
        <div className="left-side">
          <div className="icon-and-title-wrapper">
            <BsChatDotsFill />
            <h2 className="left-side-title">Chat App</h2>
          </div>
        </div>
        <div className="right-side login-container">
          <h2 className="login-title">CONNECTEZ-VOUS</h2>
          <form className="login-form" onSubmit={handleOnSubmit}>
            <label htmlFor="email" className="inputlabel">
              <span className="labeltext">E-mail</span>
              <input
                type="email"
                onChange={handleInputChange}
                name="email"
                id="email"
                className="forminput"
              />
            </label>
            <label htmlFor="password" className="inputlabel">
              <span className="labeltext">Mot de passe</span>
              <input
                type="password"
                onChange={handleInputChange}
                name="password"
                id="password"
                className="forminput"
              />
            </label>
            <div className="connection-button-container">
              <button className="submit-btn">SE CONNECTER</button>
            </div>
            <div className="call-to-signup">
              <span>Vous n'avez pas de compte ? </span>
              <Link to="/signup" className="signup-link">
                inscivez-vous
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
}