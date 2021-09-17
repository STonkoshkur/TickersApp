export const addMonth = (date: Date, month: number) => {
  return new Date(date.getFullYear(), date.getMonth() + month, date.getDate());
};

export const getISOFormatedDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};
