import home from "../Assets/home.png";
import bookmark from "../Assets/bookmark.png";
import pen from "../Assets/pen.png";
import search from "../Assets/search.png";
import settings from "../Assets/settings.png";
import question from "../Assets/question.png";
import logout from "../Assets/logout.png";


const Menu = () => {

  return (
    <>
    <div className="container">
        <ul className="">
            <li className="">
                <img src={home} alt="home" />
                <a href="/for-you">For You</a>
            </li>
            <li className="">
                <img src={bookmark} alt="bookmark" />
                <a href="/my-library">My Library</a>
            </li>
            <li className="">
                <img src={pen} alt="pen" />
                <a href="/highlights">Highlights</a>
            </li>
            <li className="">
                <img src={search} alt="search" />
                <a href="/search">Search</a>
            </li>
            <li className="">
                <img src={settings} alt="settings" />   
                <a href="/settings">Settings</a>
            </li>
            <li className="">
                <img src={question} alt="question" />
                <a href="/help">Help & Support</a>
            </li>
            <li className="">
                <img src={logout} alt="logout" />
                <a href="/">Log Out</a>
            </li>
        </ul>
    </div>
    
    </>
  );
};

export default Menu;