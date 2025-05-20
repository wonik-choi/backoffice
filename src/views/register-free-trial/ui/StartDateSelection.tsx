'use client';

import { useState } from 'react';
import { ko, enUS } from 'date-fns/locale';
import { motion } from 'framer-motion';

// shared
import { formatKoreanTitle, convertQuery } from '@/shared/lib/date-fns/utls';

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
      setFreeTrialStartDate(convertQuery(new Date(date)));
      nextStep();
    }
  };

  const isDateValid = date instanceof Date && !isNaN(date.getTime());

  const buttonText = isDateValid ? `${formatKoreanTitle(new Date(date))}날 시작합니다` : '다음';
  const titleText = isDateValid
    ? `${formatKoreanTitle(new Date(date))}날\n첫 수업을 시작합니다`
    : '좋아요!\n첫 수업은 언제가 좋을까요?';

  return (
    <RegisterFreeTrialLayout title={titleText} progressStep={2} totalSteps={8}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        tabIndex={-1}
        className="flex flex-1 flex-col w-full h-full justify-between  relative overflow-hidden"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate as (date?: Date) => void}
          locale={enUS}
          className="rounded-md w-full max-w-full"
        />
        <div className="flex justify-center gap-[0.8rem] w-full">
          <Button variant="empty" type="button" onClick={prevStep} className="w-[7.8rem] ">
            이전
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={!isDateValid}>
            {buttonText}
          </Button>
        </div>
      </motion.div>
    </RegisterFreeTrialLayout>
  );
}
