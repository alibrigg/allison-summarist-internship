import "./Book.css";
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import Menu from "../Components/Menu";
import star from "../Assets/star.svg";
import clock from "../Assets/clock.svg";
import audio from "../Assets/audio.svg";
import light from "../Assets/lightbulb.svg"
import openbook from "../Assets/book.svg"
import bookmark from "../Assets/bookmark.svg"
import { useParams } from "react-router-dom";



const Book = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
    const { id } = useParams();

   useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);

        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );

        const bookData = await response.json();
 setBook(bookData);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);



  return (
    <>
    <Header />
    <Menu />
    <div className="row__book">
      <div className="container__book">
        {book && (
        <div className="inner__wrapper">
          <div className="inner__book">
            <div className="inner-book__title">{book.title}</div>
            <div className="inner-book__author">{book.author}</div>
            <div className="inner-book__sub--title">{book.subTitle}</div>
            <div className="inner-book__wrapper">
              <div className="inner-book__description--wrapper">
                <div className="inner-book__description">
                  <div className="inner-book__icon">
                     <img src={star} alt="star" className="inner-book__icon-img" />
                  </div>
                  <div className="inner-book__overall--rating"> {book.averageRating} </div>
                  <div className="inner-book__total--rating"> ({book.totalRating} ratings)</div>
                </div>
                <div className="inner-book__description">
                  <div className="inner-book__icon">
                    <img src={clock} alt="clock" className="inner-book__icon-img" />
                  </div>
                  <div className="inner-book__duration">03:23</div>
                </div>
                <div className="inner-book__description">
                  <div className="inner-book__icon">
                    <img src={audio} alt="audio" className="inner-book__icon-img" />
                  </div>
                  <div className="inner-book__type">{book.type}</div>
                </div>
                <div className="inner-book__description">
                  <div className="inner-book__icon">
                    <img src={light} alt="light" className="inner-book__icon-img" />
                  </div>
                  <div className="inner-book__key--ideas">{book.keyIdeas} Key ideas</div>
                </div>
              </div>
            </div>
            <div className="inner-book__read--btn-wrapper">
              <button className="inner-book__read--btn">
                <div className="inner-book__read--icon">
                  <img src={openbook} alt="book" className="inner-book__icon-btn" />
                 </div>
                 <div className="inner-book__read--text">Read</div>
              </button>
              <button className="inner-book__read--btn">
                <div className="inner-book__read--icon">
                  <img src={audio} alt="book" className="inner-book__icon-btn" />
                </div>
                <div className="inner-book__read--text">Listen</div>
              </button>
            </div>
            <div className="inner-book__bookmark">
              <div className="inner-book__bookmark--icon">
                <img src={bookmark} alt="bookmark" className="inner-book__bookmark--icon-img" />
              </div>
              <div className="inner-book__bookmark--text">Add title to My Library</div>
            </div>
            <div className="inner-book__secondary--title">What's it about?</div>
            <div className="inner-book__tags--wrapper">
              {book.tags?.map((tag) => (
              <div className="inner-book__tag" key={tag}>
                  {tag}
              </div>
              ))}
            </div>
            <div className="inner-book__book--description">
              {book.bookDescription}</div>
            <h2 className="inner-book__secondary--title">About the author</h2>
            <div className="inner-book__author--description">
              {book.authorDescription}</div>
          </div>
          <div className="inner-book--img-wrapper">

              <img src={book.imageLink} alt="book image" className="book__img" />

          </div>
        </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Book;