import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({
  itemCount,
  pageSize,
  maxPageCount,
  currentPage,
  onPageChange
}) => {
  const actualPageCount = Math.ceil(itemCount / pageSize);
  const pageCount = Math.min(maxPageCount, actualPageCount);
  if (pageCount <= 1) return null;
  const diffPage = Math.ceil((maxPageCount - 1) / 2);

  const startRange =
    currentPage < maxPageCount
      ? 1
      : actualPageCount - currentPage < diffPage
      ? actualPageCount - maxPageCount + 1
      : currentPage - diffPage;
  const endRange =
    startRange + pageCount > actualPageCount
      ? actualPageCount + 1
      : startRange + pageCount;
  const pages = _.range(startRange, endRange);

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button
            disabled={currentPage === 1 && "disabled"}
            onClick={() => onPageChange(1)}
            className="page-link"
          >
            First
          </button>
        </li>
        <li className="page-item">
          <button
            disabled={currentPage === 1 && "disabled"}
            onClick={() => onPageChange(currentPage - 1)}
            className="page-link"
          >
            Prev
          </button>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={`page-item ${page === currentPage && "active"}`}
          >
            <button onClick={() => onPageChange(page)} className="page-link">
              {page}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            disabled={currentPage === actualPageCount && "disabled"}
            onClick={() => onPageChange(currentPage + 1)}
            className="page-link"
          >
            Next
          </button>
        </li>
        <li className="page-item">
          <button
            disabled={currentPage === actualPageCount && "disabled"}
            onClick={() => onPageChange(actualPageCount)}
            className="page-link"
          >
            Last
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  maxPageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

Pagination.defaultProps = {
  maxPageCount: 5
};

export default Pagination;
