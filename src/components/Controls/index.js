import React from "react";
import "./styles.scss";
import playIcon from "../../assets/svg/play.svg";
import pauseIcon from "../../assets/svg/pause.svg";
import skipForwardIcon from "../../assets/svg/skip_forward.svg";
import skipBackwardIcon from "../../assets/svg/skip_back.svg";
import shuffleIcon from "../../assets/svg/shuffle.svg";
import repeatIcon from "../../assets/svg/repeat.svg";
import volumeIcon from "../../assets/svg/volume.svg";
import { useRef } from "react";
import song from "../../assets/songs/Stairway_to_Heaven.mp3"


const Controls = ({ setPlayPause, playStatus, playlist }) => {
  const audioRef = useRef();

  const playSong = () => {
    const audio = audioRef.current;
    if(!playStatus) {
      console.log(`Playing ${playlist[0][0].songName} from ${playlist[0][0].audioSrc}`);
      audio.play();
    } else {
      console.log('pausing');
      audio.pause();
    }
  }

  return (
    <div className="controls">
      <div className="song-info">
        <p className="song-name">Song Name</p>
        <p className="artist-name">Artist Name</p>
      </div>
      <div className="song-controls">
        <div className="song-control-btns">
          <button>
            <img src={shuffleIcon} alt="Shuffle Icon" />
          </button>
          <button>
            <img src={skipBackwardIcon} alt="Skip Back Icon" />
          </button>
          <button onClick={() => {
            setPlayPause();
            playSong();
          }}>
            <img
              src={playStatus ? pauseIcon : playIcon}
              alt="Play Icon"
              className="play-icon"
            />
          </button>
          <button>
            <img src={skipForwardIcon} alt="Skip Back Icon" />
          </button>
          <button>
            <img src={repeatIcon} alt="Repeat Icon" className="repeat-icon" />
          </button>
        </div>
        <div className="progress-container">
          <span>0:00</span>
          <input type="range" step="0.01" className="progress-slider" />
          <span>02:59</span>
        </div>
      </div>
      <div className="volume">
        <button>
          <img src={volumeIcon} alt="Volume Icon" />
        </button>
        <div className="slider-container">
          <audio src={playlist[0][0].audioSrc} ref={audioRef}></audio>
          <input type="range" step="0.01" className="slider" />
        </div>
      </div>
    </div>
  );
};

export default Controls;
