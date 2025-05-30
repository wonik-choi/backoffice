import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

const InternalCheckView = async ({ children }: { children: React.ReactNode }) => {
  const promisedHeaders = await headers();
  const host = promisedHeaders.get('host');

  if (!host?.includes('localhost')) {
    notFound();
  }

  return children;
};

export default InternalCheckView;
