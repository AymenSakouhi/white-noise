import { useState, useRef } from "react";
// import * as songs from "@public/tracks/downloads";
import water from "@/assets/downloads/water.bd8c900d.ogg";
const WhiteNoisePlayer = () => {
  const [isPlaying, setisPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  console.log(water.split("/").pop());
  // const songPath = "tracks/downloads/leaves.8ea2b102.ogg";
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef?.current?.play();
    }
    setisPlaying(!isPlaying);
  };

  return (
    <div>
      <h1>White Noise Player</h1>
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
      <audio ref={audioRef} loop>
        <source src={water} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default WhiteNoisePlayer;
