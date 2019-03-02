import React, { Component } from 'react';

export default class ThirdPartyModal extends Component {
  constructor(props) {
    super(props);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.state = {
      show: false
    };
  }

  handleCloseModal() {
    this.setState({ show: false });
  }

  handleShowModal() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>

      </div>
    );
  }
};