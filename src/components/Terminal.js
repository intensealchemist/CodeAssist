import React, { useState, useEffect } from "react";
import "./Terminal.css"; 

const Terminal = () => {
  const logs = [
    "Initializing CodeAssist...",
    "Loading modules...",
    "Connecting to AI service...",
    "Fetching latest updates...",
    "Ready."
  ];

  const [displayedLogs, setDisplayedLogs] = useState([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  useEffect(() => {
    if (currentLogIndex < logs.length) {
      const timeout = setTimeout(() => {
        setDisplayedLogs((prev) => [...prev, logs[currentLogIndex]]);
        setCurrentLogIndex(currentLogIndex + 1);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [currentLogIndex, logs]);

  return (
    <div className="terminal">
      {displayedLogs.map((line, index) => (
        <div key={index} className="terminal-line">{line}</div>
      ))}
      {currentLogIndex < logs.length && <div className="cursor">|</div>}
    </div>
  );
};

export default Terminal;
