// server/controllers/courseController.js
const Course = require('../models/Course');

/**
 * @desc    Get all courses in the catalog
 * @route   GET /api/courses
 * @access  Public / Private
 */
exports.getAllCourses = async (req, res) => {
  try {
    const { department, semester } = req.query;
    let query = { status: 'Active' };

    if (department) query.department = department;
    if (semester) query.semester = semester;

    const courses = await Course.find(query).populate('instructor', 'name email');
    res.json({
      success: true,
      count: courses.length,
      courses
    });
  } catch (error) {
    console.error('Get Courses Error:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching courses.', error: error.message });
  }
};

/**
 * @desc    Get single course by ID
 * @route   GET /api/courses/:id
 * @access  Private
 */
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email');
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }
    res.json({ success: true, course });
  } catch (error) {
    console.error('Get Course Error:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching course details.' });
  }
};

/**
 * @desc    Create a new course
 * @route   POST /api/courses
 * @access  Admin
 */
exports.createCourse = async (req, res) => {
  try {
    const { courseCode, title, department, credits, instructor, capacity, semester } = req.body;

    // Check if course code already exists
    const existingCourse = await Course.findOne({ courseCode: courseCode.toUpperCase() });
    if (existingCourse) {
      return res.status(400).json({ success: false, message: `Course with code ${courseCode} already exists.` });
    }

    const course = new Course({
      courseCode: courseCode.toUpperCase(),
      title,
      department,
      credits,
      instructor: instructor || undefined,
      capacity: capacity || 40,
      semester: semester || 'Spring 2026'
    });

    await course.save();

    res.status(201).json({
      success: true,
      message: 'Course created successfully in catalog.',
      course
    });
  } catch (error) {
    console.error('Create Course Error:', error);
    res.status(500).json({ success: false, message: 'Server error while creating course.', error: error.message });
  }
};

/**
 * @desc    Update course details
 * @route   PUT /api/courses/:id
 * @access  Admin
 */
exports.updateCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      message: 'Course updated successfully.',
      course
    });
  } catch (error) {
    console.error('Update Course Error:', error);
    res.status(500).json({ success: false, message: 'Server error while updating course.' });
  }
};

/**
 * @desc    Delete / Archive a course
 * @route   DELETE /api/courses/:id
 * @access  Admin
 */
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }

    await course.deleteOne();

    res.json({
      success: true,
      message: 'Course removed from catalog successfully.'
    });
  } catch (error) {
    console.error('Delete Course Error:', error);
    res.status(500).json({ success: false, message: 'Server error while deleting course.' });
  }
};