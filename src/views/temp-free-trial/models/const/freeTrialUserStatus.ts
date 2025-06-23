import { PeriodType } from '@/entities/common/enums';

export const TEMP_FREE_TRIAL_USER_PERIOD_TYPE = Object.values(PeriodType).map((periodType) => ({
  value: periodType,
  label: periodType,
}));
