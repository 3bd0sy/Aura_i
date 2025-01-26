from io import BytesIO
import pyttsx3
import speech_recognition as sr
import os
import logging
from pydub import AudioSegment

# from server import speech

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class SpeechConverter:
    @staticmethod
    def text_to_speech(text: str) -> BytesIO:
        """
        Convert text to audio and store it in a buffer.

        Args:
            text (str): The text to convert to speech.

        Returns:
            BytesIO: A buffer containing the audio data.

        """
        engine = pyttsx3.init()
        temp_file = 'temp_output.mp3'
        engine.setProperty('rate', 120)

        try:
            engine.save_to_file(text, temp_file)
            engine.runAndWait()
            audio_buffer = BytesIO()
            audio = AudioSegment.from_file(temp_file)
            duration = len(audio) / 1000  # Convert milliseconds to seconds
            with open(temp_file, 'rb') as f:
                audio_buffer.write(f.read())
                audio_buffer.seek(0)
        except Exception as e:
            logger.error(f"Error during text-to-speech conversion: {e}")
            raise RuntimeError(f"Error during text-to-speech conversion: {e}")
        finally:
            if os.path.exists(temp_file):
                try:
                    os.remove(temp_file)
                except PermissionError:
                    logger.warning(
                        f"Permission error while deleting {temp_file}")
                    pass  # Ignore the error if the file is in use

        return audio_buffer

    @staticmethod
    def speech_to_text(audio_file_path: str) -> str:
        """
        Convert an audio file to text.

        Args:
            audio_file_path (str): The path to the audio file to convert to text.

        Returns:
            str: The recognized text.
"""
        recognizer = sr.Recognizer()

        try:
            with sr.AudioFile(audio_file_path) as source:
                audio_data = recognizer.record(source)
                text = recognizer.recognize_google(audio_data)

            if not text.strip():
                raise RuntimeError("No speech detected in the audio.")
            return text

        except sr.UnknownValueError:
            raise RuntimeError("The audio is empty or unintelligible.")

        except sr.RequestError as e:
            raise RuntimeError(f"Speech recognition service error: {e}")

        except Exception as e:
            logger.error(f"Error during speech-to-text conversion: {e}")
            raise RuntimeError(f"Error during speech-to-text conversion: {e}")


if __name__ == "__main__":
    speech = SpeechConverter()
    print(speech.text_to_speech("test  Speech recognition service error "))
    print(speech.speech_to_text("test  Speech recognition service error "))
