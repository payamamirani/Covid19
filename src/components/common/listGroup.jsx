import React from "react";
import PropTypes from "prop-types";

const ListGroup = ({
  items,
  valueProperty,
  textProperty,
  selectedItem,
  onItemSelect
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          style={{ cursor: "pointer" }}
          className={`list-group-item ${selectedItem === item && "active"}`}
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  valueProperty: PropTypes.string,
  textProperty: PropTypes.string,
  selectedItem: PropTypes.object,
  onItemSelect: PropTypes.func.isRequired
};

ListGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name"
};

export default ListGroup;
