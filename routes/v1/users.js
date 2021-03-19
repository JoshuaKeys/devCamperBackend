const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/v1/users');
const User = require('../../models/User');

const { protect, authorize } = require('../../middleware/auth');
const advancedResults = require('../../middleware/advancedResult');

router.use(protect);
router.use(authorize('admin'));

router.route('/').get(advancedResults(User), getUsers).post(createUser);

router.route('/:id').get(getUser).delete(deleteUser).put(updateUser);

module.exports = router;
