const MONTH_PATTERN = /^\d{4}-\d{2}$/;

export const formatMonth = (month: string): string => {
  if (!MONTH_PATTERN.test(month)) {
    return month;
  }

  const [year, monthNumber] = month.split('-').map(Number);
  return new Intl.DateTimeFormat('ru-RU', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, monthNumber - 1, 1)));
};
