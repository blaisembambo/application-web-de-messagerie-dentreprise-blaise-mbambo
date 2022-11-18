import { useState } from "react";
import "../styles/Signup.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsChatDotsFill } from "react-icons/bs";

export default function Signup() {
  const [input, setInput] = useState({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    confirmpassword: ""
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleClickToSubmit = () => {
    if (input.password === input.confirmpassword) {
      axios
        .post("http://localhost:4000/users/", {
          firstName: input.firstname,
          lastName: input.lastname,
          image: "image",
          email: input.email,
          password: input.password,
          confirmpassword: input.confirmpassword
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log("erreur ", err));
    }

    if (input.password !== input.confirmpassword) {
    }
  };
  console.log(input);
  return (
    <div className="signup-wrapper">
      <div className="left-side">
        <div className="icon-and-title-wrapper">
          <BsChatDotsFill />
          <h2 className="left-side-title">Chat App</h2>
        </div>
      </div>
      <div className="signup-container right-side">
        <h2 className="signup-title">Inscrivez-vous</h2>
        <div className="signup-form">
          <label htmlFor="lastname" className="inputlabel">
            <span className="labeltext">Nom</span>
            <input
              type="text"
              onChange={handleInputChange}
              name="lastname"
              id="lastname"
              className="forminput"
            />
          </label>
          <label htmlFor="firstname" className="inputlabel">
            <span className="labeltext">Prénom</span>
            <input
              type="text"
              onChange={handleInputChange}
              name="firstname"
              id="firstname"
              className="forminput"
            />
          </label>
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
          <label htmlFor="confirmpassword" className="inputlabel">
            <span className="labeltext">Confirmer le mot de passe</span>
            <input
              type="password"
              onChange={handleInputChange}
              name="confirmpassword"
              id="confirmpassword"
              className="forminput"
            />
          </label>
          <div className="submit-button-container">
            <button onClick={handleClickToSubmit} className="submit-btn">
              S'INSCRIRE
            </button>
          </div>
          <div className="call-to-login">
            <span>Êtes-vous déjà inscrit ? </span>
            <Link to="/login" className="login-link">
              Connectez-vous.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
