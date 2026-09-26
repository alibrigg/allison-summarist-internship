import home from "../Assets/home.svg";
import bookmark from "../Assets/bookmark.svg";
import pen from "../Assets/pen.svg";
import search from "../Assets/search.svg";
import settings from "../Assets/settings.svg";
import question from "../Assets/question.svg";
import logout from "../Assets/logout.svg";
import logo from "../Assets/logo.png";
import "./Menu.css";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/init";


const Menu = () => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [signUpOpen, setSignUpOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsubscribe();
}, []);

const handleAuthClick = async () => {
  if (user) {
    try {
      await signOut(auth);
      console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error);
  }
  } else {
    setLoginOpen(true);
  }
};

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
    <div className="sidebar sidebar--closed">
        <div className="sidebar__logo">
            <img src={logo} alt="" className=".sidebar__logo-img" />
        </div>
            <div className="sidebar__wrapper">
                <div className="sidebar__top">
                    <a className="sidebar__link--wrapper" href="/for-you">
                        <div className="sidebar__link--line "></div>
                        <div className="sidebar__icon--wrapper">
                            <img src={home} alt="" className="sidebar__icon-img" />
                        </div>
                        <div className="sidebar__link--text">For you</div>
                    </a>
                    <a className="sidebar__link--wrapper" href="/library">
                        <div className="sidebar__link--line "></div>
                        <div className="sidebar__icon--wrapper">
                            <img src={bookmark} alt="" className="sidebar__icon-img"/>
                        </div>
                        <div className="sidebar__link--text">My Library</div>
                    </a>
                    <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                        <div className="sidebar__link--line "></div>
                        <div className="sidebar__icon--wrapper">
                            <img src={pen} alt="" className="sidebar__icon-img"/>
                        </div>
                        <div className="sidebar__link--text">Highlights</div>
                    </div>
                    <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                        <div className="sidebar__link--line "></div>
                        <div className="sidebar__icon--wrapper">
                            <img src={search} alt="" className="sidebar__icon-img"/>
                        </div>
                        <div className="sidebar__link--text">Search</div>
                    </div>
                </div>
                <div className="sidebar__bottom">
                    <a className="sidebar__link--wrapper" href="/settings">
                        <div className="sidebar__link--line "></div>
                        <div className="sidebar__icon--wrapper">
                            <img src={settings} alt="" className="sidebar__icon-img"/>
                        </div>
                        <div className="sidebar__link--text">Settings</div>
                    </a>
                    <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                        <div className="sidebar__link--line "></div>
                        <div className="sidebar__icon--wrapper">
                            <img src={question} alt="" className="sidebar__icon-img"/>
                        </div><div className="sidebar__link--text">Help & Support</div>
                    </div>
                    <div className="sidebar__link--wrapper" onClick={handleAuthClick}>
                        <div className="sidebar__link--line"></div>
                        <div className="sidebar__icon--wrapper">
                            <img src={logout} alt=""  className="sidebar__icon-img"/>
                        </div>
                        <div className="sidebar__link--text">
                            {user ? "Logout" : "Login"}
                        </div>
                    </div>
                </div>
            </div>
    </div>
    </>
  );
};

export default Menu;