// server/models/Attendance.js
const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Student ID reference is required']
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course ID reference is required']
  },
  courseCode: {
    type: String, // Cached course code (e.g., "CS301") for quick lookups
    required: true,
    uppercase: true
  },
  date: {
    type: Date,
    required: [true, 'Lecture date is required'],
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Late', 'Excused'],
    required: true,
    default: 'Present'
  },
  remarks: {
    type: String,
    trim: true,
    default: ''
  },
  recordedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // References the faculty or admin who marked attendance
  }
}, {
  timestamps: true
});

// Compound index to ensure a student has only one attendance entry per course lecture on a specific date
AttendanceSchema.index({ student: 1, course: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);