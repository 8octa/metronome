import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";

const Metronome = () => {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalMultiplier, setIntervalMultiplier] = useState(1);
  const [interval, setIntervalValue] = useState(60000 / bpm);
  const intervalRef = useRef(null);

  const intervals = [
    { label: "1x", value: 1 },
    { label: "2x", value: 2 },
    { label: "4x", value: 4 },
    { label: "8x", value: 8 },
  ];

  const clickSound = new Howl({
    src: ["Metronome.wav"],
  });

  const PlayButton = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-15 h-15 text-green-500"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    );
  };

  const StopButton = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-15 h-15 text-red-500"
      >
        <rect x="6" y="6" width="12" height="12" />
      </svg>
    );
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        clickSound.play();
      }, interval);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, interval, clickSound]);

  const handleBpmChange = (e) => {
    const newBpm = e.target.value;
    setBpm(newBpm);
    setIntervalValue(60000 / newBpm / intervalMultiplier);
  };

  const handleIntervalChange = (e) => {
    const newMultiplier = parseInt(e.target.value, 10);
    setIntervalMultiplier(newMultiplier);
    setIntervalValue(60000 / bpm / newMultiplier);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="bg-linear-to-r/longer from-gray-900 to-gray-800 flex flex-col justify-center w-[20rem] h-[20rem] p-10 m-5 shadow-2xl rounded-2xl cursor-default">
      <div className="flex flex-col justify-center">
        <div className="text-5xl font-bold flex justify-between items-center text-white">
          <span>{bpm}</span>
          <span>BPM</span>
        </div>
        <div className="my-5">
          <input
            className="cursor-pointer text-red w-full bg-gray-200"
            type="range"
            min="40"
            max="240"
            value={bpm}
            onChange={handleBpmChange}
            onMouseDown={() => setIsDraggingSlider(true)}
            onMouseUp={() => setIsDraggingSlider(false)}
            onMouseLeave={() => setIsDraggingSlider(false)}
            onTouchStart={() => setIsDraggingSlider(true)}
            onTouchEnd={() => setIsDraggingSlider(false)}
          />
        </div>
        <div className="my-5">
          <select
            className="cursor-pointer text-red w-full bg-gray-800 text-xl"
            value={intervalMultiplier}
            onChange={handleIntervalChange}
          >
            {intervals.map((option, index) => (
              <option className="font-xl" key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center">
          <button
            onClick={togglePlay}
            className="cursor-pointer focus:outline-none"
          >
            {isPlaying ? <StopButton /> : <PlayButton />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Metronome;
