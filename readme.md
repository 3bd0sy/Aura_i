# Aura I: AI-Powered Chat and Image Generation Tool

## Overview

This project is an AI-powered tool that combines chat functionality with image generation capabilities. It allows users to interact with an AI chatbot that can respond to text or voice inputs, and generate images based on user prompts. The system is built using a combination of React for the frontend and Flask for the backend, with various AI models and APIs integrated to handle text generation, image generation, and speech-to-text conversion.

## Features

1. **AI Chatbot**:

   - Users can interact with the chatbot via text or voice.
   - The chatbot can respond to queries, provide information, and generate code snippets.
   - Supports Markdown rendering for code and text formatting.

2. **Image Generation**:

   - Users can request the generation of images based on text prompts.
   - The system uses external APIs to generate high-quality images.

3. **Speech-to-Text and Text-to-Speech**:

   - Users can speak to the chatbot, and the system will convert speech to text for processing.
   - The chatbot can respond with audio, converting text responses to speech.

4. **Intent Classification**:

   - The system uses a FastText-based intent classifier to determine the user's intent (e.g., generating an image, asking a question, etc.).
   - Based on the intent, the system routes the request to the appropriate service (e.g., image generation or text response).

5. **Real-Time Audio Recording**:
   - Users can record audio directly from their microphone, and the system will process the audio for speech-to-text conversion.

## Project Structure

### Frontend (Client)

- **React-based UI**: The frontend is built using React, with components for chat, message display, and audio recording.

### Backend (Server)

- **Flask-based API**: The backend is built using Flask and provides endpoints for text processing, image generation, and speech conversion.

## How It Works

1. **User Interaction**:

   - The user interacts with the chatbot via the React frontend, either by typing text or recording audio.
   - If the user records audio, the frontend sends the audio file to the backend.

2. **Intent Classification**:

   - The backend uses the FastText model to classify the user's intent (e.g., "generate_image", "ask_question").
   - Based on the intent, the system routes the request to the appropriate service.

   - Flowchart:

   ```mermaid
   graph LR
      A[User Input] --> B{Intent Classifier}
      B -->|generate_image| C[Image Generation]
      B -->|programming| D[Text Response]
      B -->|general_query| D[Text Response]
      B -->|unknown| E[Default Response]
   ```

3. **Text and Image Generation**:

   - For text-based queries, the system uses the Gemini AI / pollination model to generate a response.
   - For image generation requests, the system calls pollination API to generate an image based on the user's prompt.

   - Image Generation:

   ```mermaid
   sequenceDiagram
      participant User
      participant Frontend
      participant Backend
      participant Image_API

      User->>Frontend: Requests image generation (text or voice)
      Frontend->>Backend: Sends request via POST /text or POST /speech
      Backend->>Image_API: Sends prompt to external API
      Image_API-->>Backend: Returns generated image
      Backend-->>Frontend: Sends base64-encoded image
      Frontend-->>User: Displays image in chat
   ```

   - Text Generation:

   ```mermaid
   sequenceDiagram
      participant User
      participant Frontend
      participant Backend
      participant AI_Model

      User->>Frontend: Types a text message
      Frontend->>Backend: Sends text message via POST /text
      Backend->>AI_Model: Processes text using Gemini AI
      AI_Model-->>Backend: Returns AI-generated response
      Backend-->>Frontend: Sends response (text or image)
      Frontend-->>User: Displays response in chat
   ```

4. **Response Handling**:

   - The backend sends the generated response (text, image, or audio) back to the frontend.
   - The frontend displays the response in the chat interface, rendering text, images, or audio as appropriate.

5. **Audio Playback**:

   - If the response is audio, the frontend converts the base64-encoded audio data into a playable format and allows the user to listen to the response.

   - Voice-Based Chat Interaction:

   ```mermaid
   sequenceDiagram
      participant User
      participant Frontend
      participant Backend
      participant SpeechConverter
      participant AI_Model

      User->>Frontend: Records audio message
      Frontend->>Backend: Sends audio file via POST /speech
      Backend->>SpeechConverter: Converts audio to text
      SpeechConverter-->>Backend: Returns transcribed text
      Backend->>AI_Model: Processes text using Gemini AI
      AI_Model-->>Backend: Returns AI-generated response
      Backend->>SpeechConverter: Converts text response to audio
      SpeechConverter-->>Backend: Returns audio file
      Backend-->>Frontend: Sends response (audio or text)
      Frontend-->>User: Plays audio or displays text
   ```

## Installation and Setup

### Prerequisites

- Node.js and npm (for the frontend)
- Python 3.8+ (for the backend)
- Flask and other Python dependencies (listed in `requirements.txt`)

To get started with this project, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/3bd0sy/Aura_i.git
   ```

2. Navigate to the project directory:

   ```sh
   cd Aura_i
   ```

### Frontend Setup

1. Navigate to the `Client` directory:

   ```bash
   cd Client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the `Server` directory:

   ```bash
   cd Server
   ```

2. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:

   - Create a `.env` file in the `Server` directory and add the following:

     ```bash
     GOOGLE_API_TOKEN=your_google_api_token
     ```

4. Start the Flask server:

   ```bash
   python run.py
   ```

## Usage

1. Open the frontend in your browser (usually at `http://localhost:5173`).
2. Interact with the chatbot by typing text or recording audio.
3. The chatbot will respond with text, images, or audio based on your input.

## Contact

For any questions or issues, please open an issue on the GitHub repository or contact the project maintainers.

by _Abdulbasit Abdulghani_: [linkedin](www.linkedin.com/in/abdulbasit-abdulgani)

---
