/**
 * 세션 문자열을 분리하여 객체로 반환
 * @param session 세션 문자열
 * @returns 세션 객체
 */
export const splitSession = (session: string) => {
  const splitedSession = session.split(';');
  const sessionValue = splitedSession.find((item) => item.includes('SESSION'))?.split('=')[1];

  /** server 내 전달속성 */
  const httpOnly = splitedSession.find((item) => item.includes('HttpOnly'));
  const secure = splitedSession.find((item) => item.includes('Secure'));
  const path = splitedSession.find((item) => item.includes('Path'))?.split('=')[1];
  const sameSite = splitedSession.find((item) => item.includes('SameSite'))?.split('=')[1];

  return {
    sessionValue,
    httpOnly: Boolean(httpOnly),
    secure: Boolean(secure),
    path,
    sameSite,
  };
};
