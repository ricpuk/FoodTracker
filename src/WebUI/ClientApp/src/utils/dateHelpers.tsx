export const toDateString = (date: Date) => {
  const dateInner = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return dateInner.toISOString().split("T")[0];
};
