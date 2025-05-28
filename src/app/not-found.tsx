// views
import { Metadata } from 'next';

import NotFoundClientPage from '@/views/not-found/ui/NotFoundClientPage';

export const metadata: Metadata = {
  title: '404 Not Found',
  description: '요청하신 페이지를 찾을 수 없습니다.',
  openGraph: {
    title: '404 Not Found',
    description: '요청하신 페이지를 찾을 수 없습니다.',
  },
};

export default function NotFoundPage() {
  return (
    <section className="size-full">
      <NotFoundClientPage />
    </section>
  );
}
