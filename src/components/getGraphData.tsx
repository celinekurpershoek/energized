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
  const { newValue, oldValue, stepSize } = props;
  const numberToLowerGraph = 50;
  const difference = newValue - oldValue;

  return {
    difference,
    percentage: Math.round((difference / oldValue) * 100),
    heightValue: oldValue / stepSize - numberToLowerGraph
  };
}
