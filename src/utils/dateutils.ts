const DAYS_IN_WEEK = 7;
const WEEK_HEIGHT = 48;
const MONTH_PADDING = 20;
const MILLISECONDS_IN_WEEK = 7 * 24 * 60 * 60 * 1000;
const YEAR_RANGE = 2;

export const sameDate = (d1: Date, d2: Date) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const isTodayDate = (date: Date): boolean => {
  return date.toDateString() === new Date().toDateString();
};

export const isSelected = (date: Date, selectedDate?: Date | null): boolean => {
  return selectedDate ? sameDate(date, selectedDate) : false;
};
export const getNewWeekIndex = (
  weeksData: { weekStart: Date }[],
  date: Date,
) => {
  const sunday = new Date(date);
  sunday.setDate(date.getDate() - date.getDay());
  return weeksData.findIndex(
    w => w.weekStart.toDateString() === sunday.toDateString(),
  );
};

export const createDayInfo = (
  date: Date,
  selectedDate?: Date | null,
  currentMonth?: number,
) => {
  const dayIsToday = isTodayDate(date);
  const dayIsSelected = isSelected(date, selectedDate);
  const isCurrentMonth =
    currentMonth !== undefined ? date.getMonth() === currentMonth : true;

  return {
    date,
    isToday: dayIsToday,
    isSelected: dayIsSelected,
    isCurrentMonth,
  };
};

export const generateWeekDays = (
  weekStart: Date,
  selectedDate?: Date | null,
) => {
  return Array.from({ length: DAYS_IN_WEEK }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return createDayInfo(d, selectedDate);
  });
};

export const generateMonthDayInfo = (
  year: number,
  month: number,
  dayCounter: number,
  selectedDate: Date | null,
) => {
  const date = new Date(year, month, dayCounter);
  return createDayInfo(date, selectedDate, month);
};

export const getWeeksInMonth = (year: number, month: number): number => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstWeekStart = firstDay.getDay();
  const totalDays = lastDay.getDate();
  return Math.ceil((firstWeekStart + totalDays) / DAYS_IN_WEEK);
};

export const calculateMonthHeight = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const firstWeekStart = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const weeksNeeded = Math.ceil((firstWeekStart + totalDays) / DAYS_IN_WEEK);

  return weeksNeeded * WEEK_HEIGHT + MONTH_PADDING;
};

export const getCurrentWeekPositionInMonth = (
  weeksData: { weekStart: Date }[],
  weekIndex: number,
  selectedDate: Date,
) => {
  if (!weeksData[weekIndex]) return 0;

  const currentWeekStart = weeksData[weekIndex].weekStart;
  const monthStart = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1,
  );
  const monthFirstWeekStart = new Date(monthStart);
  monthFirstWeekStart.setDate(monthStart.getDate() - monthStart.getDay());

  const weeksDiff = Math.floor(
    (currentWeekStart.getTime() - monthFirstWeekStart.getTime()) /
      MILLISECONDS_IN_WEEK,
  );
  return Math.max(0, weeksDiff);
};

export const getCurrentMonthIndex = (
  selectedDate: Date,
  monthData: { year: number; month: number }[],
) => {
  const targetYear = selectedDate.getFullYear();
  const targetMonth = selectedDate.getMonth();

  return monthData.findIndex(
    item => item.year === targetYear && item.month === targetMonth,
  );
};

export const getCurrentWeekIndex = (
  selectedDate: Date,
  weeksData: { weekStart: Date }[],
) => {
  const sunday = new Date(selectedDate);
  sunday.setDate(selectedDate.getDate() - selectedDate.getDay());

  return weeksData.findIndex(
    w => w.weekStart.toDateString() === sunday.toDateString(),
  );
};
export const getMonthData = () => {
  const baseYear = new Date().getFullYear();
  const startYear = baseYear - YEAR_RANGE;
  const endYear = baseYear + YEAR_RANGE;

  const monthData: { year: number; month: number }[] = [];

  for (let year = startYear; year <= endYear; year++) {
    for (let month = 0; month < 12; month++) {
      monthData.push({ year, month });
    }
  }

  return monthData;
};

export const getWeeksData = () => {
  const baseYear = new Date().getFullYear();
  const startYear = baseYear - YEAR_RANGE;
  const endYear = baseYear + YEAR_RANGE;

  const wks: { weekStart: Date }[] = [];

  let curr = new Date(startYear, 0, 1);
  curr.setDate(curr.getDate() - curr.getDay());

  const endDate = new Date(endYear + 1, 0, 1);

  while (curr < endDate) {
    wks.push({ weekStart: new Date(curr) });
    curr.setDate(curr.getDate() + 7);
  }

  return wks;
};
