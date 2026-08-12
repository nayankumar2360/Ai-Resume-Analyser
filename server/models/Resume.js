const mongoose = require('mongoose');

const jobRecommendationSchema = new mongoose.Schema({
  role: String,
  matchPercentage: Number,
  description: String,
  matchingSkills: [String],
  missingSkills: [String],
  learningResources: [String]
}, { _id: false });

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: String,
  fileType: String,
  rawText: String,
  analysis: {
    atsScore: Number,
    summary: String,
    strengths: [String],
    weaknesses: [String],
    improvements: [String],
    formatScore: Number,
    contentScore: Number,
    keywordScore: Number
  },
  skills: {
    technical: [String],
    soft: [String],
    tools: [String],
    certifications: [String]
  },
  jobRecommendations: [jobRecommendationSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Resume', resumeSchema);
