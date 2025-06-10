'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';

// shared
import { Button } from '@/shared/components/ui';
import { Badge } from '@/shared/components/ui/views/Badge';

// entities
import { DayOfWeek, NormalizedDayOfWeek } from '@/entities/free-trial-user/models/enums';
import { freeTrialSchemaInStore } from '@/features/register-free-trial/config/schema';

// features
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';

// views
import RegisterFreeTrialLayout from '@/views/register-free-trial/ui/RegisterFreeTrialLayout';
import { DetailSpecialCourseSchedule } from '@/views/register-free-trial/ui/promotion/DetailSpecialCourseSchedule';
import { ScheduleTimeInDay } from '@/views/register-free-trial/ui/schedule-section/ScheduleTimeInDay';
import { SubSectionLayout } from '@/views/register-free-trial/ui/schedule-section/SubSectionLayout';
import { useDeterminUserSchedule } from '@/views/register-free-trial/services/useDeterminUserSchedule';
import { DAY_OF_WEEK_FREE_TRIAL_OPTIONS } from '@/views/register-free-trial/config/const';
import { StepProps } from '@/views/register-free-trial/model/interface';

const schedulePageSchema = freeTrialSchemaInStore.pick({
  schedules: true,
});

export function ScheduleSelection({ currentStep, totalSteps }: StepProps) {
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const {
    freeTrial,
    isFirstMountDetailSpecialCourseSchedule,
    setFreeTrialSchedule,
    nextStep,
    prevStep,
    setFirstMountDetailSpecialCourse,
  } = useRegisterFreeTrialStore();
  const {
    selectedWeekDays,
    selectedTimes,
    timeRange,
    disabledDays,
    defaultSelectedTime,
    calculateDailyTimeGap,
    updateScheduleTimes,
    toggleDayOfWeek,
    convertTotalLearningTimeToText,
    resetScheduleTimes,
  } = useDeterminUserSchedule();

  /**
   * @description
   * 선택된 요일에 따른 시간 텍스트 및 시간 설정 창 렌더링 여부
   */
  const isShowTimeSetting = selectedWeekDays.length > 1;
  const currentTimeSettingMessage = convertTotalLearningTimeToText();

  /**
   * @description
   * 버튼 텍스트 조건부 변화
   */
  const buttonText =
    selectedWeekDays.length < 2 || selectedWeekDays.length > 4
      ? '2일 이상 선택해주세요'
      : calculateDailyTimeGap().hours < 0
      ? '최대 6시간을 넘지 말아주세요'
      : '다음';
  /**
   * @description
   * 다중 요일을 form 에서 다루기 위해 직접 함수 생성
   * @param dow dayOfWeek
   */
  const toggleWeekDay = (dow: DayOfWeek) => {
    toggleDayOfWeek(dow);
  };

  const handleSubmit = () => {
    // 시간 + 12
    console.log('before', selectedTimes);
    const updatedSelectedTimes = selectedTimes.map((time) => {
      return {
        ...time,
        startAt: {
          ...time.startAt,
          hour: time.startAt.hour + 12,
        },
      };
    });

    console.log('after', updatedSelectedTimes);

    // 스키마 검증
    const validatedSchedule = schedulePageSchema.safeParse({ schedules: updatedSelectedTimes });

    if (!validatedSchedule.success) {
      toast.error('시간 설정이 올바르지 않습니다');
      return;
    }

    setFreeTrialSchedule(validatedSchedule.data.schedules);

    nextStep();
  };

  useEffect(() => {
    if (isFirstMountDetailSpecialCourseSchedule) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1500);
      }).then(() => {
        setIsDetailDrawerOpen(true);
        setFirstMountDetailSpecialCourse(false);
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      resetScheduleTimes();
    };
  }, []);

  return (
    <RegisterFreeTrialLayout
      title={`수심달에서 공부할\n6시간을 설정해주세요`}
      eventName={'상세폼진입-스케줄설정'}
      progressStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="flex flex-1 flex-col justify-start items-start h-full relative space-y-8">
        <motion.div
          className="w-full space-y-8 scrollbar-hide pb-[18rem]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* 요일 선택 */}
          <SubSectionLayout
            title="요일 선택"
            subTitle={isShowTimeSetting ? '요일을 선택해주세요' : '최소 2개 이상의 요일을 선택해주셔야 합니다'}
            delay={0.5}
          >
            <div className="flex flex-wrap gap-[0.8rem]">
              {DAY_OF_WEEK_FREE_TRIAL_OPTIONS.map((option) => (
                <Badge
                  key={option.label}
                  badgeValue={option.badgeValue}
                  label={option.label}
                  selected={selectedWeekDays.includes(option.badgeValue)}
                  disabled={disabledDays.includes(option.badgeValue)}
                  onClick={() => toggleWeekDay(option.badgeValue)}
                />
              ))}
            </div>
          </SubSectionLayout>
          <AnimatePresence>
            {isShowTimeSetting && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <SubSectionLayout
                  title="시간 선택"
                  subTitle={currentTimeSettingMessage}
                  delay={0.2}
                  settingCorrectLearningTime={calculateDailyTimeGap().hours < 0}
                >
                  <div className="w-full flex-1 overflow-y-auto">
                    <div className="flex flex-wrap gap-[0.8rem]">
                      <AnimatePresence mode="popLayout">
                        {selectedWeekDays
                          .sort((a, b) => NormalizedDayOfWeek[a] - NormalizedDayOfWeek[b])
                          .map((day) => (
                            <ScheduleTimeInDay
                              key={day}
                              dayOfWeek={day}
                              timeRange={timeRange}
                              selectedTime={defaultSelectedTime(day)}
                              emitSelectedDays={updateScheduleTimes}
                            />
                          ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </SubSectionLayout>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 이전/다음 버튼 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            pointerEvents: 'auto',
          }}
          transition={{ duration: 0.3, ease: 'easeIn', delay: 0.9 }}
          className="w-full mt-auto"
        >
          <div className="fixed inset-x-0 mx-auto bottom-0 max-w-[41rem] left-0 flex flex-shrink-0 flex-col px-[2rem] form:px-0 w-full items-center h-fit ">
            <div className="h-[3rem] w-full bg-gradient-to-t from-white via-white/95 to-transparent" />
            <motion.p
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', duration: 0.1, bounce: 5 }}
              className="text-[1.2rem] text-center mobile:text-[1.5rem] text-susimdal-text-subtle font-normal active:text-susimdal-text-disabled-on w-full pb-[1rem] bg-white"
              onClick={() => setIsDetailDrawerOpen(true)}
            >
              청강 이벤트 안내
            </motion.p>
            <div className="flex justify-center gap-[0.8rem] w-full bg-white pb-[4rem]">
              <Button variant="empty" type="button" onClick={prevStep} className="w-[7.8rem] ">
                이전
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={
                  selectedWeekDays.length < 2 || selectedWeekDays.length > 4 || calculateDailyTimeGap().hours < 0
                }
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
      <DetailSpecialCourseSchedule
        openState={isDetailDrawerOpen}
        setOpenState={setIsDetailDrawerOpen}
        agreeTerms={() => {}}
      />
    </RegisterFreeTrialLayout>
  );
}
