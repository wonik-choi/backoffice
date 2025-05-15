'use client';

import { useState } from 'react';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import { Button } from '@/shared/components/atomics/button';
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import RegisterFreeTrialLayout from '@/views/register-free-trial/ui/RegisterFreeTrialLayout';
import { Calendar } from '@/shared/components/atomics/calendar';

export function StartDateSelection() {
  const { startDate, setStartDate, nextStep, prevStep } = useRegisterFreeTrialStore();
  const [date, setDate] = useState<Date | undefined>(startDate || undefined);

  const handleSubmit = () => {
    if (date) {
      setStartDate(date);
      nextStep();
    }
  };

  const buttonText = date ? `${format(date, 'yyyy년 MM월 dd일')} 선택됨` : '다음';

  return (
    <RegisterFreeTrialLayout
      title="무료체험 날짜를 알려주세요"
      onBack={prevStep}
      progressStep={2}
      totalSteps={5}
      actionButton={
        <Button onClick={handleSubmit} disabled={!date} className="w-full bg-blue-500 hover:bg-blue-600 py-6">
          {buttonText}
        </Button>
      }
    >
      <div className="flex justify-center w-full">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate as (date?: Date) => void}
          locale={ko}
          className="rounded-md border w-full max-w-full"
          classNames={{
            month: 'space-y-4 w-full',
            table: 'w-full border-collapse',
            head_row: 'flex w-full',
            head_cell: 'text-muted-foreground rounded-md w-full font-normal text-sm',
            row: 'flex w-full mt-2',
            cell: 'text-center text-sm relative p-0 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 h-10 w-full',
            day: 'h-10 w-full p-0 font-normal aria-selected:opacity-100 rounded-md',
            day_selected:
              'bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-500 focus:text-white',
            day_today: 'bg-accent text-accent-foreground',
            day_outside: 'text-muted-foreground opacity-50',
            day_disabled: 'text-muted-foreground opacity-50',
            day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
            day_hidden: 'invisible',
            nav: 'flex items-center space-x-1 pt-2',
            nav_button: 'h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100',
            nav_button_previous: 'absolute left-1',
            nav_button_next: 'absolute right-1',
            caption: 'flex justify-center pt-1 relative items-center text-base font-medium',
            caption_label: 'text-base font-medium',
            caption_dropdowns: 'flex justify-center gap-1',
          }}
        />
      </div>
    </RegisterFreeTrialLayout>
  );
}
