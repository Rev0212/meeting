require('dotenv').config();
const mongoose = require('mongoose');
const Room = require('../models/Room');
const connectDB = require('../config/db');

// Sample room data
const roomData = [
  {
    name: 'Conference Room A',
    capacity: 20,
    equipment: ['projector', 'whiteboard', 'video conferencing'],
    location: 'Building 1, Floor 3'
  },
  {
    name: 'Meeting Room B',
    capacity: 10,
    equipment: ['whiteboard', 'TV screen'],
    location: 'Building 1, Floor 2'
  },
  {
    name: 'Boardroom',
    capacity: 15,
    equipment: ['projector', 'whiteboard', 'video conferencing', 'coffee machine'],
    location: 'Building 2, Floor 4'
  },
  {
    name: 'Small Meeting Room C',
    capacity: 5,
    equipment: ['whiteboard'],
    location: 'Building 1, Floor 1'
  }
];

// Seed data function
const seedData = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Clear existing rooms
    await Room.deleteMany({});
    console.log('Rooms collection cleared');
    
    // Create new rooms
    const rooms = await Room.insertMany(roomData);
    console.log(`${rooms.length} rooms created`);
    
    // Disconnect from database
    mongoose.disconnect();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

// Run seed function
seedData();