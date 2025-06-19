import { AdChannel } from '@/entities/inflow/models/enums';

export interface Referrer {
  id: number;
  name: string;
  phoneNumber: string;
}

export interface InflowDetail {
  type: string;
  groupName: string;
  referrer: Referrer;
}

// 아마 entity
export interface InflowDto {
  id: number;
  code: string;
  inflowSource: AdChannel;
  detail: InflowDetail;
}
