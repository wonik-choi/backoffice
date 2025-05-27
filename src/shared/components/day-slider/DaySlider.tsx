'use client';

import { useState } from 'react';

import * as Slider from '@radix-ui/react-slider';

import { cn } from '@/shared/lib/utils';
import { motion } from 'framer-motion';
import { Badge } from '../atomics/badge';

interface DaySliderProps extends React.ComponentProps<typeof Slider.Root> {
  timeRange: number[];
  emitSelectedDays: (days: number[]) => void;
}

export const DaySlider = ({
  defaultValue,
  step,
  minStepsBetweenThumbs,
  min,
  max,
  timeRange,
  emitSelectedDays,
  ...props
}: DaySliderProps) => {
  /**
   * @description
   * range 로 관리될 수치는 leaningTime 과 같으니, minute 단위로 설정될 예정
   * 이를 실제 표시 자체를 '00:00' 형식으로 제공할 예정
   */
  const [selectedValue, setSelectedValue] = useState<number[]>(defaultValue || []);

  /**
   * @description
   * 전달되는 분값을 시간 형식으로 변환
   * 간단해서 따로 useMemo는 하지 않음
   * @param value 전달되는 분값
   * @param startHour 시작시간
   */
  const convertToDisplayTime = (value: number, startHour: number) => {
    const hour = Math.floor(value / 60);
    const minute = value % 60;

    return `${startHour + hour}시`;
    // return `${startHour + hour}:${minute.toString().padStart(2, '0')}`;
  };

  const handleValueChange = (value: number[]) => {
    setSelectedValue(value);
    emitSelectedDays(value);
  };

  return (
    <div className="w-full">
      <Slider.Root
        value={selectedValue}
        step={step}
        max={max}
        min={min}
        minStepsBetweenThumbs={minStepsBetweenThumbs}
        onValueChange={handleValueChange}
        {...props}
        className="relative flex w-full touch-none select-none items-center"
      >
        <Slider.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
          <Slider.Range className="absolute h-full bg-susimdal-button-primary-fill" />
        </Slider.Track>
        {Array.from({ length: selectedValue?.length || 0 }, (_, index) => (
          <Slider.Thumb
            key={index}
            className="block size-[1.8rem] mobile:size-[2.3rem] rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            {/* <Badge className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 -top-4">
              {convertToDisplayTime(selectedValue?.[index] || 0, 4)}
            </Badge> */}
          </Slider.Thumb>
        ))}
      </Slider.Root>
      <div className="mt-[1rem] -mx-1.5 flex items-center justify-between text-[1rem]">
        {timeRange.map((time) => {
          return (
            <motion.span
              animate={{ scale: selectedValue && selectedValue.includes(time) ? 1.1 : 1 }}
              transition={{ type: 'spring', duration: 0.2, bounce: 0.5 }}
              key={time}
              className={cn(
                'text-susimdal-text-subtle',
                selectedValue && selectedValue.includes(time) && 'text-susimdal-text-basic'
              )}
            >
              {convertToDisplayTime(time, 4)}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
};
