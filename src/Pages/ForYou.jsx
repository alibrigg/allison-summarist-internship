import Menu from "../Components/Menu.jsx";
import Header from "../Components/Header.jsx";
import "./ForYou.css";
import { useEffect, useState } from "react";
import play from "../Assets/play-button.svg"
import clock from "../Assets/clock.svg"
import star from "../Assets/star.svg"
import { Link } from "react-router-dom";
import LoggedOut from "../Components/LoggedOutBook.jsx";




const ForYou = () => {
  const [foryou, setForyou] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recommend, setRecommend] = useState([]);
  const [suggest, setSuggest] = useState([]);

 useEffect(() => {
    async function fetchForyou() {
      try {
        setLoading(true);

        const response = await fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
        );

        const data = await response.json();

        setForyou(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchForyou();
  }, []);

   useEffect(() => {
    async function fetchRecommend() {
      try {
        setLoading(true);

        const response = await fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
        );

        const data = await response.json();

        setRecommend(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommend();
  }, []);

  useEffect(() => {
    async function fetchSuggest() {
      try {
        setLoading(true);

        const response = await fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
        );

        const data = await response.json();

        setSuggest(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSuggest();
  }, []);


  return (
    <>
    <Header />
    <Menu />
     
    <div className="row__for-you">
      <div className="container__for-you">
        <div className="for-you__wrapper">
          <div className="for-you__title">Selected just for you</div>
          {foryou.map((data, index) => (
          <div key={index}>
          <Link to={`/book/${data.id}`} className="selected__book">
            <div className="selected__book--sub-title">
              {data.subTitle}
            </div>
            <div className="selected__book--line"></div>
            <div className="selected__book--content">
              <figure className="book__image--wrapper">
              <img src={data.imageLink} alt="book image" className="selected__book-img" />
              </figure>
              <div className="selected__book--text">
                <div className="selected__book--title">{data.title}</div>
                <div className="selected__book--author">{data.author}</div>
                <div className="selected__book--duration-wrapper"> 
                  <div className="selected__book--icon">
                    <img src={play} alt="star" className="selected-book__icon-img" />
                  </div>
                  <div className="selected__book--duration">3 mins 23 secs</div>
                </div>
              </div>
            </div>
          </Link>
          </div>
          ))}
          <div>
            <div className="for-you__title">Recommended For You</div>
            <div className="for-you__sub--title">We think you'll like these</div>
            <div className="for-you__recommended--books">
              {recommend.map((data) => (
              <Link to={`/book/${data.id}`} className="for-you__recommended--books-link">
                 {data.subscriptionRequired && (
                      <div className="book__pill book__pill--subscription-required">
                          Premium
                      </div>
                    )}
                <figure className="book__image--wrapper">
                  <img className="book__image" src={data.imageLink} alt="book image" />
                </figure>
                <div className="recommended__book--title">{data.title}</div>
                <div className="recommended__book--author">{data.author}</div>
                <div className="recommended__book--sub-title">{data.subTitle}</div>
                <div className="recommended__book--details-wrapper">
                  <div className="recommended__book--details">
                    <div className="recommended__book--details-icon">
                      <img src={clock} alt="star" className="recommended__book--details-icon" />
                    </div>
                    <div className="recommended__book--details-text">03:24</div>
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
                  {suggest.map((data) => (
                  <Link to={`/book/${data.id}`} className="for-you__recommended--books-link">
                    {data.subscriptionRequired && (
                      <div className="book__pill book__pill--subscription-required">
                          Premium
                      </div>
                    )}
                    <figure className="book__image--wrapper">
                      <img className="book__image" src={data.imageLink} alt="book image" className="book__img" />
                    </figure>
                    <div className="recommended__book--title">{data.title}</div>
                    <div className="recommended__book--author">{data.author}</div>
                    <div className="recommended__book--sub-title">{data.subTitle}</div>
                    <div className="recommended__book--details-wrapper">
                      <div className="recommended__book--details">
                        <div className="recommended__book--details-icon">
                          <img src={clock} alt="star" className="recommended__book--details-icon" />
                        </div>
                        <div className="recommended__book--details-text">03:24</div>
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