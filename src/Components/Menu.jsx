import home from "../Assets/home.svg";
import bookmark from "../Assets/bookmark.svg";
import pen from "../Assets/pen.svg";
import search from "../Assets/search.svg";
import settings from "../Assets/settings.svg";
import question from "../Assets/question.svg";
import logout from "../Assets/logout.svg";
import logo from "../Assets/logo.png";
import "./Menu.css";


const Menu = () => {

  return (
    <>
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
                    <div className="sidebar__link--wrapper">
                        <div className="sidebar__link--line "></div>
                        <div className="sidebar__icon--wrapper">
                            <img src={logout} alt="" className="sidebar__icon-img"/>
                        </div>
                        <div className="sidebar__link--text">Login</div>
                    </div>
                </div>
            </div>
    </div>
    </>
  );
};

export default Menu;