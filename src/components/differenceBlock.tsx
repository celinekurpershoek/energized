import * as React from "react";

interface IProps {
  percentage: number;
  difference: number;
}

/**
 * Create element to stack on graph element to show increase
 * @param props
 */
export default function DifferenceBlock(props: IProps) {
  const { percentage, difference } = props;
  return (
    <span
      title={`${difference}KWH (+${percentage}%)`}
      className="graph__pipe graph__pipe--vertical graph__pipe--difference"
      style={{
        height: `${percentage}%`
      }}
    />
  );
}
