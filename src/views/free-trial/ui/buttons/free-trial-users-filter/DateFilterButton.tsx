import { useState } from 'react';
import { CalendarIcon } from 'lucide-react';

// shared
import { Calendar } from '@/shared/components/atomics/calendar';
import { Button } from '@/shared/components/atomics/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/atomics/popover';
import { decodeISOString, formatKoreanTitle } from '@/shared/lib/date-fns/utls';
import { cn } from '@/shared/lib/utils';

interface DateFilterButtonProps {
  isoDate: string;
  onChangeDate: (date: Date) => void;
}

const DateFilterButton = ({ isoDate, onChangeDate }: DateFilterButtonProps) => {
  const [date, setDate] = useState<Date | undefined>(decodeISOString(isoDate));

  const handleDateChange = (date: Date) => {
    setDate(date);
    onChangeDate(date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn('w-[20rem] text-left font-normal', !date && 'text-muted-foreground')}>
          {date ? formatKoreanTitle(date, 'yyyy-MM-dd') : <span>날짜를 선택해주세요</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
          required={true}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateFilterButton;
