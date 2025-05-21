'use client';

import { useState } from 'react';
import { enUS } from 'date-fns/locale';
import { motion } from 'framer-motion';

// shared
import { formatKoreanTitle, convertISOString, addDayToToday } from '@/shared/lib/date-fns/utls';
import { Calendar } from '@/shared/components/atomics/calendar';

// features
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';

// views
import { Button } from '@/views/register-free-trial/ui/components/Button';

import RegisterFreeTrialLayout from '@/views/register-free-trial/ui/RegisterFreeTrialLayout';

export function StartDateSelection() {
  const { freeTrial, setFreeTrialStartDate, nextStep, prevStep } = useRegisterFreeTrialStore();
  const [date, setDate] = useState<Date | undefined>(freeTrial.startDate ? new Date(freeTrial.startDate) : undefined);

  const handleSubmit = () => {
    if (date) {
      setFreeTrialStartDate(convertISOString(new Date(date)));
      nextStep();
    }
  };

  const isDateValid = date instanceof Date && !isNaN(date.getTime());

  const buttonText = isDateValid ? `${formatKoreanTitle(new Date(date))}날 시작합니다` : '다음';
  const titleText = isDateValid
    ? `${formatKoreanTitle(new Date(date))}날\n첫 수업을 시작할게요`
    : '좋아요!\n첫 수업은 언제가 좋을까요?';

  return (
    <RegisterFreeTrialLayout
      title={titleText}
      subtitle="원할한 수업 준비를 위해 오늘로부터 2~3일 이후 날짜를 선택해 주세요."
      progressStep={2}
      totalSteps={9}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        tabIndex={-1}
        className="flex flex-1 flex-col w-full h-full justify-between  relative overflow-hidden"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            pointerEvents: 'auto',
          }}
          transition={{ duration: 0.3, ease: 'easeIn', delay: 0.4 }}
          className="w-full"
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate as (date?: Date) => void}
            locale={enUS}
            disabled={[{ dayOfWeek: [0, 6] }, { before: addDayToToday(3) }]}
            className="rounded-md w-full max-w-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            pointerEvents: 'auto',
          }}
          transition={{ duration: 0.3, ease: 'easeIn', delay: 0.7 }}
          className="flex justify-center gap-[0.8rem] w-full"
        >
          <Button variant="empty" type="button" onClick={prevStep} className="w-[7.8rem] ">
            이전
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={!isDateValid}>
            {buttonText}
          </Button>
        </motion.div>
      </motion.div>
    </RegisterFreeTrialLayout>
  );
}
