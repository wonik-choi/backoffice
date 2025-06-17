import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

// shared
import { getQueryClient } from '@/shared/lib/tanstack/getQueryClient';
import { formatKoreanTitle } from '@/shared/lib/date-fns/utls';

// entities
import { PeriodType } from '@/entities/free-trial-user/models/enums';

// features
import AsyncBoundary from '@/features/authentication/ui/AsyncBoundary';
import { FreeTrialUsersQueryKeys } from '@/features/free-trial-users/config/query-keys';

// views
import FreeTrialFilterSection from '@/views/free-trial/ui/FreeTrialFilterSection';
import WrappingExportButton from '@/views/free-trial/ui/buttons/wrapping-export-button/WrappingExportButton';

import FreeTrialTable from '@/views/free-trial/ui/FreeTrialTable';

const FreeTrial = async () => {
  const queryClient = getQueryClient();

  /** SSR */
  await queryClient.prefetchQuery({
    ...FreeTrialUsersQueryKeys.free_trial_users.lists({
      periodType: PeriodType.MONTH,
      baseDate: formatKoreanTitle(new Date(), 'yyyy-MM-dd'),
      timeZone: 'Asia/Seoul',
      page: 0,
      size: 10,
    }),
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
            <AsyncBoundary loadingFallback={<div>Loading...</div>}>
              <WrappingExportButton fileName="무료체험 고객관리" />
            </AsyncBoundary>
          </div>
        </div>

        <FreeTrialFilterSection />
        <AsyncBoundary loadingFallback={<div>Loading...</div>}>
          <FreeTrialTable />
        </AsyncBoundary>
      </section>
    </HydrationBoundary>
  );
};

export default FreeTrial;
