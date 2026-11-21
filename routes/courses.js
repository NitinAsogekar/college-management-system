// server/routes/courses.js
const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// @route   GET /api/courses - Get all courses
// @route   POST /api/courses - Create course (Admin only)
router.route('/')
  .get(getAllCourses)
  .post(protect, adminOnly, createCourse);

// @route   GET /api/courses/:id - Get course by ID (Protected)
// @route   PUT /api/courses/:id - Update course (Admin only)
// @route   DELETE /api/courses/:id - Delete course (Admin only)
router.route('/:id')
  .get(protect, getCourseById)
  .put(protect, adminOnly, updateCourse)
  .delete(protect, adminOnly, deleteCourse);

module.exports = router;