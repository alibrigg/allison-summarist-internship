import "./Book.css";
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import star from "../Assets/star.svg";
import clock from "../Assets/clock.svg";
import audio from "../Assets/audio.svg";
import light from "../Assets/lightbulb.svg"
import openbook from "../Assets/book.svg"
import bookmark from "../Assets/bookmark.svg"
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/init";
import { doc, getDoc } from "firebase/firestore";

const AudioDuration = ({ audioLink, longFormat = false }) => {
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    if (!audioLink) return;

    const audio = new Audio();

    audio.preload = "metadata";

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };

    audio.onerror = () => {
      setDuration(null);
    };

    audio.src = audioLink;

    return () => {
      audio.onloadedmetadata = null;
      audio.onerror = null;
    };
  }, [audioLink]);

  if (duration === null) {
    return <span>--:--</span>;
  }

  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  if (longFormat) {
    return (
      <span>
        {minutes} mins {seconds} secs
      </span>
    );
  }

  return (
    <span>
      {String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </span>
  );
};

const Book = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

const handleReadListen = async () => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      navigate("/choose-plan");
      return;
    }

    const userDoc = await getDoc(doc(db, "users", currentUser.uid));

    const userData = userDoc.exists() ? userDoc.data() : {};
    const plan = userData.plan || "basic";

    const requiresSubscription = book.subscriptionRequired === true;

    const hasPremiumAccess =
      plan === "premium" || plan === "premium-plus";

    if (requiresSubscription && !hasPremiumAccess) {
      navigate("/choose-plan");
      return;
    }

    navigate(`/player/${id}`);
  } catch (error) {
    console.error("Error checking book access:", error);
  }
};

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

  const BookSkeleton = () => {
  return (
    <div className="book-skeleton">

      <div className="book-skeleton__content">

        <div className="skeleton skeleton--title"></div>

        <div className="skeleton skeleton--author"></div>

        <div className="skeleton skeleton--subtitle"></div>

        <div className="book-skeleton__details">

          <div className="book-skeleton__detail">
            <div className="skeleton skeleton--icon"></div>
            <div className="skeleton skeleton--small"></div>
          </div>

          <div className="book-skeleton__detail">
            <div className="skeleton skeleton--icon"></div>
            <div className="skeleton skeleton--small"></div>
          </div>

          <div className="book-skeleton__detail">
            <div className="skeleton skeleton--icon"></div>
            <div className="skeleton skeleton--small"></div>
          </div>

          <div className="book-skeleton__detail">
            <div className="skeleton skeleton--icon"></div>
            <div className="skeleton skeleton--small"></div>
          </div>

        </div>

        <div className="book-skeleton__buttons">
          <div className="skeleton skeleton--button"></div>
          <div className="skeleton skeleton--button"></div>
        </div>

        <div className="skeleton skeleton--bookmark"></div>

        <div className="skeleton skeleton--section-title"></div>

        <div className="book-skeleton__tags">
          <div className="skeleton skeleton--tag"></div>
          <div className="skeleton skeleton--tag"></div>
          <div className="skeleton skeleton--tag"></div>
        </div>

        <div className="skeleton skeleton--paragraph"></div>
        <div className="skeleton skeleton--paragraph"></div>
        <div className="skeleton skeleton--paragraph-short"></div>

        <div className="skeleton skeleton--section-title"></div>

        <div className="skeleton skeleton--paragraph"></div>
        <div className="skeleton skeleton--paragraph"></div>
        <div className="skeleton skeleton--paragraph-short"></div>

      </div>

      <div className="book-skeleton__image">
        <div className="skeleton skeleton--book-cover"></div>
      </div>

    </div>
  );
};


  return (
    <>
    <Header />
    <div className="row__book">
      <div className="container__book">
        {loading ? (
          <BookSkeleton />
        ) : book ? (
          <div className="inner__wrapper">
          <div className="inner__book">
            <div className="inner-book__title">
              {book.title}
              {book.subscriptionRequired && (
                      <div className="book__subscription-required">
                          (Premium)
                      </div>
                    )}
            </div>
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
                  <div className="inner-book__duration">
                    <AudioDuration audioLink={book.audioLink} />
                  </div>
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
              <button className="inner-book__read--btn" onClick={handleReadListen}>
                <div className="inner-book__read--icon">
                  <img src={openbook} alt="book" className="inner-book__icon-btn" />
                 </div>
                 <div className="inner-book__read--text">Read</div>
              </button>
              <button className="inner-book__read--btn" onClick={handleReadListen}>
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
          ) : (
            <div className="book__error">
              Unable to load this book.
            </div>
          )}

        </div>
    </div>
    </>
  );
};

export default Book;