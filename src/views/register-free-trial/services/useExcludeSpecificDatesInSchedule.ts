export const useExcludeSpecificDatesInSchedule = (excludeDates: string[]) => {
  /**
   * 검증 요소
   * 1. 날짜 형식이 맞는지 검사 (YYYY-MM-DD 등)
   * 2. 년도가 정확하게 기입되어있는지 확인 (2025-01-01 등)
   */
  const validatedExcludeDates = excludeDates
    .filter((stringDate) => new Date(stringDate) instanceof Date && !isNaN(new Date(stringDate).getTime()))
    .filter((stringDate) => stringDate.split('-').length === 3 && stringDate.split('-')[0].length === 4);

  return validatedExcludeDates.map((stringDate) => new Date(stringDate));
};
