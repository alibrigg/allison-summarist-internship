import search from "../Assets/search.svg";
import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../Assets/logo.png";
import menu from "../Assets/menu.svg";
import { Link } from "react-router-dom";
import Menu from "../Components/Menu";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (!searchValue.trim()) {
    setResults([]);
    return;
  }

  const delaySearch = setTimeout(() => {
    const getResults = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(
            searchValue
          )}`
        );

        const data = await response.json();

        console.log("Search results:", data);

        setResults(data);
      } catch (error) {
        console.error("Error searching books:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    getResults();
  }, 300);

  return () => clearTimeout(delaySearch);
}, [searchValue]);

  return (
    <>
      <div className="search__background">
        <div className="search__wrapper">

          <figure className="search__logo">
            <img src={logo} alt="Summarist" />
          </figure>

          <div className="search__content">

            <div className="search">

              <div className="search__input--wrapper">

                <input
                  className="search__input"
                  placeholder="Search for books"
                  type="text"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                />

                <button className="search__icon">
                  <img
                    src={search}
                    alt="Search"
                    className="search__icon-img"
                  />
                </button>

              </div>

              {searchValue.trim() && (
                <div className="search__dropdown">

                  {loading && (
                    <div className="search__message">
                      Searching...
                    </div>
                  )}

                  {!loading && results.length === 0 && (
                    <div className="search__message">
                      No books found
                    </div>
                  )}

                  {!loading &&
                    results.map((book) => (
                      <Link
                        to={`/book/${book.id}`}
                        className="search__result"
                        key={book.id}
                        onClick={() => setSearchValue("")}
                      >
                        <img
                          src={book.imageLink}
                          alt={book.title}
                          className="search__result-img"
                        />

                        <div className="search__result-info">
                          <div className="search__result-title">
                            {book.title}
                          </div>

                          <div className="search__result-author">
                            {book.author}
                          </div>
                        </div>
                      </Link>
                    ))}

                </div>
              )}

            </div>

            <button
              className="sidebar__toggle--btn"
              onClick={() => setMenuOpen(true)}
            >
              <img src={menu} alt="Menu" />
            </button>

          </div>
        </div>
      </div>
        <Menu
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
    </>
  );
};

export default Header;
