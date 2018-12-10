import React, { Component } from 'react';

export default class BaseLabel extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  setRepeatIcon(repeatIcon) {
    return this.repeatIcon = repeatIcon;
  }

  generateDueRepeatLabel(text, iconSrc) {
    return (
      <p className="label-for-task">
        { iconSrc && <i className={iconSrc} /> }
        <span>{text}</span>
        <i className={this.repeatIcon} />
      </p>
    );
  }

  generateChildLabel(text, iconSrc) {
    return (
      <p className="label-for-task">
        { iconSrc && <i className={iconSrc} /> }
        <span>{text}</span>
      </p>
    );
  }

  setLabel() {
    return null;
  }

  render() {
    return null;
  }
};
