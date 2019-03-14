import * as React from "react";
interface IProps {
  title: string;
}
class Header extends React.Component<IProps, any> {
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

export default Header;
