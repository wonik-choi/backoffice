'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// features
import { useApplyFreeTrialStore } from '@/features/apply-free-trial/model/store';

// views
import { ApplyFreeTrialTempUser } from '@/views/apply-free-trial/ui/ApplyFreeTrialTempUser';

const ApplyFreeTrial = () => {
  const searchParams = useSearchParams();
  const { setInflowCode } = useApplyFreeTrialStore();

  useEffect(() => {
    const inflowCode = searchParams.get('code');

    if (inflowCode) {
      setInflowCode(String(inflowCode));
    }
  }, [searchParams]);

  return (
    <section className="w-full h-full px-[1rem]">
      <ApplyFreeTrialTempUser />
    </section>
  );
};

export default ApplyFreeTrial;
