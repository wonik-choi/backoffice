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
  metadataBase: new URL(
    process.env.NODE_ENV === 'production' ? 'https://backoffice-susimdal.com' : 'http://localhost:3000'
  ),
  description: '중등수학 1등, 수심달 클래스에서 아이의 평생을 책임질 학습 습관을 완성하세요!',
  keywords: ['수심달', '중등수학', 'AI 교육', '수학 학습', '온라인 클래스', '수심달 클래스'],
  authors: [{ name: '수심달', url: 'https://backoffice-susimdal.com' }],
  creator: '수심달',
  openGraph: {
    title: '우리 아이 수학을 위해, 수심달',
    description: '중등수학 1등, 수심달 클래스에서 아이의 평생을 책임질 학습 습관을 완성하세요!',
    url: 'https://backoffice-susimdal.com',
    siteName: '수심달',
    images: ['/images/form_og.png'],
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true, // 페이지 인덱싱 허용
    follow: true, // 링크 팔로우 허용
    nocache: false, // 캐시를 허용(혹은 true로 막기)
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
