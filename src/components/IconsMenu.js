import React from 'react';
import BasicButton from './BasicButton';

const IconsMenu = ({ iconsRef }) => {
  return (
    <div className="icons-menu-wrapper" ref={node => iconsRef(node)}>
      <div className="icons-menu">
        <i className="fa fa-sort-amount-down"></i>
        <i className="fa fa-home"></i>
        <i className="fa fa-calendar-alt"></i>
        <i className="fa fa-archive"></i>
        <i className="fa fa-wrench"></i>
        <i className="fa fa-plane"></i>
        <i className="fa fa-magic"></i>
        <i className="fa fa-address-book"></i>
        <i className="fa fa-award"></i>
        <i className="fa fa-balance-scale"></i>
        <i className="fa fa-book"></i>
        <i className="fa fa-cogs"></i>
        <i className="fa fa-comment-dollar"></i>
        <i className="fa fa-cookie-bite"></i>
        <i className="fa fa-bug"></i>
      </div>
      <BasicButton
        buttonClassName="clear-icon"
        buttonText="Clear"
      />
    </div>
  )
};

export default IconsMenu;