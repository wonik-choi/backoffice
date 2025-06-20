export enum FreeTrialUserEvent {
  /** 알림톡을 통한 무료 체험 신청서(무료체험 확장) */
  SUBMIT_DETAIL_APPLICATION_FORM = 'SUBMIT_DETAIL_APPLICATION_FORM',
  /** 오픈 채팅방 입장 */
  ENTER_OPEN_CHAT = 'ENTER_OPEN_CHAT',
  /** 무료체험 시작 */
  START = 'START',
  /** 무료체험 종료 */
  COMPLETE = 'COMPLETE',
  /** 무료체험 중단 */
  STOP = 'STOP',
  /** 무료체험 취소 */
  CANCEL = 'CANCEL',
  /** 입학 (결제완료) */
  ENROLL = 'ENROLL',
  /** 상담 진행 및 완료 */
  CONSULTED = 'CONSULTED',
}
