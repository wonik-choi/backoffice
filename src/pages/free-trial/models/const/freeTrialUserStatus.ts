export const statusOptions = ['1차 해피콜 대기', '알림톡 응답 대기', '체험 진행중', '신청보류'] as const;
export const deviceRentalOptions = ['대여중', '반납완료', '미반납'] as const;

export const USER_STATUS = 'status' as const;
export const USER_DEVICE_RENTAL_STATUS = 'upgrade.completionStatus' as const;

// '1차 해피콜 대기' | '알림톡 응답 대기' | '체험 진행중' | '신청보류'
export type StatusOption = (typeof statusOptions)[number];
export type DeviceRentalOption = (typeof deviceRentalOptions)[number];
