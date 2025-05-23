import type { Metadata } from 'next';
import { pretendard } from '@/app/fonts';
import './globals.css';

import { Providers } from './Providers';

// toast
import { Toaster } from '@/shared/components/atomics/sonner';

export const metadata: Metadata = {
  title: {
    template: '%s | 수심달',
    default: '우리 아이 수학을 위해, 수심달',
  },
  description: '1:1 개별 관리를 통한 심도 있는 수학 학습을 선도합니다',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pretendard.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`font-pretendard antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
