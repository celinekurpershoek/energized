import * as React from "react";
interface IProps {
  title: string;
}
export default class Header extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }
  render() {
    return (
      <header className="app-header">
        <h1>{this.props.title}</h1>
      </header>
    );
  }
}
