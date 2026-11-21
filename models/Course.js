// server/models/Course.js
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: [true, 'Course code is required'],
    unique: true,
    trim: true,
    uppercase: true // e.g., "CS301"
  },
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: ['Computer Science', 'Information Technology', 'Electrical Engineering', 'Mechanical Engineering', 'Business Administration'],
    default: 'Computer Science'
  },
  credits: {
    type: Number,
    required: [true, 'Credit count is required'],
    min: 1,
    max: 6,
    default: 3
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References a Faculty/User record
    required: false
  },
  instructorName: {
    type: String, // Fallback/cached display name (e.g., "Dr. Alan Turing")
    trim: true
  },
  capacity: {
    type: Number,
    required: true,
    default: 40
  },
  enrolledStudentsCount: {
    type: Number,
    default: 0
  },
  semester: {
    type: String,
    required: true,
    default: 'Spring 2026'
  },
  status: {
    type: String,
    enum: ['Active', 'Archived', 'Cancelled'],
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', CourseSchema);