import * as React from "react";
import Moment from "react-moment";
import GraphPipe from "./graphPipe";
import getGraphData from "./getGraphData";

// set a default scale for now need to calculate this eventually
const graphMin = 9000;
const graphMax = 20000;
const stepSize = (graphMax - graphMin) / 100;
interface IProps {
  startValue: number;
  kwh: Array<{ value: number; date: string }>;
  usage: number;
}

interface graphData {
  startValue: number;
  kwhDate: string;
  percentage: number;
  difference: number;
  heightValue: number;
}

// default props gaat in props ???

class Graph extends React.Component<IProps, any> {
  static startValue: number = 0;
  static usage: number = 0;

  constructor(props: IProps) {
    super(props);
  }

  calculateUsage() {
    const kwhArray = this.props.kwh;
    const kwhLatest = kwhArray[kwhArray.length - 1];
    console.log(kwhArray[kwhArray.length - 1]);
    if (!kwhLatest) {
      return;
    }
    console.log(kwhLatest.value);
    Graph.usage = Graph.startValue - kwhLatest.value;
  }

  render() {
    Graph.startValue = this.props.startValue;
    const kwhData: graphData[] = this.props.kwh.map(
      ({ value: startValue, date: kwhDate }) => {
        const options = getGraphData({
          oldValue: Graph.startValue,
          newValue: startValue,
          stepSize
        });
        Graph.startValue = startValue;
        return {
          startValue,
          kwhDate,
          ...options
        };
      }
    );
    this.calculateUsage();
    return (
      <div className="graphs">
        <h2>KWH increase (total: {Graph.usage})</h2>
        <ul className="graph graph--vertical">
          {kwhData.map(data => {
            return (
              <li
                className="graph__entry"
                key={new Date(data.kwhDate).getTime()}
              >
                <GraphPipe {...data} />

                <span className="graph__label">
                  <Moment format="D MMM">{data.kwhDate}</Moment>
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
