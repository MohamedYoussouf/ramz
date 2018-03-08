import React from 'react';
import SubMenuItem from './subMenuItem';

let subItem = null;
let subItemWrapper = null;
const menuItem = (props) => {
  if(props.item.submenu != undefined) {
    subItemWrapper = <ul className="sub_menu">{subItem = props.item.submenu.map(Item => <SubMenuItem key={Item.id} item={Item} />)}</ul>
  } else {
    subItemWrapper = null;
  }
  return (
    <li className="list-item">
      <button type="button"
        onClick={props.item.method}
        title={props.item.title}>
        <span dangerouslySetInnerHTML={{__html: props.item.icon}}></span>
        {props.item.text}
      </button>
      {subItemWrapper}
    </li>
  )
};

export default menuItem;
