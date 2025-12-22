import React, { useState, useRef } from 'react';
import './Chatbot.css';
import mascotIcon from '../assets/mascot.svg';

const CHATBOT_URL = process.env.REACT_APP_CHATBOT_URL || 'http://10.51.61.37:3000';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatbotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0, left: 0, top: 0 });

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseDown = (e) => {
    const chatbot = chatbotRef.current;
    if (!chatbot) return;

    pos.current = {
      x: e.clientX,
      y: e.clientY,
      left: chatbot.offsetLeft,
      top: chatbot.offsetTop
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const chatbot = chatbotRef.current;
    if (!chatbot) return;

    const dx = e.clientX - pos.current.x;
    const dy = e.clientY - pos.current.y;

    chatbot.style.left = `${pos.current.left + dx}px`;
    chatbot.style.top = `${pos.current.top + dy}px`;
    chatbot.style.bottom = 'auto';  // 위에서 고정된 위치 사용
    chatbot.style.right = 'auto';
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="chatbot-container" >
      <button className="chatbot-toggle" onClick={toggleChat}>
        <span className="chatbot-label">MJC Chatbot</span>
        <img 
          src={mascotIcon}
          alt="명지전문대학 챗봇" 
          className="chatbot-mascot"
        />
      </button>

      <div
        className={`chatbot-window ${isOpen ? 'open' : 'closed'}`}
        style={{ left: 'unset', top: 'unset', bottom: 0, right: 0, position: 'absolute' }}
        ref={chatbotRef}
      >
        <div className="chatbot-header" onMouseDown={handleMouseDown}>
          <h3>명지전문대학 챗봇</h3>
          <button className="close-btn" onClick={toggleChat}>×</button>
        </div>
        <iframe 
          src={CHATBOT_URL}
          title="명지전문대학 챗봇"
          scrolling="no"
          style={{ overflow: 'hidden' }}
          allow="clipboard-read; clipboard-write"
        />
      </div>
    </div>
  );
};

export default Chatbot;
