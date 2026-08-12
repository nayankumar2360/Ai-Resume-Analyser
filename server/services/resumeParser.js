const pdf = require('pdf-parse');
const mammoth = require('mammoth');

const parseResume = async (buffer, mimetype) => {
  let text = '';

  try {
    if (mimetype.includes('pdf')) {
      const data = await pdf(buffer);
      text = data.text;
    } else if (
      mimetype.includes('wordprocessingml') ||
      mimetype.includes('docx')
    ) {
      const data = await mammoth.extractRawText({ buffer });
      text = data.value;
    } else {
      throw new Error('Unsupported file type');
    }

    // Clean the text: remove excessive whitespace and newlines
    text = text.replace(/\s+/g, ' ').trim();

    return text;
  } catch (error) {
    throw new Error(`Failed to parse resume: ${error.message}`);
  }
};

module.exports = {
  parseResume
};
