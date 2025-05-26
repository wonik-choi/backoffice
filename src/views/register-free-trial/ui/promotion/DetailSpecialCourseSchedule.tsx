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
      title={'수심달 이정환 대표원장 직강 수업을\n집에서 청강할 수 있는 기회!'}
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
        <div className="relative  w-[20rem] h-[16rem] mobile:w-[25rem] mobile:h-[20rem]">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
            className="
                absolute inset-0
                bg-gradient-to-tr from-pink-300 via-transparent to-purple-300
                filter blur-xl opacity-30
                "
          />
          <Image
            src="/images/susimdal-ceo-profile.png"
            alt="ceo-profile"
            fill={true}
            quality={100}
            style={{ objectFit: 'cover' }}
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
                  월요일 오후 5시에서 9시
                </span>
                까지 오프라인 특강이 진행되며, 해당 시간은
                <span className="text-[1.2rem] mobile:text-[1.4rem] font-semibold text-susimdal-text-primary">
                  {' '}
                  무료체험 시간에 포함되지 않아요!
                </span>
              </p>
            </div>
          </li>
          <li className="w-full">
            <div className="inline-flex items-center justify-start gap-[1rem]">
              <MonitorCog className="size-[1.8rem] flex-shrink-0 text-susimdal-text-basic" />
              <p className="text-[1.2rem] mobile:text-[1.4rem] font-medium text-susimdal-text-bacis">
                <span className="text-[1.2rem] mobile:text-[1.4rem] font-semibold text-susimdal-text-primary">
                  클래스인(ClassIn)
                </span>
                에서 청강하실 수 있어, 미리 설치가 필요합니다.
              </p>
            </div>
          </li>
          <li className="w-full">
            <div className="inline-flex items-start justify-start gap-[1rem] ">
              <Calendar className="size-[1.8rem] flex-shrink-0 text-susimdal-text-basic" />
              <p className="text-[1.2rem] mobile:text-[1.4rem] font-medium text-susimdal-text-bacis">
                청강은 오후 5시 - 7시, 7시 - 9시 두 시간 중
                <span className="text-[1.2rem] mobile:text-[1.4rem] font-semibold text-susimdal-text-primary">
                  {' '}
                  한번
                </span>
                만 참여 가능합니다.
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
        <p className="text-[1rem] mobile:text-[1.2rem] font-medium text-susimdal-button-primary-fill">
          무료체험 시간과 특강 체험시간이 겹칠 경우 특강 참여가 어렵습니다.
        </p>
        <p className="text-[1rem] mobile:text-[1.2rem] font-medium text-susimdal-button-primary-fill">
          자세한 가이드는 추후 학습 가이드에서 안내해 드립니다.
        </p>
      </motion.div>
    </DrawerTermLayout>
  );
};
