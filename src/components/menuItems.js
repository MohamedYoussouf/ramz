import React from 'react';


const menuItem = (props) => {
  return (
    <li className="list-item">
      <button type="button"
        onClick={props.item.method}
        title={props.item.title}>
        {props.item.icon}
      </button>
    </li>
  )
};

export default menuItem;
