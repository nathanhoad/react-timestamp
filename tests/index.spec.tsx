import { Expect, Test, TestCase } from 'alsatian';
import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';

import Timestamp from '../src';

export class TestTimestamp {
  @Test('Can render a timestamp with defaults')
  @TestCase(new Date(2019, 2, 26, 10, 30), '26 Mar 2019, 10:30am')
  @TestCase(new Date(2019, 2, 26, 16, 30), '26 Mar 2019, 4:30pm')
  public testDefaults(date: Date, expectedOutput: string) {
    const { root } = TestRenderer.create(<Timestamp date={date} />);
    Expect(root.findByType('time').children).toEqual([expectedOutput]);
  }

  @Test('Can render a timestamp with the day included')
  @TestCase(new Date(2019, 2, 26, 10, 30), 'Tuesday, 26 Mar 2019, 10:30am')
  @TestCase(new Date(2019, 2, 27, 16, 30), 'Wednesday, 27 Mar 2019, 4:30pm')
  public testWithDay(date: Date, expectedOutput: string) {
    const { root } = TestRenderer.create(<Timestamp date={date} options={{ includeDay: true }} />);
    Expect(root.findByType('time').children).toEqual([expectedOutput]);
  }

  @Test('Can render a timestamp in 24 hour')
  @TestCase(new Date(2019, 2, 26, 10, 30), '26 Mar 2019, 10:30')
  @TestCase(new Date(2019, 2, 27, 16, 30), '27 Mar 2019, 16:30')
  public test24Hour(date: Date, expectedOutput: string) {
    const { root } = TestRenderer.create(<Timestamp date={date} options={{ twentyFourHour: true }} />);
    Expect(root.findByType('time').children).toEqual([expectedOutput]);
  }

  @Test('Can render a timestamp with just the date')
  @TestCase(new Date(2019, 2, 26, 10, 30), '26 Mar 2019')
  @TestCase(new Date(2019, 2, 27, 16, 30), '27 Mar 2019')
  public testJustDate(date: Date, expectedOutput: string) {
    const { root } = TestRenderer.create(<Timestamp date={date} options={{ format: 'date' }} />);
    Expect(root.findByType('time').children).toEqual([expectedOutput]);
  }

  @Test('Can render a timestamp with just the time')
  @TestCase(new Date(2019, 2, 26, 10, 30), '10:30am')
  @TestCase(new Date(2019, 2, 27, 16, 30), '4:30pm')
  public testJustTime(date: Date, expectedOutput: string) {
    const { root } = TestRenderer.create(<Timestamp date={date} options={{ format: 'time' }} />);
    Expect(root.findByType('time').children).toEqual([expectedOutput]);
  }

  @Test('Can render a date relative to another date')
  @TestCase(new Date(2022, 3, 28, 10, 30), new Date(2022, 3, 28, 10, 31), '1 minute')
  @TestCase(new Date(2022, 3, 28, 10, 30), new Date(2022, 3, 26, 10, 30), '2 days')
  @TestCase(new Date(2022, 3, 28, 10, 30), new Date(2024, 3, 26, 10, 31), '2 years')
  public testDistanceBetweenDates(date: Date, relativeTo: Date, expectedOutput: string) {
    const { root } = TestRenderer.create(<Timestamp date={date} relativeTo={relativeTo} />);
    Expect(root.findByType('time').children).toEqual([expectedOutput]);
  }
}
