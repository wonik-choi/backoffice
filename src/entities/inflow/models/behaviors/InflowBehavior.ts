import { AdChannel } from '@/entities/inflow/models/enums';

import { DirectLinkInflowDetailResponse, QrInflowDetailResponse } from '@/entities/inflow/models/dtos';

export class InflowBehavior {
  public mapInflowToStatus(adChannel: AdChannel) {
    const statusMap = {
      [AdChannel.AD]: '광고',
      [AdChannel.HOMEPAGE]: '홈페이지',
      [AdChannel.DIRECT_LINK]: '직접 링크',
    };

    return statusMap[adChannel] || '알 수 없음';
  }

  public checkReferrerIsExist = (
    inflowDetail: unknown
  ): inflowDetail is DirectLinkInflowDetailResponse | QrInflowDetailResponse => {
    return this.isDirectLinkInflow(inflowDetail) || this.isQrInflow(inflowDetail);
  };

  public isDirectLinkInflow = (inflowDetail: unknown): inflowDetail is DirectLinkInflowDetailResponse => {
    return inflowDetail instanceof Object && 'groupName' in inflowDetail;
  };

  public isQrInflow = (inflowDetail: unknown): inflowDetail is QrInflowDetailResponse => {
    return inflowDetail instanceof Object && 'referrer' in inflowDetail;
  };
}

export const inflowBehavior = Object.freeze(new InflowBehavior());
