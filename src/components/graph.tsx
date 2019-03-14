import React from "react";
import Moment from "react-moment";
import GraphPipe from "./GraphPipe";
import getGraphData from "./getGraphData";

// set a default scale for now need to calculate this eventually
const graphMin = 9000;
const graphMax = 20000;
const stepSize = (graphMax - graphMin) / 100; // 1% = 110 557 = 5% 100% = 11000

interface IProps {
  startValue: number;
  kwh: [{ value: number; date: string }];
}

class Graph extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    let startValue = this.props.startValue;
    return (
      <div className="graphs">
        <h2>KWH increase</h2>
        <ul className="graph graph--vertical">
          {this.props.kwh.map(kwhEntry => {
            const graphData = getGraphData({
              oldValue: startValue,
              newValue: kwhEntry.value,
              stepSize
            });
            startValue = kwhEntry.value;
            return (
              <li
                className="graph__entry"
                key={new Date(kwhEntry.date).getTime()}
              >
                <GraphPipe
                  startValue={startValue}
                  heightValue={graphData.heightValue}
                  difference={graphData.difference}
                  percentage={graphData.percentage}
                />

                <span className="graph__label">
                  <Moment format="D MMM">{kwhEntry.date}</Moment>
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
