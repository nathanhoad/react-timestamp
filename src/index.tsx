import { createElement, useState, useEffect } from 'react';
import { toDate, secondsBetweenDates, YEAR, distanceOfTimeInWords, formatDate, FormatOptions } from './util';

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

export default (props: TimestampProps) => {
  if (props.autoUpdate) {
    const [minutes, setMinutes] = useState(0);
    useEffect(() => {
      const tick = () => setMinutes(minutes + 1);
      const interval = setInterval(tick, 60000);
      return () => clearInterval(interval);
    }, []);
  }

  const Component = props.component || 'time';

  let possibleDate = toDate(props.date);
  if (!possibleDate) return createElement(Component, {}, ['Invalid date']);

  const date: Date = possibleDate;
  const relativeTo: Date = toDate(props.relativeTo) || new Date();
  const seconds = secondsBetweenDates(date, relativeTo);
  const output: string =
    !props.relative || Math.abs(seconds) > YEAR
      ? formatDate(date, props.options)
      : distanceOfTimeInWords(seconds, !props.relativeTo);

  return createElement(
    Component,
    {
      className: props.className || '',
      style: props.style || {},
      timestamp: formatDate(date, { format: 'json' })
    },
    output
  );
};
