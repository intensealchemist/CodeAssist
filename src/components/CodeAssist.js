import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./ca.css";
import Hamburger from "./Hamburger";
import CodeBlock from "./CodeBlock";
import Terminal from "./Terminal";
import AssistantAvatar from "./AssistantAvatar";
import SmartSearch from "./SmartSearch";
import MiniCodePlayground from "./MiniCodePlayground";
import AIToolsSection from "./AIToolsSection";


const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const CodeAssist = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };
    

      const switchSection = (section) => {
        setActiveSection(section);
        setIsMenuOpen(false); 
    };
    const sampleCode = `
    function greet(name) {
      return "Hello, " + name + "!";
    }
    
    console.log(greet("World"));
      `.trim();


    const logout = () => {
        localStorage.removeItem("user");
        window.location.href = '/login';
    };

    const handleSubmit = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
        setResponse(null);
        setError(null);

        try {
            const res = await axios.post(`${API_BASE_URL}/api/get_response/`, { prompt });
            const cleanedResponse = res.data.response.replace(/\*/g, "");
            setResponse(cleanedResponse);
        } catch (err) {
            console.error("Error:", err);
            setError("Failed to fetch response. Please try again.");
        }
        setLoading(false);
    };

    const handleCopy = () => {
        if (response) {
            navigator.clipboard.writeText(response);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="container">
            <h1 className="text-cyan-400 neon-glow">Hello I'm CodeAssist</h1>
            <button onClick={logout} className="logout-btn">
            &#x23FB;
            </button>
            <div className="ham1" onClick={toggleMenu}>
                <Hamburger isOpen={isMenuOpen}/>
            </div>

            {isMenuOpen &&(
                <div className="dropdown-menu">
                    <button className="close-btn" onClick={toggleMenu}>❌</button>
                <ul>
                <li><a onClick={() => switchSection("home")}>🏠 Home</a></li>
                        <li><a onClick={() => switchSection("ai-tools")}>🤖 AI Tools</a></li>
                        <li><a onClick={() => switchSection("terminal")}>💻 Terminal</a></li>
                        <li><a onClick={() => switchSection("smart-search")}>🔍 Smart Search</a></li>
                        <li><a onClick={() => switchSection("mini-code-playground")}>🎮 Mini Code Playground</a></li>
                </ul>
                </div>
            )}

{activeSection === "home"}
            {activeSection === "ai-tools" && <AIToolsSection />}
            {activeSection === "terminal" && <Terminal />}
            {activeSection === "mini-code-playground" && <MiniCodePlayground />}
            {/* <div style={{ padding: "20px" }}>
      <p>Below is an example code snippet:</p>
      <CodeBlock code={sampleCode} language="javascript" />
    </div> */}
            <SmartSearch />

            
            

            <h2 className="text-white mt-6">CodeAssist - AI Code Assistant</h2>

            <div style={{ padding: "20px" }}>
      <Terminal />
      {/**/}


      <AssistantAvatar />
    </div>
            <textarea
                className="input-box"
                rows="5"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your code or question..."
            ></textarea>

            <button onClick={handleSubmit} disabled={loading} className="submit-btn neon-btn">
                {loading ? <span className="loader"></span> : "Get AI Response"}
            </button>

            {error && <p className="error-message">{error}</p>}

            {response && (
                <div className="response-box">
                    <h3 className="text-cyan-300">CodeAssist:</h3>
                    <SyntaxHighlighter language="python" style={dark} className="code-highlighter">
                        {response}
                    </SyntaxHighlighter>
                    <button onClick={handleCopy} className="copy-btn">
                        {copied ? "Copied!" : "Copy"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default CodeAssist;
