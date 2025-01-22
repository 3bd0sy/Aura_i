from image_generator import ImageGenerator, generate_image
from gemini_chat import ChatBot, generate_text
from intentClassifier.load_model import IntentModel
from speech_converter import SpeechConverter
from flask import Flask, request, jsonify, send_file
import base64
import speech_recognition as sr
import logging
from flask_cors import CORS

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class MyFlaskApp:
    def __init__(self):
        self.app = Flask(__name__)
        CORS(self.app, resources={r"/*": {"origins": "*"}})
        self.chat_bot = ChatBot()
        self.image_generator = ImageGenerator()
        self.speech_converter = SpeechConverter()
        self.intent_model = IntentModel()
        self.setup_routes()

    def setup_routes(self):
        @self.app.route("/text", methods=["post"])
        def text() -> str:
            """
            recive text -> pass it to AI  -> return the response to the user
            """
            try:
                data = request.json
                user_message: str = data.get("message", "")
                user_message=user_message.strip()
                if not user_message:
                    return jsonify({"error": "No message provided"}), 400
                prediction = self.intent_model.predict(user_message)
                intent = prediction["intent"]
                if intent == "generate_image":
                    image_buffer = generate_image(user_message)
                    # image_buffer = self.image_generator.generate_image(user_message)
                    image_base64 = base64.b64encode(
                        image_buffer.getvalue()).decode('utf-8')
                    # Return the image as a base64-encoded string
                    return jsonify({
                        "response_type": "image",
                        "response": image_base64
                    })
                else:
                    ai_response = generate_text(user_message)
                    # ai_response = self.chat_bot.chat(user_message)
                    return jsonify({
                        "response_type": "text",
                        "response": ai_response.decode('utf-8')
                    })
            except Exception as e:
                logger.error(f"Error in /text endpoint: {e}")
                return jsonify({"error ": str(e)}), 500

        @self.app.route('/speech', methods=['POST', "OPTIONS"])
        def speech():
            """
            recive audio file -> convert it to text -> pass it to AI 
            -> convert the AI response to audio -> return the response to the user
            """

            try:
                if 'file' not in request.files:
                    return jsonify({"error": "No file provided"}), 400
                audio_file = request.files['file']
                user_message = self.speech_converter.speech_to_text(audio_file)
                prediction = self.intent_model.predict(user_message)
                intent = prediction["intent"]
                if intent == "generate_image":
                    # image_buffer = self.image_generator.generate_image(user_message)
                    image_buffer = generate_image(user_message)
                    image_base64 = base64.b64encode(
                        image_buffer.getvalue()).decode('utf-8')
                    return jsonify({
                        "response_type": "image",
                        "response": image_base64
                    })
                elif intent == "programming":
                    ai_response = generate_text(user_message)
                    return jsonify({
                        "response_type": "text",
                        "response": ai_response.decode('utf-8')
                    })

                else:
                    ai_response = generate_text(user_message)
                    audio_buffer = self.speech_converter.text_to_speech(
                        ai_response.decode('utf-8'))
                    audio_base64 = base64.b64encode(
                        audio_buffer.getvalue()).decode('utf-8')
                    return jsonify({
                        "response_type": "audio",
                        "response": audio_base64
                    })

            except sr.UnknownValueError:
                return jsonify({"error": "Speech recognition could not understand audio"}), 400

            except sr.RequestError as e:
                return jsonify({"error": f"Speech recognition service error: {e}"}), 500

            except Exception as e:
                logger.error(f"Error in /speech endpoint: {e}")
                return jsonify({"error": str(e)}), 500

        @self.app.errorhandler(404)
        def page_not_found(e):
            return jsonify({"error": "Page not found"}), 404

        @self.app.errorhandler(500)
        def server_error(e):
            return jsonify({"error": "Internal server error"}), 500

    def run(self):
        self.app.run(debug=True)


if __name__ == "__main__":
    app = MyFlaskApp()
    app.run()
