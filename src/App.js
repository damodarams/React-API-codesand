import { React, Component } from "react";
import "./styles.css";
import axios from "axios";
import Loading from "./Loading";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: false,
      name: "",
      select: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  getUsers() {
    this.setState({
      loading: true
    });
    axios("https://api.randomuser.me/?results=5").then((response) => {
      this.setState({
        users: [...this.state.users, ...response.data.results],
        loading: false
      });
      console.log("state", this.state);
    });
  }

  componentDidMount() {
    this.getUsers();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getUsers();
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    });
  }

  handleSelect(e) {
    e.preventDefault();
    this.setState({
      select: e.target.value
    });
  }

  render() {
    return (
      <div className="App" key="app">
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter your name:
            <input
              type="text "
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            pick your Favorite color:
            <select value={this.state.select} onChange={this.handleSelect}>
              <option value="green"> Green</option>
              <option value="red"> Red</option>
              <option value="blue"> Blue</option>
            </select>
          </label>
          <br />
          <input
            type="submit"
            //onClick={this.handleSubmit}
            value="load more"
          />
          <p> {this.state.name} </p>
          <p> {this.state.select} </p>
        </form>
        {!this.state.loading ? (
          this.state.users.map((user) => (
            <>
              <div className="user" key="user">
                {user.name.first}
              </div>
              <div className="email" key="email">
                {" "}
                {user.email}
              </div>
              <div className="cell" key="cell">
                {" "}
                {user.cell}
              </div>
              <hr />
            </>
          ))
        ) : (
          <Loading message="please wait data is loading" />
        )}
      </div>
    );
  }
}

export default App;
