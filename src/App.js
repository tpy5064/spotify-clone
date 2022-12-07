import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import { useState, useRef } from "react";
import sth from "./assets/songs/Stairway_to_Heaven.mp3";
import dirwk from "./assets/songs/Do I Really Wanna Know.mp3";
import Home from "./components/Home";
import STHART from "./assets/albumart/Stairway_to_Heaven.jpg";
import DIRWKART from "./assets/albumart/Do I Really Wanna Know.jpg";
import SUGARART from "./assets/albumart/Sugar-Maroon5.jpg";
import sugar from "./assets/songs/Sugar-Maroon5.mp3";
import { songContext } from "./components/Contexts/songContext";
import Library from "./components/Library";
import Upload from "./components/Upload";

let playlist = [
  {
    songName: "Stairway to Heaven",
    artistName: "Led Zeppelin",
    albumName: "Led Zeppelin IV",
    audioSrc: sth,
    lyricsSrc: "../../assets/lyrics/Stairway_to_heaven.txt",
    albumArtSrc: STHART,
    dateAdded: "12/01/2022",
  },
  {
    songName: "Do I Really Wanna Know",
    artistName: "Arctic Monkeys",
    albumName: "AM",
    audioSrc: dirwk,
    lyricsSrc: "../../assets/songs/Do I Really Wanna Know.txt",
    albumArtSrc: DIRWKART,
    dateAdded: "11/27/2022",
  },
  {
    songName: "Sugar",
    artistName: "Maroon 5",
    albumName: "V",
    audioSrc: sugar,
    lyricsSrc: "../../assets/lyrics/Sugar-Maroon5.txt",
    albumArtSrc: SUGARART,
    dateAdded: "12/05/2022",
  },
];

function App() {
  const [playStatus, setPlayStatus] = useState(false);
  const [songDuration, setSongDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [songPlaying, setSongPlaying] = useState({});
  const [masterlist, setMasterlist] = useState(playlist);
  const [queue, setQueue] = useState(playlist);
  const [libraryList, setLibraryList] = useState(playlist);
  const [queueIndex, setQueueIndex] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volumePercentage, setVolumePercentage] = useState(1);

  let playingAudioRef = useRef(new Audio());
  const intervalRef = useRef();

  const handlePlayingAudio = (song) => {
    if (song) {
      playingAudioRef.current.pause();
      playingAudioRef.current = new Audio(song);
      playingAudioRef.current.volume = volumePercentage;
      playingAudioRef.current.onloadedmetadata = () => {
        setSongDuration(playingAudioRef.current.duration);
      };
    }
    playingAudioRef.current.play();
    playingAudioRef.current.volume = volumePercentage;
    startTimer();
  };

  const handlePausingAudio = () => {
    playingAudioRef.current.pause();
  };

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentTime(playingAudioRef.current.currentTime);
    }, [1000]);
  };

  const handleRepeat = () => {
    playingAudioRef.current.loop = true;
  };

  const handleNoRepeat = () => {
    playingAudioRef.current.loop = false;
  };

  return (
    <>
      <songContext.Provider
        value={{
          queue,
          setQueue,
          queueIndex,
          setQueueIndex,
          songPlaying,
          setSongPlaying,
          playStatus,
          setPlayStatus,
          handlePlayingAudio,
          handlePausingAudio,
          songDuration,
          currentTime,
          setCurrentTime,
          masterlist,
          setMasterlist,
          intervalRef,
          playingAudioRef,
          isShuffle,
          setIsShuffle,
          isRepeat,
          setIsRepeat,
          handleRepeat,
          handleNoRepeat,
          volumePercentage,
          setVolumePercentage,
          libraryList,
          setLibraryList,
        }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/upload" element={<Upload />} />
          </Route>
        </Routes>
      </songContext.Provider>
    </>
  );
}

export default App;
