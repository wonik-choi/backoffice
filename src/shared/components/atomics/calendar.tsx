'use client';

import { Button, buttonVariants } from '@/shared/components/atomics/button';
import { cn } from '@/shared/lib/utils';
import { differenceInCalendarDays } from 'date-fns';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { DayPicker, labelNext, labelPrevious, useDayPicker, type DayPickerProps } from 'react-day-picker';

export type CalendarProps = DayPickerProps & {
  /**
   * In the year view, the number of years to display at once.
   * @default 12
   */
  yearRange?: number;

  /**
   * Wether to show the year switcher in the caption.
   * @default true
   */
  showYearSwitcher?: boolean;

  /**
   * @description
   * 특정 요일에 selected 되었을 경우를 알려주는 boolean;
   */
  isSelectedBookedDate?: boolean;

  monthsClassName?: string;
  monthCaptionClassName?: string;
  weekdaysClassName?: string;
  weekdayClassName?: string;
  monthClassName?: string;
  captionClassName?: string;
  captionLabelClassName?: string;
  buttonNextClassName?: string;
  buttonPreviousClassName?: string;
  navClassName?: string;
  monthGridClassName?: string;
  weekClassName?: string;
  dayClassName?: string;
  dayButtonClassName?: string;
  rangeStartClassName?: string;
  rangeEndClassName?: string;
  selectedClassName?: string;
  todayClassName?: string;
  outsideClassName?: string;
  disabledClassName?: string;
  rangeMiddleClassName?: string;
  hiddenClassName?: string;
};

type NavView = 'days' | 'years';

/**
 * A custom calendar component built on top of react-day-picker.
 * @param props The props for the calendar.
 * @default yearRange 12
 * @returns
 */
function Calendar({
  className,
  showOutsideDays = true,
  showYearSwitcher = true,
  yearRange = 12,
  numberOfMonths,
  isSelectedBookedDate,
  components,
  ...props
}: CalendarProps) {
  const [navView, setNavView] = React.useState<NavView>('days');
  const [displayYears, setDisplayYears] = React.useState<{
    from: number;
    to: number;
  }>(
    React.useMemo(() => {
      const currentYear = new Date().getFullYear();
      return {
        from: currentYear - Math.floor(yearRange / 2 - 1),
        to: currentYear + Math.ceil(yearRange / 2),
      };
    }, [yearRange])
  );

  const { onNextClick, onPrevClick, startMonth, endMonth } = props;

  const columnsDisplayed = navView === 'years' ? 1 : numberOfMonths;

  const _monthsClassName = cn('relative flex h-full', props.monthsClassName);
  const _monthCaptionClassName = cn(
    'relative mx-10 flex h-[3rem] mobile:h-[4rem] items-center justify-center',
    props.monthCaptionClassName
  );
  const _weekdaysClassName = cn('flex flex-row w-full border-b border-susimdal-border-gray', props.weekdaysClassName);
  const _weekdayClassName = cn(
    'w-full h-[2.5rem] mobile:h-[3rem] text-[1.3rem] mobile:text-[1.5rem] font-normal text-muted-foreground',
    props.weekdayClassName
  );
  const _monthClassName = cn('w-full', props.monthClassName);
  const _captionClassName = cn('relative flex items-center justify-center pt-1', props.captionClassName);
  const _captionLabelClassName = cn('truncate text-sm font-medium', props.captionLabelClassName);
  const buttonNavClassName = buttonVariants({
    variant: 'outline',
    className: 'absolute h-7 text-[2rem] w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
  });
  const _buttonNextClassName = cn(buttonNavClassName, 'right-0', props.buttonNextClassName);
  const _buttonPreviousClassName = cn(buttonNavClassName, 'left-0', props.buttonPreviousClassName);
  const _navClassName = cn('flex items-start', props.navClassName);
  const _monthGridClassName = cn('w-full mx-auto mt-4', props.monthGridClassName);
  const _weekClassName = cn('mt-[1.5rem] flex w-full items-start', props.weekClassName);
  const _dayClassName = cn(
    'flex w-full flex-1 px-[0.2rem] py-[0.2rem] mobile:py-[0.5rem] items-center justify-center',
    props.dayClassName
  );
  const _dayButtonClassName = cn(
    buttonVariants({ variant: 'ghost' }),
    'w-full rounded-full size-[2.4rem] mobile:size-[3rem] active:bg-susimdal-element-primary-light font-normal text-[1.3rem] mobile:text-[1.5rem] active:scale-95 transition-all duration-100 aria-selected:opacity-100',
    props.dayButtonClassName
  );
  const buttonRangeClassName =
    'bg-accent [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground';
  const _rangeStartClassName = cn(buttonRangeClassName, 'day-range-start rounded-s-md', props.rangeStartClassName);
  const _rangeEndClassName = cn(buttonRangeClassName, 'day-range-end rounded-e-md', props.rangeEndClassName);
  const _rangeMiddleClassName = cn(
    'bg-accent !text-foreground [&>button]:bg-transparent [&>button]:!text-foreground [&>button]:hover:bg-transparent [&>button]:hover:!text-foreground',
    props.rangeMiddleClassName
  );
  const _selectedClassName = cn(
    '[&>button]:bg-susimdal-button-primary-fill  [&>button]:text-primary-foreground [&>button]:hover:bg-susimdal-button-primary-fill [&>button]:hover:text-primary-foreground',
    isSelectedBookedDate && '[&>button]:bg-susimdal-color-success/40',
    props.selectedClassName
  );
  const _todayClassName = cn('[&>button]:bg-white [&>button]:text-susimdal-text-primary', props.todayClassName);
  const _outsideClassName = cn(
    'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
    props.outsideClassName
  );
  const _disabledClassName = cn('text-muted-foreground opacity-50', props.disabledClassName);
  const _hiddenClassName = cn('invisible flex-1', props.hiddenClassName);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3 h-full', className)}
      classNames={{
        months: _monthsClassName,
        month_caption: _monthCaptionClassName,
        weekdays: _weekdaysClassName,
        weekday: _weekdayClassName,
        month: _monthClassName,
        caption: _captionClassName,
        caption_label: _captionLabelClassName,
        button_next: _buttonNextClassName,
        button_previous: _buttonPreviousClassName,
        nav: _navClassName,
        month_grid: _monthGridClassName,
        week: _weekClassName,
        day: _dayClassName,
        day_button: _dayButtonClassName,
        range_start: _rangeStartClassName,
        range_middle: _rangeMiddleClassName,
        range_end: _rangeEndClassName,
        selected: _selectedClassName,
        today: _todayClassName,
        outside: _outsideClassName,
        disabled: _disabledClassName,
        hidden: _hiddenClassName,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === 'left' ? ChevronLeft : ChevronRight;
          return <Icon className="h-4 w-4" />;
        },
        Nav: ({ className }) => (
          <Nav
            className={className}
            displayYears={displayYears}
            navView={navView}
            setDisplayYears={setDisplayYears}
            startMonth={startMonth}
            endMonth={endMonth}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          />
        ),
        CaptionLabel: (props) => (
          <CaptionLabel
            showYearSwitcher={showYearSwitcher}
            navView={navView}
            setNavView={setNavView}
            displayYears={displayYears}
            {...props}
          />
        ),
        MonthGrid: ({ className, children, ...props }) => (
          <MonthGrid
            className={className}
            displayYears={displayYears}
            startMonth={startMonth}
            endMonth={endMonth}
            navView={navView}
            setNavView={setNavView}
            {...props}
          >
            {children}
          </MonthGrid>
        ),
        ...components,
      }}
      numberOfMonths={columnsDisplayed}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

