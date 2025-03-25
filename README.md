# EventFull - Event Management Platform

A modern event management platform built with Vue.js, Python (FastAPI), and MongoDB.

## Project Structure

```
eventfull/
├── frontend/          # Vue.js frontend application
├── backend/           # Python FastAPI backend
└── README.md
```

## Features

- Create and manage events
- User authentication and authorization
- Event registration and ticketing
- Event search and filtering
- User profiles and event history
- Responsive design

## Setup Instructions

### Frontend Setup
1. Navigate to the frontend directory
2. Install dependencies:
```bash
npm install
```
3. Run the development server:
```bash
npm run serve
```

### Backend Setup
1. Navigate to the backend directory
2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```
3. Install dependencies:
```bash
pip install -r requirements.txt
```
4. Run the server:
```bash
uvicorn main:app --reload
```

### MongoDB Setup
1. Install MongoDB on your system
2. Start the MongoDB service
3. Create a database named "eventfull"

## Environment Variables

Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=eventfull
JWT_SECRET=your-secret-key
```

## Technologies Used

- Frontend:
  - Vue.js 3
  - Vue Router
  - Vuex
  - TailwindCSS
  - Axios

- Backend:
  - Python 3.8+
  - FastAPI
  - PyMongo
  - JWT Authentication
  - Pydantic

- Database:
  - MongoDB 