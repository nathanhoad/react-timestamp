import React from "react";
import { render } from "@testing-library/react"
import "@testing-library/jest-dom";

import Timestamp from "../src";

describe("<Timestamp />", () => {
  it("renders a timestamp with defaults", () => {
    expect.hasAssertions();

    const { container, rerender } = render(<Timestamp date={new Date(2019, 2, 26, 10, 30)} />);
    expect(container).toHaveTextContent("26 Mar 2019, 10:30am");

    rerender(<Timestamp date={new Date(2019, 2, 26, 16, 30)} />);
    expect(container).toHaveTextContent("26 Mar 2019, 4:30pm")
  });

  it("renders with the day included", () => {
    expect.hasAssertions();

    const { container, rerender } = render(<Timestamp date={new Date(2019, 2, 26, 10, 30)} options={{ includeDay: true }} />);
    expect(container).toHaveTextContent("Tuesday, 26 Mar 2019, 10:30am");

    rerender(<Timestamp date={new Date(2019, 2, 27, 16, 30)} options={{ includeDay: true }} />);
    expect(container).toHaveTextContent("Wednesday, 27 Mar 2019, 4:30pm");
  });

  it("renders a time in 24 hour format", () => {
    expect.hasAssertions();

    const { container, rerender } = render(<Timestamp date={new Date(2019, 2, 26, 10, 30)} options={{ twentyFourHour: true }} />);
    expect(container).toHaveTextContent("26 Mar 2019, 10:30");

    rerender(<Timestamp date={new Date(2019, 2, 27, 16, 30)} options={{ twentyFourHour: true }} />);
    expect(container).toHaveTextContent("27 Mar 2019, 16:30");
  });

  it("renders a time with just the date", () => {
    expect.hasAssertions();

    const { container, rerender } = render(<Timestamp date={new Date(2019, 2, 26, 10, 30)} options={{ format: "date" }} />);
    expect(container).toHaveTextContent("26 Mar 2019");

    rerender(<Timestamp date={new Date(2019, 2, 27, 16, 30)} options={{ format: "date" }} />);
    expect(container).toHaveTextContent("27 Mar 2019");
  });

  it("renders a time with just the time", () => {
    expect.hasAssertions();

    const { container, rerender } = render(<Timestamp date={new Date(2019, 2, 26, 10, 30)} options={{ format: "time" }} />);
    expect(container).toHaveTextContent("10:30am");

    rerender(<Timestamp date={new Date(2019, 2, 27, 16, 30)} options={{ format: "time" }} />);
    expect(container).toHaveTextContent("4:30pm");
  });

  it("renders the difference between two dates", () => {
    expect.hasAssertions();

    const { container, rerender } = render(<Timestamp date={new Date(2019, 2, 26, 10, 30)} relativeTo={new Date(2019, 2, 26, 10, 31)} />);
    expect(container).toHaveTextContent("1 minute");

    rerender(<Timestamp date={new Date(2019, 2, 28, 10, 30)} relativeTo={new Date(2019, 2, 26, 10, 30)} />);
    expect(container).toHaveTextContent("2 days");

    rerender(<Timestamp date={new Date(2019, 2, 28, 10, 30)} relativeTo={new Date(2021, 2, 28, 10, 31)} />);
    expect(container).toHaveTextContent("2 years");
  });
});