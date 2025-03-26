
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AITools.css";
import { useState, useContext } from "react";

const AIToolsSection = () => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const tools = [
    {
      name: "Code Fixer",
      description: "Detect bugs and suggest fixes",
      route: "/code-fixer", 
    },
    {
      name: "Regex Generator",
      description: "Generate regex patterns from descriptions",
      route: "/regex-generator",
    },
    {
      name: "Code Translator",
      description: "Convert code between languages",
      route: "/code-translator",
    },
    {
      name: "Comment Generator",
      description: "Auto-generate comments for your code",
      route: "/comment-generator",
    },
    {
      name: "ReadMe Generator",
      description: "Generate README from project details",
      route: "/readme-generator",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="ai-tools-section">
      <h2>AI Tools (UPCOMING)</h2>
      <div className="tools-grid">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="tool-card"
            onClick={() => navigate(tool.route)}
          >
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIToolsSection;
