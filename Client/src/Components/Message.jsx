/* eslint-disable react/prop-types */
import React, { useState } from "react";
import MarkDownDisplay from "./MarkDownDisplay";

const BotIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-bot"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
};

const ErrMesage = ({ message }) => {
  return (
    <div className=" max-w-[800px] text-base font-normal leading-snug p-4 mb-4 text-red-800 border-l-4 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
      <div className="flex items-center">
        <svg
          className="shrink-0 w-4 h-4 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <h3 className="text-lg font-medium">Something is wrong </h3>
      </div>
      <div className="mt-2 mb-4 text-sm">{message}</div>
      {/* <div className="flex">
        <button type="button" className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
          <svg className="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
          </svg>
          View more
        </button>
        <button type="button" className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800">
          Dismiss
        </button>
      </div> */}
    </div>
  );
};

const AudioMessage = ({ playAudio, playing, duration }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 p-3 bg-gray-600 rounded-lg">
        <button
          onClick={() => playAudio()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {playing ? "Stop" : "Play"}
        </button>
        <div className="border border-b-2 w-20"></div>
        <span className="text-sm text-gray-100">{duration.toFixed(2)} s</span>
      </div>
    </div>
  );
};

const Message = (post) => {
  const [playing, setPlaying] = useState(null);

  const playAudio = async (url) => {
    if (playing) {
      playing.pause();
      playing.currentTime = 0;
      setPlaying(null);
      return;
    }

    const audio = new Audio(url);
    audio.onended = () => setPlaying(null);
    await audio.play();
    setPlaying(audio);
  };
  return (
    <>
      <div className={`flex gap-2.5 ${!post.isOwn ? "justify-end" : ""} mb-4`}>
        <div className="grid">
          <div className={`w-max grid ${post.isOwn ? "ml-auto" : ""}`}>
            <div className={`px-3.5 py-2 bg-gray-700 rounded`}>
              {post.message_type == "text" ? (
                <MarkDownDisplay message={post.message} />
              ) : post.message_type == "audio" ? (
                <AudioMessage
                  playAudio={() => playAudio(post.audio?.audioUrl)}
                  playing={playing}
                  duration={post.audio?.duration || 0}
                />
              ) : post.message_type == "error" ? (
                <ErrMesage
                  message={post.message || "An unknown error occurred"}
                />
              ) : (
                <div className="max-w-[500px] max-h-[500px]">
                  <img
                    src={post.image}
                    style={{
                      border: "1px solid #ccc",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {!post.isOwn && <BotIcon />}
      </div>
    </>
  );
};

export default React.memo(Message);
