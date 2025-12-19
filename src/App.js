import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
// 임시 비활성화: 기존 컴포넌트들
// import Header from './components/Header';
// import MainBanner from './components/MainBanner';
// import Sidebar from './components/Sidebar';
// import QuickLinks from './components/QuickLinks';
import Chatbot from './components/Chatbot';
import Login from './components/Login';
import { isAuthenticated } from './utils/auth';
// import NoticeBoard from './components/NoticeBoard';
// import CommunicationSection from './components/CommunicationSection';

// 보호된 라우트 컴포넌트 (쿠키 기반 인증 확인)
function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null); // null: 확인 중, true/false: 확인 완료
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await isAuthenticated();
        setIsAuth(authenticated);
      } catch (error) {
        console.error('인증 확인 오류:', error);
        setIsAuth(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  // 인증 확인 중일 때는 로딩 표시 (선택사항)
  if (isLoading) {
    return <div>로딩 중...</div>; // 또는 로딩 스피너 컴포넌트
  }

  // 인증되지 않았으면 로그인 페이지로 리다이렉트
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // 인증되었으면 자식 컴포넌트 렌더링
  return children;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <>
                  <div 
                    className="background-image-container"
                    style={{
                      backgroundImage: `url('/images/SCR-20251126-ozvf.jpeg')`
                    }}
                  />
                  {/* iframe은 필요할 때만 렌더링 */}
                  {/* <iframe
                    src={null}
                    className="fullscreen-iframe"
                    title="Content Frame"
                    allowFullScreen
                    scrolling="no"
                  /> */}
                  
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
                </>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 