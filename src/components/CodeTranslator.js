
import React, { useState } from "react";
import axios from "axios";
import "./CodeTranslator.css";

const CodeTranslator = () => {
  const [code, setCode] = useState("");
  const [sourceLang, setSourceLang] = useState("javascript");
  const [targetLang, setTargetLang] = useState("python");
  const [translatedCode, setTranslatedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTranslate = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError("");
    setTranslatedCode("");
    try {
      const response = await axios.post("/api/translate-code/", {
        code,
        sourceLang,
        targetLang,
      });
      setTranslatedCode(response.data.translatedCode);
    } catch (err) {
      console.error("Translation error:", err);
      setError("Error translating code. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="code-translator-container">
      <h2>Code Translator</h2>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your code here..."
        rows="10"
        cols="50"
      />
      <div className="translator-options">
        <div>
          <label>From:</label>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
          </select>
        </div>
        <div>
          <label>To:</label>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
          </select>
        </div>
      </div>
      <button onClick={handleTranslate} disabled={loading}>
        {loading ? "Translating..." : "Translate Code"}
      </button>
      {error && <div className="error-message">{error}</div>}
      {translatedCode && (
        <div className="translated-code-output">
          <h3>Translated Code:</h3>
          <pre>{translatedCode}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeTranslator;
