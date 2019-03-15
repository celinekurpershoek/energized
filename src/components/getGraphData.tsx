interface IProps {
  newValue: number;
  oldValue: number;
  stepSize: number;
}
/**
 * Return object with data to display graph element
 * @param props
 */
export default function getGraphData(props: IProps) {
  if (Object.keys(props).length === 0) {
    throw "Object is empty";
  }

  if (props.newValue < 0) {
    throw "The new value can't be less than the previous value";
  }

  const { newValue, oldValue, stepSize } = props;
  const numberToLowerGraph = 50;
  const difference = newValue - oldValue;

  return {
    difference,
    percentage: difference ? Math.round((difference / oldValue) * 100) : 0,
    heightValue: oldValue / stepSize - numberToLowerGraph
  };
}
