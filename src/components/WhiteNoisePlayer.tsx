import { useState, useRef, ReactNode } from "react";
import { IconType } from "react-icons";
// import songs from "@/assets/tracks/downloads/";

type WhiteNoiseProps = {
  path: string;
  title: string;
};
const WhiteNoisePlayer: React.FC<WhiteNoiseProps> = ({ path, title }) => {
  const [isPlaying, setisPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
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
      <div className="grid grid-cols-3">
        <div className="col-span-1">{title}</div>
        <div className="col-span-1">{/* icon */}</div>
        <div className="col-span-1">
          <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
          <audio ref={audioRef} loop>
            <source src={path} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
};

export default WhiteNoisePlayer;
