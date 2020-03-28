import React, { Component } from "react";
import { getHumanServices } from "../services/humanService";
import auth from "../services/authservice";
import { toJalaliDateTime } from "../utils/utils";
import Table from "./common/table";
import Pagination from "./common/pagination";

class HumanServiceReport extends Component {
  state = {
    pageSize: 10,
    currentPage: 1,
    dates: [],
    sortColumn: { path: "ID", order: "asc" }
  };

  async componentDidMount() {
    const { data: dates } = await getHumanServices();
    if (dates.success) this.setState({ dates: dates.payload });
  }

  columns = [
    { path: "ID", label: "شناسه" },
    {
      path: "Address",
      label: "آدرس"
    },
    {
      path: "fromDateTime",
      label: "از",
      content: item => (
        <div className="ltr">{toJalaliDateTime(item.fromDateTime)}</div>
      )
    },
    {
      path: "ToDateTime",
      label: "تا",
      content: item => (
        <div className="ltr">{toJalaliDateTime(item.ToDateTime)}</div>
      )
    },
    {
      path: "CellNumber",
      label: "شماره موبایل"
    },
    {
      path: "ServiceTitle",
      label: "خدمت"
    },
    {
      key: "update",
      content: item => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => this.handleUpdate(item.ID)}
        >
          ویرایش
        </button>
      )
    }
  ];

  handleNew = () => {
    this.props.history.push("/humanservice");
  };

  handleUpdate = itemId => {
    this.props.history.push("/humanservice/" + itemId);
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { dates, sortColumn, pageSize, currentPage } = this.state;
    const getUserPrivilages = auth.getCurrentUserPrivileges();
    const isAccessToNew = getUserPrivilages.find(
      r => r.Gid === "AFB78863-303F-4E73-9E32-529845D97BF7"
    );

    return (
      <React.Fragment>
        {isAccessToNew && (
          <React.Fragment>
            <button className="btn btn-primary" onClick={this.handleNew}>
              جدید
            </button>
            <br />
            <br />
          </React.Fragment>
        )}
        <Table
          data={dates}
          columns={this.columns}
          keyProperty="ID"
          sortColumn={sortColumn}
          onSort={this.handleSort}
        />
        <Pagination
          itemCount={dates.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default HumanServiceReport;
