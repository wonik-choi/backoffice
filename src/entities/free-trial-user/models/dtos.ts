export interface FreeTrialApplicationsResponseDto {
  freeTrialUserEventUserId: string;
  freeTrialUserEventHistoryId: number;
  freeTrialId: number;
  rentalId: number;
  promotionParticipantIds: number[];
  userTermAgreementIds: number[];
}

export interface PromotionOptionDto {
  id: number;
  payload: {
    title: string;
    copies: number;
    months: number;
    magazineType: string;
  };
  createdAt: string | null;
}

export interface PromotionDto {
  id: number;
  promotionCode: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  options: PromotionOptionDto[];
}

export interface GetFreeTrialPromotionsResponseDto {
  promotions: PromotionDto[];
}
