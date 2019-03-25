import React, { Component } from 'react';

export default class Template extends Component {
  _iconSrc = '';
  _text = '';

  constructor(props) {
    super(props);
    this.props = props;
  }

  setText(text) {
    this._text = text;
  }

  setIconSrc(src) {
    this._iconSrc = src;
  }

  shouldBeRendered() {
    return false;
  }

  render() {
    return (
      <p className="label-for-task">
        { this._iconSrc && <i className={this._iconSrc}/> }
        <span>{this._text}</span>
      </p>
    );
  }
};