function Nav({
  className,
  navView,
  startMonth,
  endMonth,
  displayYears,
  setDisplayYears,
  onPrevClick,
  onNextClick,
}: {
  className?: string;
  navView: NavView;
  startMonth?: Date;
  endMonth?: Date;
  displayYears: { from: number; to: number };
  setDisplayYears: React.Dispatch<React.SetStateAction<{ from: number; to: number }>>;
  onPrevClick?: (date: Date) => void;
  onNextClick?: (date: Date) => void;
}) {
  const { nextMonth, previousMonth, goToMonth } = useDayPicker();

  const isPreviousDisabled = (() => {
    if (navView === 'years') {
      return (
        (startMonth && differenceInCalendarDays(new Date(displayYears.from - 1, 0, 1), startMonth) < 0) ||
        (endMonth && differenceInCalendarDays(new Date(displayYears.from - 1, 0, 1), endMonth) > 0)
      );
    }
    return !previousMonth;
  })();

  const isNextDisabled = (() => {
    if (navView === 'years') {
      return (
        (startMonth && differenceInCalendarDays(new Date(displayYears.to + 1, 0, 1), startMonth) < 0) ||
        (endMonth && differenceInCalendarDays(new Date(displayYears.to + 1, 0, 1), endMonth) > 0)
      );
    }
    return !nextMonth;
  })();

  const handlePreviousClick = React.useCallback(() => {
    if (!previousMonth) return;
    if (navView === 'years') {
      setDisplayYears((prev) => ({
        from: prev.from - (prev.to - prev.from + 1),
        to: prev.to - (prev.to - prev.from + 1),
      }));
      onPrevClick?.(new Date(displayYears.from - (displayYears.to - displayYears.from), 0, 1));
      return;
    }
    goToMonth(previousMonth);
    onPrevClick?.(previousMonth);
  }, [previousMonth, goToMonth]);

  const handleNextClick = React.useCallback(() => {
    if (!nextMonth) return;
    if (navView === 'years') {
      setDisplayYears((prev) => ({
        from: prev.from + (prev.to - prev.from + 1),
        to: prev.to + (prev.to - prev.from + 1),
      }));
      onNextClick?.(new Date(displayYears.from + (displayYears.to - displayYears.from), 0, 1));
      return;
    }
    goToMonth(nextMonth);
    onNextClick?.(nextMonth);
  }, [goToMonth, nextMonth]);
  return (
    <nav className={cn('flex items-center', className)}>
      <Button
        variant="outline"
        className="absolute top-1 left-0 w-[2rem] mobile:w-[3rem] h-[2.6rem] mobile:h-[3.5rem] bg-transparent p-0 opacity-80 hover:opacity-100 active:scale-95 transition-all duration-100"
        type="button"
        tabIndex={isPreviousDisabled ? undefined : -1}
        disabled={isPreviousDisabled}
        aria-label={
          navView === 'years'
            ? `Go to the previous ${displayYears.to - displayYears.from + 1} years`
            : labelPrevious(previousMonth)
        }
        onClick={handlePreviousClick}
      >
        <ChevronLeft className="size-[2rem]" />
      </Button>

      <Button
        variant="outline"
        className="absolute top-1 right-0 w-[2rem] mobile:w-[3rem] h-[2.6rem] mobile:h-[3.5rem] bg-transparent p-0 opacity-80 hover:opacity-100 active:scale-95 transition-all duration-100"
        type="button"
        tabIndex={isNextDisabled ? undefined : -1}
        disabled={isNextDisabled}
        aria-label={
          navView === 'years' ? `Go to the next ${displayYears.to - displayYears.from + 1} years` : labelNext(nextMonth)
        }
        onClick={handleNextClick}
      >
        <ChevronRight className="size-[2rem]" />
      </Button>
    </nav>
  );
}

