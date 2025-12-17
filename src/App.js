import React from 'react';
import './App.css';
// 임시 비활성화: 기존 컴포넌트들
// import Header from './components/Header';
// import MainBanner from './components/MainBanner';
// import Sidebar from './components/Sidebar';
// import QuickLinks from './components/QuickLinks';
import Chatbot from './components/Chatbot';
// import NoticeBoard from './components/NoticeBoard';
// import CommunicationSection from './components/CommunicationSection';

function App() {
  return (
    <div className="App">
      <div 
        className="background-image-container"
        style={{
          backgroundImage: `url('/images/SCR-20251126-ozvf.jpeg')`
        }}
      />
      <iframe
        src=""
        className="fullscreen-iframe"
        title="Content Frame"
        allowFullScreen
        scrolling="no"
      />
      
      {/* 오른쪽 하단 챗봇 아이콘 */}
      <Chatbot />
      
      {/* 임시 비활성화: 기존 컴포넌트들 */}
      {/* <Header />
      <div className="main-content">
        <MainBanner />
        <Sidebar />
      </div>
      <QuickLinks />
      <NoticeBoard />
      <CommunicationSection /> */}
    </div>
  );
}

export default App; 