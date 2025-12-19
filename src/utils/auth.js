/**
 * 인증 관련 유틸리티 함수
 * HttpOnly 쿠키 사용 - JavaScript에서 직접 접근 불가
 */

const SSO_API_BASE_URL = process.env.REACT_APP_SSO_API_URL || 'http://localhost:3003';

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

