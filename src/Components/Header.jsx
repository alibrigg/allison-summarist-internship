import search from "../Assets/search.svg";
import React, { useState } from "react";
import "./Header.css";
import logo from "../Assets/logo.png";
import menu from "../Assets/menu.svg";


const Header = () => {

  return (
    <>
    <div className="search__background">
      <div className="search__wrapper">
        <figure className="search__logo">
          <img src={logo} alt="" />
        </figure>
        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
              <input className="search__input" 
              placeholder="Search for books" 
              type="text" value="" />
              <button className="search__icon">
                <img src={search} alt="" className="search__icon-img"/>
              </button>
            </div>
          </div>
          <div className="sidebar__toggle--btn">
            <img src={menu} alt="" className=""/>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Header;