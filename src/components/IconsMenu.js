import React from 'react';
import BasicButton from './BasicButton';

const IconsMenu = ({ iconsRef }) => (
  <div className="icons-menu-wrapper" ref={node => iconsRef(node)}>
    <div className="icons-menu">
      <i className="fa fa-sort-amount-down" />
      <i className="fa fa-home" />
      <i className="fa fa-calendar-alt" />
      <i className="fa fa-archive" />
      <i className="fa fa-wrench" />
      <i className="fa fa-plane" />
      <i className="fa fa-magic" />
      <i className="fa fa-address-book" />
      <i className="fa fa-award" />
      <i className="fa fa-balance-scale" />
      <i className="fa fa-book" />
      <i className="fa fa-cogs" />
      <i className="fa fa-comment-dollar" />
      <i className="fa fa-cookie-bite" />
      <i className="fa fa-bug" />
    </div>
    <BasicButton
      buttonClassName="clear-icon"
      buttonText="Clear"
    />
  </div>
);

export default IconsMenu;
