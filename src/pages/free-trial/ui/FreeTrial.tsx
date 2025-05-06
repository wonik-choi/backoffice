'use client';

import { useState } from 'react';

import FreeTrialFilterSection from '@/pages/free-trial/ui/FreeTrialFilterSection';
import WrappingExportButton from '@/pages/free-trial/ui/buttons/wrapping-export-button/WrappingExportButton';
import EditFreeTrialStudentDialog from '@/features/edit-free-trial-student/ui/EditFreeTrialStudentDialog';
import FreeTrialTable from '@/pages/free-trial/ui/FreeTrialTable';

import { useInitialFreeTrialTable } from '@/pages/free-trial/services/usecase/useInitialFreeTrialTable';
import { freeTrialTableColumns } from '@/pages/free-trial/models/const/table';
import { ExpandedRowData } from '@/pages/free-trial/models/interface';

const data: ExpandedRowData[] = [
  {
    id: '1',
    name: '신윤식',
    phone: '010-7474-0994',
    status: '1차 해피콜 대기',
    latestRecord: '체험신청\n2025.04.01 11:10:00',
    registrationDate: new Date('2025-04-01T11:10:00'),
    checkPeriod: {
      startDate: new Date('2025-04-01T11:10:00'),
      endDate: new Date('2025-04-01T11:10:00'),
      duration: '-',
      status: '-',
    },
    upgrade: {
      deviceRentalAddress: '-',
      completionStatus: '-',
      rentalDate: new Date('2025-04-01T11:10:00'),
      returnStatus: '-',
    },
  },
  {
    id: '2',
    name: '김재환',
    phone: '010-7342-0114',
    status: '1차 해피콜 대기',
    latestRecord: '체험신청\n2025.04.01 11:10:00',
    registrationDate: new Date('2025-04-01T11:10:00'),
    checkPeriod: {
      startDate: new Date('2025-04-01T11:10:00'),
      endDate: new Date('2025-04-01T11:10:00'),
      duration: '-',
      status: '-',
    },
    upgrade: {
      deviceRentalAddress: '-',
      completionStatus: '-',
      rentalDate: new Date('2025-04-01T11:10:00'),
      returnStatus: '-',
    },
  },
  {
    id: '3',
    name: '최원익',
    phone: '010-2274-5345',
    status: '1차 해피콜 대기',
    latestRecord: '체험신청\n2025.04.01 11:10:00',
    registrationDate: new Date('2025-04-01T11:10:00'),
    checkPeriod: {
      startDate: new Date('2025-04-01T11:10:00'),
      endDate: new Date('2025-04-01T11:10:00'),
      duration: '-',
      status: '-',
    },
    upgrade: {
      deviceRentalAddress: '-',
      completionStatus: '-',
      rentalDate: new Date('2025-04-01T11:10:00'),
      returnStatus: '-',
    },
  },
  {
    id: '4',
    name: '박상민',
    phone: '010-4455-2341',
    status: '1차 해피콜 대기',
    latestRecord: '체험신청\n2025.04.01 11:10:00',
    registrationDate: new Date('2025-04-01T11:10:00'),
    checkPeriod: {
      startDate: new Date('2025-04-01T11:10:00'),
      endDate: new Date('2025-04-01T11:10:00'),
      duration: '-',
      status: '-',
    },
    upgrade: {
      deviceRentalAddress: '-',
      completionStatus: '-',
      rentalDate: new Date('2025-04-01T11:10:00'),
      returnStatus: '-',
    },
  },
];

const FreeTrial = () => {
  // 아마 추후에는 데이터를 받아와서 convert 한 뒤 tableData 로 전달할 것으로 예상
  // 현재는 일단 useState 로 mock 처리

  const [tableData, setTableData] = useState<ExpandedRowData[]>(data);

  return (
    <section className="flex flex-col items-start justify-start mb-6 gap-5">
      <div className="flex justify-between items-end w-full">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold text-violet-700 tracking-tight">무료체험 고객관리</h1>
          <p className="text-sm text-gray-500 mt-1">무료체험 신청, 진행, 대여 현황을 한눈에 관리하세요.</p>
        </div>
        <div className="w-fit h-full">
          <WrappingExportButton fileName="무료체험 고객관리" columns={freeTrialTableColumns} tableData={tableData} />
        </div>
      </div>

      <FreeTrialFilterSection />
      <FreeTrialTable columns={freeTrialTableColumns} tableData={tableData} />
    </section>
  );
};

export default FreeTrial;
