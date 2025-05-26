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
  description: '중등수학 1등, 수심달 클래스에서 아이의 평생을 책임질 학습 습관을 완성하세요!',
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
