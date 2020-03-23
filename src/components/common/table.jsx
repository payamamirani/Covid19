import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ data, columns, sortColumn, onSort, keyProperty }) => {
  return (
    <table className="table table-striped">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} keyProperty={keyProperty} />
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  keyProperty: PropTypes.string
};

Table.defaultProps = {
  keyProperty: "_id"
};

export default Table;
