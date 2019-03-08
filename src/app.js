import React from "react";
import ReactDOM from "react-dom";
import slugify from "slugify";

import Header from "./components/header";
import Graph from "./components/graph";
import { db } from "../firebase";

const userId = "Q78a0FyTbsuTMEG9RtB4";

import calculateDifference from "../lib/calculate-difference";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kwh: [],
      userInfo: {},
      startValue: 9000
    };
    this.setUserData = this.setUserData.bind(this);
  }
  componentDidMount() {
    this.getUserInfo();
    this.getUserData();
  }

  getUserInfo() {
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

  setUserData(event) {
    event.preventDefault();
    const data = this.getFormData(event);
    db.collection("kwh")
      .doc(data.date)
      .set({
        date: data.date,
        user: userId,
        value: data.kwh
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }

  getUserData() {
    db.collection("kwh")
      .where("user", "==", "Q78a0FyTbsuTMEG9RtB4")
      .onSnapshot(querySnapshot => {
        const kwh = [];
        querySnapshot.forEach(function(doc) {
          const data = doc.data();
          kwh.push({
            date: new Date(data.date).toString(),
            value: data.value
          });
        });
        this.setState({ kwh: kwh });
        console.log(this.state);
      });
  }

  getFormData(event) {
    const formData = new FormData(event.target);
    const data = {};
    for (var pair of formData.entries()) {
      if (pair[0] === "kwh") {
        data.kwh = pair[1];
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
        <Graph startValue="9557" kwh={this.state.kwh} />

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
