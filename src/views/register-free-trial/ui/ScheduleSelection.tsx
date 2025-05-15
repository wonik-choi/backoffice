'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/shared/components/atomics/button';
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import { TimeSlot } from '@/features/register-free-trial/model/store/interface';
import RegisterFreeTrialLayout from '@/views/register-free-trial/ui/RegisterFreeTrialLayout';
import { cn } from '@/shared/lib/utils';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/shared/components/atomics/alert';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
const TIMES = Array.from({ length: 8 }, (_, i) => i + 16); // 4PM (16) to 11PM (23)

export function ScheduleSelection() {
  const { schedule, setSchedule, nextStep, prevStep } = useRegisterFreeTrialStore();
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>(schedule.selectedSlots || []);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<TimeSlot | null>(null);
  const [totalHours, setTotalHours] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);

  // Calculate total hours whenever selected slots change
  useEffect(() => {
    setTotalHours(selectedSlots.length);
    setIsLimitReached(selectedSlots.length >= 6);
  }, [selectedSlots]);

  const isSelected = (day: number, time: number) => {
    return selectedSlots.some((slot) => slot.day === day && slot.time === time);
  };

  const toggleSlot = (day: number, time: number) => {
    // If limit reached and trying to add more, don't allow
    if (isLimitReached && !isSelected(day, time)) {
      return;
    }

    if (isSelected(day, time)) {
      setSelectedSlots(selectedSlots.filter((slot) => !(slot.day === day && slot.time === time)));
    } else {
      setSelectedSlots([...selectedSlots, { day, time }]);
    }
  };

  const handleMouseDown = (day: number, time: number) => {
    setIsDragging(true);
    setDragStart({ day, time });
    toggleSlot(day, time);
  };

  const handleMouseEnter = (day: number, time: number) => {
    if (isDragging && dragStart) {
      // If we're already at the limit and trying to add more, don't allow
      if (isLimitReached && !isSelected(day, time)) {
        return;
      }

      // Simple implementation - just toggle the current cell
      toggleSlot(day, time);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  const handleSubmit = () => {
    setSchedule({ selectedSlots });
    nextStep();
  };

  // Add global mouse up handler
  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <RegisterFreeTrialLayout
      title="무료체험 시간은 언제인가요?"
      subtitle="원하시는 시간을 선택해주세요"
      onBack={prevStep}
      progressStep={2}
      totalSteps={5}
      actionButton={
        <Button
          onClick={handleSubmit}
          disabled={selectedSlots.length === 0}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          다음
        </Button>
      }
    >
      <div className="space-y-4">
        <Alert variant="default" className="bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-sm text-blue-700">
            최대 6시간까지 예약 가능합니다. 더 이상 추가할 수 없습니다. (현재: {totalHours}시간)
          </AlertDescription>
        </Alert>

        <div className="overflow-x-auto">
          <div className="min-w-max">
            <div className="grid grid-cols-8 gap-1">
              {/* Header row */}
              <div className="h-8"></div> {/* Empty corner cell */}
              {DAYS.map((day, i) => (
                <div key={day} className="flex h-8 items-center justify-center font-medium">
                  {day}
                </div>
              ))}
              {/* Time slots */}
              {TIMES.map((time) => (
                <React.Fragment key={time}>
                  <div className="flex h-10 items-center justify-center text-sm text-gray-500">{time}:00</div>
                  {Array.from({ length: 7 }, (_, day) => (
                    <button
                      key={`${day}-${time}`}
                      type="button"
                      className={cn(
                        'h-10 w-10 rounded-md transition-colors',
                        isSelected(day, time) ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-100 hover:bg-gray-200',
                        isLimitReached && !isSelected(day, time) && 'opacity-50 cursor-not-allowed'
                      )}
                      onMouseDown={() => handleMouseDown(day, time)}
                      onMouseEnter={() => handleMouseEnter(day, time)}
                      aria-label={`${DAYS[day]} ${time}시`}
                      disabled={isLimitReached && !isSelected(day, time)}
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RegisterFreeTrialLayout>
  );
}
