import React from "react";
export function DifferenceBlock(props) {
  console.log(props);
  if (!props.percentage) {
    return null;
  }
  return (
    <span
      title={`${props.difference}KWH (+${props.percentage}%)`}
      className="graph__pipe graph__pipe--vertical graph__pipe--difference"
      style={{
        height: `${props.percentage}%`
      }}
      hidden={props.percentage < 1}
    />
  );
}
