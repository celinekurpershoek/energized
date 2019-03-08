import React from "react";
import { DifferenceBlock } from "./DifferenceBlock";

export const GraphPipe = ({
  startValue,
  heightValue,
  difference,
  percentage
}) => (
  <div className="graph__pipes">
    <span
      title={`${startValue} KWH`}
      className="graph__pipe graph__pipe--vertical"
      style={{
        height: `${heightValue}%`
      }}
    />
    <DifferenceBlock difference={difference} percentage={percentage} />
  </div>
);
