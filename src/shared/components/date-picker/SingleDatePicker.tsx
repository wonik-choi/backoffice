import { useState, useCallback } from 'react';
import { SelectSingleEventHandler } from 'react-day-picker';

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/atomics/popover';
import { Calendar } from '@/shared/components/atomics/calendar';
import { Button } from '@/shared/components/atomics/button';
import { CalendarIcon } from 'lucide-react';

interface SingleDatePickerProps {
  dateLabel: string;
  selectedDate: Date | undefined;
  onSelect: SelectSingleEventHandler;
  disabled?: (date: Date) => boolean;
}

const SingleDatePicker = ({ dateLabel, selectedDate, onSelect, disabled }: SingleDatePickerProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className="col-span-3 flex justify-start w-full pl-[1.2rem] text-right font-normal text-[1.4rem]"
          onClick={handleOpen}
        >
          <CalendarIcon className="h-[1.6rem] w-[1.6rem] opacity-50" />
          {dateLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" onPointerDownOutside={(e) => e.preventDefault()}>
        <Calendar mode="single" selected={selectedDate} onSelect={onSelect} disabled={disabled} />
      </PopoverContent>
    </Popover>
  );
};

export default SingleDatePicker;
