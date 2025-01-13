import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import qala from "../assets/qala.mp3";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currTime, setCurrTime] = useState({ min: 0, sec: 0 });
  const [seconds, setSeconds] = useState(0);

  const [play, { pause, duration, sound }] = useSound(qala);

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const sec = duration / 1000 || 0;
    const min = Math.floor(sec / 60);
    const secRemain = Math.floor(sec % 60);

    setCurrTime({ min, sec: secRemain });
  }, [duration]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        const sec = sound.seek([]) || 0;
        const min = Math.floor(sec / 60);
        const secRemain = Math.floor(sec % 60);

        setSeconds(sec);
        setCurrTime({ min, sec: secRemain });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sound]);

  return (
    <div className="component">
      <h2>Playing Now</h2>
      <img
        className="musicCover"
        src="https://picsum.photos/200/200"
        alt="Music Cover"
      />
      <div>
        <h3 className="title">Rubaiyyan</h3>
        <p className="subTitle">Qala</p>
      </div>
      <div>
        <button className="playButton">
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
        {!isPlaying ? (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
        <button className="playButton">
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
      </div>
      <div>
        <div className="time">
          <p>
            {currTime.min}:{currTime.sec < 10 ? `0${currTime.sec}` : currTime.sec}
          </p>
          <p>
            {Math.floor((duration || 0) / 60000)}:
            {Math.floor(((duration || 0) % 60000) / 1000) < 10
              ? `0${Math.floor(((duration || 0) % 60000) / 1000)}`
              : Math.floor(((duration || 0) % 60000) / 1000)}
          </p>
        </div>
        <input
          type="range"
          min="0"
          max={duration / 1000 || 0}
          value={seconds}
          className="timeline"
          onChange={(e) => sound.seek([e.target.value])}
        />
      </div>
    </div>
  );
};

export default Player;
