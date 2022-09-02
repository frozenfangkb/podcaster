export const millisecondsToMinutesAndSeconds = (millis: number): string => {
  if (millis === 0) return "Unknown";
  let minutes = Math.floor(millis / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (+seconds < 10 ? "0" : "") + seconds;
};
