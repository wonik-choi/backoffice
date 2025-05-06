import FreeTrialFilterSection from '@/pages/free-trial/ui/FreeTrialFilterSection';
import ExportButton from '@/features/export-csv-free-trial-student/ui/ExportButton';
import EditFreeTrialStudentDialog from '@/features/edit-free-trial-student/ui/EditFreeTrialStudentDialog';

const exampleStudent = {
  name: '홍길동',
  phone: '010-3322-3423',
  registrationDate: new Date('2025-01-01'),
  enterancePath: '카카오톡',
  testPeriod: {
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-01-01'),
  },
  deviceRental: {
    deviceRentalAddress: '서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층',
    rentalDate: new Date('2025-01-01'),
    returnDate: new Date('2025-01-01'),
  },
};

const FreeTrial = () => {
  return (
    <section className="flex flex-col items-start justify-start mb-6 gap-5">
      <div className="flex justify-between items-end w-full">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold text-violet-700 tracking-tight">무료체험 고객관리</h1>
          <p className="text-sm text-gray-500 mt-1">무료체험 신청, 진행, 대여 현황을 한눈에 관리하세요.</p>
        </div>
        <div className="w-fit h-full">
          <EditFreeTrialStudentDialog student={exampleStudent} />
        </div>
      </div>

      <FreeTrialFilterSection />
    </section>
  );
};

export default FreeTrial;
