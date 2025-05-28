import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '무료체험 신청',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh w-full flex justify-center items-center mx-auto bg-susimdal-background-primary-light">
      <main className="w-full h-fit max-w-[42rem]">{children}</main>
    </div>
  );
};

export default Layout;
