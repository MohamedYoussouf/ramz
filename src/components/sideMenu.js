import React from 'react';

import MenuItem from './menuItems';



const SideMenu = (props) => (
  <ul className="top_menu">
    {
      props.items.map(item => <MenuItem key={item.id} item={item} />)
    
    }
    {console.log(props.items)}
  </ul>
);

export default SideMenu;
