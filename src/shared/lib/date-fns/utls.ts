import { addDays, format, subDays, startOfMonth, formatISO, parseISO } from 'date-fns';
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
