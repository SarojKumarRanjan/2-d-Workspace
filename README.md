# 2D Simulation Game

## Overview
This is an interactive 2D simulation game that allows users to explore, interact, and communicate in a virtual environment. The project is designed to create a seamless and engaging experience for users, with real-time multiplayer functionality and customizable environments.

## Database Model Structure
![Database Model Diagram](db-model.png)

## Features
* **Real-time Multiplayer**: Users can interact with others in real-time.
* **Customizable Avatars**: Personalize avatars with various customization options.
* **Interactive Environment**: Engage with objects, areas, and other users within the simulation.
* **Text and Voice Communication**: Chat with others using integrated text and voice communication features.
* **Dynamic Map Design**: Build and modify maps dynamically to suit different needs.

## Technology Stack
* **Frontend**: [React.js,Next.js,HTML,Tailwindcss]
* **Backend**: [Node.js/Express]
* **WebSocket**: [Library or API used for real-time communication]
* **Database**: [postgreSQL]


## Setup Instructions
1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```
3. Configure environment variables:
* Create a .env file in the project root:
* Add the required variables:
```bash
DATABASE_URL=<Your-Database-URL>
API_KEY=<Your-API-Key>
```

4. Run the development server:
```bash
npm run dev
```
5. Access the application: Open your browser and navigate to http://localhost:3000.
