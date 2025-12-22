import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { isAuthenticated } from '../utils/auth';
import mascotIcon from '../assets/mascot.svg';

const CHATBOT_URL = process.env.REACT_APP_CHATBOT_URL || 'http://10.51.61.37:3000';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatbotSrc, setChatbotSrc] = useState('');
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const chatbotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0, left: 0, top: 0 });

  useEffect(() => {
    // 로그인 상태 확인 (쿠키가 자동으로 전달됨)
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setIsAuthChecked(true);
      if (authenticated) {
        // 쿠키가 자동으로 전달되므로 URL 파라미터 불필요
        setChatbotSrc(CHATBOT_URL);
      } else {
        // 로그인하지 않은 경우 기본 URL 사용 (서버에서 인증 확인)
        setChatbotSrc(CHATBOT_URL);
      }
    };
    checkAuth();
  }, []);

  const toggleChat = async () => {
    // 로그인 상태 확인
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      // 로그인하지 않은 경우 로그인 페이지로 이동
      window.location.href = '/login';
      return;
    }
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
        {chatbotSrc && (
          <iframe 
            src={chatbotSrc}
            title="명지전문대학 챗봇"
            scrolling="no"
            style={{ overflow: 'hidden' }}
            allow="clipboard-read; clipboard-write"
          />
        )}
      </div>
    </div>
  );
};

export default Chatbot;
