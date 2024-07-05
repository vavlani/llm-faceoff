# llm-faceoff

![LLM Faceoff Demo](ezgif-4-303f5e9603.gif)

llm-faceoff is a web application that allows users to interact with multiple AI models simultaneously. It provides a flexible and customizable interface for testing and comparing different language models. The application consists of a React frontend and a Flask backend.

## Features

- Interact with multiple AI models in parallel
- Customizable chat windows for each model
- Common input for sending the same message to all models
- Individual inputs for model-specific messages
- Web access toggle for models
- Customizable UI themes
- API key management for different providers

## Project Structure

The project is structured as follows:

- `src/`: Contains the React application source code
  - `components/`: React components (ChatWindow, CommonInput, etc.)
  - `styles/`: CSS files for styling
  - `utils/`: Utility functions and helpers
- `backend/`: Flask backend server code
  - `routes/`: API route definitions
  - `services/`: Business logic and model interactions
  - `config/`: Configuration files
- `public/`: Public assets and index.html

## How to Run

To run the llm-faceoff application, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/llm-faceoff.git
   cd llm-faceoff
   ```

2. Install frontend dependencies:
   ```
   npm install
   ```

3. Install backend dependencies:
   ```
   pip install -r backend/requirements.txt
   ```

4. Build the React application:
   ```
   npm run build
   ```

5. Start the Flask server:
   ```
   python backend/app.py
   ```

6. Open your browser and navigate to `http://localhost:5050`

## Backend and Frontend Connection

The Flask backend serves the React frontend build and handles API requests:

- The React build files are served from the `build/` directory.
- The Flask app is configured to serve the React app for all routes except API endpoints.
- API endpoints are defined in `backend/routes/api.py` and handle requests from the React frontend.
- The backend interacts with various AI models and returns responses to the frontend.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the React app in development mode (frontend only)
- `npm test`: Launches the test runner for React components
- `npm run build`: Builds the React app for production
- `python backend/app.py`: Runs the Flask backend server

For more information on using Create React App, please refer to the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## Learn More

To learn more about React, check out the [React documentation](https://reactjs.org/).
For Flask documentation, visit [Flask's official website](https://flask.palletsprojects.com/).
