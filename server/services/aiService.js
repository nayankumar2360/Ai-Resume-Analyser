const { GoogleGenerativeAI } = require('@google/generative-ai');
const { getAnalysisPrompt, getSkillExtractionPrompt, getJobRecommendationPrompt } = require('../utils/prompts');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');
// Model is initialized dynamically to ensure it picks up env vars correctly if loaded late, but we can do it inside the functions.

const cleanAndParseJSON = (text) => {
  try {
    // Remove potential markdown wrappers like \`\`\`json and \`\`\`
    let cleanedText = text.replace(/^```(json)?\s*/i, '').replace(/\s*```$/i, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error('Error parsing JSON from AI response:', text);
    throw new Error('Failed to parse AI response as JSON');
  }
};

const getModel = () => {
    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    return ai.getGenerativeModel({ model: 'gemini-3.5-flash' });
};

const analyzeResume = async (resumeText) => {
  try {
    const model = getModel();
    const prompt = getAnalysisPrompt(resumeText);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return cleanAndParseJSON(text);
  } catch (error) {
    throw new Error(`AI Analysis failed: ${error.message}`);
  }
};

const extractSkills = async (resumeText) => {
  try {
    const model = getModel();
    const prompt = getSkillExtractionPrompt(resumeText);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return cleanAndParseJSON(text);
  } catch (error) {
    throw new Error(`AI Skill Extraction failed: ${error.message}`);
  }
};

const recommendJobs = async (skills) => {
  try {
    const model = getModel();
    const prompt = getJobRecommendationPrompt(skills);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return cleanAndParseJSON(text);
  } catch (error) {
    throw new Error(`AI Job Recommendation failed: ${error.message}`);
  }
};

module.exports = {
  analyzeResume,
  extractSkills,
  recommendJobs
};
