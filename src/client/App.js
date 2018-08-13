import React, { Component } from 'react';
import './app.css';
// import ReactImage from './react.png';
import Demo from './components/demo/gsap-demo';

export const postData = (url = '', data = {}) => fetch(url, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, cors, *same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, same-origin, *omit
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
    // "Content-Type": "application/x-www-form-urlencoded",
  },
  redirect: 'follow', // manual, *follow, error
  referrer: 'no-referrer', // no-referrer, *client
  body: JSON.stringify(data) // body data type must match "Content-Type" header
})
  .then(responseText => responseText.json()) // parses response to JSON
// .then(response => this.setState(response))
  .catch(error => ({ errors: { msg: error.message } }));
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      errors: { code: '', msg: '' },
      hash: ''
    };
  }

  componentDidMount() {
    fetch('http://192.168.180.248:8001/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({
        username: user.username
      }))
      .catch(err => this.setState({
        errors: { code: 'Fetch error', msg: err.message }
      }));
  }

  render() {
    return (
      <div>
        <Demo
          errors={this.state.errors ? this.state.errors : 'no errors'}
          username={this.state.username ? this.state.username : ''}
          getData={postData}
        />
        <div>
          {this.state.errors ? JSON.stringify(this.state.errors, null, 2) : 'nothing'}
        </div>
      </div>
    );
  }
}
