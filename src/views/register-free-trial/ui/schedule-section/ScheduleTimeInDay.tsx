'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

// shared
import { DaySlider } from '@/shared/components/day-slider/DaySlider';

// entities
import { DayOfWeek } from '@/entities/free-trial-user/models/enums';

import { DAY_OF_WEEK_FREE_TRIAL_OPTIONS } from '@/views/register-free-trial/config/const';

interface ScheduleTimeInDayProps {
  dayOfWeek: DayOfWeek;
  timeRange: number[];
  selectedTime: number[];

  emitSelectedDays: (dayOfWeek: DayOfWeek, day: number[]) => void;
}

export const ScheduleTimeInDay = ({ dayOfWeek, timeRange, selectedTime, emitSelectedDays }: ScheduleTimeInDayProps) => {
  const [selectedDays, setSelectedDays] = useState<string>('');

  const dayOfWeekText = useMemo(
    () => DAY_OF_WEEK_FREE_TRIAL_OPTIONS.find((option) => option.badgeValue === dayOfWeek)?.label,
    [dayOfWeek]
  );

  /**
   * @description 선택된 날짜를 시간 형식으로 변환하여 보여주기 위해 확장
   */
  const convertToDisplayDay = (day: number, startHour: number) => {
    const hour = Math.floor(day / 60);
    const minute = day % 60;

    return `${startHour + hour}시 ${minute}분`;
  };

  /**
   * @description 전달받은 times 를 text 변환
   */
  const convertToDisplayTime = (days: number[]) => {
    if (days.length !== 2) return;

    const startDayText = convertToDisplayDay(days[0], 4);
    const endDayText = convertToDisplayDay(days[1], 4);
    return `${startDayText} - ${endDayText}`;
  };

  /**
   * @description 선택된 날짜에 한하여 사용자에게 해당 날짜 텍스트를 변환하여 보여주기 위해 확장
   */
  const handleSelectedDayRange = (days: number[]) => {
    if (days.length !== 2) return;

    const startDayText = convertToDisplayDay(days[0], 4);
    const endDayText = convertToDisplayDay(days[1], 4);
    const displayDayText = `${startDayText} - ${endDayText}`;

    // 선택된 날짜를 업데이트 하고 이후 daySlider 에 callback 전달
    setSelectedDays(displayDayText);
    emitSelectedDays(dayOfWeek, days);
  };

  const timeScheduleText = selectedDays ? selectedDays : convertToDisplayTime(selectedTime);

  return (
    <motion.div
      initial={{ opacity: 0, x: 10, scale: 0.95 }} // 초기 상태
      animate={{ opacity: 1, x: 0, scale: 1 }} // 등장 시 상태
      exit={{ opacity: 0, x: -10, scale: 0.95 }} // 사라질 때 상태
      transition={{
        // 트랜지션 설정
        duration: 0.2,
        ease: 'easeInOut',
      }}
      layout
      className="flex flex-col justify-start items-start gap-[2.3rem] py-[1.2rem] w-full border border-susimdal-border-gray-light rounded-[1.2rem]"
    >
      <div className="flex justify-between shrink-0 items-start gap-[1rem] w-full px-[1.2rem]">
        <p className="text-[1.8rem] font-semibold text-susimdal-text-basic">{dayOfWeekText}</p>
        <p className="text-[1.4rem] font-medium text-susimdal-text-subtle">{timeScheduleText}</p>
      </div>
      <div className="flex-1 w-full px-[1rem]">
        <DaySlider
          timeRange={timeRange}
          emitSelectedDays={handleSelectedDayRange}
          defaultValue={selectedTime}
          step={30}
          minStepsBetweenThumbs={3}
          min={0}
          max={420}
        />
      </div>
    </motion.div>
  );
};
