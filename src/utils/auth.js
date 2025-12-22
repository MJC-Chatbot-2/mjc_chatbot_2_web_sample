/**
 * 인증 관련 유틸리티 함수
 * SSO 제거 - 항상 인증됨으로 처리
 */

/**
 * 로그인 상태 확인
 * SSO 제거로 항상 true 반환
 */
export const isAuthenticated = async () => {
  return true;
};

/**
 * 로그인 API 호출 (더 이상 사용되지 않음)
 */
export const login = async (studentNo, password) => {
  return { success: true };
};

/**
 * 토큰 검증 (더 이상 사용되지 않음)
 */
export const verifyToken = async () => {
  return { valid: true };
};

/**
 * 현재 사용자 정보 조회 (더 이상 사용되지 않음)
 */
export const getCurrentUser = async () => {
  return { name: '학생', student_no: '-' };
};

/**
 * 로그아웃 (더 이상 사용되지 않음)
 */
export const logout = async () => {
  // 아무것도 하지 않음
};
