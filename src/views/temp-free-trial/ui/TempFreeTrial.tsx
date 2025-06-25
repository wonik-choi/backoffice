import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';

// shared
import { getQueryClient } from '@/shared/lib/tanstack/getQueryClient';
import { ClientCustomError } from '@/shared/lib/errors/errors';

// features
import AsyncBoundary from '@/features/authentication/ui/AsyncBoundary';
import { TempFreeTrialUsersQueryKeys } from '@/features/temp-free-trial-users/config/query-keys';
import { SkeletonExportButton } from '@/features/export-csv-free-trial-student/ui/ExportButton';
import {
  prefetchTempFreeTrialUsers,
  prefetchTempFreeTrialUsersInitialFilter,
} from '@/features/temp-free-trial-users/services/prefetch/prefetchTempFreeTrialUsers';

// views
import TempFreeTrialFilterSection from '@/views/temp-free-trial/ui/TempFreeTrialFilterSection';
import WrappingExportButton from '@/views/temp-free-trial/ui/buttons/wrapping-export-button/WrappingExportButton';
import SkeletonTempFreeTrialTable from '@/views/temp-free-trial/ui/components/SkeletonTempFreeTrialTable';

import TempFreeTrialTable from '@/views/temp-free-trial/ui/TempFreeTrialTable';

const TempFreeTrial = async () => {
  const queryClient = getQueryClient();
  const cookieStore = await cookies(); // 해당 쿠키는 request 에 포함하는 쿠키이지 브라우저의 쿠키가 아닙니다.
  const session = cookieStore.get('SESSION')?.value;

  if (!session) {
    throw new ClientCustomError('not found session on temp free trial request');
  }

  /** SSR */
  await queryClient.prefetchQuery({
    ...TempFreeTrialUsersQueryKeys.temp_free_trial_users.lists(prefetchTempFreeTrialUsersInitialFilter),
    queryFn: () => prefetchTempFreeTrialUsers(session),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex flex-col items-start justify-start mb-6 gap-5">
        <div className="flex justify-between items-end w-full">
          <div className="flex flex-col items-start">
            <h1 className="text-[2.5rem] font-bold text-violet-700 tracking-tight">1차 무료체험 신청자 관리</h1>
            <p className="text-[1.6rem] text-susimdal-text-subtle mt-1">
              랜딩페이지에서 신청해주신 1차 무료체험 신청자 관리입니다.
            </p>
          </div>
          <div className="w-fit h-full">
            <AsyncBoundary loadingFallback={<SkeletonExportButton />}>
              <WrappingExportButton fileName="1차 무료체험 신청자 관리" />
            </AsyncBoundary>
          </div>
        </div>

        <TempFreeTrialFilterSection />
        <AsyncBoundary loadingFallback={<SkeletonTempFreeTrialTable />}>
          <TempFreeTrialTable />
        </AsyncBoundary>
      </section>
    </HydrationBoundary>
  );
};

export default TempFreeTrial;
