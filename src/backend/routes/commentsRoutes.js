const express = require('express');
const { createComment, getAllComments } = require('../controllers/commentController.js'); // Change this to require

const router = express.Router();

router.post('/:fortname/createComment', createComment);
router.get('/:fortname/comments', getAllComments);

module.exports = router;