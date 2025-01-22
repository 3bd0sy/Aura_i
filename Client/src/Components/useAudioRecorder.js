import { useState, useCallback } from "react";
import RecordRTC from "recordrtc";

const useAudioRecorder = (createNewPost, handleMessage) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const streamSettings = {
    audio: {
      channelCount: 1,
      sampleRate: 44100,
      sampleSize: 16,
      volume: 1.0,
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
  };
  const recorderSettings = {
    type: "audio",
    mimeType: "audio/wav",
    recorderType: RecordRTC.StereoAudioRecorder,
    numberOfAudioChannels: 1,
    desiredSampRate: 44100,
    bitRate: 128000,
    bufferSize: 4096,
    timeSlice: 1000,
    audioBitsPerSecond: 128000,
    disableLogs: false,
    createInternalTimer: true,
  };
   const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(streamSettings);
      const recorder = new RecordRTC(stream, recorderSettings);
      recorder.startRecording();
      setRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  },[]);

  const stopRecording = useCallback(() => {
    if (recorder) {
      recorder.stopRecording(async () => {
        const blob = recorder.getBlob();
        const audioUrl = URL.createObjectURL(blob);
        const audioElement = new Audio(audioUrl);

        const getAudioDuration = (audioElement) => {
          return new Promise((resolve) => {
            audioElement.addEventListener("loadedmetadata", () => {
              resolve(audioElement.duration);
            });
          });
        };
        const audioDuration = await getAudioDuration(audioElement);
        createNewPost(true, "audio", null, audioUrl, audioDuration);
        const formData = new FormData();
        formData.append("file", blob, "audio.wav");
        handleMessage("speech", formData);
        recorder.destroy();
        setRecorder(null);
        setIsRecording(false);
      });
    }
  }, [recorder, createNewPost, handleMessage]);

  const handleMicClick = useCallback(() => {
    isRecording ? stopRecording() : startRecording();
  }, [isRecording, stopRecording, startRecording]);

  return {
    isRecording,
    handleMicClick,
  };
};

export default useAudioRecorder;
