import { useState } from "react";
import { useMessageHandler } from "./API";
import MicButton from "./MicButton";
import useAudioRecorder from "./useAudioRecorder";

const Chat = () => {
  const { createNewPost, handleMessage } = useMessageHandler();
  const [message, setUserMessage] = useState("");
  const { isRecording, handleMicClick } = useAudioRecorder(
    createNewPost,
    handleMessage
  );

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    createNewPost(true, "text", message);
    setUserMessage("");
    handleMessage("text", message);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSendMessage}
            className="flex relative items-center gap-3"
          >
            <div className="flex-1 flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-2">
              <textarea
                value={message}
                onKeyDown={handleKeyDown}
                onChange={(e) => setUserMessage(e.target.value)}
                className="bg-transparent h-16 border-0 text-gray-100 placeholder-gray-400 focus:outline-none text-sm flex-1"
                placeholder="Write your message here..."
                disabled={isRecording}
              />
            </div>
            <div className=" absolute right-2 bg-gray-600 inline-flex items-center justify-center w-8 h-8 rounded-full bottom-2  gap-2">
              <MicButton isRecording={isRecording} onClick={handleMicClick} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
