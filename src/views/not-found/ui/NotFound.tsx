'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// shared
import { useCustomLottie } from '@/shared/hooks/useLottie';
import NotFoundAnimation from '@/shared/lotties/not-found.json';

export default function NotFound() {
  const router = useRouter();

  const notFoundLottieOption = {
    animationData: NotFoundAnimation,
    loop: true,
    autoplay: true,
    style: {
      width: '300px',
      height: '300px',
    },
  };

  const { View: NotFoundLottie } = useCustomLottie(notFoundLottieOption);

  return (
    <div className="min-h-dvh w-full flex flex-col items-center justify-center bg-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md flex flex-col items-center"
      >
        {/* 404 이미지 */}
        <div className="relative w-[300px] h-[300px] mb-8">{NotFoundLottie}</div>

        {/* 텍스트 영역 */}
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-[2.4rem] font-bold text-susimdal-text-basic">페이지를 찾을 수 없습니다</h1>
          <p className="text-[1.6rem] text-susimdal-text-subtle leading-relaxed">
            요청하신 페이지가 삭제되었거나 <br />
            잘못된 경로로 접근하셨습니다
          </p>
        </div>

        {/* 버튼 */}
        <motion.button
          onClick={() => router.back()}
          whileTap={{ scale: 0.98 }}
          className="w-full max-w-[40rem] h-[4.5rem] bg-susimdal-button-primary-fill text-[1.6rem] text-white rounded-xl font-semibold
                     shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]
                     transition-colors cursor-pointer
                     active:shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)]"
        >
          이전 페이지로 돌아가기
        </motion.button>
      </motion.div>

      {/* 배경 장식 (선택사항) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-50 to-transparent opacity-40 rounded-full" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-50 to-transparent opacity-40 rounded-full" />
      </div>
    </div>
  );
}
