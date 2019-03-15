import getGraphData from "../src/components/getGraphData";

test("Fail with empty object", () => {
  expect(() => getGraphData({})).toThrow("Object is empty");
});

test("Fail if newValue is below 0", () => {
  expect(() =>
    getGraphData({ newValue: -20, oldValue: 0, stepSize: 1 })
  ).toThrow("The new value can't be less than the previous value");
});

test("Fail if newValue is below 0", () => {
  expect(() =>
    getGraphData({ newValue: -20, oldValue: 0, stepSize: 1 })
  ).toThrow("The new value can't be less than the previous value");
});

test("Success with minimal object", () => {
  expect(getGraphData({ newValue: 0, oldValue: 0, stepSize: 1 })).toEqual({
    difference: 0,
    heightValue: -50,
    percentage: 0
  });
});
