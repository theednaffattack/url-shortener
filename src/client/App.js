import React, { Component } from 'react';
import './app.css';
// import ReactImage from './react.png';
import Demo from './components/demo/gsap-demo';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null
    };
  }

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({
        username: user.username
      }));
  }

  render() {
    return (
      <div>
        {/* {this.state.username ? (
          <h1>
            Hello
            {this.state.username}
          </h1>
        ) : (
          <h1>
Loading.. please wait!
          </h1>
        )}
        <img src={ReactImage} alt="react" /> */}
        <Demo username={this.state.username ? this.state.username : 'Loading...'} />
      </div>
    );
  }
}
