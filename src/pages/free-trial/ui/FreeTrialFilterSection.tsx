import AddFreeTrialStudentDialog from '@/features/add-new-free-trial-student/ui/AddFreeTrialStudentDialog';
import SearchFreeTrial from '@/pages/free-trial/ui/SearchFreeTrial';
import TableFilter from '@/pages/free-trial/ui/TableFilter';

const FreeTrialFilterSection = () => {
  return (
    <section className="flex items-center justify-between w-full">
      <div className="flex justify-items-center gap-2 min-w-[20rem]">
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
