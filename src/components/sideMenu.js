import React from 'react';

import MenuItem from './menuItems';



const SideMenu = (props) => (
  <ul className="side_menu">
    {props.items.map(item => <MenuItem key={item.id} item={item} />)}
  </ul>
);

export default SideMenu;
