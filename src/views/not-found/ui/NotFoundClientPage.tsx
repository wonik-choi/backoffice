'use client';

import dynamic from 'next/dynamic';

const NotFound = dynamic(() => import('@/views/not-found/ui/NotFound'), { ssr: false });

export default function NotFoundClientPage() {
  return (
    <section className="size-full">
      <NotFound />
    </section>
  );
}
