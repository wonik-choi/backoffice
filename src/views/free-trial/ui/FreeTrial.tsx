'use client';

import { Suspense } from 'react';

import { useGetFreeTrialUsersBody } from '@/views/free-trial/services/query/useGetFreeTrialUsersBody';

import FreeTrialFilterSection from '@/views/free-trial/ui/FreeTrialFilterSection';
import WrappingExportButton from '@/views/free-trial/ui/buttons/wrapping-export-button/WrappingExportButton';

import FreeTrialTable from '@/views/free-trial/ui/FreeTrialTable';

import { FREE_TRIAL_USERS_TABLE_COLUMNS } from '@/views/free-trial/models/const/table';

const FreeTrial = () => {
  const { tableData } = useGetFreeTrialUsersBody();

  return (
    <section className="flex flex-col items-start justify-start mb-6 gap-5">
      <div className="flex justify-between items-end w-full">
        <div className="flex flex-col items-start">
          <h1 className="text-[2.5rem] font-bold text-violet-700 tracking-tight">무료체험 고객관리</h1>
          <p className="text-[1.6rem] text-susimdal-text-subtle mt-1">
            무료체험 신청, 진행, 대여 현황을 한눈에 관리하세요.
          </p>
        </div>
        <div className="w-fit h-full">
          <WrappingExportButton
            fileName="무료체험 고객관리"
            columns={FREE_TRIAL_USERS_TABLE_COLUMNS}
            tableData={tableData}
          />
        </div>
      </div>

      <FreeTrialFilterSection />
      <Suspense fallback={<div>Loading...</div>}>
        <FreeTrialTable columns={FREE_TRIAL_USERS_TABLE_COLUMNS} tableData={tableData} />
      </Suspense>
    </section>
  );
};

export default FreeTrial;
