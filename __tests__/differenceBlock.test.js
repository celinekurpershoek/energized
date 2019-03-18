import React from "react";
import renderer from "react-test-renderer";
import DifferenceBlock from "../src/components/differenceBlock";

it("Correctly render header component", () => {
  const component = renderer.create(
    <DifferenceBlock difference="10" percentage="50" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
