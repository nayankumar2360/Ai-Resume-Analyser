const express = require('express');
const router = express.Router();
const {
  analyzeResume,
  getHistory,
  getAnalysis,
  deleteAnalysis
} = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// All routes are protected
router.use(protect);

router.post('/analyze', upload.single('resume'), analyzeResume);
router.get('/history', getHistory);
router.get('/:id', getAnalysis);
router.delete('/:id', deleteAnalysis);

module.exports = router;
