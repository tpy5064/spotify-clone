import React from "react";
import "./styles.scss";
import playIcon from "../../assets/svg/play.svg";
import pauseIcon from "../../assets/svg/pause.svg";
import skipForwardIcon from "../../assets/svg/skip_forward.svg";
import skipBackwardIcon from "../../assets/svg/skip_back.svg";
import shuffleIcon from "../../assets/svg/shuffle.svg";
import repeatIcon from "../../assets/svg/repeat.svg";
import volumeIcon from "../../assets/svg/volume.svg";
import { useState, useContext } from "react";
import { songContext } from "../Contexts/songContext";

const Controls = () => {
  const {
    queue,
    queueIndex,
    setQueueIndex,
    isShuffle,
    setIsShuffle,
    songPlaying,
    setSongPlaying,
    playStatus,
    setPlayStatus,
    handlePlayingAudio,
    handlePausingAudio,
    songDuration,
    currentTime,
    setCurrentTime,
    intervalRef,
    playingAudioRef,
    masterlist,
    isRepeat,
    setIsRepeat,
    handleRepeat,
    handleNoRepeat,
    volumePercentage,
    setVolumePercentage,
    findListIndex,
    currentList,
  } = useContext(songContext);

  

  const playPercentage = songDuration
    ? `${(currentTime / songDuration) * 100}%`
    : "0%";

  const skipForward = (song) => {
    let idx = findListIndex(currentList, song);
    if (idx < currentList.length - 1) {
      idx++;
    } else {
      idx = 0;
    }
    setSongPlaying(currentList[idx])
    handlePlayingAudio(currentList[idx].audioSrc);
    setPlayStatus(true);
  }

  const skipBackward = (song) => {
    let idx = findListIndex(currentList, song);
    if (idx > 0) {
      idx--;
    } else {
      idx = currentList.length - 1;
    }
    setSongPlaying(currentList[idx])
    handlePlayingAudio(currentList[idx].audioSrc);
    setPlayStatus(true);
  }

  return (
    <div className="controls">
      <div className="song-info">
        <p className="song-name">{songPlaying.songName}</p>
        <p className="artist-name">{songPlaying.artistName}</p>
      </div>
      <div className="song-controls">
        <div className="song-control-btns">
          <button>
            <img
              src={shuffleIcon}
              alt="Shuffle Icon"
              onClick={() => {
                setIsShuffle(!isShuffle);
              }}
            />
            <div className={isShuffle ? "is-active" : ""}></div>
          </button>
          <button onClick={() => {skipBackward(songPlaying)}}>
            <img src={skipBackwardIcon} alt="Skip Back Icon" />
          </button>
          <button onClick={() => {}}>
            <img
              src={playStatus ? pauseIcon : playIcon}
              alt="Play Icon"
              className="play-icon"
              onClick={() => {
                playStatus ? handlePausingAudio() : handlePlayingAudio();
                setPlayStatus(!playStatus);
              }}
            />
          </button>
          <button onClick={() => {skipForward(songPlaying)}}>
            <img src={skipForwardIcon} alt="Skip Forward Icon" />
          </button>
          <button>
            <img src={repeatIcon} alt="Repeat Icon" className="repeat-icon" onClick={() => {
              isRepeat ? handleNoRepeat() : handleRepeat();
              setIsRepeat(!isRepeat);
            }}/>
            <div className={isRepeat ? "is-active" : ""}></div>
          </button>
        </div>
        <div className="progress-container">
          <span>
            {new Date(currentTime * 1000).toISOString().slice(14, 19)}
          </span>
          <input
            type="range"
            step="1"
            className="progress-slider"
            value={currentTime}
            min="0"
            max={songDuration ? songDuration : `${songDuration}`}
            onChange={(e) => {
              clearInterval(intervalRef);
              playingAudioRef.current.currentTime = e.target.value;
              setCurrentTime(playingAudioRef.current.currentTime);
            }}
            style={{
              background: `
            -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${playPercentage}, #fff), color-stop(${playPercentage}, #5e5e5e))
          `,
            }}
          />
          <span>
            {new Date(songDuration * 1000).toISOString().slice(14, 19)}
          </span>
        </div>
      </div>
      <div className="volume">
        <button>
          <img src={volumeIcon} alt="Volume Icon" />
        </button>
        <div className="slider-container">
          <input
            type="range"
            step="0.01"
            className="slider"
            min="0"
            max="1"
            onChange={(e) => {
              playingAudioRef.current.volume = volumePercentage;
              setVolumePercentage(e.target.value);
            }}
            style={{
              background: `
            -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${volumePercentage}, #fff), color-stop(${volumePercentage}, #5e5e5e))
          `,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Controls;
