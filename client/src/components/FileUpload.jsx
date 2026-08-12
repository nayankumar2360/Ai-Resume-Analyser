import React, { useRef, useState } from 'react';
import { Upload, FileText, CheckCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';

const FileUpload = ({ onFileSelect, selectedFile, disabled }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragActive(true);
    else if (e.type === 'dragleave') setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("File too large (max 5MB)");
      return;
    }
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert("Please upload PDF or DOCX only.");
      return;
    }
    onFileSelect(file);
  };

  const removeFile = (e) => {
    e.stopPropagation();
    onFileSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative w-full h-64 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-6 text-center
        ${isDragActive ? 'border-cyan-400 bg-cyan-400/10' : 'border-dark-700 glass-hover'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={() => !disabled && fileInputRef.current.click()}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={disabled ? undefined : handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.docx"
        onChange={handleChange}
        disabled={disabled}
      />
      
      {selectedFile ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-cyan-400" />
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-dark-400" />
            <span className="text-white font-medium truncate max-w-xs">{selectedFile.name}</span>
          </div>
          <button 
            onClick={removeFile}
            className="flex items-center space-x-1 text-sm text-rose-400 hover:text-rose-300 transition-colors"
          >
            <X className="w-4 h-4" /> <span>Remove</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-dark-800 flex items-center justify-center group-hover:bg-dark-700 transition-colors">
            <Upload className="w-8 h-8 text-dark-400" />
          </div>
          <div>
            <p className="text-lg font-medium text-white mb-1">Drop your resume here</p>
            <p className="text-sm text-dark-400">PDF or DOCX, up to 5MB</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default FileUpload;
