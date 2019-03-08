import PropTypes from "prop-types";

function getGraphData(props) {
  const difference = props.newValue - props.oldValue;
  return {
    difference,
    percentage: Math.round((difference / props.oldValue) * 100),
    heightValue: props.oldValue / props.stepSize - 40
  };
}

getGraphData.propTypes = {
  oldValue: PropTypes.string.isRequired
};

export default getGraphData;
