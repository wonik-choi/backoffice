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
      [AdChannel.FACEBOOK]: '페이스북/인스타그램',
      [AdChannel.NAVER_SEARCH]: '네이버 검색',
      [AdChannel.NAVER_BLOG]: '네이버 블로그',
      [AdChannel.INSTAGRAM_STORY]: '인스타그램 스토리',
      [AdChannel.LINK_TREE]: '링크트리',
      [AdChannel.INSTAGRAM_FEED]: '인스타그램 피드',
      [AdChannel.KAKAO_PLUS_FRIEND]: '카카오플러스친구',
    };

    return statusMap[adChannel] || '알 수 없음';
  }
}

export const freeTrialUserBehavior = new FreeTrialUserBehavior();
