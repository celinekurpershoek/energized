import * as React from "react";
import Moment from "react-moment";
import GraphPipe from "./GraphPipe";
import getGraphData from "./getGraphData";

// set a default scale for now need to calculate this eventually
const graphMin = 9000;
const graphMax = 20000;
const stepSize = (graphMax - graphMin) / 100; // 1% = 110 557 = 5% 100% = 11000

interface IProps {
  startValue: number;
  kwh: Array<{ value: number; date: string }>;
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
          {this.props.kwh.map(({ value: kwhValue, date: kwhDate }) => {
            const { heightValue, difference, percentage } = getGraphData({
              oldValue: startValue,
              newValue: kwhValue,
              stepSize
            });
            startValue = kwhValue;
            return (
              <li className="graph__entry" key={new Date(kwhDate).getTime()}>
                <GraphPipe
                  startValue={startValue}
                  heightValue={heightValue}
                  difference={difference}
                  percentage={percentage}
                />

                <span className="graph__label">
                  <Moment format="D MMM">{kwhDate}</Moment>
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
