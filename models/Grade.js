// server/models/Grade.js
const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
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
    type: String, // Cached course code (e.g., "CS301")
    required: true,
    uppercase: true
  },
  semester: {
    type: String,
    required: true,
    default: 'Spring 2026'
  },
  assignmentsScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  midtermScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  finalExamScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  totalScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  letterGrade: {
    type: String,
    enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'F', 'P', 'IP'],
    default: 'IP' // In Progress
  },
  gradePoint: {
    type: Number,
    min: 0.0,
    max: 4.0,
    default: 0.0
  },
  remarks: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
});

// Ensure a single grade record per student per course per semester
GradeSchema.index({ student: 1, course: 1, semester: 1 }, { unique: true });

// Pre-save hook to calculate total score and assign grade/GPA automatically
GradeSchema.pre('save', function (next) {
  // Calculated weighted average (Assignments: 20%, Midterm: 30%, Final Exam: 50%)
  this.totalScore = (this.assignmentsScore * 0.20) + (this.midtermScore * 0.30) + (this.finalExamScore * 0.50);

  if (this.totalScore >= 90) {
    this.letterGrade = 'A';
    this.gradePoint = 4.0;
  } else if (this.totalScore >= 80) {
    this.letterGrade = 'B';
    this.gradePoint = 3.0;
  } else if (this.totalScore >= 70) {
    this.letterGrade = 'C';
    this.gradePoint = 2.0;
  } else if (this.totalScore >= 60) {
    this.letterGrade = 'D';
    this.gradePoint = 1.0;
  } else {
    this.letterGrade = 'F';
    this.gradePoint = 0.0;
  }
  
  next();
});

module.exports = mongoose.model('Grade', GradeSchema);