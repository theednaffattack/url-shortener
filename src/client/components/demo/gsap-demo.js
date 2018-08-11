import React from 'react';
import { TweenLite } from 'gsap';
import styled from 'styled-components'

import '../../styles/demo.css';

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
  }

  handleClick(e) {
    e.preventDefault();
    this.coronerTween = TweenLite.to(this.coronerWrap, 1, {
      y: '100px',
      ease: Expo.easeInOut
    });
    console.log(this.coronerWrap);
    console.log(this.props);
  }

  componentDidMount() {
    this.loaderTween = TweenLite.to(this.loaderWrap, 1, {
      x: '100%',
      ease: Expo.easeInOut,
      delay: 2
    });
  }

  render() {
    return (
      <div>
        <div className="content">
          {' '}
          {this.props.username ? (
            <h1>
              HELLO
              {` ${this.props.username}`}
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
            DEALING WITH THE CORONER
          </div>
        </div>
        {' '}
        {/* end content */}
        <div className="loader" ref={div => (this.loaderWrap = div)}>
          THIS IS THE LOADER WRAP, PUT THE SPINNER HERE
        </div>
      </div>
    );
  }
}

export default Demo;
