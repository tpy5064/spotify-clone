import './App.scss';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import { useState, useRef } from 'react';
import sth from "./assets/songs/Stairway_to_Heaven.mp3"


function createSong(songName, artistName, audioSrc, albumArtSrc='', lyricsSrc='') {
  this.songName = songName;
  this.artistName = artistName;
  this.audioSrc = audioSrc;
  this.lyricsSrc = lyricsSrc;
}

let rockPlaylist = [
  {
    songName: "Stairway to Heaven",
    artistName: "Led Zeppelin",
    audioSrc: sth,
    lyricsSrc: "../../assets/lyrics/Stairway_to_heaven.txt"
  },
  {
    songName: "Do I Really Wanna Know",
    artistName: "Arctic Monkeys",
    audioSrc: "../../assets/songs/Do I Really Wanna Know.mp3",
    lyricsSrc: "../../assets/songs/Do I Really Wanna Know.txt"
  }
];

let popPlaylist = [
  {
    songName: "Sugar",
    artistName: "Maroon 5",
    audioSrc: "../../assets/songs/Sugar-Maroon5.mp3",
    lyricsSrc: "../../assets/lyrics/Sugar-Maroon5.txt"
  }
];

let playlist = [rockPlaylist, popPlaylist];

function App() {
  const [playStatus, setPlayStatus] = useState(false);
  const [playPercentage, setPlayPercentage] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  

  function handlePlayClick() {
    console.log(playStatus);
    setPlayStatus(!playStatus);
    console.log(playStatus);
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout setPlayPause={handlePlayClick} playStatus={playStatus} playlist={playlist}/>} ></Route>
      </Routes>
    </>
  );
}

export default App;
