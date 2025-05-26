import { useMemo, useState } from 'react';

// entities
import { DayOfWeek } from '@/entities/free-trial-user/models/enums';

// features
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store/index';
import { FreeTrial } from '@/features/register-free-trial/config/schema';

import {
  MAX_FREE_TRIAL_TIME,
  FREE_TRIAL_TIME_RANGE,
  DAY_OF_WEEK_FREE_TRIAL_OPTIONS,
} from '@/views/register-free-trial/config/const';

export const useDeterminUserSchedule = () => {
  const { freeTrial } = useRegisterFreeTrialStore();
  /**
   * @description 선택된 요일과 시간 스케줄을 이전 데이터가 있으면 적용시킵니다.
   */
  const [selectedWeekDays, setSelectedWeekDays] = useState<DayOfWeek[]>(
    freeTrial.schedules?.map((s) => s.dayOfWeek) || []
  );
  const [selectedTimes, setSelectedTimes] = useState<FreeTrial['schedules']>(
    freeTrial.schedules.map((schedule) => ({
      dayOfWeek: schedule.dayOfWeek,
      startAt: schedule.startAt,
      todayLearningTime: schedule.todayLearningTime,
    })) || []
  );

  /**
   * @description 무료체험 시간 범위
   */
  const timeRange = useMemo(() => {
    return FREE_TRIAL_TIME_RANGE;
  }, []);

  /**
   * @description props 로 전달될 default selectedTime
   */
  const defaultSelectedTime = useMemo(
    () => (day: DayOfWeek) => {
      const defaultTime = selectedTimes.find((schedule) => schedule.dayOfWeek === day);
      if (!defaultTime) return [0, 90];

      const defaultStartTime = defaultTime.startAt.hour * 60 + defaultTime.startAt.minute - 240; // 4시간 뺴주기
      const defaultEndTime = defaultStartTime + defaultTime.todayLearningTime;

      return [defaultStartTime, defaultEndTime];
    },
    [selectedTimes]
  );

  /**
   * @description 선택된 요일이 4개 이상일 경우 나머지 요일을 disabled 처리
   */
  const disabledDays = useMemo(() => {
    if (selectedWeekDays.length >= 4) {
      return DAY_OF_WEEK_FREE_TRIAL_OPTIONS.filter((day) => !selectedWeekDays.includes(day.badgeValue)).map(
        (day) => day.badgeValue
      );
    }
    return [];
  }, [selectedWeekDays]);

  /**
   * @description
   * 날짜 스케줄 설정 시 해당 부분 생성하기
   */
  const createScheduleTimes = (weekDay: DayOfWeek, times: number[], startHour: number = 4) => {
    // 전달받은 숫자는 30분 단위로 결정난 숫자이며, 이를 통해 시작날짜와 끝 날짜를 정하기 위함.
    if (times.length !== 2) return;

    const selectedStartTimeHour = Math.floor(times[0] / 60) + startHour;
    const selectedStartTimeMinute = times[0] % 60;
    const selectedLearningTime = times[1] - times[0]; // 분 단위;

    const timeScheduleAtWeekDay = {
      dayOfWeek: weekDay,
      startAt: {
        hour: selectedStartTimeHour,
        minute: selectedStartTimeMinute,
        timezone: 'Asia/Seoul',
      },
      todayLearningTime: selectedLearningTime,
    };

    return timeScheduleAtWeekDay;
  };

  /**
   * @description
   * 선택된 요일 스케줄 리스트 업데이트하기
   */
  const updateScheduleTimes = (weekDay: DayOfWeek, times: number[]) => {
    if (times.length !== 2) return;

    const newScheduleTime = createScheduleTimes(weekDay, times);

    if (!newScheduleTime) return;

    setSelectedTimes((prev) => {
      const restScheduleTimes = prev.filter((schedule) => schedule.dayOfWeek !== newScheduleTime?.dayOfWeek);

      return [...restScheduleTimes, newScheduleTime];
    });
  };

  /**
   * @description
   * 요일 선택, 헤제 하기
   */
  const toggleDayOfWeek = (weekDay: DayOfWeek) => {
    // 해당 요일이 선택되어 있다면
    if (selectedWeekDays.includes(weekDay)) {
      setSelectedWeekDays((prev) => prev.filter((day) => day !== weekDay));
      // 해당 요일에 해당하는 시간 스케줄 제거
      setSelectedTimes((prev) => prev.filter((schedule) => schedule.dayOfWeek !== weekDay));
    } else {
      setSelectedWeekDays((prev) => [...prev, weekDay]);
      // 해당 요일에 해당하는 시간 스케줄 추가
      const newScheduleTime = createScheduleTimes(weekDay, [0, 90]);

      if (!newScheduleTime) return;

      setSelectedTimes((prev) => [...prev, newScheduleTime]);
    }
  };

  // 선택된 요일에 따른 시간대 계산
  const caculateTotalLearningTime = () => {
    // 현재까지 선택된 시간대 총 합
    const totalLearningTime = selectedTimes.reduce((acc, curr) => acc + curr.todayLearningTime, 0);

    return totalLearningTime;
  };

  // 선택된 총 시간 텍스트 변환
  const convertTotalLearningTimeToText = () => {
    const totalLearningTime = caculateTotalLearningTime();

    const convertGapToHour = Math.floor(totalLearningTime / 60);
    const convertGapToMinute = totalLearningTime % 60;

    return `총 ${convertGapToHour}시간 ${convertGapToMinute}분 선택하셨습니다`;
  };

  // 계산된 시간에 따라 제한시간과의 차이점 계산
  const calculateDailyTimeGap = () => {
    const dailyTimeGapInMinutes = MAX_FREE_TRIAL_TIME * 60 - caculateTotalLearningTime();

    if (dailyTimeGapInMinutes === 0) return { hours: 0, minutes: 0 };

    const convertGapToHour = Math.floor(dailyTimeGapInMinutes / 60);
    const convertGapToMinute = dailyTimeGapInMinutes % 60;

    return { hours: convertGapToHour, minutes: convertGapToMinute };
  };

  return {
    selectedWeekDays,
    timeRange,
    setSelectedWeekDays,
    selectedTimes,
    disabledDays,
    defaultSelectedTime,
    updateScheduleTimes,
    toggleDayOfWeek,
    calculateDailyTimeGap,
    convertTotalLearningTimeToText,
  };
};
