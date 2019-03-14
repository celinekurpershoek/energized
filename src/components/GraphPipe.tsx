import * as React from "react";
import DifferenceBlock from "./differenceBlock";

interface IProps {
  startValue: number;
  heightValue: number;
  difference: number;
  percentage: number;
}

export default function GraphPipe(props: IProps) {
  const { startValue, heightValue, difference, percentage } = props;

  return (
    <div className="graph__pipes">
      <span
        title={`${startValue} KWH`}
        className="graph__pipe graph__pipe--vertical"
        style={{
          height: `${heightValue}%`
        }}
      />
      {percentage >= 1 && (
        <DifferenceBlock difference={difference} percentage={percentage} />
      )}
    </div>
  );
}
