// export const formatServerDateToUTC = (date: Date) => {
//   console.log(date);
//   return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
// };
export const formatClientDateFromUtc = (utcDateString: string): string => {
  const date = new Date(utcDateString); // automatically treated as UTC

  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();

  const HH = String(date.getHours()).padStart(2, '0');
  const MM = String(date.getMinutes()).padStart(2, '0');

  return `${dd}-${mm}-${yyyy} ${HH}:${MM}`;
};
