// shared

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atomics/select';

// entities
import { PeriodType } from '@/entities/free-trial-user/models/enums';

// views
import { FREE_TRIAL_USER_PERIOD_TYPE } from '@/views/free-trial/models/const/freeTrialUserStatus';

interface PeriodTypeFilterSelectorProps {
  periodType: PeriodType;
  onChangePeriodType: (periodType: PeriodType) => void;
}

const PeriodTypeFilterSelector = ({ periodType, onChangePeriodType }: PeriodTypeFilterSelectorProps) => {
  return (
    <Select
      onValueChange={(value) => {
        onChangePeriodType(value as PeriodType);
      }}
      defaultValue={periodType ?? undefined}
    >
      <SelectTrigger className="col-span-3 w-full">
        <SelectValue placeholder="학년 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {FREE_TRIAL_USER_PERIOD_TYPE.map((option) => {
            return (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PeriodTypeFilterSelector;
