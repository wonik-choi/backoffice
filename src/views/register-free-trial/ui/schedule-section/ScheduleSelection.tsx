'use client';

import React, { useMemo } from 'react';
import { useForm } from '@tanstack/react-form';
import { motion } from 'framer-motion';

// shared

// entities
import { DayOfWeek } from '@/entities/free-trial-user/models/enums';

// features
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';

// views
import RegisterFreeTrialLayout from '@/views/register-free-trial/ui/RegisterFreeTrialLayout';
import { SubSectionLayout } from '@/views/register-free-trial/ui/schedule-section/SubSectionLayout';
import { schedulePageSchema, SchedulePageValues } from '@/views/register-free-trial/config/const/schema';
import { useDeterminUserSchedule } from '@/views/register-free-trial/services/useDeterminUserSchedule';
import { FREE_TRIAL_TIME_OPTIONS, DAY_OF_WEEK_FREE_TRIAL_OPTIONS } from '@/views/register-free-trial/config/const';

// components
import { Button } from '@/views/register-free-trial/ui/components/Button';
import { Badge } from '@/views/register-free-trial/ui/components/Badge';

export function ScheduleSelection() {
  const { freeTrial, setFreeTrialSchedule, nextStep, prevStep } = useRegisterFreeTrialStore();
  const {
    selectedWeekDays,
    setSelectedWeekDays,
    setSelectedStartTime,
    determineSchedule,
    filterDisabledStartTime,
    caculateLearningTime,
    convertHoursToHoursAndMinutes,
    mappingStartTimeHourToSchedule,
  } = useDeterminUserSchedule();

  const defaultValues: SchedulePageValues = {
    days: freeTrial.schedules?.map((s) => s.dayOfWeek) || [],
    startTime: freeTrial.schedules?.[0]?.startAt || '',
  };

  const form = useForm({
    defaultValues: defaultValues,
    onSubmit: async ({ value }) => {
      const schedule = determineSchedule(value.days, value.startTime);
      setFreeTrialSchedule(schedule);
      nextStep();
    },
    validators: { onChange: schedulePageSchema },
  });

  // 요일 선택 후 실행
  const learningTime = caculateLearningTime(selectedWeekDays);
  const learningTimeHoursAndMinutes = learningTime
    ? convertHoursToHoursAndMinutes(learningTime)
    : { hours: 0, minutes: 0 };
  const displayLearningTime =
    learningTimeHoursAndMinutes.hours > 0
      ? `선택하신 시각부터 ${learningTimeHoursAndMinutes.hours}시간 ${learningTimeHoursAndMinutes.minutes}분 동안 수업해요`
      : `요일을 2개 이상 4개 이하로 선택해주세요`;

  // 요일 선택 후 disabledTimes 생성
  const disabledTimes = new Set(filterDisabledStartTime(selectedWeekDays));

  /**
   * @description
   * 다중 요일을 form 에서 다루기 위해 직접 함수 생성
   * @param dow dayOfWeek
   */
  const toggleDayOfWeek = (dow: DayOfWeek) => {
    const current = form.getFieldValue('days');
    const next = current.includes(dow) ? current.filter((d) => d !== dow) : [...current, dow];
    form.setFieldValue('days', next);
    setSelectedWeekDays(next);
  };

  /**
   * @description
   * 시간 선택 후 field 업데이트
   */
  const toggleTime = (hour: number) => {
    const schedule = mappingStartTimeHourToSchedule(hour);
    form.setFieldValue('startTime', schedule);
    setSelectedStartTime(schedule);
  };

  const handleSubmit = () => {
    form.handleSubmit();
  };

  return (
    <RegisterFreeTrialLayout title={`수심달에서 공부할\n6시간을 설정해주세요`} progressStep={3} totalSteps={9}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-8 w-full h-full"
      >
        <div className="flex flex-1 flex-col justify-start items-start h-full relative">
          <motion.div
            className="w-full space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* 요일 선택 */}
            <SubSectionLayout title="요일 선택" delay={0.5}>
              <form.Field name="days">
                {(field) => {
                  return (
                    <div className="flex flex-wrap gap-[0.8rem]">
                      {DAY_OF_WEEK_FREE_TRIAL_OPTIONS.map((option) => (
                        <Badge
                          key={option.label}
                          badgeValue={option.badgeValue}
                          label={option.label}
                          selected={field.state.value.includes(option.badgeValue)}
                          onClick={() => toggleDayOfWeek(option.badgeValue)}
                        />
                      ))}
                    </div>
                  );
                }}
              </form.Field>
            </SubSectionLayout>
            <SubSectionLayout title="시간 선택" subTitle={displayLearningTime} delay={0.7}>
              <form.Field name="startTime">
                {(field) => {
                  return (
                    <div className="flex flex-wrap gap-[0.8rem]">
                      {FREE_TRIAL_TIME_OPTIONS.map((option) => (
                        <Badge
                          key={option.label}
                          label={option.label}
                          badgeValue={option.badgeValue}
                          selected={field.state.value.hour === option.badgeValue}
                          disabled={!disabledTimes.has(option.badgeValue)}
                          onClick={() => toggleTime(option.badgeValue)}
                        />
                      ))}
                    </div>
                  );
                }}
              </form.Field>
            </SubSectionLayout>
          </motion.div>

          {/* 이전/다음 버튼 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              pointerEvents: 'auto',
            }}
            transition={{ duration: 0.3, ease: 'easeIn', delay: 0.9 }}
            className="w-full mt-auto pt-6"
          >
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit]) => (
                <div className="flex justify-center gap-[0.8rem] w-full">
                  <Button variant="empty" type="button" onClick={prevStep} className="w-[7.8rem] ">
                    이전
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={
                      !freeTrial.startDate ||
                      !(form.getFieldValue('days').length >= 2 && form.getFieldValue('days').length <= 4) ||
                      !form.getFieldValue('startTime')
                    }
                  >
                    {'다음'}
                  </Button>
                </div>
              )}
            </form.Subscribe>
          </motion.div>
        </div>
      </form>
    </RegisterFreeTrialLayout>
  );
}
