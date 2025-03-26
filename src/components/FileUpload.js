// FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('codeFile', file);

    setLoading(true);
    try {
      const res = await axios.post('/api/code-review/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFeedback(res.data.feedback);
    } catch (error) {
      console.error('Error uploading file:', error);
      setFeedback('Error processing file.');
    }
    setLoading(false);
  };

  return (
    <div className="file-upload-container">
      <h2>Upload Code for Review</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".js,.py,.java,.txt" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Upload'}
        </button>
      </form>
      {feedback && (
        <div className="feedback">
          <h3>Feedback:</h3>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
