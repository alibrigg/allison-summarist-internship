import Header from "../Components/Header";
import "./Player.css";
import forward from "../Assets/forward-10.png"
import rewind from "../Assets/rewind-10.png"
import play from "../Assets/play.png"
import pause from "../Assets/pause.svg"
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";



const Player = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (time) => {
  if (!time || isNaN(time)) {
    return "00:00";
  }

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
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

    const togglePlay = () => {
  if (!audioRef.current) return;

  if (isPlaying) {
    audioRef.current.pause();
  } else {
    audioRef.current.play();
  }

  setIsPlaying(!isPlaying);
};

const rewind10 = () => {
  if (!audioRef.current) return;

  audioRef.current.currentTime = Math.max(
    0,
    audioRef.current.currentTime - 10
  );
};

const forward10 = () => {
  if (!audioRef.current) return;

  audioRef.current.currentTime = Math.min(
    duration,
    audioRef.current.currentTime + 10
  );
};

const handleProgressChange = (event) => {
  const newTime = Number(event.target.value);

  if (!audioRef.current) return;

  audioRef.current.currentTime = newTime;
  setCurrentTime(newTime);
};

  return (
    <>
    
    <Header />
    {book && (
    <div className="row__player">
    <div className="summary">
      <div className="audio__book--summary">
        <div className="audio__book--summary-title">
          <b>{book.title}</b>
        </div>
        <div className="audio__book--summary-text">
          {book.summary}
        </div>
      </div>
      <div className="audio__wrapper">
        <audio
          ref={audioRef}
          src={book.audioLink}
          onLoadedMetadata={(event) => {
            setDuration(event.currentTarget.duration);
          }}
          onTimeUpdate={(event) => {
            setCurrentTime(event.currentTarget.currentTime);
          }}
          onEnded={() => {
            setIsPlaying(false);
          }}
        />
        <div className="audio__track--wrapper">
          <figure className="audio__track--image-mask">
            <figure className="book__image--wrapper">
              <img className="book__image" src={book.imageLink} alt="book"/>
            </figure>
          </figure>
          <div className="audio__track--details-wrapper">
            <div className="audio__track--title">
              {book.title}
            </div>
            <div className="audio__track--author">{book.author}</div>
          </div>
        </div>
        <div className="audio__controls--wrapper">
          <div className="audio__controls">
            <button
              className="audio__controls--btn"
              onClick={rewind10}
            >
              <img
                className="audio__controls--btn-img"
                src={rewind}
                alt="Rewind 10 seconds"
              />
            </button>
            <button
              className="audio__controls--btn audio__controls--btn-play"
              onClick={togglePlay}
            >
              <img
                className="audio__controls--btn-img audio__controls--btn-play-img"
                src={isPlaying ? pause : play}
                alt={isPlaying ? "Pause" : "Play"}
              />
            </button>
            <button
              className="audio__controls--btn"
              onClick={forward10}
            >
              <img
                className="audio__controls--btn-img"
                src={forward}
                alt="Forward 10 seconds"
              />
            </button>
          </div>
        </div>
        <div className="audio__progress--wrapper">
          <div className="audio__time">
            {formatTime(currentTime)}
          </div>

          <input
            type="range"
            className="audio__progress--bar"
            value={currentTime}
            max={duration || 0}
            onChange={handleProgressChange}
          />

          <div className="audio__time">
            {formatTime(duration)}
          </div>
        </div>
      </div>
    </div>
    </div>
    )}
    </>
  );
};

export default Player;