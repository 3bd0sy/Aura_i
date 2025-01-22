/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef } from "react";
import Message from "./Components/Message";
import Chat from "./Components/Chat";
import AppContext from "./Components/AppContext";
const Loader = () => {
  return (
    <div role="status" className="max-w-sm flex gap-3 animate-pulse" dir="rtl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ccc"
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
      <div className="w-[360px]">
        <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
        <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2"></div>
        <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
        <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2"></div>
        <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2"></div>
        <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
const App = () => {
  const { post, isLoading } = useContext(AppContext);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [post]);
  return (
    <div className="bg-gray-950 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="h-[80vh] flex flex-col-reverse overflow-y-auto mb-20">
          <div className="flex flex-col">
            {post.map((msg) => (
              <Message
                key={msg.id}
                name={msg.name}
                image={msg.image}
                message_type={msg.message_type}
                audio={msg.audio}
                message={msg.message}
                time={msg.time}
                isOwn={msg.isOwn}
              />
            ))}
            {isLoading && (
              <div className="w-full mt-2 flex justify-end">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <Chat />
      </div>
    </div>
  );
};

export default App;
