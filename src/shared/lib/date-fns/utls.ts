import { addDays, format, subDays, startOfMonth, formatISO, parseISO, differenceInDays } from 'date-fns';
import { TZDate } from '@date-fns/tz';
import { ko } from 'date-fns/locale';

export const convertQuery = (date: Date) => {
  const adjustedTimezone = new TZDate(date, 'Asia/Seoul');
  const formattedISODate = formatISO(adjustedTimezone);

  return encodeURIComponent(formattedISODate);
};

export const decodeQueryDate = (date: string) => {
  const decodedDate = decodeURIComponent(date);
  const parsedDate = parseISO(decodedDate);

  return parsedDate;
};

export const convertISOString = (date: Date) => {
  const adjustedTimezone = new TZDate(date, 'Asia/Seoul');
  const formattedISODate = formatISO(adjustedTimezone);

  return formattedISODate;
};

export const decodeISOString = (date: string) => {
  const decodedDate = new TZDate(date, 'Asia/Seoul');

  return decodedDate;
};

export const formatKoreanTitle = (date: Date, formatString: string = 'M월 dd일') => {
  const adjustedTimezone = new TZDate(date, 'Asia/Seoul');
  const formattedISODate = format(adjustedTimezone, formatString);

  return formattedISODate;
};

export const addDayToToday = (addDay: number) => {
  const today = new TZDate(new Date(), 'Asia/Seoul');
  const addDate = addDays(today, addDay);

  return addDate;
};

export const getNextPossibleFreeTrialDate = (addDay: number) => {
  const today = new TZDate(new Date(), 'Asia/Seoul');
  const addDate = addDays(today, addDay);

  const dayOfWeek = addDate.getDay();

  if (dayOfWeek === 6) {
    return addDays(addDate, 2);
  }

  if (dayOfWeek === 0) {
    return addDays(addDate, 1);
  }

  return addDate;
};

export const formatISOStringToKoreanTitle = (date: string, formatString: string = 'yyyy-MM-dd') => {
  const decodedDate = decodeISOString(date);
  const formattedDate = format(decodedDate, formatString);

  return formattedDate;
};

export const getDifferenceInDays = (laterDate: Date, earlierDate: Date): number => {
  const difference = differenceInDays(laterDate, earlierDate);

  return difference;
};
