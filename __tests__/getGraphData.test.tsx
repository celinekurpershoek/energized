import getGraphData, { getPercentage } from "../src/components/getGraphData";

test("Fail with empty object", () => {
  expect(() => getGraphData({})).toThrow("Object is empty");
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

test("Let percentage be 0 when difference is 0", () => {
  expect(getPercentage(0, 0)).toEqual(0);
});

test("Return 100% when oldValue is 0 and difference is above 0", () => {
  expect(getPercentage(50, 0)).toEqual(100);
});

test("Let percentage be 0 when values are below 0", () => {
  expect(getPercentage(-50, -0)).toEqual(0);
});

test("50 of 100 === 50%", () => {
  expect(getPercentage(50, 100)).toEqual(50);
});
