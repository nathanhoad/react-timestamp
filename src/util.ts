export type FormatOptions = {
  format?: string;
  includeDay?: boolean;
  twentyFourHour?: boolean;
};

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const MINUTE = 60;
export const HOUR = MINUTE * 60;
export const DAY = 24 * HOUR;
export const WEEK = DAY * 7;
export const MONTH = (DAY * 365) / 12;
export const YEAR = DAY * 365;

/**
 * Pluralize a word based on a count
 * @param word The word to pluralize
 * @param count How many of them are there?
 * @param many A custom plural if count is != 1
 */
export const plural = (word: string, count: number, many?: string): string => {
  if (count == 1) {
    return word;
  } else if (many) {
    return many;
  } else {
    return word + "s";
  }
};

/**
 * Convert a string or number to a Date
 * @param date Someting to convert to a Date
 */
export const toDate = (date?: Date | string | number): Date | null => {
  if (!date) return new Date();

  if (typeof date === "number" || "" + parseInt(date as string, 10) == date) {
    date = parseInt(date as string, 10);
    if (isNaN(date)) return null;
    date = new Date(date * 1000);
  }

  date = new Date(date);
  if (isNaN(date.getTime())) return null;

  const t: string[] = date.toJSON().split(/[:\-\+TZ\. ]/);
  for (var i in t) {
    if (t[i] !== "" && isNaN(parseInt(t[i], 10))) return null;
  }

  return date;
};

/**
 * Format a date to a nice string
 * @param date The date to format
 * @param options Some extra options
 */
export const formatDate = (date: Date, options: FormatOptions = {}): string => {
  options = {
    format: "full",
    includeDay: false,
    twentyFourHour: false,
    ...options,
  };

  let hours: string;
  let minutes: string;
  let ampm: string;

  // eg. 5 Nov 12, 1:37pm
  if (options.twentyFourHour) {
    hours = date.getHours().toString();
    ampm = "";
  } else {
    if (date.getHours() % 12 == 0) {
      hours = "12";
    } else {
      hours = (date.getHours() % 12).toString();
    }

    if (date.getHours() > 11) {
      ampm = "pm";
    } else {
      ampm = "am";
    }
  }

  if (date.getMinutes() < 10) {
    minutes = "0" + date.getMinutes();
  } else {
    minutes = "" + date.getMinutes();
  }

  var day = options.includeDay ? DAYS[date.getDay()] + ", " : "";

  switch (options.format) {
    case "date":
      return `${day}${date.getDate()} ${
        MONTHS[date.getMonth()]
      } ${date.getFullYear()}`;

    case "time":
      return `${hours}:${minutes}${ampm}`;

    case "json":
      return date.toJSON();

    case "full":
    default:
      return `${day}${date.getDate()} ${
        MONTHS[date.getMonth()]
      } ${date.getFullYear()}, ${hours}:${minutes}${ampm}`;
  }
};

/**
 * Count the seconds between two dates
 * @param date A date
 * @param compareTo The other date
 */
export const secondsBetweenDates = (date: Date, compareTo: Date): number => {
  return Math.floor((compareTo.getTime() - date.getTime()) / 1000);
};

/**
 * Get a sentence fragment of the distance between two dates
 * @param seconds The distance of time in seconds
 * @param relativeToNow Are we comparing two dates or a date and now
 */
export const distanceOfTimeInWords = (
  seconds: number,
  relativeToNow: boolean = true
): string => {
  let isAgo: boolean = seconds >= 0;

  seconds = Math.abs(seconds);

  if (relativeToNow && seconds < 60) return isAgo ? "just now" : "soon";

  let distance: number;
  let when: string;

  if (seconds < MINUTE) {
    // 1 minute
    when = `${seconds} ${plural("second", seconds)}`;
  } else if (seconds < HOUR) {
    // 1 hour
    distance = Math.round(seconds / 60);
    when = `${distance} ${plural("minute", distance)}`;
  } else if (seconds < DAY) {
    // 1 day
    distance = Math.round(seconds / (60 * 60));
    when = `${distance} ${plural("hour", distance)}`;
  } else if (seconds < WEEK) {
    // 1 week
    distance = Math.round(seconds / (60 * 60 * 24));
    when = `${distance} ${plural("day", distance)}`;
  } else if (seconds < MONTH) {
    // 1 month
    distance = Math.round(seconds / (60 * 60 * 24 * 7));
    when = `${distance} ${plural("week", distance)}`;
  } else if (seconds < YEAR) {
    // # 1 year
    distance = Math.round(seconds / (60 * 60 * 24 * (365 / 12)));
    when = `${distance} ${plural("month", distance)}`;
  } else {
    distance = Math.round(seconds / (60 * 60 * 24 * 365));
    when = `${distance} ${plural("year", distance)}`;
  }

  if (!relativeToNow) return when;
  if (isAgo) return `${when} ago`;
  
  return `in ${when}`;
};
