import React from "react";
import Moment from "react-moment";
import { GraphPipe } from "./GraphPipe";
import getGraphData from "./getGraphData";

const graphMin = 9000;
const graphMax = 20000;
const stepSize = (graphMax - graphMin) / 100; // 1% = 110 557 = 5% 100% = 11000

class Graph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let startValue = this.props.startValue;
    return (
      <div className="graphs">
        <h2>KWH increase</h2>
        <ul className="graph graph--vertical">
          {this.props.kwh.map(data => {
            const graphData = getGraphData({
              oldValue: startValue,
              newValue: data.value,
              stepSize
            });
            startValue = data.value;
            return (
              <li className="graph__entry" key={new Date(data.date).getTime()}>
                <GraphPipe
                  startValue={graphData.startValue}
                  heightValue={graphData.heightValue}
                  difference={graphData.difference}
                  percentage={graphData.percentage}
                />

                <span className="graph__label">
                  <Moment format="D MMM">{data.date}</Moment>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Graph;
