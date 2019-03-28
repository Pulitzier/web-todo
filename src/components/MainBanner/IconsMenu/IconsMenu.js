import React from 'react';
import Select from 'react-select';
import { ICONSMENU } from '../../../store/constants';
import BasicButton from '../../BaseComponents/BasicButton';

const genOptions = (arr) => {
  return arr.map(item => ({ value: item, label: <span className={item}/>}))
};

const selectOptions = genOptions(ICONSMENU);

function IconsMenu(props) {
  const { showMenu, setIcon } = props;

  const handleChooseIcon = ({ value }) => {
    setIcon(value);
  };

  const cancelSetIcon = () => {
    setIcon();
  };

  return (
    <div className="icons-menu-wrapper">
      <Select
        className="icons-menu"
        options={selectOptions}
        menuIsOpen={showMenu}
        closeMenuOnSelect={true}
        onChange={handleChooseIcon}
        onBlur={cancelSetIcon}
      />
      <BasicButton
        buttonClassName="clear-icon"
        buttonText="Clear"
        buttonOnClickAction={cancelSetIcon}
      />
    </div>
  );
}

export default IconsMenu;
