from dotenv import load_dotenv
import os
import google.generativeai as genai
import logging
import requests
# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()



def generate_text(prompt):
    #return b"Hello! I'm here and ready to help you. How can I assist you today?"
    url = f"https://text.pollinations.ai/{prompt}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.content
    else:
        raise Exception(f"Failed to Generate TEXT. Status code: {response.status_code}")






class ChatBot:
    def __init__(self):
        """
        Initialize the ChatBot with the API token and configure the generative model.
        """
        # GOOGLE_API_TOKEN = os.getenv('GOOGLE_API_TOKEN')
        # if not GOOGLE_API_TOKEN:
        #     raise ValueError("API_TOKEN not found in environment variables.")
        # genai.configure(api_key=GOOGLE_API_TOKEN)
        # self.llm = genai.GenerativeModel(model_name="gemini-1.5-flash-latest")
        self.template = """
        You are a smart chatbot that responds in English.
        Your response should be concise and limited to a maximum of 60 words.
        Focus on delivering clear and direct answers to user inquiries without unnecessary elaboration or filler content. 
        Please respond only with the information requested, ensuring clarity and relevance in every response.
        """

    def chat(self, user_input: str) -> str:
        """
        Send the user message to the AI and return the response.

        Args:
            user_input (str): The input text from the user.

        Returns:
            str: The AI's response.

        Raises:
            RuntimeError: If an error occurs during the AI chat process.
        """
        #return "Send the user message to the AI and return the response."
        return generate_text(user_input)
        messages = [
            {"text": self.template},
            {"text": user_input},
        ]

        try:
            response = self.llm.generate_content(messages)
            return response.text
        except Exception as e:
            logger.error(f"Error during AI chat: {e}")
            raise RuntimeError(f"Error during AI chat: {e}")
if __name__ == "__main__":
    chat=ChatBot()