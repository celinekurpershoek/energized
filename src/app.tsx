import * as React from "react";
import * as ReactDOM from "react-dom";

import Header from "./components/header";
import Graph from "./components/graph";
import { db } from "../firebase/index";

const userId = "Q78a0FyTbsuTMEG9RtB4";
type data = { date: string; value: number };

class App extends React.Component {
  state: { kwh: data[]; userInfo: { name: string }; startValue: number };

  constructor(props: any) {
    super(props);
    this.state = {
      kwh: [],
      userInfo: { name: "" },
      startValue: 9000
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
      .then(doc => {
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
    const data = this.getFormData(event.target as HTMLFormElement);
    db.collection("kwh")
      .doc(data.date)
      .set({
        date: data.date,
        user: userId,
        value: data.value
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
        const kwh: data[] = [];
        querySnapshot.forEach((doc: any) => {
          const documentData: { date: number; value: number } = doc.data();
          kwh.push({
            date: new Date(documentData.date).toString(),
            value: documentData.value
          });
        });
        this.setState({ kwh: kwh });
      });
  }

  getFormData(form: HTMLFormElement): data {
    const formData = new FormData(form);
    const data: data = null;
    for (var pair of formData.entries()) {
      if (pair[0] === "kwh") {
        data.value = pair[1];
      }
      if (pair[0] === "date") {
        data.date = pair[1];
      }
    }
    return data;
  }

  render() {
    return (
      <div>
        <Header title={`Hello ${this.state.userInfo.name}`} />
        <Graph startValue={this.state.startValue} kwh={this.state.kwh} />

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
