/**
 * 인증 관련 유틸리티 함수
 * HttpOnly 쿠키 사용 - JavaScript에서 직접 접근 불가
 */

// 동적으로 SSO 서버 주소 결정
// 환경 변수가 설정되어 있으면 사용, 없으면 현재 origin의 포트를 3003으로 변경
const getSSOApiBaseUrl = () => {
  if (process.env.REACT_APP_SSO_API_URL) {
    return process.env.REACT_APP_SSO_API_URL;
  }
  
  // 현재 origin을 기반으로 SSO 서버 주소 생성
  // 예: http://10.51.61.37:3001 -> http://10.51.61.37:3003
  const currentOrigin = window.location.origin;
  const url = new URL(currentOrigin);
  url.port = '3003';
  // origin만 사용하여 슬래시 문제 방지
  return url.origin;
};

const SSO_API_BASE_URL = getSSOApiBaseUrl();

/**
 * 로그인 상태 확인
 * 쿠키 존재 여부를 서버에 확인 요청
 */
export const isAuthenticated = async () => {
  try {
    const response = await fetch(`${SSO_API_BASE_URL}/api/auth/me`, {
      method: 'GET',
      credentials: 'include', // 쿠키 자동 전송
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    console.error('Authentication check error:', error);
    return false;
  }
};

/**
 * 로그인 API 호출
 * 성공 시 HttpOnly 쿠키로 토큰이 자동 저장됨
 */
export const login = async (studentNo, password) => {
  try {
    const response = await fetch(`${SSO_API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      credentials: 'include', // 쿠키 자동 전송 및 수신
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        student_no: studentNo,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || '로그인에 실패했습니다.');
    }

    const data = await response.json();
    // 토큰은 HttpOnly 쿠키로 자동 저장됨 (JavaScript에서 접근 불가)
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * 토큰 검증
 * 쿠키에서 토큰을 자동으로 읽어서 검증
 */
export const verifyToken = async () => {
  try {
    const response = await fetch(`${SSO_API_BASE_URL}/api/auth/verify`, {
      method: 'GET',
      credentials: 'include', // 쿠키 자동 전송
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return { valid: false };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Token verification error:', error);
    return { valid: false };
  }
};

/**
 * 현재 사용자 정보 조회
 * 쿠키에서 토큰을 자동으로 읽어서 사용자 정보 반환
 */
export const getCurrentUser = async () => {
  try {
    const response = await fetch(`${SSO_API_BASE_URL}/api/auth/me`, {
      method: 'GET',
      credentials: 'include', // 쿠키 자동 전송
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

/**
 * 로그아웃
 * 서버에서 쿠키 삭제
 */
export const logout = async () => {
  try {
    await fetch(`${SSO_API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include', // 쿠키 자동 전송
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Logout error:', error);
  }
};

