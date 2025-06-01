import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '인증페이지',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default Layout;
