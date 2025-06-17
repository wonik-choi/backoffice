import { FreeTrialUserEvent, AdChannel } from '@/entities/free-trial-user/models/enums';

export class FreeTrialUserBehavior {
  public mapFreeTrialUserEventToStatus(status: FreeTrialUserEvent) {
    const statusMap = {
      [FreeTrialUserEvent.SUBMIT_DETAIL_APPLICATION_FORM]: '무료체험 신청완료',
      [FreeTrialUserEvent.ENTER_OPEN_CHAT]: '오픈 채팅방 입장',
      [FreeTrialUserEvent.START]: '무료체험 진행',
      [FreeTrialUserEvent.CANCEL]: '무료체험 진행 취소',
      [FreeTrialUserEvent.STOP]: '무료체험 진행 중단',
      [FreeTrialUserEvent.COMPLETE]: '무료체험 진행 완료',
      [FreeTrialUserEvent.CONSULTED]: '상담 진행',
      [FreeTrialUserEvent.ENROLL]: '입학 (결제완료)',
    };

    return statusMap[status] || '알 수 없음';
  }

  public mapFreeTrialUserInflowToStatus(adChannel: AdChannel) {
    const statusMap = {
      [AdChannel.AD]: '광고',
      [AdChannel.HOMEPAGE]: '홈페이지',
      [AdChannel.DIRECT_LINK]: '직접 링크',
    };

    return statusMap[adChannel] || '알 수 없음';
  }
}

export const freeTrialUserBehavior = new FreeTrialUserBehavior();
