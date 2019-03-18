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
    percentage: getPercentage(difference, oldValue) || 0,
    heightValue: oldValue / stepSize - numberToLowerGraph
  };
}

export function getPercentage(difference: number, oldValue: number) {
  let percentage: number = 0;
  if (difference && oldValue) {
    percentage = Math.round((difference / oldValue) * 100);
  }
  if (oldValue === 0 && difference > 0) {
    percentage = 100;
  }
  if (percentage > 300) {
    console.info("The percentage is above 300, something is wrong?");
  }
  return percentage;
}
