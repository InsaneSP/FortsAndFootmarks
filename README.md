FortsAndFootmarks

Overview

FortsAndFootmarks is a MERN stack trekking planner website designed to provide historical insights about forts, along with features like real-time weather updates, OpenStreetMap integration, and a user-friendly interface for trek planning.

Features

🏰 Fort Details: Historical information on various forts.

🌍 OpenStreetMap Integration: Interactive maps for navigation.

☁ Real-time Weather Updates: Fetching current weather conditions.

🔒 User Authentication: Firebase authentication (login/signup).

📅 Trek Planning: Plan your trek efficiently.

📞 Contact Us Form: Integrated with Web3Forms for user inquiries.

📜 Privacy & Terms Pages: Dedicated sections for privacy policy and terms of service.

Tech Stack

Frontend: React, React Router, Bootstrap, CSS

Backend: Node.js, Express, MongoDB

Authentication: Firebase

API Integrations: OpenStreetMap, Weather API

Folder Structure

FortsAndFootmarks/
│── backend/               # Backend API (Express, MongoDB)
│── frontend/              # React Frontend
│   │── public/           # Static assets (index.html, images, etc.)
│   │── src/              # Main source code
│   │   │── Context/     # Auth context for state management
│   │   └── index.js     # Main entry point
│── .gitignore             # Git ignore file
│── package.json           # Node dependencies
│── README.md              # Project documentation

Installation & Setup

Prerequisites

Ensure you have Node.js and MongoDB installed on your system.

Clone the Repository

git clone https://github.com/InsaneSP/FortsAndFootmarks.git
cd FortsAndFootmarks

Backend Setup

cd backend
npm install
npm start

Frontend Setup

cd ../frontend
npm install
npm start

Your project will run at http://localhost:3000/ 🚀

Deployment

Frontend Deployment (Vercel)

Install Vercel CLI: npm install -g vercel

Navigate to frontend: cd frontend

Deploy: vercel

Backend Deployment (Render/Heroku)

Ensure MongoDB is hosted (MongoDB Atlas preferred)

Deploy backend via Render/Heroku following their instructions.

Contribution

Contributions are welcome! Feel free to fork, create a feature branch, and submit a PR.

License

This project is licensed under the MIT License.

