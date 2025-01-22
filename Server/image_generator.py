import requests
from io import BytesIO
from dotenv import load_dotenv
import os

load_dotenv()

from io import BytesIO
import requests


def generate_image(prompt):
    # with open("download.jpeg", "rb") as f:
    #     image_data = f.read()
    # return BytesIO(image_data)
    url = f"https://image.pollinations.ai/prompt/{prompt}"
    response = requests.get(url)
    if response.status_code == 200:
        image = BytesIO(response.content)
        return image
    else:
        raise Exception(f"Failed to fetch image. Status code: {response.status_code}")



class ImageGenerator:
    def __init__(self):
        """
        Initialize the ImageGenerator with Hugging Face API configuration.
        """
        self.HUGGING_HEADERS_TOKEN = os.getenv('HUGGING_HEADERS_TOKEN')
        self.HUGGING_API_URL = os.getenv('HUGGING_API_URL')
        if not self.HUGGING_HEADERS_TOKEN or not self.HUGGING_API_URL:
            raise ValueError(
                "HUGGING_HEADERS_TOKEN and HUGGING_API_URL must be set in the environment variables.")

        self.HEADERS = {
            "Authorization": f"Bearer {self.HUGGING_HEADERS_TOKEN}"
        }

    def generate_image(self, prompt: str) -> BytesIO:
        """
        Generate an image using the Hugging Face API based on the provided prompt.

        Args:
            prompt (str): The text prompt to generate the image.

        Returns:
            BytesIO: A buffer containing the generated image.

        """
        # try:
        #     with open("download.jpeg", "rb") as f:
        #         image_data = f.read()
        #     return BytesIO(image_data)
        # except Exception as e:
        #     raise RuntimeError(
        #         f"An error occurred while loading the image: {e}")
        data = {"inputs": prompt}

        try:
            # Send a POST request to the Hugging Face API
            response = requests.post(
                self.HUGGING_API_URL, headers=self.HEADERS, json=data)

            # Check if the request was successful
            if response.status_code == 200:
                content_type = response.headers.get("Content-Type")
                if content_type and "image" in content_type:
                    # Return the image as a BytesIO object
                    return BytesIO(response.content)
                else:
                    raise RuntimeError(
                        f"Unexpected response content type: {content_type}")
            else:
                raise RuntimeError(
                    f"API request failed with status code: {response.status_code}")

        except Exception as e:
            raise RuntimeError(
                f"An error occurred while generating the image: {e}")

    def save_image(self, image_buffer: BytesIO, file_path: str) -> None:
        """
        Save the generated image to a file.

        Args:
            image_buffer (BytesIO): The buffer containing the image data.
            file_path (str): The path where the image will be saved.
        """
        try:
            with open(file_path, "wb") as f:
                f.write(image_buffer.getvalue())
            print(f"Image saved successfully at: {file_path}")
        except Exception as e:
            raise RuntimeError(
                f"An error occurred while saving the image: {e}")


# Example usage
if __name__ == "__main__":
    try:
        # Initialize the ImageGenerator
        image_generator = ImageGenerator()
        # Define the prompt
        prompt = "A beautiful futuristic city in the sky, with  hot girl big boobs pink bikini ,holding an AK47,in the night with blur neon light"
        # Generate the image
        image_buffer = image_generator.generate_image(prompt)
        # Save the image to a file
        image_generator.save_image(image_buffer, "generated_image0.png")

    except RuntimeError as e:
        print(f"Error: {e}")


    prompt = "dog"
    image = generate_image(prompt)
    with open("generated_image.jpg", "wb") as f:
        f.write(image.getvalue())
