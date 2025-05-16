/**
 * 다음(카카오) 우편번호 서비스 응답 인터페이스
 */
export interface DaumPostcodeResultDto {
  /** 국가기초구역번호 (우편번호) */
  zonecode: string;

  /** 기본 주소 (검색 결과 첫줄) */
  address: string;

  /** 기본 영문 주소 */
  addressEnglish: string;

  /** 검색된 기본 주소 타입: R(도로명), J(지번) */
  addressType: 'R' | 'J';

  /** 사용자가 선택한 주소 타입: R(도로명), J(지번) */
  userSelectedType: 'R' | 'J';

  /** 연관 주소에서 "선택 안함" 선택 여부 */
  noSelected?: 'Y' | 'N';

  /** 사용자가 선택한 주소의 언어 타입: K(한글), E(영문) */
  userLanguageType: 'K' | 'E';

  /** 도로명 주소 */
  roadAddress: string;

  /** 영문 도로명 주소 */
  roadAddressEnglish: string;

  /** 지번 주소 */
  jibunAddress: string;

  /** 영문 지번 주소 */
  jibunAddressEnglish: string;

  /** 지번주소에 매핑된 자동 도로명 주소 */
  autoRoadAddress?: string;

  /** 자동 도로명 주소의 영문 */
  autoRoadAddressEnglish?: string;

  /** 도로명주소에 매핑된 자동 지번 주소 */
  autoJibunAddress?: string;

  /** 자동 지번 주소의 영문 */
  autoJibunAddressEnglish?: string;

  /** 건물관리번호 */
  buildingCode: string;

  /** 건물명 */
  buildingName: string;

  /** 공동주택 여부 (아파트,연립주택,다세대주택 등) */
  apartment: 'Y' | 'N';

  /** 도/시 이름 */
  sido: string;

  /** 도/시 이름의 영문 */
  sidoEnglish: string;

  /** 시/군/구 이름 */
  sigungu: string;

  /** 시/군/구 이름의 영문 */
  sigunguEnglish: string;

  /** 시/군/구 코드 (5자리) */
  sigunguCode: string;

  /** 도로명 코드 (7자리 이상) */
  roadnameCode: string;

  /** 법정동/법정리 코드 */
  bcode: string;

  /** 도로명 */
  roadname: string;

  /** 도로명의 영문 */
  roadnameEnglish: string;

  /** 법정동/법정리 이름 */
  bname: string;

  /** 법정동/법정리 이름의 영문 */
  bnameEnglish: string;

  /** 법정리의 읍/면 이름 (동지역은 공백) */
  bname1: string;

  /** 법정리의 읍/면 이름의 영문 */
  bname1English: string;

  /** 법정동/법정리 이름 */
  bname2: string;

  /** 법정동/법정리 이름의 영문 */
  bname2English: string;

  /** 행정동 이름 */
  hname: string;

  /** 사용자가 입력한 검색어 */
  query: string;

  /** 구 우편번호 (2020년 3월 9일 이후 제공 안함) */
  postcode?: string;

  /** 구 우편번호 앞 3자리 (2020년 3월 9일 이후 제공 안함) */
  postcode1?: string;

  /** 구 우편번호 뒤 3자리 (2020년 3월 9일 이후 제공 안함) */
  postcode2?: string;

  /** 구 우편번호 일련번호 (2020년 3월 9일 이후 제공 안함) */
  postcodeSeq?: string;
}
