import { useState } from 'react';

// entities
import { DayOfWeek } from '@/entities/free-trial-user/models/enums';

// features
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store/index';
import { FreeTrial } from '@/features/register-free-trial/config/schema';

import {
  MAX_FREE_TRIAL_TIME,
  FREE_TRIAL_TIMES,
  MAPPING_START_TIME_HOUR_TO_SCHEDULE,
} from '@/views/register-free-trial/config/const';

export const useDeterminUserSchedule = () => {
  const { freeTrial } = useRegisterFreeTrialStore();
  const [selectedWeekDays, setSelectedWeekDays] = useState<DayOfWeek[]>(
    freeTrial.schedules?.map((s) => s.dayOfWeek) || []
  );
  const [selectedStartTime, setSelectedStartTime] = useState<{ hour: number; minute: number }>(
    freeTrial.schedules?.[0]?.startAt || { hour: 4, minute: 0 }
  );

  // 하고 싶은것은
  // 선택된 요일에 따른 시간대 계산
  const caculateLearningTime = (weekDays: DayOfWeek[]) => {
    if (weekDays.length < 2 || weekDays.length > 4) return;

    return Number((MAX_FREE_TRIAL_TIME / weekDays.length).toFixed(1));
  };
  // 선정된 시간대에 따른 시작 시간 disabled 결정
  const filterDisabledStartTime = (weekDays: DayOfWeek[]) => {
    const runningTime = caculateLearningTime(weekDays) || 3;

    const maximumStartTime = FREE_TRIAL_TIMES[FREE_TRIAL_TIMES.length - 1] - runningTime;

    return FREE_TRIAL_TIMES.filter((time) => time <= maximumStartTime);
  };

  const convertHoursToHoursAndMinutes = (hours: number) => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return { hours: wholeHours, minutes };
  };

  const mappingStartTimeHourToSchedule = (hour: number) => {
    return MAPPING_START_TIME_HOUR_TO_SCHEDULE[hour as keyof typeof MAPPING_START_TIME_HOUR_TO_SCHEDULE];
  };

  // 선택된 요일을 기반으로 schedule 생성
  const determineSchedule = (
    weekDays: DayOfWeek[],
    selectedStartTime: { hour: number; minute: number }
  ): FreeTrial['schedules'] => {
    const startHour = selectedStartTime.hour;
    const startMinute = selectedStartTime.minute;
    const todayLearningTime = (caculateLearningTime(weekDays) || 3) * 60;

    return weekDays.map((day) => {
      return {
        dayOfWeek: day,
        startAt: {
          hour: startHour,
          minute: startMinute,
          timezone: 'Asia/Seoul',
        },
        todayLearningTime: todayLearningTime,
      };
    });
  };

  return {
    selectedWeekDays,
    setSelectedWeekDays,
    selectedStartTime,
    setSelectedStartTime,
    determineSchedule,
    filterDisabledStartTime,
    caculateLearningTime,
    convertHoursToHoursAndMinutes,
    mappingStartTimeHourToSchedule,
  };
};
