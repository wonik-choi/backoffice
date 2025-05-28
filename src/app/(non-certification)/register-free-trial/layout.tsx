import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '무료체험 신청',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full max-w-[45rem] mx-auto">
      <main className="size-full">{children}</main>
    </div>
  );
};

export default Layout;
