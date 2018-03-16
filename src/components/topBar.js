import React, {Component} from 'react';

import MenuItem from './menuItems';
import Logo from '../ramz-logo.png';


const TopBar = (props) => {
  return (
    <ul className="top_menu">
      {props.items.map((item, index) => <MenuItem key={item.id} item={item} index={index}/>)}
      <input type="text" className="doc-title" value={props.value} onChange={props.onChangeValue} placeholder="عنوان المستند"/>
      <img src={Logo} id="logo" title="رمز"/>
    </ul>
  );
}

export default TopBar;
