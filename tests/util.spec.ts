import { Expect, Test, TestCase } from "alsatian";
import * as Util from "../src/util";

export class TestConvertingToDate {
  @Test("Can convert numbers to dates")
  @TestCase(1553560143, 2019)
  public testNumbers(n: number, expectedYear: number) {
    Expect(Util.toDate(n) instanceof Date).toBeTruthy();
    Expect((Util.toDate(n) as Date).getFullYear()).toBe(expectedYear);
  }

  @Test("Can convert string to dates")
  @TestCase("2019-03-26 10:30", 26)
  @TestCase("1920-03-26 10:30", 26)
  public testStrings(s: string, expectedDate: number) {
    Expect(Util.toDate(s) instanceof Date).toBeTruthy();
    Expect((Util.toDate(s) as Date).getDate()).toBe(expectedDate);
    Expect(Util.toDate("invalid date")).toBeNull();
  }
}

export class TestFormatDate {
  @Test("Can format a date with default options")
  @TestCase(new Date(2019, 2, 26, 10, 30), "26 Mar 2019, 10:30am")
  public testDefaults(date: Date, expectedOutput: string) {
    Expect(Util.formatDate(date)).toBe(expectedOutput);
  }

  @Test("Can format a date with includeDay option")
  @TestCase(new Date(2019, 2, 26, 10, 30), "Tuesday, 26 Mar 2019, 10:30am")
  public testFormatWithDay(date: Date, expectedOutput: string) {
    Expect(Util.formatDate(date, { includeDay: true })).toBe(expectedOutput);
  }

  @Test("Can format a date with translation")
  @TestCase(new Date(2019, 2, 26, 10, 30), "blah, 26 blah 2019, 10:30am")
  public testFormatWithTranslation(date: Date, expectedOutput: string) {
    Expect(
      Util.formatDate(date, {
        includeDay: true,
        translate: (key: string) => "blah",
      })
    ).toBe(expectedOutput);
  }

  @Test("Can format a date with 24 hour option")
  @TestCase(new Date(2019, 2, 26, 10, 30), "26 Mar 2019, 10:30")
  @TestCase(new Date(2019, 2, 26, 12, 0), "26 Mar 2019, 12:00")
  @TestCase(new Date(2019, 2, 26, 18, 30), "26 Mar 2019, 18:30")
  @TestCase(new Date(2019, 2, 26, 0, 0), "26 Mar 2019, 0:00")
  public testFormatWith24Hours(date: Date, expectedOutput: string) {
    Expect(Util.formatDate(date, { twentyFourHour: true })).toBe(
      expectedOutput
    );
  }
}

export class TestSecondsBetweenDates {
  @Test("Can measure the time between two dates")
  @TestCase(new Date(2018, 2, 26, 10, 30), new Date(2018, 2, 26, 10, 0), -1800)
  @TestCase(
    new Date(2000, 2, 26, 10, 30),
    new Date(2200, 2, 26, 10, 30),
    6311347200
  )
  @TestCase(new Date(2018, 2, 26, 10, 30), new Date(2018, 2, 26, 10, 30), 0)
  public testCompareWithNowWithDefaults(
    date: Date,
    otherDate: Date,
    expectedOutput: number
  ) {
    Expect(Util.secondsBetweenDates(date, otherDate)).toBe(expectedOutput);
  }
}

export class TestDistanceOfTimeInWords {
  @Test("Can output relative times in words")
  @TestCase(1000, "17 minutes")
  @TestCase(100000000, "3 years")
  @TestCase(100000000, "3 blah", (key: string) => "3 blah")
  public testComparingDates(
    seconds: number,
    expectedOutput: string,
    translate?: (key: string) => string
  ) {
    Expect(Util.distanceOfTimeInWords(seconds, false, translate)).toBe(
      expectedOutput
    );
  }
}
