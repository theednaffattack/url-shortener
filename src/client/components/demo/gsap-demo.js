import React from 'react';
import { TweenLite, Expo } from 'gsap';

import UriForm from '../UrlForm';

import '../../styles/demo.css';
import { postData } from '../../App';
// import { url } from 'inspector';

const uriObj = {
  uri: 'http://www.google.com'
};

const { Component } = React;

class Demo extends Component {
  constructor(props) {
    super(props);
    this.loaderWrap = null;
    this.loaderTween = null;
    this.coronerWrap = null;
    this.coronerTween = null;
    this.handleClick = this.handleClick.bind(this);
    // this.handleClick = this.handleClick.bind(this);

    this.state = {
      coroner: { y: '0px' },
      message: { text: 'Sample message' },
      errors: this.props.errors,
      hash: this.props.hash
    };
  }

  handleClick(e) {
    e.preventDefault();

    // fetch('http://192.168.180.248:8001/api/getShortLink')
    //   .then((res) => {
    //     console.log(res.json());
    //     res.json();
    //   })
    //   .then(data => this.setState({
    //     hash: data.hash
    //   }))
    //   .catch(err => this.setState({
    //     errors: { code: 'ShortLink Fetch error', msg: err.message }
    //   }));
    console.log('this');
    console.log(e.target.value);
    postData('http://192.168.180.248:8001/api/getShortLink', { hash: e.target.value })
      .then(data => this.setState({
        hash: data.hash
      }))
      .catch(err => this.setState({
        errors: { code: 'ShortLink Fetch error', msg: err.message }
      }));
    this.coronerTween = TweenLite.to(this.coronerWrap, 1, {
      y: '200px',
      ease: Expo.easeInOut
    });
    console.log('this.coronerWrap');
    console.log('this.props');
    console.log(this.coronerWrap);
    console.log(this.props);
  }

  // componentDidMount() {
  //   this.loaderTween = TweenLite.to(this.loaderWrap, 1, {
  //     x: '100%',
  //     ease: Expo.easeInOut,
  //     delay: 2
  //   });
  // }

  render() {
    const { hash } = this.state;
    return (
      <div>
        <div className="content">
          {' '}
          {window ? (
            <h1>
              {`${this.props.username} (${window.location.href})`}
            </h1>
          ) : (
            '😵 😵 😵   Error   😵 😵 😵'
          )}
          {' '}
          THIS IS THE CONTENT SECTION
          <div>
            <button onClick={this.handleClick} value={this.state.hash}>
              press me
            </button>
          </div>
          <div className="coroner-message" ref={div => (this.coronerWrap = div)}>
            {this.state.hash ? this.state.hash : 'YOOOOOOO'}
          </div>
          <UriForm hash={hash} uri={uriObj} postHash={postData} />
        </div>
        <div>
          {}
        </div>
        {' '}
        {/* end content */}
        {/* <div className="loader" ref={div => (this.loaderWrap = div)}>
          THIS IS THE LOADER WRAP, PUT THE SPINNER HERE
        </div> */}
      </div>
    );
  }
}

export default Demo;
