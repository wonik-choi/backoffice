'use client';

import dynamic from 'next/dynamic';

const RegisterFreeTrial = dynamic(() => import('@/views/register-free-trial/ui/RegisterFreeTrial'), { ssr: false });

const Page = () => {
  return (
    <div className="flex justify-center items-center w-full h-dvh">
      <RegisterFreeTrial />
    </div>
  );
};

export default Page;
