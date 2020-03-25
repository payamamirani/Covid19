import React, { Component } from "react";
import { RangeDatePicker } from "jalali-react-datepicker";
import _ from "lodash";
import Table from "./common/table";
import Pagination from "./common/pagination";
import { getRequests } from "../services/requestService";
import { getItems } from "../services/itemService";
import { paginate } from "../utils/paginate";
import { toJalaliDateTime } from "../utils/utils";
import { toast } from "react-toastify";

class Request extends Component {
  state = {
    pageSize: 10,
    currentPage: 1,
    requests: [],
    items: [],
    filters: [],
    sortColumn: { path: "ID", order: "asc" }
  };

  columns = [
    { path: "ID", label: "شناسه" },
    {
      path: "ItemID",
      label: "جنس / شغل",
      content: item => this.getItem(item.ItemID)
    },
    { path: "Count", label: "تعداد" },
    {
      path: "TypeID",
      label: "نوع درخواست",
      content: item => this.getRequestType(item.TypeID)
    },
    {
      path: "CreatedOn",
      label: "تاریخ ایجاد",
      content: item => (
        <div className="ltr">{toJalaliDateTime(item.CreatedOn)}</div>
      )
    },
    { path: "UserID", label: "کاربر" }
  ];

  async componentDidMount() {
    const { data: result } = await getRequests();
    const { data: items } = await getItems();
    if (!result.success) toast.error(result.message);
    if (!items.success) toast.error(items.message);
    const requests = result.payload;
    this.setState({ requests, items: items.payload });
  }

  getRequestType(requestTypeID) {
    return requestTypeID === 1
      ? "اضافه کردن جنس / شخص"
      : "ثبت درخواست جنس / شخص";
  }

  getItem(itemId) {
    const item = this.state.items.find(i => i.ID === itemId);
    return item ? item.Title : itemId;
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleFilter = ({ start, end }) => {
    this.setState({ filters: [start._d, end._d], currentPage: 1 });
  };

  render() {
    const {
      requests: allRequest,
      sortColumn,
      pageSize,
      filters,
      currentPage
    } = this.state;

    const filterd =
      filters.length > 0
        ? allRequest.filter(
            r =>
              new Date(r.CreatedOn) >= filters[0] &&
              new Date(r.CreatedOn) <= filters[1]
          )
        : allRequest;

    const sort = _.orderBy(filterd, [sortColumn.path], [sortColumn.order]);

    const requests = paginate(sort, currentPage, pageSize);

    return (
      <React.Fragment>
        <h1>گزارش درخواستها</h1>
        <br />
        <RangeDatePicker onClickSubmitButton={this.handleFilter} />
        <br />
        <Table
          data={requests}
          columns={this.columns}
          keyProperty="ID"
          sortColumn={sortColumn}
          onSort={this.handleSort}
        />
        <Pagination
          itemCount={filterd.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Request;
