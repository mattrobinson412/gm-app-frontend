import React from "react";
import { render } from "@testing-library/react";
import CourseLessons from "./CourseLessonList";

it("renders without crashing", function() {
  render(<CourseLessons />);
});

it("matches snapshot with no lessons", function() {
  const { asFragment } = render(<CourseLessons />);
  expect(asFragment()).toMatchSnapshot();
});
