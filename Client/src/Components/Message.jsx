/* eslint-disable react/prop-types */

import { useState } from "react";
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

const Message = (post) => {
  const [playing, setPlaying] = useState(null);

  const playAudio = async (url) => {
    if (playing) {
      playing.pause();
      playing.currentTime = 0;
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
          {console.log("\n new message:\n", post)}
          <div className={`w-max grid ${post.isOwn ? "ml-auto" : ""}`}>
            <div className={`px-3.5 py-2 bg-gray-700 rounded`}>
              {post.message_type == "text" ? (
                <h5 className="text-gray-100 bg-gray-600 p-2 rounded-lg max-w-[800px] text-base font-normal leading-snug">
                  <MarkDownDisplay message={post.message} />
                </h5>
              ) : post.message_type == "audio" ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-gray-600 rounded-lg">
                    <button
                      onClick={() => playAudio(post.audio?.audioUrl)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      {playing ? "Stop" : "Play"}
                    </button>
                    <div className="border border-b-2 w-20"></div>
                    <span className="text-sm text-gray-100">
                      {post.audio?.duration.toFixed(2)} s
                    </span>
                  </div>
                </div>
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

export default Message;
