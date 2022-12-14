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
import TLIKTBART from "./assets/albumart/tame-impala-currents.jpg"
import tliktb from "./assets/songs/Tame Impala - The Less I Know the Better.mp3"
import sugar from "./assets/songs/Sugar-Maroon5.mp3";
import sthlyrics from "./assets/lyrics/Stairway to Heaven.txt";
import sugarlyrics from "./assets/lyrics/Sugar-Maroon5.txt";
import dirwklyrics from "./assets/lyrics/Do I Really Wanna Know.txt"
import tliktblyrics from "./assets/lyrics/The Less I Know the Better.txt"
import { songContext } from "./components/Contexts/songContext";
import Library from "./components/Library";
import Upload from "./components/Upload";
import Likes from "./components/Likes";
import Lyrics from "./components/Lyrics";

let playlist = [
  {
    songName: "Stairway to Heaven",
    artistName: "Led Zeppelin",
    albumName: "Led Zeppelin IV",
    audioSrc: sth,
    lyricsSrc: sthlyrics,
    albumArtSrc: STHART,
    dateAdded: "12/01/2022",
    isLiked: false,
  },
  {
    songName: "Do I Really Wanna Know",
    artistName: "Arctic Monkeys",
    albumName: "AM",
    audioSrc: dirwk,
    lyricsSrc: dirwklyrics,
    albumArtSrc: DIRWKART,
    dateAdded: "11/27/2022",
    isLiked: false,
  },
  {
    songName: "Sugar",
    artistName: "Maroon 5",
    albumName: "V",
    audioSrc: sugar,
    lyricsSrc: sugarlyrics,
    albumArtSrc: SUGARART,
    dateAdded: "12/05/2022",
    isLiked: false,
  },
  {
    songName: "The Less I Know the Better",
    artistName: "Tame Impala",
    albumName: "Currents",
    audioSrc: tliktb,
    lyricsSrc: tliktblyrics,
    albumArtSrc: TLIKTBART,
    dateAdded: "12/08/2022",
    isLiked: false,
  },
];

function App() {
  const [playStatus, setPlayStatus] = useState(false);
  const [songDuration, setSongDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [songPlaying, setSongPlaying] = useState({});
  const [masterlist, setMasterlist] = useState(playlist);
  const [queue, setQueue] = useState([]);
  const [libraryList, setLibraryList] = useState(playlist);
  const [likedList, setLikedList] = useState([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volumePercentage, setVolumePercentage] = useState(1);
  const [currentList, setCurrentList] = useState([]);
  const [currentLyrics, setCurrentLyrics] = useState("");

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

  const findListIndex = (songlist, song) => {
    for (let i = 0; i < songlist.length; i++) {
      if (songlist[i].songName === song.songName) {
        return i;
      }
    }
  };

  const updateRecents = (song) => {
    for (let i = 0; i < masterlist.length; i++) {
      if (masterlist[i].songName === song.songName) {
        const updated = masterlist;
        updated.splice(i, 1);
        setMasterlist([song, ...updated]);
        return;
      }
    }
    setMasterlist([song, ...masterlist]);
    return;
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
          likedList,
          setLikedList,
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
          currentList,
          setCurrentList,
          findListIndex,
          updateRecents,
          currentLyrics,
          setCurrentLyrics,
        }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/likes" element={<Likes />} />
            <Route path="/lyrics" element={<Lyrics />} />
          </Route>
        </Routes>
      </songContext.Provider>
    </>
  );
}

export default App;
