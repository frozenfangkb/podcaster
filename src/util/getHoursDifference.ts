export const getHoursDifference = (startDate: Date, endDate: Date): number => {
  const msInHour = 1000 * 60 * 60;

  return Math.round(
    Math.abs(endDate.getTime() - startDate.getTime()) / msInHour
  );
};
