import { createElement, useState, useEffect } from "react";
import {
  toDate,
  secondsBetweenDates,
  YEAR,
  distanceOfTimeInWords,
  formatDate,
  FormatOptions,
} from "./util";

interface TimestampProps {
  className?: string;
  style?: object;
  component?: any;
  date: Date | number | string;
  relative?: boolean;
  relativeTo?: Date | number | string;
  options?: FormatOptions;
  autoUpdate?: boolean;
}

export default function Timestamp({
  className = "",
  style = {},
  component,
  date,
  relative,
  relativeTo,
  options,
  autoUpdate,
}: TimestampProps): JSX.Element {
  const [minutes, setMinutes] = useState<number>(0);
  useEffect(() => {
    if (!autoUpdate) return;

    const interval = setInterval(() => setMinutes(minutes + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const Component = component || "time";

  let possibleDate = toDate(date);

  if (!possibleDate) return createElement(Component, {}, ["Invalid date"]);

  const relativeToDate: Date = toDate(relativeTo) || new Date();
  const seconds = secondsBetweenDates(possibleDate, relativeToDate);
  const isRelative = (relative && Math.abs(seconds) < YEAR) || relativeTo;
  const text: string = isRelative
    ? distanceOfTimeInWords(seconds, !relativeTo)
    : formatDate(possibleDate, options);

  return createElement(
    Component,
    {
      className,
      style,
      timestamp: formatDate(possibleDate, { format: "json" }),
    },
    text
  );
}
