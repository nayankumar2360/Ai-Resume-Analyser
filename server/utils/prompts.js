const getAnalysisPrompt = (resumeText) => `
Analyze the following resume as an ATS (Applicant Tracking System). Evaluate its formatting, quantified achievements, action verbs, keyword density, and section organization.
Return a JSON object with the following structure:
{
  "atsScore": (number between 0-100),
  "summary": "(2-3 sentences summarizing the candidate's profile)",
  "strengths": ["(array of 3-5 strengths)"],
  "weaknesses": ["(array of 3-5 weaknesses)"],
  "improvements": ["(array of 3-5 actionable tips to improve)"],
  "formatScore": (number between 0-100),
  "contentScore": (number between 0-100),
  "keywordScore": (number between 0-100)
}

Resume Text:
${resumeText}

Respond ONLY with valid JSON. No markdown, no code blocks, no explanation.
`;

const getSkillExtractionPrompt = (resumeText) => `
Extract and categorize the skills from the following resume.
Return a JSON object with the following structure:
{
  "technical": ["(programming languages, frameworks, databases, etc.)"],
  "soft": ["(communication, leadership, etc.)"],
  "tools": ["(software, platforms, etc.)"],
  "certifications": ["(any listed certifications)"]
}

Resume Text:
${resumeText}

Respond ONLY with valid JSON. No markdown, no code blocks, no explanation.
`;

const getJobRecommendationPrompt = (skills) => `
Based on the following candidate skills, recommend 5-8 suitable job roles.
Return a JSON array of objects, where each object has the following structure:
[
  {
    "role": "(role name)",
    "matchPercentage": (number between 0-100 indicating how well the skills match),
    "description": "(brief description of the role)",
    "matchingSkills": ["(skills from the candidate's profile that match)"],
    "missingSkills": ["(important skills for this role that the candidate lacks)"],
    "learningResources": ["(2-3 free resources or topics to learn the missing skills)"]
  }
]

Candidate Skills:
${JSON.stringify(skills)}

Respond ONLY with valid JSON. No markdown, no code blocks, no explanation.
`;

module.exports = {
  getAnalysisPrompt,
  getSkillExtractionPrompt,
  getJobRecommendationPrompt
};
