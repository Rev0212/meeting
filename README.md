Meeting Room Booking System Backend
A robust RESTful API for managing meeting room bookings, built with Node.js, Express, and MongoDB.

Features
User Authentication: Simple login with name and email
Room Management: Create, list, and update meeting rooms
Booking System: Reserve rooms with conflict prevention
Business Rules: Enforces booking duration and hours limits
JWT Authentication: Secure API endpoints
Tech Stack
Node.js & Express: Server framework
MongoDB & Mongoose: Database
JWT: Authentication
bcryptjs: Password hashing
Project Structure
Getting Started
Prerequisites
Node.js (v14 or higher)
MongoDB (local or Atlas)
npm or yarn
Installation
Clone the repository:

Install dependencies:

Create a .env file:

Running the Server
Development mode:

Production mode:

Seeding the Database
API Endpoints
Authentication
POST /api/auth/login - Login with name and email
Rooms
GET /api/rooms - Get all rooms
GET /api/rooms/:id - Get room by ID
POST /api/rooms - Create a new room
PUT /api/rooms/:id - Update a room
Bookings
POST /api/bookings - Create a new booking
GET /api/bookings/user/:userId - Get bookings for a user
GET /api/bookings/room/:roomId - Get bookings for a room
PUT /api/bookings/cancel/:id - Cancel a booking
Business Rules
Bookings allowed between 9 AM and 6 PM
Duration: 30 minutes to 4 hours
Attendees cannot exceed room capacity
No overlapping bookings for the same room
Deployment
Deploying to Render
Create a Render account at render.com
Create a new Web Service
Connect your GitHub repository
Configure the service:
Build Command: npm install
Start Command: npm start
Add environment variables:
PORT: 10000
MONGODB_URI: Your MongoDB connection string
JWT_SECRET: Your JWT secret
Deploy the service
Contributing
Fork the repository
Create a feature branch: git checkout -b feature-name
Commit your changes: git commit -m 'Add feature'
Push to the branch: git push origin feature-name
Submit a pull request
License
This project is licensed under the MIT License.


backend/
├── config/
│   └── db.js                 # Database connection
├── controllers/              # Request handlers
│   ├── authController.js     # Authentication logic
│   ├── bookingController.js  # Booking operations
│   ├── roomController.js     # Room operations
│   └── userController.js     # User operations
├── middleware/
│   └── authMiddleware.js     # JWT authentication
├── models/                   # Mongoose schemas
│   ├── Booking.js
│   ├── Room.js
│   └── User.js
├── routes/                   # API routes
├── utils/                    # Utility functions
│   ├── seedData.js           # Database seeding
│   ├── seedUsers.js          # User seeding
│   └── tokenUtils.js         # JWT helpers
├── .env                      # Environment variables
├── app.js                    # Express configuration
└── server.js                 # Entry point




# 🏢 Meeting Room Booking System Backend

A robust RESTful API for managing meeting room bookings, built with **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features

- 🔐 **User Authentication**: Simple login with name and email
- 🏬 **Room Management**: Create, list, and update meeting rooms
- 📅 **Booking System**: Reserve rooms with conflict prevention
- 📏 **Business Rules**: Enforce booking duration and hours limits
- 🔑 **JWT Authentication**: Secure API endpoints

---

## 🛠 Tech Stack

- **Node.js & Express** – Server framework
- **MongoDB & Mongoose** – NoSQL database
- **JWT** – Token-based authentication
- **bcryptjs** – Secure password hashing

---

## 📁 Project Structure



---

## 🧑‍💻 Getting Started

### ✅ Prerequisites

- Node.js (v14+)
- MongoDB (Local or Atlas)
- npm or yarn

### 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/meeting-room.git
cd meeting-room/backend

# Install dependencies
npm install

# Seed meeting rooms
npm run seed

# Seed users
node utils/seedUsers.js


📡 API Endpoints
🔐 Authentication
POST /api/auth/login – Login with name and email

🏬 Rooms
GET /api/rooms – Get all rooms

GET /api/rooms/:id – Get room by ID

POST /api/rooms – Create a new room

PUT /api/rooms/:id – Update a room

📅 Bookings
POST /api/bookings – Create a new booking

GET /api/bookings/user/:userId – Get user bookings

GET /api/bookings/room/:roomId – Get room bookings

PUT /api/bookings/cancel/:id – Cancel a booking



