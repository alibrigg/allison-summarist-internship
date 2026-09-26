import login from "../Assets/login.png";
import Login from "./Login";
import SignUp from "./SignUp";
import Header from "./Header";
import "./LoggedOutBook.css";
import Menu from "./Menu";
import { useState } from "react";

const LoggedOutBook = () => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [signUpOpen, setSignUpOpen] = useState(false);

  return (
     <>
    {loginOpen && (
  <Login
    onClose={() => setLoginOpen(false)}
    onSignUp={() => {
      setLoginOpen(false);
      setSignUpOpen(true);
    }}
  />
)}

{signUpOpen && (
  <SignUp
    onClose={() => setSignUpOpen(false)}
    onLogin={() => {
      setSignUpOpen(false);
      setLoginOpen(true);
    }}
  />
)}
   
    <Header />
    <Menu />
    <div className="summary">
      <div className="audio__book--summary">
        <div className="audio__book--summary-title">
          <b>How to Win Friends and Influence People in the Digital Age</b>
        </div>
        <div className="settings__login--wrapper">
          <img alt="login" src={login}/>
          <div className="settings__login--text">Log in to your account to read and listen to the book</div>
          <button className="btn settings__login--btn"  onClick={() => setLoginOpen(true)}>Login</button>
        </div>
      </div>
      <div className="audio__wrapper">
        <audio src=""></audio>
        <div className="audio__track--wrapper">
          <figure className="audio__track--image-mask">
            <figure className="book__image--wrapper">
              <img className="book__image"  alt="book"/>
            </figure>
          </figure>
          <div className="audio__track--details-wrapper">
            <div className="audio__track--title">How to Win Friends and Influence People in the Digital Age</div>
            <div className="audio__track--author">Dale Carnegie</div>
          </div>
        </div>
        <div className="audio__controls--wrapper">
          <div className="audio__controls">
            <button className="audio__controls--btn">
              <img className="" />
            </button>
            <button className="audio__controls--btn audio__controls--btn-play">
              <img className="" />
            </button>
            <button className="audio__controls--btn">
              <img className="" />
            </button>
          </div>
        </div>
        <div className="audio__progress--wrapper">
          <div className="audio__time">00:00</div>
          <input type="range" className="audio__progress--bar" value="0" max="204.048"/>
          <div className="audio__time">03:24</div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoggedOutBook;