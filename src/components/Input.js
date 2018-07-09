import React, { Component } from 'react';

export default class Input extends Component {
  render(){
    return (
      <input
        className={this.props.className}
        type={this.props.type}
        onChange={this.props.onChange}
        value={this.props.value}
      />
    )
  }
};