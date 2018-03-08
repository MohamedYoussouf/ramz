import React from 'react';

const SubMenuItem = (props) => {
  return (
    <li className="list-item">
      <button type="button"
        onBlur={props.item.method}
        title={props.item.title}>
        {props.item.title}
        {console.log(props.item.method)}
      </button>
    </li>
  )
};

export default SubMenuItem;
