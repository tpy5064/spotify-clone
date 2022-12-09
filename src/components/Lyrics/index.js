import React from "react";
import "./styles.scss";
import { useContext, useState } from "react";
import { songContext } from "../Contexts/songContext";
import { useEffect, useRef } from "react";

const Lyrics = () => {
  const { songPlaying, currentTime, songDuration } = useContext(songContext);
  const displayTitle = () => {
    if (typeof songPlaying.songName != "undefined") {
      return `${songPlaying.songName} by ${songPlaying.artistName}`;
    } else {
      return "Play a Song to see its lyrics!";
    }
  };

  const lyricsRef = useRef(null);
  useEffect(() => {
    DisplayLyrics();
  });

  useEffect(() => {
    lyricsRef.current.scrollTop = currentTime / songDuration;
    console.log(currentTime/songDuration);
  }, [currentTime, songDuration]);

  const [lyrics, setLyrics] = useState('Play a Song to See its lyrics!');

  // const scrollToPosition = (timeNow, duration) => {
  //   lyricsRef.current.scrollTop = (timeNow / duration);
  //   console.log('scrolling to ', timeNow/duration);
  // }

  const DisplayLyrics = () => {
    if(songPlaying.lyricsSrc) {
      fetch(songPlaying.lyricsSrc)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const lyricContents = e.target.result;
          setLyrics(lyricContents);
        };
        reader.readAsText(blob);
      });
    } else {
      setLyrics('Play a Song to See its lyrics!');
    }
  };

  return (
    <div className="lyrics-page">
      <div className="song-title">
        <h1>{displayTitle()}</h1>
      </div>
      <div className="lyrics-container" ref={lyricsRef}>
        {lyrics && lyrics.split("\n").map((line) => <p>{line}</p>)}
      </div>
    </div>
  );
};

export default Lyrics;
