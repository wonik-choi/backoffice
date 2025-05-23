'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { useEffect } from 'react';

// shared

import { useCustomLottie } from '@/shared/hooks/useLottie';
import kidsAnimation from '@/shared/lotties/kids-animation.json';
import { formatKoreanTitle, decodeQueryDate } from '@/shared/lib/date-fns/utls';
// features
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';

// views
import RegisterFreeTrialLayout from '@/views/register-free-trial/ui/RegisterFreeTrialLayout';
import { Button } from '@/views/register-free-trial/ui/components/Button';

export function Completion() {
  const { resetForm, prevStep, freeTrial } = useRegisterFreeTrialStore();

  const completeLottieOption = {
    animationData: kidsAnimation,
    loop: true,
    autoplay: true,
    style: {
      width: '200px',
      height: '200px',
    },
  };

  const { View: CompleteLottie } = useCustomLottie(completeLottieOption);

  const startDate = formatKoreanTitle(decodeQueryDate(freeTrial.startDate));

  return (
    <RegisterFreeTrialLayout title={'무료체험 신청이\n완료되었습니다'} progressStep={8} totalSteps={9} titleDelay={1.3}>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        tabIndex={-1}
        className="flex flex-1 flex-col w-full h-full justify-between  relative overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          tabIndex={-1}
          className="flex flex-col justify-center items-center w-full gap-[0.8rem] mobile:gap-[1rem] my-auto"
        >
          {CompleteLottie}
          <div className="flex flex-col justify-start items-center gap-[0.4rem] mobile:gap-[0.5rem] w-full">
            <p className="text-[1.4rem] font-medium text-susimdal-text-basic">{`${startDate}에 수심달 클래스에서 만나요`}</p>
            <p className="text-[1.2rem] font-medium text-susimdal-text-basic">{`수업 시작 1일 전에 선생님이 전화를 드릴게요`}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.3 }}
          tabIndex={-1}
          className="flex flex-col justify-center items-center w-full mt-auto pt-6 gap-[0.8rem]"
        >
          <Link href={'https://class.susimdal.com/company'} className="w-full">
            <Button type="button" className="w-full">
              수심달 클래스 자세히 보기
            </Button>
          </Link>

          {/* <Link href={'https://class.susimdal.com/'} className="w-full"> */}
          <Button variant="border" type="button" className="w-full" onClick={prevStep}>
            홈으로
          </Button>
          {/* </Link> */}
        </motion.div>
      </motion.div>
    </RegisterFreeTrialLayout>
  );
}
