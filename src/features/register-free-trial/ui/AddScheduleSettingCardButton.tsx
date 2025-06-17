'use client';

import { Plus } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { useCallback, useMemo, useState, useEffect } from 'react';

// shared
import { cn } from '@/shared/lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atomics/select';
import { Label } from '@/shared/components/atomics/label';
import { dayOptions, hourOptions, minuteOptions } from '@/features/register-free-trial/config/const';
import { DayOfWeek } from '@/entities/free-trial-user/models/enums';

const addScheduleSettingCardButtonVariants = cva(
  'w-full flex justify-center items-center rounded-[0.8rem] p-[1rem] active:bg-susimdal-border-gray-darker hover:bg-susimdal-border-gray-light hover:shadow-md bg-white border border-susimdal-border-gray-light',
  {
    variants: {
      disabled: {
        true: 'cursor-not-allowed bg-susimdal-border-gray active:none border-susimdal-border-gray',
        false:
          'cursor-pointer active:bg-susimdal-border-gray-darker  hover:bg-susimdal-border-gray-light hover:shadow-md bg-white border border-susimdal-border-gray-light',
      },
    },
  }
);

/**
 * AddScheduleSettingCardButton
 */
export const AddScheduleSettingCardButton = ({ onClick, disabled }: { onClick: () => void; disabled: boolean }) => {
  const addScheduleSettingCard = useCallback(() => {
    if (disabled) return;
    onClick();
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(addScheduleSettingCardButtonVariants({ disabled }))}
      onClick={addScheduleSettingCard}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          addScheduleSettingCard();
        }
      }}
    >
      <Plus />
    </div>
  );
};

interface AddScheduleSettingCardProps {
  name: string;
  dayOfWeek?: DayOfWeek;
  startAt?: {
    hour: number;
    minute: number;
    timezone: string;
  };
  todayLearningTime?: number;
  onChangeStartAt: (time: { hour: number; minute: number; timezone: string }) => void;
  onChangeTodayLearningTime: (time: number) => void;
  onChangeDayOfWeek: (dayOfWeek: DayOfWeek) => void;
  onDeleteSchedule: () => void;
}

/**
 * AddScheduleSettingCard
 */
export const AddScheduleSettingCard = ({
  name,
  dayOfWeek,
  startAt,
  todayLearningTime = 90,
  onChangeStartAt,
  onChangeTodayLearningTime,
  onChangeDayOfWeek,
  onDeleteSchedule,
}: AddScheduleSettingCardProps) => {
  const [innerStartAt, setInnerStartAt] = useState({
    hour: startAt?.hour ?? 16,
    minute: startAt?.minute ?? 0,
    timezone: startAt?.timezone ?? 'Asia/Seoul',
  });

  const [innerEndAt, setInnerEndAt] = useState({
    hour: innerStartAt?.hour + Math.floor(todayLearningTime / 60),
    minute: innerStartAt?.minute + (todayLearningTime % 60),
    timezone: startAt?.timezone ?? 'Asia/Seoul',
  });

  const handleChangeStartAt = useCallback(
    (name: string) => (value: string) => {
      const innerValue = {
        ...innerStartAt,
        [name]: parseInt(value),
      };

      const todayLearningTime = (innerEndAt.hour - innerValue.hour) * 60 + (innerEndAt.minute - innerValue.minute);

      setInnerStartAt(innerValue);
      onChangeStartAt(innerValue);
      onChangeTodayLearningTime(todayLearningTime);
    },
    [innerStartAt, innerEndAt]
  );

  const handleChangeEndAt = useCallback(
    (name: string) => (value: string) => {
      const innerValue = {
        ...innerEndAt,
        [name]: parseInt(value),
      };

      const todayLearningTime = (innerValue.hour - innerStartAt.hour) * 60 + (innerValue.minute - innerStartAt.minute);

      setInnerEndAt(innerValue);
      onChangeTodayLearningTime(todayLearningTime);
    },
    [innerEndAt, innerStartAt]
  );

  return (
    <div className="grid grid-cols-4 items-center gap-[0.8rem] w-full">
      <div className="flex h-full flex-col justify-between items-start gap-[0.5rem] pt-[1rem]">
        <Label htmlFor={name}>개별요일</Label>
        <div
          className="w-full flex justify-center items-center py-[0.5rem] bg-white border border-susimdal-border-primary rounded-[0.4rem] cursor-pointer hover:bg-susimdal-border-primary/50 transition-all duration-200"
          onClick={onDeleteSchedule}
        >
          <span className="text-[1.2rem] font-medium text-susimdal-text-primary">삭제</span>
        </div>
      </div>
      <div className="col-span-3 flex flex-col justify-start items-start gap-[0.5rem]">
        <Select onValueChange={(value) => onChangeDayOfWeek(value as DayOfWeek)} defaultValue={dayOfWeek}>
          <SelectTrigger className="col-span-3 w-full">
            <SelectValue placeholder="요일 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {dayOptions.map((option) => {
                return (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="w-full flex justify-between items-center gap-[0.5rem]">
          <div className="flex justify-center items-center gap-[0.3rem]">
            <Select
              value={String(innerStartAt.hour)}
              onValueChange={handleChangeStartAt('hour')}
              defaultValue={String(innerStartAt.hour)}
            >
              <SelectTrigger>
                <SelectValue placeholder="시간(hour)" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {hourOptions.map((option) => {
                    return (
                      <SelectItem key={option.value} value={String(option.value)}>
                        {option.label}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              value={String(innerStartAt.minute)}
              onValueChange={handleChangeStartAt('minute')}
              defaultValue={String(innerStartAt.minute)}
            >
              <SelectTrigger>
                <SelectValue placeholder="분(minute)" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {minuteOptions.map((option) => {
                    return (
                      <SelectItem key={option.value} value={String(option.value)}>
                        {option.label}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <span>~</span>
          <div className="flex justify-center items-center gap-[0.3rem]">
            <Select
              value={String(innerEndAt.hour)}
              onValueChange={handleChangeEndAt('hour')}
              defaultValue={String(innerEndAt.hour)}
            >
              <SelectTrigger>
                <SelectValue placeholder="시간(hour)" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {hourOptions.map((option) => {
                    return (
                      <SelectItem key={option.value} value={String(option.value)}>
                        {option.label}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              value={String(innerEndAt.minute)}
              onValueChange={handleChangeEndAt('minute')}
              defaultValue={String(innerEndAt.minute)}
            >
              <SelectTrigger>
                <SelectValue placeholder="분(minute)" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {minuteOptions.map((option) => {
                    return (
                      <SelectItem key={option.value} value={String(option.value)}>
                        {option.label}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface ScheduleSettingCardProps {
  children: React.ReactNode;
}

type SSC = React.FC<ScheduleSettingCardProps> & {
  Button: typeof AddScheduleSettingCardButton;
  Card: typeof AddScheduleSettingCard;
};

const ScheduleSettingCard: SSC = ({ children }) => {
  return <div className="w-full flex flex-col justify-start items-start gap-[0.8rem]">{children}</div>;
};

ScheduleSettingCard.Button = AddScheduleSettingCardButton;
ScheduleSettingCard.Card = AddScheduleSettingCard;

export default ScheduleSettingCard;
