import Header from "../Components/Header.jsx";
import "./ForYou.css";
import { useEffect, useState } from "react";
import play from "../Assets/play-button.svg"
import clock from "../Assets/clock.svg"
import star from "../Assets/star.svg"
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/init";


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

const ForYou = () => {
    const navigate = useNavigate();
  const [foryou, setForyou] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommend, setRecommend] = useState([]);
  const [suggest, setSuggest] = useState([]);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/");
    }
  });

  return () => unsubscribe();
}, [navigate]);

 useEffect(() => {
  async function fetchBooks() {
    try {
      setLoading(true);

      const [foryouResponse, recommendResponse, suggestResponse] =
        await Promise.all([
          fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
          ),
          fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
          ),
          fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
          ),
        ]);

      const foryouData = await foryouResponse.json();
      const recommendData = await recommendResponse.json();
      const suggestData = await suggestResponse.json();

      setForyou(foryouData);
      setRecommend(recommendData);
      setSuggest(suggestData);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }

  fetchBooks();
}, []);

const SkeletonBook = () => {
  return (
    <div className="skeleton__book">
      <div className="skeleton__image"></div>

      <div className="skeleton__content">
        <div className="skeleton__title"></div>
        <div className="skeleton__author"></div>
        <div className="skeleton__subtitle"></div>

        <div className="skeleton__details">
          <div className="skeleton__detail"></div>
          <div className="skeleton__detail"></div>
        </div>
      </div>
    </div>
  );
};

const SkeletonSelectedBook = () => {
  return (
    <div className="skeleton__selected">

      <div className="skeleton__selected-subtitle"></div>

      <div className="skeleton__selected-content">

        <div className="skeleton__selected-image"></div>

        <div className="skeleton__selected-text">
          <div className="skeleton__selected-title"></div>
          <div className="skeleton__selected-author"></div>

          <div className="skeleton__selected-duration"></div>
        </div>

      </div>
    </div>
  );
};

  return (
    <>
    <Header />
     
    <div className="row__for-you">
      <div className="container__for-you">
        <div className="for-you__wrapper">
          <div className="for-you__title">
  Selected just for you
</div>

{loading ? (
  <SkeletonSelectedBook />
) : (
  foryou.map((data) => (
    <div key={data.id}>
      <Link to={`/book/${data.id}`} className="selected__book">
        <div className="selected__book--sub-title">
          {data.subTitle}
        </div>

        <div className="selected__book--line"></div>

        <div className="selected__book--content">

          <figure className="book__image--wrapper">
            <img
              src={data.imageLink}
              alt="book cover"
              className="selected__book-img"
            />
          </figure>

          <div className="selected__book--text">

            <div className="selected__book--title">
              {data.title}
            </div>

            <div className="selected__book--author">
              {data.author}
            </div>

            <div className="selected__book--duration-wrapper">
              <div className="selected__book--icon">
                <img
                  src={play}
                  alt="play"
                  className="selected-book__icon-img"
                />
              </div>

              <div className="selected__book--duration">
                <AudioDuration audioLink={data.audioLink} longFormat />
              </div>
            </div>

          </div>
        </div>
      </Link>
    </div>
  ))
)}
          <div>
            <div className="for-you__title">Recommended For You</div>
            <div className="for-you__sub--title">We think you'll like these</div>
            <div className="for-you__recommended--books">
              {loading? Array.from({ length: 5 }).map((_, index) => (
                <SkeletonBook key={index} />
              ))
            : recommend.map((data) => (
              <Link to={`/book/${data.id}`} className="for-you__recommended--books-link">
                 {data.subscriptionRequired && (
                      <div className="book__pill book__pill--subscription-required">
                          Premium
                      </div>
                    )}
                <figure className="book__image--wrapper">
                  <img className="book__image" src={data.imageLink} alt="book cover" />
                </figure>
                <div className="recommended__book--title">{data.title}</div>
                <div className="recommended__book--author">{data.author}</div>
                <div className="recommended__book--sub-title">{data.subTitle}</div>
                <div className="recommended__book--details-wrapper">
                  <div className="recommended__book--details">
                    <div className="recommended__book--details-icon">
                      <img src={clock} alt="star" className="recommended__book--details-icon" />
                    </div>
                    <div className="recommended__book--details-text">
                      <AudioDuration audioLink={data.audioLink} />
                    </div>
                  </div>
                  <div className="recommended__book--details">
                    <div className="recommended__book--details-icon">
                      <img src={star} alt="star" className="recommended__book--details-icon" />
                    </div>
                    <div className="recommended__book--details-text">{data.averageRating}</div>
                  </div>
                </div>
              </Link>
              ))}
              </div>
              </div>
              <div>
                <div className="for-you__title">Suggested Books</div>
                <div className="for-you__sub--title">Browse those books</div>
                <div className="for-you__recommended--books">
                  {loading? Array.from({ length: 5 }).map((_, index) => (
                    <SkeletonBook key={index} />
                  ))
                : suggest.map((data) => (
                  <Link to={`/book/${data.id}`} className="for-you__recommended--books-link">
                    {data.subscriptionRequired && (
                      <div className="book__pill book__pill--subscription-required">
                          Premium
                      </div>
                    )}
                    <figure className="book__image--wrapper">
                      <img className="book__image" src={data.imageLink} alt="book cover" />
                    </figure>
                    <div className="recommended__book--title">{data.title}</div>
                    <div className="recommended__book--author">{data.author}</div>
                    <div className="recommended__book--sub-title">{data.subTitle}</div>
                    <div className="recommended__book--details-wrapper">
                      <div className="recommended__book--details">
                        <div className="recommended__book--details-icon">
                          <img src={clock} alt="star" className="recommended__book--details-icon" />
                        </div>
                        <div className="recommended__book--details-text">
                          <AudioDuration audioLink={data.audioLink} />
                        </div>
                      </div>
                      <div className="recommended__book--details">
                        <div className="recommended__book--details-icon">
                          <img src={star} alt="star" className="recommended__book--details-icon" />
                        </div>
                        <div className="recommended__book--details-text">{data.averageRating}</div>
                      </div>
                    </div>
                  </Link>
            ))}
          </div>
          </div>
        </div> 
        </div>
        </div>
    </>
  );
};

export default ForYou;