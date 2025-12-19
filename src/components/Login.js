import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { login } from '../utils/auth';

function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 로그인 API 호출
      const result = await login(userId, password);
      
      // 로그인 성공 시 메인 페이지로 리다이렉트
      // returnUrl이 있으면 해당 URL로 이동, 없으면 홈으로
      const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
      if (returnUrl) {
        window.location.href = returnUrl;
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || '로그인에 실패했습니다. 학번과 비밀번호를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* 접근성 링크 */}
      <div className="skip-links">
        <a href="#main-menu" className="skip-link">주메뉴 바로가기</a>
        <a href="#main-content" className="skip-link">본문 바로가기</a>
      </div>

      {/* 헤더 */}
      <header className="login-header">
        <div className="header-container">
          <h1 className="logo">
            <a href="/">
              <span className="logo-text">명지전문대학</span>
            </a>
          </h1>
          
          <nav className="top-menu" id="main-menu">
            <h2 className="sr-only">메뉴 목록</h2>
            <ul className="menu-list">
              <li><a href="/member/join.do">회원가입</a></li>
              <li><a href="/member/login.do">통합로그인</a></li>
              <li><a href="/member/findIdPw.do">ID/PW찾기</a></li>
              <li><a href="/member/guide.do">이용안내</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="login-main" id="main-content">
        <div className="login-container">
          <div className="login-box">
            <p className="welcome-text">명지전문대학에 오신 것을 환영합니다.</p>
            <p className="login-description">로그인 후 서비스를 이용할 수 있습니다.</p>

            <form className="login-form" onSubmit={handleSubmit}>
              {error && (
                <div className="error-message" role="alert">
                  {error}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="userId" className="form-label">
                  <span className="label-icon">👤</span>
                  아이디(학생은 학번, 교직원은 교번 입력)
                </label>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  className="form-input"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="아이디를 입력하세요"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  <span className="label-icon">🔒</span>
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  disabled={isLoading}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </button>
            </form>

            <ul className="login-links">
              <li><a href="/member/findId.do">ID찾기&gt;</a></li>
              <li><a href="/member/findPw.do">PW찾기&gt;</a></li>
              <li><a href="/member/findStudentId.do">학번찾기&gt;</a></li>
              <li><a href="/member/join.do">회원가입&gt;</a></li>
            </ul>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="login-footer">
        <h2 className="sr-only">하단 정보</h2>
        <div className="footer-content">
          <a href="/privacy.do" className="privacy-link">개인정보처리방침</a>
          <p className="copyright">
            COPYRIGHT(C)2014 MYONGJI COLLEGE ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Login;

