const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  addCourse,
} = require('../../controllers/v1/courses');
const Course = require('../../models/Courses');
const { protect, authorize } = require('../../middleware/auth');
const advancedResults = require('../../middleware/advancedResult');

router
  .route('/')
  .get(
    advancedResults(Course, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getCourses
  )
  .post(protect, authorize('publisher', 'admin'), addCourse);
router
  .route('/:id')
  .get(getCourse)
  .put(protect, authorize('publisher', 'admin'), updateCourse)
  .delete(protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;
