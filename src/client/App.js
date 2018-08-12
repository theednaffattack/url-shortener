import React, { Component } from 'react';
import './app.css';
// import ReactImage from './react.png';
import Demo from './components/demo/gsap-demo';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      errors: { code: '', msg: '' }
    };
  }

  componentDidMount() {
    fetch('http://192.168.180.248:8001/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({
        username: user.username
      }))
      .catch(err => this.setState({
        errors: { code: 'blah', msg: err }
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
        <Demo
          errors={this.state.errors ? this.state.errors : 'no errors'}
          username={this.state.username ? this.state.username : 'Loading...'}
        />
        <div>
          {this.state.errors ? JSON.stringify(this.state.errors, null, 2) : 'nothing'}
        </div>
      </div>
    );
  }
}
