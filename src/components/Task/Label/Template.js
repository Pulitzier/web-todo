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

  getLabelData() {
    return {
      text: this._text,
      iconSrc: this._iconSrc,
    }
  }

  shouldBeRendered() {
    return false;
  }

  render() {
    return (
      <p className="label-for-task">
        { this.getLabelData().iconSrc && <i className={this.getLabelData().iconSrc}/> }
        <span>{this.getLabelData().text}</span>
      </p>
    );
  }
};
