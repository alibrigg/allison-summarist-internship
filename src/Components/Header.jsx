import search from "../Assets/search.png";
import logo from "../Assets/logo.png";
import React, { useState } from "react";



const Header = () => {
     const [search, setSearch] = useState("");
     const searchBooks = () => {
        if (!search.trim()) return;
        navigate(`/search/${encodeURIComponent(search)}`);
    };

  return (
    <nav className="header">
      <div className="header__wrapper">
        <figure className="header__img--mask">
          <img className="header__img" src={logo} alt="logo" />
        </figure>
        <div className="header__search--wrapper">
           <input type="search"
                                placeholder="Search for books"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        searchBooks();
                                        }
                                    }}
                                />
                            <button onClick={searchBooks}>
                                <img src={search} alt="Search"/>
                                </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;