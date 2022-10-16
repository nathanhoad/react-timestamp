import * as Util from "../src/util";

describe("Util", () => {
  describe("toDate()", () => {
    it("converts numbers to dates", () => {
      expect.hasAssertions();

      expect((Util.toDate(1553560143) as Date).getFullYear()).toBe(2019);
    });

    it("converts strings to dates", () => {
      expect((Util.toDate("2019-03-26 10:30") as Date).getDate()).toBe(26);
      expect((Util.toDate("1920-03-26 10:30") as Date).getDate()).toBe(26);

      expect(Util.toDate("invalid date")).toBeNull();
    })
  });

  describe("formatDate()", () => {
    it("formats a date with default options", () => {
      expect.hasAssertions();

      expect(Util.formatDate(new Date(2019, 2, 26, 10, 30))).toBe("26 Mar 2019, 10:30am");
    });

    it("formats a date with includeDay options", () => {
      expect.hasAssertions();

      expect(Util.formatDate(new Date(2019, 2, 26, 10, 30), { includeDay: true })).toBe("Tuesday, 26 Mar 2019, 10:30am");
    });

    it("formats a date with translations", () => {
      expect.hasAssertions();

      expect(Util.formatDate(new Date(2019, 2, 26, 10, 30), { includeDay: true, translate: () => "blah", })).toBe("blah, 26 blah 2019, 10:30am");
    });

    it("formats a date with the 24 hour option", () => {
      expect.hasAssertions();

      expect(Util.formatDate(new Date(2019, 2, 26, 10, 30), { twentyFourHour: true })).toBe("26 Mar 2019, 10:30");
      expect(Util.formatDate(new Date(2019, 2, 26, 12, 0), { twentyFourHour: true })).toBe("26 Mar 2019, 12:00");
      expect(Util.formatDate(new Date(2019, 2, 26, 18, 30), { twentyFourHour: true })).toBe("26 Mar 2019, 18:30");
      expect(Util.formatDate(new Date(2019, 2, 26, 0, 0), { twentyFourHour: true })).toBe("26 Mar 2019, 0:00");
    });
  });

  describe("secondsBetweenDates()", () => {
    it("measures the time between two dates", () => {
      expect.hasAssertions();

      expect(Util.secondsBetweenDates(new Date(2018, 2, 26, 10, 30), new Date(2018, 2, 26, 10, 0))).toBe(-1800);
      expect(Util.secondsBetweenDates(new Date(2000, 2, 26, 10, 30), new Date(2200, 2, 26, 10, 30))).toBe(6311347200);
      expect(Util.secondsBetweenDates(new Date(2018, 2, 26, 10, 30), new Date(2018, 2, 26, 10, 30))).toBe(0);
    });
  });

  describe("distanceOfTimeInWords()", () => {
    it("outputs relative time in words", () => {
      expect.hasAssertions();

      expect(Util.distanceOfTimeInWords(1000, false)).toBe("17 minutes");
      expect(Util.distanceOfTimeInWords(100000000, false)).toBe("3 years");
      expect(Util.distanceOfTimeInWords(100000000, false, () => "3 blah")).toBe("3 blah");
    })
  })
});