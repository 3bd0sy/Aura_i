/* eslint-disable no-unused-vars */
import { useContext } from "react";
import AppContext from "./AppContext";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

export function useMessageHandler() {
  const { setPost, setIsLoading } = useContext(AppContext);
  const createNewPost = (
    isOwn,
    message_type = "text",
    message = null,
    audioUrl = null,
    duration = null,
    image = null
  ) => {
    setPost((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now(),
        message_type: message_type,
        audio: {
          audioUrl: audioUrl,
          duration: duration,
        },
        message: message,
        isOwn: isOwn,
        image: image,
      },
    ]);
  };

  const handleMessage = async (path, data) => {
    try {
      setIsLoading(true);
      const response = await API.post(
        path,
        path == "speech" ? data : { message: data },
        {
          headers:
            path == "speech"
              ? {
                  "Content-Type": "multipart/form-data",
                }
              : "",
          responseType: "json",
          timeout: 50000,
        }
      );

      const { response_type, response: botResponse } = response.data;

      if (response_type === "image") {
        const imageSrc = `data:image/png;base64,${botResponse}`;
        createNewPost(false, "image", null, null, null, imageSrc);
      } else if (response_type === "text") {
        createNewPost(false, "text", botResponse);
      } else if (response_type === "audio") {
        const audioSrc = `data:audio/mp3;base64,${botResponse}`;
        const processedAudioElement = new Audio(audioSrc);
        createNewPost(
          false,
          "audio",
          null,
          audioSrc,
          processedAudioElement.duration
        );
      } else {
        console.error("Error: Unknown response type", response_type);
        createNewPost(
          false,
          "error",
          "An unknown error occurred during processing."
        );
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred.";
      if (error.response) {
        errorMessage = `${error.response.data.error}  status: ${error.response.status}`;
        console.error("Server Error Details:", error.response.data.error);
        console.error("Response Status:", error.response.status);
        console.error("Response Headers:", error.response.headers);
      } else if (error.request) {
        errorMessage = "No response received from the server.";
      } else {
        errorMessage = error.message || "Error in sending the request.";
      }
      createNewPost(false, "error", errorMessage);
      console.error("Error uploading audio:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return { createNewPost, handleMessage };
}

export default API;
