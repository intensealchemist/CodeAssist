// src/components/CodeBlock.js
import React, { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";


const CodeBlock = ({ code, language }) => {
  const ref = useRef(null);

  useEffect(() => {
    Prism.highlightElement(ref.current);
  }, [code, language]);

  return (
    <pre>
      <code ref={ref} className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );
};

export default CodeBlock;
