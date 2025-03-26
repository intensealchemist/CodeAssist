import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";

const MiniCodePlayground = () => {
  const [code, setCode] = useState(`// Write your JavaScript code here
console.log("Hello, CodeAssist!");`);
  const [output, setOutput] = useState("");

  const runCode = () => {
    let outputResult = "";
    const originalConsoleLog = console.log;
    
    console.log = (...args) => {
      outputResult += args.join(" ") + "\n";
    };

    try {
      eval(code);
    } catch (err) {
      outputResult += `Error: ${err.message}`;
    }

    console.log = originalConsoleLog;
    setOutput(outputResult);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Code Playground</h2>
      
      <CodeMirror
        value={code}
        height="200px"
        extensions={[javascript()]}
        theme={dracula}
        onChange={(value) => setCode(value)}
      />
      
      <button onClick={runCode} style={styles.runButton}>Run Code</button>
      
      {output && (
        <div style={styles.outputBox}>
          <h3 style={styles.outputTitle}>Output:</h3>
          <pre style={styles.outputText}>{output}</pre>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: "20px 0",
    padding: "20px",
    background: "#1a1a2e",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px cyan",
  },
  title: {
    color: "#00ffff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.5em",
  },
  runButton: {
    marginTop: "10px",
    padding: "10px 15px",
    background: "#00ffff",
    color: "#1a1a2e",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1em",
    transition: "0.3s ease-in-out",
    boxShadow: "0px 0px 5px cyan",
  },
  outputBox: {
    marginTop: "15px",
    padding: "10px",
    background: "#121212",
    borderRadius: "5px",
    whiteSpace: "pre-wrap",
    fontFamily: "monospace",
    color: "#00ffff",
    border: "1px solid cyan",
  },
  outputTitle: {
    color: "#00ffff",
  },
  outputText: {
    color: "#ffffff",
  },
};

export default MiniCodePlayground;
   