import React, { Component } from 'react';

export default class List extends Component {
  render(){
    return (
      <ul className={this.props.className} onClick={this.props.onClick}>{this.props.children}</ul>
    )
  }
}