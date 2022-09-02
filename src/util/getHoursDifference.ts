/**
 * Calculates time difference between two dates in hours
 *
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {number}
 */
export const getHoursDifference = (startDate: Date, endDate: Date): number => {
  const msInHour = 1000 * 60 * 60;

  return Math.round(
    Math.abs(endDate.getTime() - startDate.getTime()) / msInHour
  );
};
