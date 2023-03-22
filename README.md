# Ascolta

Welcome to Ascolta! This repository contains the frontend code for the Ascolta website, which leverages AI to help people learn languages more effectively. 

## Features

Ascolta currently offers two key features:

1. **Live chat with a chatbot:** Users can practice their language skills with a chatbot that role plays a character with its own unique personality. The chatbot uses OpenAI's APIs for text generation, and can provide users with instant feedback on their language skills.

2. **Listening and reading comprehension exercises:** Users can practice their listening and reading skills through conversations between characters, which include audio, a transcript, and questions to test comprehension. Ascolta uses Azure's Cognitive Services SDK for Text-to-Speech generation and Azure's Storage SDK for storing generated audio and images.

## Project Structure

This repository contains all the frontend logic for the Ascolta website. The project is organized into the following directories:

- `src`: This directory contains all of the frontend logic for Ascolta.
  - `api`: This directory contains all of the logic for speaking to the backend.
  - `common`: This directory contains components and logic that is common across other components.
  - `Conversation`: This directory contains all the components and logic for the individual Conversation screen.
  - `ConversationLibrary`: This directory contains all the components and logic for the library of conversations screen.
  - `Home`: This directory contains all the components and logic for the home page of the app.
  - `LiveChat`: This directory contains all the components and logic for the live chat function in the app.

## Technology Stack

Ascolta's frontend is built using just a few frameworks and tools, including

- **React:** Ascolta uses React to manage all the components and local state of the application.
- **React Router:** Ascolta uses React Router to manage navigation around the app.
- **Tailwind CSS:** Ascolta uses Tailwind CSS to allow out-of-the-box accessible and responsive UI.

## License

This project is licensed under the GPLv3 License - see the LICENSE file for details.
