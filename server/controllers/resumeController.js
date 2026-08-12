const Resume = require('../models/Resume');
const { parseResume } = require('../services/resumeParser');
const { analyzeResume: aiAnalyze, extractSkills, recommendJobs } = require('../services/aiService');

// @desc    Analyze a resume
// @route   POST /api/resume/analyze
// @access  Private
const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // 1. Parse Resume
    const rawText = await parseResume(req.file.buffer, req.file.mimetype);

    // 2. Run AI Functions concurrently
    const [analysis, skills] = await Promise.all([
      aiAnalyze(rawText),
      extractSkills(rawText)
    ]);

    // 3. Run Job recommendations based on skills
    const jobRecommendations = await recommendJobs(skills);

    // 4. Save to DB
    const resume = await Resume.create({
      user: req.user.id,
      fileName: req.file.originalname,
      fileType: req.file.mimetype === 'application/pdf' ? 'pdf' : 'docx',
      rawText,
      analysis,
      skills,
      jobRecommendations
    });

    res.status(201).json(resume);
  } catch (error) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// @desc    Get user resume history
// @route   GET /api/resume/history
// @access  Private
const getHistory = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select('fileName fileType analysis.atsScore jobRecommendations createdAt');

    // Simplify the job recommendations to just the first role for the summary
    const formattedResumes = resumes.map(resume => {
      const doc = resume.toObject();
      if (doc.jobRecommendations && doc.jobRecommendations.length > 0) {
        doc.jobRecommendations = [doc.jobRecommendations[0]];
      }
      return doc;
    });

    res.status(200).json(formattedResumes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get specific analysis
// @route   GET /api/resume/:id
// @access  Private
const getAnalysis = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Make sure the logged in user matches the resume user
    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete an analysis
// @route   DELETE /api/resume/:id
// @access  Private
const deleteAnalysis = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Make sure the logged in user matches the resume user
    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await resume.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  analyzeResume,
  getHistory,
  getAnalysis,
  deleteAnalysis
};
