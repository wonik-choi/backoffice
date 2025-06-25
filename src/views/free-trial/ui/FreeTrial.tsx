import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';

// shared
import { getQueryClient } from '@/shared/lib/tanstack/getQueryClient';
import { ClientCustomError } from '@/shared/lib/errors/errors';

// features
import AsyncBoundary from '@/features/authentication/ui/AsyncBoundary';
import { FreeTrialUsersQueryKeys } from '@/features/free-trial-users/config/query-keys';
import { SkeletonExportButton } from '@/features/export-csv-free-trial-student/ui/ExportButton';
import {
  prefetchFreeTrialUsers,
  prefetchFreeTrialUsersInitialFilter,
} from '@/features/free-trial-users/services/prefetch/prefetchFreeTrialUsers';

// views
import FreeTrialFilterSection from '@/views/free-trial/ui/FreeTrialFilterSection';
import WrappingExportButton from '@/views/free-trial/ui/buttons/wrapping-export-button/WrappingExportButton';
import SkeletonFreeTrialTable from '@/views/free-trial/ui/components/SkeletonFreeTrialTable';

import FreeTrialTable from '@/views/free-trial/ui/FreeTrialTable';

const FreeTrial = async () => {
  const queryClient = getQueryClient();
  const cookieStore = await cookies(); // 해당 쿠키는 request 에 포함하는 쿠키이지 브라우저의 쿠키가 아닙니다.
  const session = cookieStore.get('SESSION')?.value;

  if (!session) {
    throw new ClientCustomError('not found session on free trialrequest');
  }

  /** SSR */
  await queryClient.prefetchQuery({
    ...FreeTrialUsersQueryKeys.free_trial_users.lists(prefetchFreeTrialUsersInitialFilter),
    queryFn: () => prefetchFreeTrialUsers(session),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex flex-col items-start justify-start mb-6 gap-5">
        <div className="flex justify-between items-end w-full">
          <div className="flex flex-col items-start">
            <h1 className="text-[2.5rem] font-bold text-violet-700 tracking-tight">무료체험 고객관리</h1>
            <p className="text-[1.6rem] text-susimdal-text-subtle mt-1">
              무료체험 신청, 진행, 대여 현황을 한눈에 관리하세요.
            </p>
          </div>
          <div className="w-fit h-full">
            <AsyncBoundary loadingFallback={<SkeletonExportButton />}>
              <WrappingExportButton fileName="무료체험 고객관리" />
            </AsyncBoundary>
          </div>
        </div>

        <FreeTrialFilterSection />
        <AsyncBoundary loadingFallback={<SkeletonFreeTrialTable />}>
          <FreeTrialTable />
        </AsyncBoundary>
      </section>
    </HydrationBoundary>
  );
};

export default FreeTrial;
