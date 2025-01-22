import fasttext
import os


class IntentModel:
    def __init__(self, model_name="./intentClassifier/intent_classifier_small.bin"):
        """
        Initialize the intent classifier model.

        Args:
            model_name (str): Path to the pre-trained FastText model.
        """
        if not os.path.exists(model_name):
            raise FileNotFoundError(f"Model file '{model_name}' not found.")

        self.model = fasttext.load_model(model_name)

    def predict(self, text: str) -> dict:
        """
        Predict the intent of the input text.

        Args:
            text (str): The input text to classify.

        Returns:
            dict: A dictionary containing the input text, predicted intent, and confidence score.
            `{
            "text":___,
            "intent":___,
            "confidence":___
            }`

        """
        if not text or not isinstance(text, str):
            raise ValueError("Input text must be a non-empty string.")

        # Predict the intent
        labels, probabilities = self.model.predict(text, k=1)

        # Prepare the result
        result = {
            "text": text,
            "intent": labels[0].replace('__label__', ''),
            # Convert numpy float to Python float
            "confidence": float(probabilities[0])
        }

        return result


if __name__ == "__main__":
    try:
        # Initialize the model
        intent_model = IntentModel("intent_classifier_small.bin")

        # Test the model
        test_texts = [
            "Generate an image of a beach.",
            "What are the latest news updates?",
            "Who discovered gravity?",
            "write python code to use request library",
            "write short story about syria",
            "generate image about syria",
            "write python code to generate image",
            "write python code to open image using open cv",

            "Hi, how are you today?",
            "Write a Python function to calculate the area of a circle.",
            "Generate an image of a futuristic city with flying cars and neon lights.",
            "How much does this laptop cost?",
            "What are the latest updates on the stock market?",
            "Write a short story about a robot learning to love.",
            "The product I received is broken.",
            "Help me fix an error in my Python code.",
            "Create a React component for a login form with validation.",
            "Who invented the telephone?",
        ]
        # intent = intent_model.predict("Generate an image of a beach.")["intent"]
        for text in test_texts:
            prediction = intent_model.predict(text)
            print(f"Text: '{prediction['text']}'")
            print(f"Intent: {prediction['intent']}")
            print(f"Confidence: {prediction['confidence']:.2%}")
            print("-" * 40)

    except FileNotFoundError as e:
        print(f"Error: {e}")
    except ValueError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
