'use client';

import { useState } from 'react';
import { ko } from 'date-fns/locale';
import { motion } from 'framer-motion';

// shared
import {
  formatKoreanTitle,
  convertISOString,
  addDayToToday,
  getNextPossibleFreeTrialDate,
} from '@/shared/lib/date-fns/utls';
import { cn } from '@/shared/lib/utils';
import { Calendar } from '@/shared/components/atomics/calendar';
import { Button } from '@/shared/components/ui';

// entities
import { DayOfWeek, NormalizedDayOfWeek } from '@/entities/free-trial-user/models/enums';

// features
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';

// views
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

  /**
   * @description 이전 스케줄된 날짜 제외하고는 전부 disabled 처리
   */
  const scheduledDates = freeTrial.schedules.map((schedule) => schedule.dayOfWeek);
  const excludedFromScheduleDates = Object.entries(NormalizedDayOfWeek)
    .filter(([day, normalizedNumber]) => !scheduledDates.includes(day as DayOfWeek))
    .map(([_, normalizedNumber]) => Number(normalizedNumber));

  const isDateValid = date instanceof Date && !isNaN(date.getTime());

  /**
   * @description
   * 시작 가능한 날의 월을 default 로 설정하기
   */
  const tryPossibleStartDate = getNextPossibleFreeTrialDate(3);

  /**
   * @description
   * 만일 월요일을 클릭했을 시 이에 대해서 특강에 대한 약간의 설명을 진행
   */
  const subtitleText = '금일로부터 2~3일 이후 날짜를 선택해 주세요.';

  const buttonText = isDateValid ? `${formatKoreanTitle(new Date(date))} 시작합니다` : '다음';
  const titleText = isDateValid
    ? `${formatKoreanTitle(new Date(date))}\n첫 수업을 시작할게요`
    : '좋아요!\n첫 수업은 언제가 좋을까요?';

  return (
    <RegisterFreeTrialLayout title={titleText} subtitle={subtitleText} progressStep={4} totalSteps={9}>
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
            locale={ko}
            disabled={[{ dayOfWeek: excludedFromScheduleDates }, { before: addDayToToday(3) }]}
            showOutsideDays={false}
            isSelectedBookedDate={date?.getDay() === 1}
            defaultMonth={tryPossibleStartDate}
            modifiers={{
              booked: { dayOfWeek: [1] },
            }}
            modifiersClassNames={{
              booked: cn('[&>button]:text-susimdal-color-success [&>button]:font-semibold [&>button]:rounded-full'),
            }}
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
