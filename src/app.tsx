import * as React from "react";
import * as ReactDOM from "react-dom";

import Header from "./components/header";
import Graph from "./components/graph";
import { db } from "../firebase/index";

const userId = "Q78a0FyTbsuTMEG9RtB4";
type kwhData = { date: string; value: number };

type IState = {
  kwh: Array<kwhData>;
  userInfo: { name: string };
  startValue: number;
  usage: number;
};
class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      kwh: [],
      userInfo: { name: "" },
      startValue: 9000,
      usage: 0
    };
    this.setUserData = this.setUserData.bind(this);
  }

  componentDidMount() {
    this.setUserInfo();
    this.getUserData();
  }

  setUserInfo() {
    db.collection("users")
      .doc(userId)
      .get()
      .then((doc: any) => {
        const userData = doc.data();
        this.setState({
          userInfo: {
            id: doc.id,
            ...userData
          }
        });
      });
  }

  setUserData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const kwhData: kwhData = this.getFormData(event.target as HTMLFormElement);
    db.collection("kwh")
      .doc(kwhData.date)
      .set({
        date: kwhData.date,
        user: userId,
        value: kwhData.value
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error: string) => {
        console.error("Error writing document: ", error);
      });
  }

  getUserData() {
    db.collection("kwh")
      .where("user", "==", userId)
      .onSnapshot((querySnapshot: any) => {
        const kwh: kwhData[] = [];
        querySnapshot.forEach((doc: any) => {
          const docData: kwhData = doc.data();
          kwh.push({
            date: new Date(docData.date).toString(),
            value: docData.value
          });
        });
        this.setState({ kwh: kwh });
      });
  }

  getFormData(form: HTMLFormElement): kwhData {
    const kwhInput: HTMLInputElement = form.elements.namedItem(
      "kwh"
    ) as HTMLInputElement;
    const dateInput: HTMLInputElement = form.elements.namedItem(
      "date"
    ) as HTMLInputElement;
    const date: string = dateInput.value || new Date().toString();
    const kwh: number = parseInt(kwhInput.value);
    return { date, value: kwh };
  }

  render() {
    const { kwh, startValue, usage } = this.state;
    return (
      <div>
        <Header title={`Hello ${this.state.userInfo.name}`} />
        <Graph usage={usage} startValue={startValue} kwh={kwh} />

        <form onSubmit={this.setUserData}>
          <input
            className="meter meter--kwh"
            placeholder="000000"
            type="number"
            name="kwh"
          />
          <input type="date" name="date" />
          <button>Add data</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
