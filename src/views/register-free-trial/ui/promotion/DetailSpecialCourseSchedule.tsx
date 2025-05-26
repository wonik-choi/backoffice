'use client';

import { Calendar, ClockAlert, MonitorCog } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// widgets
import { DrawerTermLayout } from '@/widgets/drawer-term-layout/ui/DrawerTermLayout';

import type { DeviceRentalTermsProps } from '@/views/register-free-trial/model/interface';

export const DetailSpecialCourseSchedule = ({ openState, setOpenState, agreeTerms }: DeviceRentalTermsProps) => {
  return (
    <DrawerTermLayout
      openState={openState}
      setOpenState={setOpenState}
      agreeTerms={agreeTerms}
      title={'수심달 이정환 대표원장 개념강의 직강을\n집에서 청강할 수 있는 기회!'}
      titleClassName="text-susimdal-text-primary"
      buttonText="확인"
    >
      <motion.div
        initial={{ opacity: 0, y: 0, scale: 1.05 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeIn', delay: 0.1 }}
        tabIndex={-1}
        className="w-full flex justify-center items-center mb-[0.9rem] mobile:mb-[1.2rem]"
      >
        <div className="relative bg-white  w-[16rem] h-[20rem] mobile:w-[20rem] mobile:h-[25rem]">
          <Image
            src="/images/susimdal-ceo-profile.png"
            alt="ceo-profile"
            fill={true}
            sizes="(max-width: 640px) 20rem, 16rem"
            quality={80}
            loading="lazy"
            placeholder="blur"
            blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8fv95PQAIkAMuIar4iAAAAABJRU5ErkJggg=="
            style={{ objectFit: 'cover', backgroundColor: 'white' }}
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeIn', delay: 0.3 }}
        tabIndex={-1}
        className="flex flex-col gap-[0.8rem] items-start w-full px-4 mb-[1.5rem]"
      >
        <ul className="flex flex-col gap-[1rem] items-start w-full">
          <li className="w-full ">
            <div className="inline-flex items-center justify-start gap-[1rem]">
              <ClockAlert className="size-[1.8rem] flex-shrink-0 text-susimdal-text-basic" />
              <p className="text-[1.2rem] mobile:text-[1.4rem] font-medium text-susimdal-text-bacis">
                매주
                <span className="text-[1.2rem] mobile:text-[1.4rem] font-semibold text-susimdal-text-primary">
                  {' '}
                  월요일
                </span>
                은 수심달 이정환 대표원장의
                <br />
                개념강의가 진행돼요.
              </p>
            </div>
          </li>
          <li className="w-full">
            <div className="inline-flex items-start justify-start gap-[1rem] ">
              <Calendar className="size-[1.8rem] flex-shrink-0 text-susimdal-text-basic" />
              <p className="text-[1.2rem] mobile:text-[1.4rem] font-medium text-susimdal-text-bacis">
                청강은
                <span className="text-[1.2rem] mobile:text-[1.4rem] font-semibold text-susimdal-text-primary">
                  {' '}
                  중1-1(17시-19시), 중2-1(19시-21시) 중 <br /> 1개 과정
                </span>
                만 참여 가능하며
                <br />
                해당 시간은{' '}
                <span className="text-[1.2rem] mobile:text-[1.4rem] font-semibold text-susimdal-text-primary">
                  무료체험 시간에 포함되지 않아요.
                </span>
              </p>
            </div>
          </li>
        </ul>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeIn', delay: 0.4 }}
        tabIndex={-1}
        className="flex flex-col gap-[0.3rem] justify-start items-center w-full"
      >
        <p className="text-[1.2rem] mobile:text-[1.3rem] font-medium leading-[1.2rem] text-susimdal-text-subtle">
          무료체험 시간과 개념강의 시간이 겹칠 경우, 청강 참여가 어려워요.
        </p>
        <p className="text-[1.2rem] mobile:text-[1.3rem] font-medium leading-[1.2rem] text-susimdal-text-subtle">
          자세한 참여 방법은 추후 선생님께서 안내해 주세요.
        </p>
      </motion.div>
    </DrawerTermLayout>
  );
};
