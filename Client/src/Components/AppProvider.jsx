/* eslint-disable react/prop-types */
import { useState } from "react";
import AppContext from "./AppContext";

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState([
    {
      id: 0,
      message_type: "text",
      audio: null,
      image: null,
      message:
        'Hello! I am your English assistant. How can I help you today? Whether you want to practice speaking, learn new words, or improve your grammar, I’m here to guide you. Feel free to ask me anything, and let’s make learning English fun and easy together! 😊 \n\n Here is a Python example:\n\n```python\ndef sum(a,b):\n    c = a + b\n    return c\n\n# Example usage:\nresult = sum(5,10)\nprint("the result is: ", result)\n```\n\n',
      time: "05:20 PM",
      isOwn: !true,
    },
    {
      id: 1,
      message_type: "error",
      audio: null,
      image: null,
      message: "An unknown error occurred during processing.",
      time: "05:20 PM",
      isOwn: !true,
    },
    // {
    //   id: 2,
    //   name: "Bot",
    //   isText: false,
    //   audio: { audioUrl: "", timestamp: "15.5" },
    //   message: null,
    //   time: "05:20 PM",
    //   isOwn: !true,
    // },
  ]);
  return (
    <AppContext.Provider value={{ post, setPost, isLoading, setIsLoading }}>
      {children}
    </AppContext.Provider>
  );
};
