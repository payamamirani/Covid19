import React, { Component } from "react";
import authservice from "../services/authservice";

class Profile extends Component {
  render() {
    const user = authservice.getCurrentUser();
    return (
      <div className="text-center table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>نام</th>
              <th>نام خانوادگی</th>
              <th>پست الکترونیک</th>
              <th>شماره موبایل</th>
              <th>شماره تلفن</th>
              <th>آدرس</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.Name}</td>
              <td>{user.Family}</td>
              <td>{user.Email}</td>
              <td>{user.CellNumber}</td>
              <td>{user.PhoneNumber}</td>
              <td>{user.Address}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Profile;
