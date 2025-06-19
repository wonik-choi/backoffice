'use client';

// features
import AddFreeTrialStudentDialog from '@/features/register-free-trial/ui/AddFreeTrialStudentDialog';

// views
import { useFreeTrialStore } from '@/views/free-trial/models/store';
import SearchFreeTrial from '@/views/free-trial/ui/SearchFreeTrial';
import TableFilter from '@/views/free-trial/ui/TableFilter';
import DateFilterButton from '@/views/free-trial/ui/buttons/free-trial-users-filter/DateFilterButton';
import PeriodTypeFilterSelector from '@/views/free-trial/ui/buttons/free-trial-users-filter/PeriodTypeFilterSelector';

const FreeTrialFilterSection = () => {
  const { baseDate, periodType, setBaseDate, setPeriodType } = useFreeTrialStore();

  return (
    <section className="flex items-center justify-between w-full">
      <div className="flex justify-items-center gap-2 min-w-[25rem]">
        <SearchFreeTrial />
        <DateFilterButton isoDate={baseDate} onChangeDate={setBaseDate} />
        <PeriodTypeFilterSelector periodType={periodType} onChangePeriodType={setPeriodType} />
        <TableFilter />
      </div>
      <div className="size-fit">
        <AddFreeTrialStudentDialog />
      </div>
    </section>
  );
};

export default FreeTrialFilterSection;
