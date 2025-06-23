'use client';

// features
import PostTempFreeTrialUserDialog from '@/features/temp-free-trial-user/ui/PostTempFreeTrialUserDialog';

// views
import { useTempFreeTrialStore } from '@/views/temp-free-trial/models/store';
import SearchFreeTrial from '@/views/free-trial/ui/SearchFreeTrial';
import DateFilterButton from '@/views/free-trial/ui/buttons/free-trial-users-filter/DateFilterButton';
import PeriodTypeFilterSelector from '@/views/free-trial/ui/buttons/free-trial-users-filter/PeriodTypeFilterSelector';

const TempFreeTrialFilterSection = () => {
  const { baseDate, periodType, setBaseDate, setPeriodType } = useTempFreeTrialStore();

  return (
    <section className="flex items-center justify-between w-full">
      <div className="flex justify-items-center gap-2 min-w-[25rem]">
        <SearchFreeTrial />
        <DateFilterButton isoDate={baseDate} onChangeDate={setBaseDate} />
        <PeriodTypeFilterSelector periodType={periodType} onChangePeriodType={setPeriodType} />
      </div>
      <div className="size-fit">
        <PostTempFreeTrialUserDialog />
      </div>
    </section>
  );
};

export default TempFreeTrialFilterSection;
