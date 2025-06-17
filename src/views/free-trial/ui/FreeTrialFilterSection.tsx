import AddFreeTrialStudentDialog from '@/features/register-free-trial/ui/AddFreeTrialStudentDialog';

import SearchFreeTrial from '@/views/free-trial/ui/SearchFreeTrial';
import TableFilter from '@/views/free-trial/ui/TableFilter';

const FreeTrialFilterSection = () => {
  return (
    <section className="flex items-center justify-between w-full">
      <div className="flex justify-items-center gap-2 min-w-[25rem]">
        <SearchFreeTrial />
        <TableFilter />
      </div>
      <div className="size-fit">
        <AddFreeTrialStudentDialog />
      </div>
    </section>
  );
};

export default FreeTrialFilterSection;
