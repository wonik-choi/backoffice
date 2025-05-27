// 전화번호 포맷팅 함수
export const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');

  if (digits.length <= 7) {
    return digits.replace(/(\d{3})(\d{1,4})/, '$1-$2');
  } else {
    return digits.replace(/(\d{3})(\d{3,4})(\d{1,4})/, '$1-$2-$3');
  }
};

/**
 * @description
 * 전화번호 포맷팅 처리 해제
 */
export const unformatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/[^0-9]/g, '');
};
