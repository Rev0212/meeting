📌 Problem Statement
Objective:
Design and implement a web-based Meeting Room Booking System that enables employees
to seamlessly book meeting rooms, view current room availability, and manage their own
bookings. The system should intelligently handle booking conflicts and offer a user-friendly
interface for viewing room schedules.
👤 User Story
As an employee, I want to book meeting rooms for my team meetings so that we have a
dedicated space with the necessary equipment. I should be able to check when rooms are
available, book them for specific time slots, and view all bookings in a clear calendar-like
interface.
👥 System Users
- Primary User: Employee
- Session Management: Each session requires user name and email to identify the individual
making the bookings.
✅ Functional Requirements
1. User Session Management
• Prompt for name and email on first visit
• Store session info for all subsequent bookings
• Display current user’s name on the interface
2. Room Management
• System must include at least 3–4 predefined rooms
• Each room must contain:
- Room Name (e.g., "Conference Room A")
- Capacity (e.g., 10 people)
- Equipment List (e.g., projector, whiteboard, VC)
3. Booking Functionality
• Users can:
- Select Room
- Choose Date and Time (Start & End)
- Enter Meeting Title or Purpose
- Specify Attendees Count
- Choose Optional Equipment
• Users can cancel only their own bookings
• Bookings are allowed for the current day only
4. Conflict Detection
• No overlapping bookings for the same room
• Enforce conflict rules during booking submission
5. Room Availability Display
• Show timeline view (9 AM to 6 PM) for all rooms
• Show available slots for a given time range
6. Data Persistence
• Store all bookings persistently using any backend storage method (SQL/NoSQL/file-
based)
• Ensure data survives page refresh or browser restart
📏 Booking Rules
• Minimum Duration: 30 minutes
• Maximum Duration: 4 hours
• Allowed Hours: Between 9 AM – 6 PM
• Cannot book for past time slots

Techstack - React + js for frontend
            Node + Express
            Mongo DB atlas
            

DB SCHEMA :


Users Collection

{
  _id: ObjectId,
  name: String,           // Required
  email: String,          // Required, unique
  createdAt: Date         // Timestamp of user creation
}

Rooms Collection

{
  _id: ObjectId,
  name: String,           // E.g., "Conference Room A"
  capacity: Number,       // E.g., 10
  equipment: [String],    // E.g., ["projector", "whiteboard", "VC"]
  isActive: Boolean,      // For potential future deactivation of rooms
  location: String        // Optional, for future extension
}

Bookings Collection:

{
  _id: ObjectId,
  // References with denormalization for faster retrieval
  userId: ObjectId,         // Reference to User._id
  userName: String,         // Denormalized user name
  userEmail: String,        // Denormalized user email
  roomId: ObjectId,         // Reference to Room._id
  roomName: String,         // Denormalized room name
  
  // Booking details
  title: String,            // Meeting purpose/title
  date: Date,               // Date of booking (for date-based queries)
  startTime: Date,          // Full datetime of start
  endTime: Date,            // Full datetime of end
  duration: Number,         // Duration in minutes (for validation & reporting)
  attendeeCount: Number,    // Number of participants
  requiredEquipment: [String], // Equipment needed for meeting
  
  // Metadata
  createdAt: Date,          // When booking was created
  status: String            // "active", "cancelled", etc.
}

Indexes
// Users collection
db.users.createIndex({ email: 1 }, { unique: true })

// Rooms collection
db.rooms.createIndex({ name: 1 }, { unique: true })

// Bookings collection
db.bookings.createIndex({ roomId: 1, startTime: 1, endTime: 1 }) // For conflict detection
db.bookings.createIndex({ userId: 1, status: 1 }) // For user's active bookings
db.bookings.createIndex({ date: 1, status: 1 }) // For daily view
db.bookings.createIndex({ roomId: 1, date: 1, status: 1 }) // For room availability


Validation Rules (MongoDB Schema Validation)

// Sample validation for bookings collection
{
  validator: {
    $jsonSchema: {
      required: ["userId", "roomId", "title", "startTime", "endTime", "attendeeCount", "status"],
      properties: {
        startTime: {
          bsonType: "date"
        },
        endTime: {
          bsonType: "date"
        },
        duration: {
          bsonType: "int",
          minimum: 30,
          maximum: 240
        },
        attendeeCount: {
          bsonType: "int",
          minimum: 1
        },
        status: {
          enum: ["active", "cancelled"]
        }
      }
    }
  }
}

https://github.com/Rev0212/LeaderBoard.git