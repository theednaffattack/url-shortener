import React from 'react';
import { TweenLite, Expo } from 'gsap';

import UriForm from '../UrlForm';

import '../../styles/demo.css';

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
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      coroner: { y: '0px' },
      message: { text: 'Sample message' },
      errors: this.props.errors
    };
  }

  handleClick(e) {
    e.preventDefault();
    this.coronerTween = TweenLite.to(this.coronerWrap, 1, {
      y: '200px',
      ease: Expo.easeInOut
    });
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
            <button onClick={this.handleClick}>
press me
            </button>
          </div>
          <div className="coroner-message" ref={div => (this.coronerWrap = div)}>
            {this.state.message.text}
          </div>
          <UriForm uri={uriObj} />
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
