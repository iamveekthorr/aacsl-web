export const formatDate = (inputDate: string | Date) => {
  const date = new Date(inputDate);
  const formattedDate = `${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date
    .getFullYear()
    .toString()
    .substr(-2)}`;
  return formattedDate;
};
