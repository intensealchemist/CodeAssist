
import React, { useState } from "react";
import axios from "axios";
import "./CodeExplanation.css"; 

const CodeExplanation = () => {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setExplanation("");
    try {
      const response = await axios.post("/api/explain-code/", { code });
      setExplanation(response.data.explanation);
    } catch (err) {
      console.error("Error fetching explanation:", err);
      setExplanation("Error processing your code. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="code-explanation">
      <h2>Code Explanation Mode</h2>
      <textarea
        className="code-input"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        rows="10"
        cols="50"
      />
      <button className="explain-button" onClick={handleExplain} disabled={loading}>
        {loading ? "Explaining..." : "Explain Code"}
      </button>
      {explanation && (
        <div className="explanation-output">
          <h3>Explanation:</h3>
          <pre>{explanation}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeExplanation;
