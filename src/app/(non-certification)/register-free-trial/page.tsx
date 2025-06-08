'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const RegisterFreeTrial = dynamic(() => import('@/views/register-free-trial/ui/RegisterFreeTrial'), { ssr: false });
const RegisterFreeTrialNotPromotion = dynamic(
  () => import('@/views/register-free-trial/ui/non-promotion/RegisterFreeTrialNotPromotion'),
  { ssr: false }
);

const RegisterFreeTrialPage = () => {
  const searchParams = useSearchParams();
  const promotion = searchParams.get('promotion');

  return (
    <div className="flex justify-center items-center w-full h-dvh">
      {promotion ? <RegisterFreeTrial /> : <RegisterFreeTrialNotPromotion />}
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterFreeTrialPage />
    </Suspense>
  );
};

export default Page;
