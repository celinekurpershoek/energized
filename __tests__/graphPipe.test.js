import React from "react";
import renderer from "react-test-renderer";
import GraphPipe from "../src/components/GraphPipe";

it("Correctly render GraphPipe component", () => {
  const component = renderer.create(
    <GraphPipe startValue="0" heightValue="10" difference="5" percentage="50" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
