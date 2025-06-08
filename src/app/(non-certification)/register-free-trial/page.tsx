'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

const RegisterFreeTrial = dynamic(() => import('@/views/register-free-trial/ui/RegisterFreeTrial'), { ssr: false });
const RegisterFreeTrialNotPromotion = dynamic(
  () => import('@/views/register-free-trial/ui/non-promotion/RegisterFreeTrialNotPromotion'),
  { ssr: false }
);

const Page = () => {
  const searchParams = useSearchParams();
  const promotion = searchParams.get('promotion');

  return (
    <div className="flex justify-center items-center w-full h-dvh">
      {promotion ? <RegisterFreeTrial /> : <RegisterFreeTrialNotPromotion />}
    </div>
  );
};

export default Page;
