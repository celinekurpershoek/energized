interface IProps {
  newValue: number;
  oldValue: number;
  stepSize: number;
}

function getGraphData(props: IProps) {
  const { newValue, oldValue, stepSize } = props;
  const difference = newValue - oldValue;

  return {
    difference,
    percentage: Math.round((difference / oldValue) * 100),
    heightValue: oldValue / stepSize - 40
  };
}

export default getGraphData;
