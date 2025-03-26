
import React from "react";
import Lottie from "react-lottie";
import animationData from "./avatarAnimation.json"; 
import "./AssistantAvatar.css";

const AssistantAvatar = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="assistant-avatar">
      <Lottie options={defaultOptions} height={150} width={150} />
    </div>
  );
};

export default AssistantAvatar;
