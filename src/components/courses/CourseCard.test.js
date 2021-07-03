import React from "react";
import { render } from "@testing-library/react";
import CourseCard from "./CourseCard";
import { MemoryRouter } from "react-router";

it("matches snapshot with logo", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <CourseCard
            name="Rithm"
            level="2"
        />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
