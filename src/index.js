import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  joke = null; //a class property

  constructor() {
    super();
    this.state = {
      joke: null,
      isFetchingJoke: false
    };
    this.onTellJoke = this.onTellJoke.bind(this);
  }

  componentDidMount() {
    this.fetchJoke();
  }

  onTellJoke() {
    this.fetchJoke();
  }

  fetchJoke() {
    this.setState({ isFetchingJoke: true });
    fetch("https://icanhazdadjoke.com/", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ joke: json.joke });
        this.setState({ isFetchingJoke: false });
      });
  }

  render() {
    console.log("-----render----");

    return (
      <div>
        <button onClick={this.onTellJoke} disabled={this.state.isFetchingJoke}>
          Tell me a joke now
        </button>
        <p>
          {this.state.isFetchingJoke ? "Loading a joke..." : this.state.joke}
        </p>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
