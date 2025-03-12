/**
 * Converts a time string to an integer value in seconds or milliseconds.
 * @param {string} timeStr - The time string (e.g., '24h', '1d', '1m', '1s').
 * @param {string} [unit='s'] - The unit to convert to ('s' for seconds, 'ms' for milliseconds).
 * @returns {number} - The converted time in the specified unit.
 */
function convertTime(timeStr, unit = "s") {
  const timeUnits = {
    s: 1,
    m: 60,
    h: 3600,
    d: 86400,
    w: 604800,
    mo: 2592000,
    y: 31536000,
  };

  const match = timeStr.match(/^(\d+)([smhdwmoy])$/);
  if (!match) {
    throw new Error("Invalid time format");
  }

  const value = parseInt(match[1], 10);
  const timeUnit = match[2];

  let timeInSeconds = value * timeUnits[timeUnit];

  if (unit.toLowerCase() === "ms") {
    timeInSeconds *= 1000;
  }

  return timeInSeconds;
}

// Example usage:
// console.log(convertTime('24h')); // 86400
// console.log(convertTime('1d', 'ms')); // 86400000

module.exports = {
  convertTime,
};