function CaptionLabel({
  children,
  showYearSwitcher,
  navView,
  setNavView,
  displayYears,
  ...props
}: {
  showYearSwitcher?: boolean;
  navView: NavView;
  setNavView: React.Dispatch<React.SetStateAction<NavView>>;
  displayYears: { from: number; to: number };
} & React.HTMLAttributes<HTMLSpanElement>) {
  if (!showYearSwitcher) return <span {...props}>{children}</span>;
  return (
    <motion.div whileTap={{ scale: 0.95 }} transition={{ duration: 0.1 }} className="w-fit" tabIndex={-1}>
      <Button
        className="h-[2.8rem] mobile:h-[3.5rem] w-fit truncate text-[1.5rem] mobile:text-[1.8rem] font-medium hover:bg-white cursor-pointer"
        variant="ghost"
        size="sm"
        onClick={() => setNavView((prev) => (prev === 'days' ? 'years' : 'days'))}
      >
        {navView === 'days' ? children : displayYears.from + ' - ' + displayYears.to}
      </Button>
    </motion.div>
  );
}

function MonthGrid({
  className,
  children,
  displayYears,
  startMonth,
  endMonth,
  navView,
  setNavView,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  displayYears: { from: number; to: number };
  startMonth?: Date;
  endMonth?: Date;
  navView: NavView;
  setNavView: React.Dispatch<React.SetStateAction<NavView>>;
} & React.TableHTMLAttributes<HTMLTableElement>) {
  if (navView === 'years') {
    return (
      <YearGrid
        displayYears={displayYears}
        startMonth={startMonth}
        endMonth={endMonth}
        setNavView={setNavView}
        navView={navView}
        className={className}
        {...props}
      />
    );
  }
  return (
    <table className={className} {...props}>
      {children}
    </table>
  );
}

function YearGrid({
  className,
  displayYears,
  startMonth,
  endMonth,
  setNavView,
  navView,
  ...props
}: {
  className?: string;
  displayYears: { from: number; to: number };
  startMonth?: Date;
  endMonth?: Date;
  setNavView: React.Dispatch<React.SetStateAction<NavView>>;
  navView: NavView;
} & React.HTMLAttributes<HTMLDivElement>) {
  const { goToMonth, selected } = useDayPicker();

  return (
    <div className={cn('grid grid-cols-4 gap-y-2', className)} {...props}>
      {Array.from({ length: displayYears.to - displayYears.from + 1 }, (_, i) => {
        const isBefore = differenceInCalendarDays(new Date(displayYears.from + i, 11, 31), startMonth!) < 0;

        const isAfter = differenceInCalendarDays(new Date(displayYears.from + i, 0, 0), endMonth!) > 0;

        const isDisabled = isBefore || isAfter;
        return (
          <Button
            key={i}
            className={cn(
              'h-[1.5rem] mobile:h-[2rem] py-[2rem] mobile:py-[4rem] w-full text-[1.3rem] mobile:text-[1.5rem] font-normal text-foreground',
              displayYears.from + i === new Date().getFullYear() &&
                'bg-susimdal-button-gray-fill font-medium text-accent-foreground hover:bg-susimdal-text-disabled-on'
            )}
            variant="ghost"
            onClick={() => {
              setNavView('days');
              goToMonth(new Date(displayYears.from + i, (selected as Date | undefined)?.getMonth() ?? 0));
            }}
            disabled={navView === 'years' ? isDisabled : undefined}
          >
            {displayYears.from + i}
          </Button>
        );
      })}
    </div>
  );
}

export { Calendar };
