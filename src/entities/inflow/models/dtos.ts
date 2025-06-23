import { AdChannel } from '@/entities/inflow/models/enums';

export interface Referrer {
  id: number;
  name: string;
  phoneNumber: string;
  companyName: string;
}

export interface AdInflowDetailResponse {
  type: string;
  channel: string;
}

export interface DirectLinkInflowDetailResponse {
  type: string;
  groupName: string;
  referrer: Referrer;
}

export interface QrInflowDetailResponse {
  type: string;
  referrer: Referrer;
}

export interface HomepageInflowDetailResponse {
  type: string;
}

export interface DefaultInflowDetailResponse {
  trialDays: number;
}

export type PolymorphicChanel =
  | AdInflowDetailResponse
  | DirectLinkInflowDetailResponse
  | QrInflowDetailResponse
  | HomepageInflowDetailResponse
  | DefaultInflowDetailResponse;

export interface InflowDetailPolymorphic {
  trialDays: number;
  detail: PolymorphicChanel;
}

// 아마 entity
export interface InflowDto {
  id: number;
  code: string;
  inflowSource: AdChannel;
  detail: InflowDetailPolymorphic;
}
