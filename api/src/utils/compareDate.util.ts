export const isDateGreaterThanToday = (date: Date): boolean => {
  const today = new Date(Date.now());
  const givenDate = new Date(date);

  let flag = false;

  if (today.getUTCHours() >= givenDate.getUTCHours()) flag = true;

  if (today.getUTCMinutes() >= givenDate.getUTCMinutes()) flag = true;

  return flag;
};
