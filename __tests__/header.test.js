import React from "react";
import renderer from "react-test-renderer";
import Header from "../src/components/header";

it("Correctly render header component", () => {
  const component = renderer.create(<Header title="Hello test" />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
