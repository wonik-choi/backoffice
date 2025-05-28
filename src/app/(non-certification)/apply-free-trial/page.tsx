'use client';

import dynamic from 'next/dynamic';

const ApplyFreeTrial = dynamic(() => import('@/views/apply-free-trial/ui/orchestra/ApplyFreeTrial'), { ssr: false });

const Page = () => {
  return <ApplyFreeTrial />;
};

export default Page;
