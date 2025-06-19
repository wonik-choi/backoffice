import { AdChannel } from '@/entities/inflow/models/enums';

export class InflowBehavior {
  public mapInflowToStatus(adChannel: AdChannel) {
    const statusMap = {
      [AdChannel.AD]: '광고',
      [AdChannel.HOMEPAGE]: '홈페이지',
      [AdChannel.DIRECT_LINK]: '직접 링크',
    };

    return statusMap[adChannel] || '알 수 없음';
  }
}

export const inflowBehavior = new InflowBehavior();
